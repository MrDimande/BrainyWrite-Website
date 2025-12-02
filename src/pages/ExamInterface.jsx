import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Grid3x3
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../data/examData";
import {
    calculateScore,
    clearExamState,
    formatTime,
    getDifficultyColor,
    getDifficultyLabel,
    loadExamState,
    saveExamAttempt,
    saveExamState
} from "../utils/examUtils";

const ExamInterface = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = getExamById(examId);

  // State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [startedAt] = useState(new Date().toISOString());

  const intervalRef = useRef(null);
  const autoSaveRef = useRef(null);

  const { isAuthenticated } = useAuth();
  const authFetch = useAuthFetch();

  // Initialize exam
  useEffect(() => {
    if (!exam) return;

    const loadState = async () => {
      let savedState = null;

      if (isAuthenticated) {
        savedState = await loadExamStateApi(authFetch, examId);
      } else {
        savedState = loadExamState(examId);
      }

      if (savedState) {
        setUserAnswers(savedState.userAnswers || {});
        setTimeRemaining(savedState.timeRemaining);
        setCurrentQuestion(savedState.currentQuestion || 0);
      } else {
        // Start fresh
        setTimeRemaining(exam.duration_minutes * 60);
      }
    };

    loadState();

    // Start timer
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up! Auto-submit
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-save every 30 seconds
    autoSaveRef.current = setInterval(() => {
      handleAutoSave();
    }, 30000);

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [exam, examId, isAuthenticated]);

  // Auto-save function
  const handleAutoSave = async () => {
    const state = {
      userAnswers,
      timeRemaining,
      currentQuestion
    };

    if (isAuthenticated) {
      await saveExamStateApi(authFetch, examId, state);
    } else {
      saveExamState(examId, state);
    }
  };

  // Auto-submit when time runs out
  const handleAutoSubmit = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    submitExam();
  };

  // Submit exam
  const submitExam = async () => {
    const score = calculateScore(userAnswers, exam.questions);
    const timeSpent = exam.duration_minutes * 60 - timeRemaining;

    const examData = {
      subject: exam.subject,
      examTitle: exam.title,
      difficulty: exam.difficulty,
      userAnswers,
      score,
      timeSpent,
      startedAt
    };

    if (isAuthenticated) {
      try {
        await saveExamAttemptApi(authFetch, examId, examData);
        await clearExamStateApi(authFetch, examId);
      } catch (error) {
        console.error("Error submitting exam:", error);
        toast.error("Erro ao salvar o exame. Tente novamente.");
        return;
      }
    } else {
      saveExamAttempt(examId, examData);
      clearExamState(examId);
    }

    // Feedback para o utilizador
    toast.success(
      score.passed
        ? "Exame submetido! Excelente trabalho, vê o teu resultado."
        : "Exame submetido! Revê o resultado e identifica o que melhorar."
    );

    // Navigate to results
    navigate(`/exam/${examId}/results`, {
      state: {
        score,
        userAnswers,
        timeSpent,
        exam
      }
    });
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigation functions
  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
    setShowQuestionGrid(false);
  };

  // Check if exam not found
  if (!exam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Exame não encontrado</h2>
          <button onClick={() => navigate("/brainyforge")} className="btn-primary px-6 py-3">
            Voltar ao Testing Hub
          </button>
        </div>
      </div>
    );
  }

  const question = exam.questions[currentQuestion];
  const answeredCount = Object.keys(userAnswers).length;
  const progress = (answeredCount / exam.total_questions) * 100;
  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Exam Info */}
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-yellow-500 font-semibold">{exam.subject}</div>
                <div className="text-lg font-bold text-white">{exam.title}</div>
              </div>
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(exam.difficulty)} text-white text-xs font-semibold whitespace-nowrap`}>
                {getDifficultyLabel(exam.difficulty)}
              </div>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${
              isLowTime ? 'bg-red-500/20 border-2 border-red-500 animate-pulse' : 'bg-yellow-500/20 border border-yellow-500/30'
            }`}>
              <Clock className={`w-5 h-5 ${isLowTime ? 'text-red-500' : 'text-yellow-500'}`} />
              <div className={`text-2xl font-bold font-mono ${isLowTime ? 'text-red-400' : 'text-yellow-400'}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-white/60">
                Progresso: {answeredCount} de {exam.total_questions} questões
              </div>
              <button
                onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Grid3x3 className="w-4 h-4" />
                <span>Grelha de Questões</span>
              </button>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Grid Modal */}
      <AnimatePresence>
        {showQuestionGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowQuestionGrid(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto gold-border"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">
                Grelha de Questões
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                {exam.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`aspect-square rounded-lg font-bold text-lg transition-all duration-200 ${
                      index === currentQuestion
                        ? 'bg-yellow-500 text-black ring-4 ring-yellow-500/50'
                        : userAnswers[q.id]
                        ? 'bg-green-500/30 text-green-400 border-2 border-green-500/50 hover:bg-green-500/40'
                        : 'bg-white/5 text-white/60 border-2 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <span className="text-white/70">Atual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500/30 border-2 border-green-500/50 rounded"></div>
                  <span className="text-white/70">Respondida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/5 border-2 border-white/10 rounded"></div>
                  <span className="text-white/70">Não respondida</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-12 gold-border"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm text-yellow-500 font-semibold">
                  Questão {currentQuestion + 1} de {exam.total_questions}
                </div>
                {userAnswers[question.id] && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Respondida</span>
                  </div>
                )}
              </div>

              {/* Question Text */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed font-montserrat">
                {question.question_text}
              </h2>

              {/* Question Image */}
              {question.image_url && (
                <div className="mb-8 flex justify-center">
                  <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-white/10 bg-white/5">
                    <img
                      src={question.image_url}
                      alt={question.image_alt || "Imagem da questão"}
                      className="w-full h-auto max-h-72 object-contain p-4"
                      loading="lazy"
                    />
                    {question.image_caption && (
                      <div className="px-4 py-2 bg-black/50 text-center text-sm text-white/70 font-poppins">
                        {question.image_caption}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const optionLetter = option.charAt(0); // A, B, C, D
                  const isSelected = userAnswers[question.id] === optionLetter;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(question.id, optionLetter)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-6 rounded-xl text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-yellow-500/20 border-2 border-yellow-500 text-white'
                          : 'bg-white/5 border-2 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          isSelected
                            ? 'bg-yellow-500 text-black'
                            : 'bg-white/10 text-white/60'
                        }`}>
                          {optionLetter}
                        </div>
                        <div className="flex-1 text-lg font-poppins">{option.substring(3)}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'btn-secondary hover:scale-105'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Anterior</span>
            </button>

            {currentQuestion === exam.questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="btn-primary px-8 py-3 rounded-xl font-bold neon-glow-hover"
              >
                Submeter Exame
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 btn-primary px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
              >
                <span>Próxima</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-md w-full gold-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-white font-montserrat">
                  Submeter Exame?
                </h3>
              </div>

              <p className="text-white/70 mb-6 font-poppins">
                Tem certeza que deseja submeter o exame? Você respondeu {answeredCount} de {exam.total_questions} questões.
              </p>

              {answeredCount < exam.total_questions && (
                <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-4 mb-6">
                  <p className="text-orange-400 text-sm">
                    ⚠️ Você ainda tem {exam.total_questions - answeredCount} questão(ões) sem resposta. Elas serão contadas como incorretas.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 btn-secondary py-3 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitExam}
                  className="flex-1 btn-primary py-3 rounded-xl font-bold neon-glow-hover"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamInterface;
