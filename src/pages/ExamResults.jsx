import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Clock,
    Home,
    RotateCcw,
    Target,
    TrendingUp,
    XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getExamById, getExamsBySubject } from "../data/examData";
import {
    formatTime,
    getDifficultyColor,
    getDifficultyLabel,
    getRecommendedDifficultyForSubject,
    getScoreMessage,
    getSubjectProgressByName
} from "../utils/examUtils";

const ExamResults = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showExplanations, setShowExplanations] = useState(false);

  const exam = getExamById(examId);
  const { score, userAnswers, timeSpent } = location.state || {};

  useEffect(() => {
    // Redirect if no score data
    if (!score || !exam) {
      navigate("/brainyforge");
    }
  }, [score, exam, navigate]);

  if (!score || !exam) {
    return null;
  }

  const scoreMessage = getScoreMessage(score.percentage);
  const isPassed = score.passed;
  const subjectProgress = getSubjectProgressByName(exam.subject);
  const recommendedDifficulty = getRecommendedDifficultyForSubject(subjectProgress);
  const subjectExams = getExamsBySubject(exam.subject);
  const recommendedExams = subjectExams
    .filter((e) => e.difficulty === recommendedDifficulty && e.id !== exam.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Pass/Fail Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-block px-6 py-2 rounded-full mb-6 ${
                isPassed
                  ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                  : 'bg-red-500/20 border-2 border-red-500 text-red-400'
              }`}
            >
              <span className="text-lg font-bold">
                {isPassed ? '✓ APROVADO' : '✗ REPROVADO'}
              </span>
            </motion.div>

            {/* Main Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <div className="text-8xl md:text-9xl font-bold gradient-text mb-4 font-montserrat">
                {score.percentage.toFixed(1)}%
              </div>
              <div className={`text-2xl md:text-3xl font-semibold ${scoreMessage.color} mb-2`}>
                {scoreMessage.emoji} {scoreMessage.message}
              </div>
              <div className="flex items-center justify-center gap-3 text-lg text-white/60 font-poppins">
                <span>
                  {exam.subject} - {exam.title}
                </span>
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(exam.difficulty)} text-white text-xs font-semibold whitespace-nowrap`}>
                  {getDifficultyLabel(exam.difficulty)}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {recommendedExams.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="glass rounded-3xl p-8 mb-12 gold-border"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-yellow-500" />
                Próximos passos recomendados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedExams.map((nextExam) => (
                  <div
                    key={nextExam.id}
                    className="glass rounded-2xl p-5 border-2 border-white/10 hover:border-yellow-500/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white font-montserrat">
                          {nextExam.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${getDifficultyColor(nextExam.difficulty)} text-white text-[10px] font-semibold whitespace-nowrap`}>
                          {getDifficultyLabel(nextExam.difficulty)}
                        </span>
                      </div>
                      <div className="text-xs text-white/60 font-poppins">
                        {nextExam.total_questions} questões • {nextExam.duration_minutes} min • Mínimo {nextExam.passing_score}%
                      </div>
                    </div>
                    <Link
                      to={`/exam/${nextExam.id}/start`}
                      className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg btn-secondary"
                    >
                      <span>Iniciar este exame</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            <div className="glass rounded-2xl p-6 text-center gold-border">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-400 mb-1">{score.correctCount}</div>
              <div className="text-sm text-white/60">Corretas</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-red-400 mb-1">{score.incorrectCount}</div>
              <div className="text-sm text-white/60">Incorretas</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-400 mb-1">{formatTime(timeSpent)}</div>
              <div className="text-sm text-white/60">Tempo Gasto</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-400 mb-1">{score.totalQuestions}</div>
              <div className="text-sm text-white/60">Total de Questões</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              to={`/exam/${examId}/start`}
              className="flex-1 btn-primary py-4 rounded-xl text-lg font-bold text-center flex items-center justify-center gap-2 neon-glow-hover"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Refazer Exame</span>
            </Link>

            <Link
              to={`/exams/${exam.subject.toLowerCase()}`}
              className="flex-1 btn-secondary py-4 rounded-xl text-lg font-semibold text-center flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" />
              <span>Outros Exames de {exam.subject}</span>
            </Link>

            <Link
              to="/brainyforge"
              className="btn-secondary px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Review Toggle */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className="btn-secondary px-8 py-3 rounded-xl font-semibold"
            >
              {showExplanations ? 'Ocultar' : 'Ver'} Revisão de Questões
            </button>
          </div>

          {/* Question Review */}
          {showExplanations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">
                Revisão Detalhada
              </h3>

              {exam.questions.map((question, index) => {
                const userAnswer = userAnswers[question.id];
                const isCorrect = userAnswer === question.correct_answer;
                const correctOption = question.options.find(opt => opt.startsWith(question.correct_answer));

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className={`glass rounded-2xl p-6 md:p-8 border-2 ${
                      isCorrect ? 'border-green-500/30' : 'border-red-500/30'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-sm text-white/60 mb-2">
                          Questão {index + 1} de {exam.total_questions}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4 font-montserrat">
                          {question.question_text}
                        </h4>
                        {/* Question Image in Review */}
                        {question.image_url && (
                          <div className="mb-4 flex justify-start">
                            <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/5">
                              <img
                                src={question.image_url}
                                alt={question.image_alt || "Imagem da questão"}
                                className="w-full h-auto max-h-48 object-contain p-3"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle2 className="w-7 h-7 text-green-500" />
                        ) : (
                          <XCircle className="w-7 h-7 text-red-500" />
                        )}
                      </div>
                    </div>

                    {/* Answer Display */}
                    <div className="space-y-3 mb-4">
                      {/* User's Answer */}
                      {userAnswer && (
                        <div className={`p-4 rounded-xl ${
                          isCorrect
                            ? 'bg-green-500/10 border border-green-500/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}>
                          <div className="text-sm text-white/60 mb-1">Sua resposta:</div>
                          <div className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {question.options.find(opt => opt.startsWith(userAnswer))}
                          </div>
                        </div>
                      )}

                      {!userAnswer && (
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                          <div className="text-yellow-400 font-semibold">
                            Não respondida
                          </div>
                        </div>
                      )}

                      {/* Correct Answer (if user was wrong) */}
                      {!isCorrect && (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                          <div className="text-sm text-white/60 mb-1">Resposta correta:</div>
                          <div className="font-semibold text-green-400">
                            {correctOption}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-400 text-sm font-bold">i</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-blue-400 font-semibold mb-1">
                              Explicação:
                            </div>
                            <div className="text-white/80 leading-relaxed font-poppins">
                              {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 text-center glass p-8 rounded-2xl gold-border"
          >
            <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-xl text-white/70 font-poppins italic mb-4">
              {isPassed
                ? '"Parabéns! Continue estudando e superando seus próprios limites!"'
                : '"Não desanime! Cada erro é uma oportunidade de aprendizado. Tente novamente!"'}
            </p>
            <Link
              to="/progress"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
            >
              <span>Ver Seu Progresso Completo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExamResults;
