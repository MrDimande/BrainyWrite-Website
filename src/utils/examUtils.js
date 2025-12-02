// Exam utility functions for scores, progress, and localStorage management

// Generate unique session ID for anonymous users
export const generateSessionId = () => {
  const existingId = localStorage.getItem('brainyforge_session_id');
  if (existingId) return existingId;

  const newId = `session_${ Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('brainyforge_session_id', newId);
  return newId;
};

// Get session ID
export const getSessionId = () => {
  return generateSessionId();
};

// Calculate exam score
export const calculateScore = (userAnswers, questions) => {
  let correctCount = 0;
  const totalQuestions = questions.length;

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    if (userAnswer && userAnswer === question.correct_answer) {
      correctCount++;
    }
  });

  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  return {
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    percentage: Math.round(percentage * 100) / 100,
    passed: percentage >= 60
  };
};

// Format time in MM:SS format
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Format duration in friendly format
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} minutos`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

// Save exam attempt to localStorage
export const saveExamAttempt = (examId, examData) => {
  const sessionId = getSessionId();
  const attempts = getExamAttempts();

  const newAttempt = {
    id: `attempt_${Date.now()}`,
    sessionId,
    examId,
    subject: examData.subject,
    userAnswers: examData.userAnswers,
    score: examData.score,
    timeSpent: examData.timeSpent,
    startedAt: examData.startedAt,
    completedAt: new Date().toISOString()
  };

  attempts.push(newAttempt);
  localStorage.setItem('brainyforge_exam_attempts', JSON.stringify(attempts));

  // Update subject progress
  updateSubjectProgress(examData.subject, examData.score);

  return newAttempt;
};

// Get all exam attempts
export const getExamAttempts = () => {
  const stored = localStorage.getItem('brainyforge_exam_attempts');
  return stored ? JSON.parse(stored) : [];
};

// Get attempts for specific exam
export const getExamAttemptsById = (examId) => {
  const attempts = getExamAttempts();
  return attempts.filter(attempt => attempt.examId === examId);
};

// Get attempts for specific subject
export const getExamAttemptsBySubject = (subject) => {
  const attempts = getExamAttempts();
  return attempts.filter(attempt => attempt.subject === subject);
};

// Update subject progress
export const updateSubjectProgress = (subject, scoreData) => {
  const progress = getSubjectProgress();
  const existing = progress.find(p => p.subject === subject);

  if (existing) {
    existing.totalExamsTaken++;
    existing.totalQuestionsAnswered += scoreData.totalQuestions;
    existing.totalCorrectAnswers += scoreData.correctCount;
    existing.averageScore = Math.round(
      ((existing.averageScore * (existing.totalExamsTaken - 1)) + scoreData.percentage) /
      existing.totalExamsTaken * 100
    ) / 100;
    existing.highestScore = Math.max(existing.highestScore, scoreData.percentage);
    existing.lastExamDate = new Date().toISOString();
  } else {
    progress.push({
      subject,
      totalExamsTaken: 1,
      totalQuestionsAnswered: scoreData.totalQuestions,
      totalCorrectAnswers: scoreData.correctCount,
      averageScore: scoreData.percentage,
      highestScore: scoreData.percentage,
      lastExamDate: new Date().toISOString()
    });
  }

  localStorage.setItem('brainyforge_subject_progress', JSON.stringify(progress));
};

// Get all subject progress
export const getSubjectProgress = () => {
  const stored = localStorage.getItem('brainyforge_subject_progress');
  return stored ? JSON.parse(stored) : [];
};

// Get progress for specific subject
export const getSubjectProgressByName = (subject) => {
  const progress = getSubjectProgress();
  return progress.find(p => p.subject === subject) || {
    subject,
    totalExamsTaken: 0,
    totalQuestionsAnswered: 0,
    totalCorrectAnswers: 0,
    averageScore: 0,
    highestScore: 0,
    lastExamDate: null
  };
};

// Get overall user statistics
export const getOverallStats = () => {
  const attempts = getExamAttempts();
  const progress = getSubjectProgress();

  if (attempts.length === 0) {
    return {
      totalExams: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      subjectsCovered: 0
    };
  }

  const totalExams = attempts.length;
  const totalQuestions = progress.reduce((sum, p) => sum + p.totalQuestionsAnswered, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.totalCorrectAnswers, 0);
  const averageScore = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + p.averageScore, 0) / progress.length * 100) / 100
    : 0;
  const totalTimeSpent = attempts.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
  const subjectsCovered = progress.length;

  return {
    totalExams,
    totalQuestions,
    totalCorrect,
    averageScore,
    totalTimeSpent,
    subjectsCovered
  };
};

// Save current exam state (for auto-save during exam)
export const saveExamState = (examId, state) => {
  const key = `brainyforge_exam_state_${examId}`;
  localStorage.setItem(key, JSON.stringify({
    ...state,
    lastSaved: new Date().toISOString()
  }));
};

// Load saved exam state
export const loadExamState = (examId) => {
  const key = `brainyforge_exam_state_${examId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

// Clear exam state after completion
export const clearExamState = (examId) => {
  const key = `brainyforge_exam_state_${examId}`;
  localStorage.removeItem(key);
};

// Get difficulty badge color
export const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'from-green-500 to-emerald-500';
    case 'medium':
      return 'from-yellow-500 to-orange-500';
    case 'hard':
      return 'from-red-500 to-pink-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

// Get difficulty label in Portuguese
export const getDifficultyLabel = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Médio';
    case 'hard':
      return 'Difícil';
    default:
      return difficulty;
  }
};

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

export const getRecommendedDifficultyForSubject = (subjectProgress) => {
  const average = subjectProgress && typeof subjectProgress.averageScore === 'number'
    ? subjectProgress.averageScore
    : 0;
  if (average >= 80) {
    return 'hard';
  }
  if (average >= 60) {
    return 'medium';
  }
  return 'easy';
};

// Get pass/fail message and color
export const getScoreMessage = (percentage) => {
  if (percentage >= 90) {
    return { message: 'Excelente! Desempenho excepcional!', color: 'text-green-400', emoji: '🌟' };
  } else if (percentage >= 80) {
    return { message: 'Muito bom! Continue assim!', color: 'text-green-400', emoji: '🎉' };
  } else if (percentage >= 70) {
    return { message: 'Bom trabalho! Está no caminho certo!', color: 'text-blue-400', emoji: '👍' };
  } else if (percentage >= 60) {
    return { message: 'Aprovado! Mas pode melhorar!', color: 'text-yellow-400', emoji: '✓' };
  } else if (percentage >= 50) {
    return { message: 'Quase lá! Estude um pouco mais!', color: 'text-orange-400', emoji: '📚' };
  } else {
    return { message: 'Precisa estudar mais. Não desista!', color: 'text-red-400', emoji: '💪' };
  }
};

// Clear all user data (for privacy/reset)
export const clearAllUserData = () => {
  localStorage.removeItem('brainyforge_exam_attempts');
  localStorage.removeItem('brainyforge_subject_progress');
  localStorage.removeItem('brainyforge_session_id');

  // Clear any saved exam states
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('brainyforge_exam_state_')) {
      localStorage.removeItem(key);
    }
  });
};

// Export user data (for download/backup)
export const exportUserData = () => {
  return {
    sessionId: getSessionId(),
    attempts: getExamAttempts(),
    progress: getSubjectProgress(),
    exportedAt: new Date().toISOString()
  };
};

// Import user data (from backup)
export const importUserData = (data) => {
  if (data.attempts) {
    localStorage.setItem('brainyforge_exam_attempts', JSON.stringify(data.attempts));
  }
  if (data.progress) {
    localStorage.setItem('brainyforge_subject_progress', JSON.stringify(data.progress));
  }
  if (data.sessionId) {
    localStorage.setItem('brainyforge_session_id', data.sessionId);
  }
};

// ==========================================
// API Integration Functions
// ==========================================

// Save exam attempt via API
export const saveExamAttemptApi = async (authFetch, examId, examData) => {
  try {
    const response = await authFetch('/exams/attempt', {
      method: 'POST',
      body: JSON.stringify({
        examId,
        subject: examData.subject,
        examTitle: examData.examTitle,
        difficulty: examData.difficulty,
        scorePercentage: examData.score.percentage,
        correctCount: examData.score.correctCount,
        incorrectCount: examData.score.incorrectCount,
        totalQuestions: examData.score.totalQuestions,
        timeSpent: examData.timeSpent,
        userAnswers: examData.userAnswers,
        passed: examData.score.passed
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving exam attempt:', error);
    throw error;
  }
};

// Get exam attempts via API
export const getExamAttemptsApi = async (authFetch, subject = null) => {
  try {
    let url = '/exams/attempts?limit=50';
    if (subject) {
      url += `&subject=${encodeURIComponent(subject)}`;
    }

    const response = await authFetch(url);
    const data = await response.json();

    // Map backend response to frontend format
    return data.attempts.map(attempt => ({
      id: attempt.id,
      examId: attempt.exam_id,
      subject: attempt.subject,
      examTitle: attempt.exam_title,
      difficulty: attempt.difficulty,
      score: {
        percentage: parseFloat(attempt.score_percentage),
        correctCount: attempt.correct_count,
        incorrectCount: attempt.incorrect_count,
        totalQuestions: attempt.total_questions,
        passed: attempt.passed
      },
      timeSpent: attempt.time_spent,
      completedAt: attempt.completed_at
    }));
  } catch (error) {
    console.error('Error fetching exam attempts:', error);
    return [];
  }
};

// Get subject progress via API
export const getSubjectProgressApi = async (authFetch, subject = null) => {
  try {
    let url = '/exams/progress';
    if (subject) {
      url += `/${encodeURIComponent(subject)}`;
    }

    const response = await authFetch(url);
    const data = await response.json();

    if (subject) {
      // Single subject
      const p = data.progress;
      if (!p) return null;
      return {
        subject: p.subject,
        totalExamsTaken: p.total_attempts,
        totalQuestionsAnswered: p.total_questions_attempted,
        totalCorrectAnswers: p.total_correct_answers,
        averageScore: parseFloat(p.average_score),
        highestScore: parseFloat(p.best_score),
        lastExamDate: p.last_attempt_at
      };
    } else {
      // All subjects
      return data.progress.map(p => ({
        subject: p.subject,
        totalExamsTaken: p.total_attempts,
        totalQuestionsAnswered: p.total_questions_attempted,
        totalCorrectAnswers: p.total_correct_answers,
        averageScore: parseFloat(p.average_score),
        highestScore: parseFloat(p.best_score),
        lastExamDate: p.last_attempt_at
      }));
    }
  } catch (error) {
    console.error('Error fetching subject progress:', error);
    return subject ? null : [];
  }
};

// Get overall stats via API
export const getOverallStatsApi = async (authFetch) => {
  try {
    const response = await authFetch('/exams/stats');
    const data = await response.json();
    const stats = data.stats;

    return {
      totalExams: stats.totalExamsTaken,
      totalQuestions: stats.totalQuestions,
      totalCorrect: stats.totalCorrect,
      averageScore: stats.averageScore,
      totalTimeSpent: stats.totalTimeSpent,
      subjectsCovered: stats.subjectsAttempted
    };
  } catch (error) {
    console.error('Error fetching overall stats:', error);
    return null;
  }
};

// Save exam state via API
export const saveExamStateApi = async (authFetch, examId, state) => {
  try {
    await authFetch('/exams/state/save', {
      method: 'POST',
      body: JSON.stringify({
        examId,
        currentQuestion: state.currentQuestion,
        userAnswers: state.userAnswers,
        timeRemaining: state.timeRemaining
      })
    });
  } catch (error) {
    console.error('Error saving exam state:', error);
  }
};

// Load exam state via API
export const loadExamStateApi = async (authFetch, examId) => {
  try {
    const response = await authFetch(`/exams/state/${examId}`);
    const data = await response.json();

    if (data.state) {
      return {
        currentQuestion: data.state.currentQuestion,
        userAnswers: data.state.userAnswers,
        timeRemaining: data.state.timeRemaining,
        startedAt: data.state.startedAt
      };
    }
    return null;
  } catch (error) {
    console.error('Error loading exam state:', error);
    return null;
  }
};

// Clear exam state via API
export const clearExamStateApi = async (authFetch, examId) => {
  try {
    await authFetch(`/exams/state/${examId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error clearing exam state:', error);
  }
};
