import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Clock,
    Target,
    TrendingUp,
    Trophy
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExamsBySubject } from "../data/examData";
import {
    DIFFICULTY_LEVELS,
    getDifficultyColor,
    getDifficultyLabel,
    getExamAttemptsById,
    getRecommendedDifficultyForSubject,
    getSubjectProgressByName
} from "../utils/examUtils";

const ExamList = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  
  // Get exams for this subject
  const exams = getExamsBySubject(subject);
  const subjectProgress = getSubjectProgressByName(exams[0]?.subject || subject);
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const recommendedDifficulty = getRecommendedDifficultyForSubject(subjectProgress);
  const filteredExams = difficultyFilter === "all"
    ? exams
    : exams.filter((exam) => exam.difficulty === difficultyFilter);

  if (!exams || exams.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Exames não encontrados</h2>
          <p className="text-white/60 mb-8">Não há exames disponíveis para esta disciplina ainda.</p>
          <Link to="/brainyforge" className="btn-primary px-6 py-3">
            Voltar ao Testing Hub
          </Link>
        </div>
      </div>
    );
  }

  const subjectName = exams[0].subject;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/brainyforge"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Testing Hub</span>
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-montserrat">
              Exames de <span className="gradient-text">{subjectName}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm text-white/60">Filtrar por dificuldade:</span>
              <button
                onClick={() => setDifficultyFilter("all")}
                className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                  difficultyFilter === "all"
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-white/5 text-white/70 border-white/20 hover:bg-white/10"
                }`}
              >
                Todas
              </button>
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                    difficultyFilter === level
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "bg-white/5 text-white/70 border-white/20 hover:bg-white/10"
                  } ${level === recommendedDifficulty ? "ring-2 ring-yellow-500/60" : ""}`}
                >
                  {getDifficultyLabel(level)}
                </button>
              ))}
            </div>

            {/* Subject Progress Card */}
            {subjectProgress.totalExamsTaken > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="glass rounded-2xl p-6 mb-8 gold-border"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-white/60">Média</span>
                    </div>
                    <div className="text-3xl font-bold gradient-text">
                      {subjectProgress.averageScore.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-white/60">Melhor Nota</span>
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                      {subjectProgress.highestScore.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-white/60">Exames</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                      {subjectProgress.totalExamsTaken}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-white/60">Taxa de Acerto</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-400">
                      {subjectProgress.totalQuestionsAnswered > 0
                        ? ((subjectProgress.totalCorrectAnswers / subjectProgress.totalQuestionsAnswered) * 100).toFixed(1)
                        : 0}%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Exams Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredExams.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              Nenhum exame encontrado para este nível de dificuldade.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredExams.map((exam, index) => {
              const attempts = getExamAttemptsById(exam.id);
              const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-8 border-2 border-white/10 hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  {/* Exam Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 font-montserrat group-hover:text-yellow-400 transition-colors">
                        {exam.title}
                      </h3>
                      <p className="text-white/60 font-poppins">{exam.description}</p>
                    </div>
                    
                    {/* Difficulty Badge */}
                    <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(exam.difficulty)} text-white text-sm font-semibold`}>
                      {getDifficultyLabel(exam.difficulty)}
                    </div>
                  </div>

                  {/* Exam Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                      <div className="text-sm text-white/60">Duração</div>
                      <div className="text-lg font-bold text-white">{exam.duration_minutes} min</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                      <div className="text-sm text-white/60">Questões</div>
                      <div className="text-lg font-bold text-white">{exam.total_questions}</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
                      <div className="text-sm text-white/60">Aprovação</div>
                      <div className="text-lg font-bold text-white">{exam.passing_score}%</div>
                    </div>
                  </div>

                  {/* Last Attempt Info */}
                  {lastAttempt && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white/60">Última tentativa</div>
                          <div className="text-lg font-bold text-yellow-400">
                            {lastAttempt.score.percentage.toFixed(1)}% - {lastAttempt.score.passed ? '✓ Aprovado' : '✗ Reprovado'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/60">Tentativas</div>
                          <div className="text-lg font-bold text-white">{attempts.length}x</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    onClick={() => navigate(`/exam/${exam.id}/start`)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-4 rounded-xl text-lg font-bold neon-glow-hover flex items-center justify-center gap-2 font-montserrat"
                  >
                    <span>{attempts.length > 0 ? 'Refazer Exame' : 'Iniciar Exame'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              );
            })}
            </div>
          )}

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-center glass p-8 rounded-2xl gold-border"
          >
            <p className="text-xl text-white/70 font-poppins italic">
              "A prática leva à perfeição. Cada exame é uma oportunidade de aprender e crescer!"
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExamList;
