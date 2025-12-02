const express = require('express');
const { authenticate } = require('../utils/auth');
const { sanitizeBody } = require('../middleware/sanitizer');
const { examLimiter } = require('../middleware/rateLimiter');

module.exports = (pool) => {
  const router = express.Router();

  /**
   * POST /api/exams/attempt
   * Save exam attempt
   */
  router.post(
    '/attempt',
    authenticate,
    examLimiter,
    sanitizeBody({
      examId: { type: 'string', required: true, maxLength: 50 },
      subject: { type: 'string', required: true, maxLength: 100 },
      examTitle: { type: 'string', required: true, maxLength: 255 },
      difficulty: { type: 'string', required: true, maxLength: 20 },
      scorePercentage: { type: 'decimal', required: true, min: 0, max: 100 },
      correctCount: { type: 'int', required: true, min: 0 },
      incorrectCount: { type: 'int', required: true, min: 0 },
      totalQuestions: { type: 'int', required: true, min: 1 },
      timeSpent: { type: 'int', required: true, min: 0 },
      passed: { type: 'string', required: true } // Will convert to boolean
    }),
    async (req, res) => {
      try {
        const userId = req.user.id;
        const {
          examId,
          subject,
          examTitle,
          difficulty,
          scorePercentage,
          correctCount,
          incorrectCount,
          totalQuestions,
          timeSpent,
          userAnswers,
          passed
        } = req.body;

        // Convert passed to boolean
        const isPassed = passed === true || passed === 'true';

        // Validate userAnswers
        if (!userAnswers || typeof userAnswers !== 'object') {
          return res.status(400).json({
            error: 'userAnswers inválido'
          });
        }

        // Insert exam attempt
        const result = await pool.query(
          `INSERT INTO exam_attempts (
            user_id, exam_id, subject, exam_title, difficulty,
            score_percentage, correct_count, incorrect_count,
            total_questions, time_spent, user_answers, passed,
            completed_at, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
          RETURNING id, score_percentage, passed, completed_at`,
          [
            userId,
            examId,
            subject,
            examTitle,
            difficulty,
            scorePercentage,
            correctCount,
            incorrectCount,
            totalQuestions,
            timeSpent,
            JSON.stringify(userAnswers),
            isPassed
          ]
        );

        const attempt = result.rows[0];

        // Clear saved exam state if exists
        await pool.query(
          'DELETE FROM exam_states WHERE user_id = $1 AND exam_id = $2',
          [userId, examId]
        );

        res.status(201).json({
          success: true,
          message: 'Exame submetido com sucesso!',
          attempt: {
            id: attempt.id,
            scorePercentage: attempt.score_percentage,
            passed: attempt.passed,
            completedAt: attempt.completed_at
          }
        });
      } catch (error) {
        console.error('Error saving exam attempt:', error);
        res.status(500).json({
          error: 'Erro ao salvar tentativa de exame'
        });
      }
    }
  );

  /**
   * GET /api/exams/attempts
   * Get user's exam attempts
   */
  router.get('/attempts', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const { subject, limit = 50, offset = 0 } = req.query;

      let query = `
        SELECT
          id, exam_id, subject, exam_title, difficulty,
          score_percentage, correct_count, incorrect_count,
          total_questions, time_spent, passed, completed_at
        FROM exam_attempts
        WHERE user_id = $1
      `;
      const params = [userId];

      if (subject) {
        query += ` AND subject = $${params.length + 1}`;
        params.push(subject);
      }

      query += ` ORDER BY completed_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(parseInt(limit), parseInt(offset));

      const result = await pool.query(query, params);

      res.json({
        success: true,
        attempts: result.rows,
        count: result.rows.length
      });
    } catch (error) {
      console.error('Error fetching exam attempts:', error);
      res.status(500).json({
        error: 'Erro ao buscar histórico de exames'
      });
    }
  });

  /**
   * GET /api/exams/progress/:subject?
   * Get user's progress (all subjects or specific)
   */
  router.get('/progress/:subject?', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const { subject } = req.params;

      let query = 'SELECT * FROM user_subject_progress WHERE user_id = $1';
      const params = [userId];

      if (subject) {
        query += ' AND subject = $2';
        params.push(subject);
      }

      query += ' ORDER BY last_attempt_at DESC';

      const result = await pool.query(query, params);

      res.json({
        success: true,
        progress: subject ? result.rows[0] || null : result.rows
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({
        error: 'Erro ao buscar progresso'
      });
    }
  });

  /**
   * GET /api/exams/stats
   * Get user's overall statistics
   */
  router.get('/stats', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        'SELECT * FROM user_overall_stats WHERE user_id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        return res.json({
          success: true,
          stats: {
            totalExamsTaken: 0,
            totalExamsPassed: 0,
            subjectsAttempted: 0,
            averageScore: 0,
            bestScore: 0,
            certificatesEarned: 0
          }
        });
      }

      const stats = result.rows[0];

      res.json({
        success: true,
        stats: {
          totalExamsTaken: parseInt(stats.total_exams_taken) || 0,
          totalExamsPassed: parseInt(stats.total_exams_passed) || 0,
          subjectsAttempted: parseInt(stats.subjects_attempted) || 0,
          averageScore: parseFloat(stats.average_score) || 0,
          bestScore: parseFloat(stats.best_score) || 0,
          totalQuestions: parseInt(stats.total_questions_answered) || 0,
          totalCorrect: parseInt(stats.total_correct_answers) || 0,
          totalTimeSpent: parseInt(stats.total_time_spent) || 0,
          certificatesEarned: parseInt(stats.certificates_earned) || 0,
          lastExamAt: stats.last_exam_at
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({
        error: 'Erro ao buscar estatísticas'
      });
    }
  });

  /**
   * POST /api/exams/state/save
   * Save exam state (for resuming)
   */
  router.post(
    '/state/save',
    authenticate,
    examLimiter,
    async (req, res) => {
      try {
        const userId = req.user.id;
        const { examId, currentQuestion, userAnswers, timeRemaining } = req.body;

        if (!examId) {
          return res.status(400).json({ error: 'examId é obrigatório' });
        }

        await pool.query(
          `INSERT INTO exam_states (user_id, exam_id, current_question, user_answers, time_remaining, started_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
           ON CONFLICT (user_id, exam_id)
           DO UPDATE SET
             current_question = $3,
             user_answers = $4,
             time_remaining = $5,
             updated_at = NOW()`,
          [
            userId,
            examId,
            currentQuestion || 0,
            JSON.stringify(userAnswers || {}),
            timeRemaining || 0
          ]
        );

        res.json({
          success: true,
          message: 'Estado do exame salvo'
        });
      } catch (error) {
        console.error('Error saving exam state:', error);
        res.status(500).json({
          error: 'Erro ao salvar estado do exame'
        });
      }
    }
  );

  /**
   * GET /api/exams/state/:examId
   * Load saved exam state
   */
  router.get('/state/:examId', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const { examId } = req.params;

      const result = await pool.query(
        'SELECT * FROM exam_states WHERE user_id = $1 AND exam_id = $2',
        [userId, examId]
      );

      if (result.rows.length === 0) {
        return res.json({
          success: true,
          state: null
        });
      }

      const state = result.rows[0];

      res.json({
        success: true,
        state: {
          currentQuestion: state.current_question,
          userAnswers: state.user_answers,
          timeRemaining: state.time_remaining,
          startedAt: state.started_at
        }
      });
    } catch (error) {
      console.error('Error loading exam state:', error);
      res.status(500).json({
        error: 'Erro ao carregar estado do exame'
      });
    }
  });

  /**
   * DELETE /api/exams/state/:examId
   * Clear saved exam state
   */
  router.delete('/state/:examId', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const { examId } = req.params;

      await pool.query(
        'DELETE FROM exam_states WHERE user_id = $1 AND exam_id = $2',
        [userId, examId]
      );

      res.json({
        success: true,
        message: 'Estado do exame removido'
      });
    } catch (error) {
      console.error('Error clearing exam state:', error);
      res.status(500).json({
        error: 'Erro ao limpar estado do exame'
      });
    }
  });

  /**
   * GET /api/exams/admin/statistics
   * Get exam statistics for admin (requires admin role)
   */
  router.get('/admin/statistics', authenticate, async (req, res) => {
    try {
      // TODO: Add admin role check
      const result = await pool.query('SELECT * FROM exam_statistics ORDER BY total_attempts DESC');

      res.json({
        success: true,
        statistics: result.rows
      });
    } catch (error) {
      console.error('Error fetching exam statistics:', error);
      res.status(500).json({
        error: 'Erro ao buscar estatísticas de exames'
      });
    }
  });

  return router;
};
