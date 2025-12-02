const express = require('express');
const { authenticate } = require('../utils/auth');
const { certificateLimiter } = require('../middleware/rateLimiter');
const crypto = require('crypto');

module.exports = (pool, emailService) => {
  const router = express.Router();

  /**
   * Generate unique certificate code
   */
  const generateCertificateCode = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `CERT-${timestamp}-${randomStr}`;
  };

  /**
   * POST /api/certificates/generate
   * Generate certificate for a passed exam
   */
  router.post('/generate', authenticate, certificateLimiter, async (req, res) => {
    try {
      const userId = req.user.id;
      const { attemptId } = req.body;

      if (!attemptId) {
        return res.status(400).json({
          error: 'ID da tentativa de exame é obrigatório'
        });
      }

      // Get exam attempt details
      const attemptResult = await pool.query(
        `SELECT ea.*, u.name, u.email
         FROM exam_attempts ea
         JOIN users u ON ea.user_id = u.id
         WHERE ea.id = $1 AND ea.user_id = $2 AND ea.passed = true`,
        [attemptId, userId]
      );

      if (attemptResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Tentativa de exame não encontrada ou não foi aprovada'
        });
      }

      const attempt = attemptResult.rows[0];

      // Check if certificate already exists for this attempt
      const existingCert = await pool.query(
        'SELECT * FROM certificates WHERE exam_attempt_id = $1',
        [attemptId]
      );

      if (existingCert.rows.length > 0) {
        return res.json({
          success: true,
          message: 'Certificado já foi gerado anteriormente',
          certificate: existingCert.rows[0]
        });
      }

      // Generate unique certificate code
      const certificateCode = generateCertificateCode();

      // Insert certificate record
      const certResult = await pool.query(
        `INSERT INTO certificates (
          user_id, exam_attempt_id, exam_id, exam_title, subject,
          certificate_code, score_percentage, difficulty, issued_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        RETURNING *`,
        [
          userId,
          attemptId,
          attempt.exam_id,
          attempt.exam_title,
          attempt.subject,
          certificateCode,
          attempt.score_percentage,
          attempt.difficulty
        ]
      );

      const certificate = certResult.rows[0];

      // TODO: Generate PDF certificate using jsPDF or similar
      // TODO: Upload to storage and update pdf_url
      // TODO: Send certificate via email

      // For now, just return the certificate data
      res.status(201).json({
        success: true,
        message: 'Certificado gerado com sucesso!',
        certificate: {
          id: certificate.id,
          code: certificate.certificate_code,
          examTitle: certificate.exam_title,
          subject: certificate.subject,
          score: certificate.score_percentage,
          difficulty: certificate.difficulty,
          issuedAt: certificate.issued_at
        }
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      res.status(500).json({
        error: 'Erro ao gerar certificado'
      });
    }
  });

  /**
   * GET /api/certificates
   * Get all certificates for the authenticated user
   */
  router.get('/', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        `SELECT * FROM certificates
         WHERE user_id = $1
         ORDER BY issued_at DESC`,
        [userId]
      );

      res.json({
        success: true,
        certificates: result.rows
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).json({
        error: 'Erro ao buscar certificados'
      });
    }
  });

  /**
   * GET /api/certificates/:id
   * Get specific certificate details
   */
  router.get('/:id', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const result = await pool.query(
        `SELECT c.*, u.name, u.email
         FROM certificates c
         JOIN users u ON c.user_id = u.id
         WHERE c.id = $1 AND c.user_id = $2`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Certificado não encontrado'
        });
      }

      res.json({
        success: true,
        certificate: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching certificate:', error);
      res.status(500).json({
        error: 'Erro ao buscar certificado'
      });
    }
  });

  /**
   * GET /api/certificates/verify/:code
   * Verify certificate by code (public endpoint)
   */
  router.get('/verify/:code', async (req, res) => {
    try {
      const { code } = req.params;

      const result = await pool.query(
        `SELECT c.*, u.name, u.email, ea.completed_at
         FROM certificates c
         JOIN users u ON c.user_id = u.id
         JOIN exam_attempts ea ON c.exam_attempt_id = ea.id
         WHERE c.certificate_code = $1`,
        [code]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Certificado não encontrado'
        });
      }

      const cert = result.rows[0];

      res.json({
        success: true,
        valid: true,
        certificate: {
          code: cert.certificate_code,
          userName: cert.name,
          examTitle: cert.exam_title,
          subject: cert.subject,
          score: cert.score_percentage,
          difficulty: cert.difficulty,
          issuedAt: cert.issued_at,
          completedAt: cert.completed_at
        }
      });
    } catch (error) {
      console.error('Error verifying certificate:', error);
      res.status(500).json({
        error: 'Erro ao verificar certificado'
      });
    }
  });

  /**
   * POST /api/certificates/:id/resend-email
   * Resend certificate email
   */
  router.post('/:id/resend-email', authenticate, certificateLimiter, async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const result = await pool.query(
        `SELECT c.*, u.name, u.email
         FROM certificates c
         JOIN users u ON c.user_id = u.id
         WHERE c.id = $1 AND c.user_id = $2`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Certificado não encontrado'
        });
      }

      // TODO: Send certificate email using emailService
      // await emailService.sendCertificateEmail(...)

      // Update email_sent status
      await pool.query(
        'UPDATE certificates SET email_sent = true, email_sent_at = NOW() WHERE id = $1',
        [id]
      );

      res.json({
        success: true,
        message: 'Email com certificado reenviado com sucesso!'
      });
    } catch (error) {
      console.error('Error resending certificate email:', error);
      res.status(500).json({
        error: 'Erro ao reenviar email'
      });
    }
  });

  return router;
};
