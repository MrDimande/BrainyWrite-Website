import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Home,
    Star,
    Target,
    TrendingUp,
    Trophy
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { useAuth } from "../contexts/AuthContext";
import {
    formatTime,
    getExamAttempts,
    getOverallStats,
    getSubjectProgress
} from "../utils/examUtils";

const UserProgress = () => {
  const { user, isAuthenticated } = useAuth();
  const authFetch = useAuthFetch();
  const [overallStats, setOverallStats] = useState(null);
  const [subjectProgress, setSubjectProgress] = useState([]);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const firstName = user?.name?.split(" ")[0] || user?.name || "";

  useEffect(() => {
    const loadData = async () => {
      let stats, subjects, attempts;

      if (isAuthenticated) {
        try {
          [stats, subjects, attempts] = await Promise.all([
            getOverallStatsApi(authFetch),
            getSubjectProgressApi(authFetch),
            getExamAttemptsApi(authFetch)
          ]);
        } catch (error) {
          console.error("Error loading progress data:", error);
          return;
        }
      } else {
        stats = getOverallStats();
        subjects = getSubjectProgress();
        attempts = getExamAttempts();
      }

      setOverallStats(stats);
      setSubjectProgress(subjects || []);
      setRecentAttempts((attempts || []).slice(-10).reverse()); // Last 10, most recent first

      // Prepare chart data
      const chartPoints = (attempts || []).slice(-20).map((attempt, index) => ({
        name: `#${index + 1}`,
        score: attempt.score.percentage,
        subject: attempt.subject
      }));
      setChartData(chartPoints);

      // Calculate achievements
      const earned = [];
      if (attempts && attempts.length >= 1) earned.push({ id: 'first', name: 'Primeiros Passos', icon: '🎯', desc: 'Completou o primeiro exame' });
      if (attempts && attempts.length >= 10) earned.push({ id: 'persistent', name: 'Estudante Persistente', icon: '📚', desc: 'Completou 10 exames' });
      if (attempts && attempts.some(a => a.score.percentage === 100)) earned.push({ id: 'perfect', name: 'Pontuação Perfeita', icon: '🌟', desc: 'Obteve 100% num exame' });
      if (subjects && subjects.some(s => s.averageScore >= 90)) earned.push({ id: 'master', name: 'Mestre da Disciplina', icon: '👑', desc: 'Média ≥90% numa disciplina' });
      if (subjects && subjects.length === 7) earned.push({ id: 'allround', name: 'Polivalente', icon: '🎓', desc: 'Fez exames em todas as disciplinas' });
      if (attempts && attempts.length >= 25) earned.push({ id: 'dedicated', name: 'Dedicado', icon: '💪', desc: 'Completou 25 exames' });

      setAchievements(earned);
    };

    loadData();
  }, [isAuthenticated]);

  if (!overallStats) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando progresso...</p>
        </div>
      </div>
    );
  }

  const hasNoData = overallStats.totalExams === 0;

  const subjectColors = {
    'Matemática': '#3b82f6',
    'Português': '#eab308',
    'Geografia': '#22c55e',
    'Física': '#8b5cf6',
    'Química': '#ec4899',
    'Biologia': '#10b981',
    'História': '#f97316'
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
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
              <Home className="w-5 h-5" />
              <span>Voltar ao Testing Hub</span>
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-montserrat">
              {firstName ? `Progresso de ${firstName}` : 'Meu'} <span className="gradient-text">Progresso</span>
            </h1>
            <p className="text-xl text-white/70 font-poppins">
              {firstName
                ? `Olá, ${firstName}. Já fizeste ${overallStats.totalExams} exame(s) com média de ${overallStats.averageScore.toFixed(1)}%.`
                : 'Acompanhe sua jornada de aprendizagem e celebre suas conquistas.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* No Data State */}
      {hasNoData && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-12 text-center gold-border"
          >
            <BookOpen className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-montserrat">
              Comece Sua Jornada!
            </h3>
            <p className="text-xl text-white/70 mb-8 font-poppins">
              Você ainda não fez nenhum exame. Que tal começar agora?
            </p>
            <Link
              to="/brainyforge"
              className="btn-primary px-8 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-2 neon-glow-hover"
            >
              <span>Escolher Exame</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      )}

      {/* Main Content - Only show if has data */}
      {!hasNoData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overall Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            <div className="glass rounded-2xl p-6 text-center gold-border">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">{overallStats.totalExams}</div>
              <div className="text-sm text-white/60">Exames Realizados</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-400 mb-1">{overallStats.averageScore.toFixed(1)}%</div>
              <div className="text-sm text-white/60">Média Geral</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-400 mb-1">{formatTime(overallStats.totalTimeSpent)}</div>
              <div className="text-sm text-white/60">Tempo Total</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center gold-border">
              <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-400 mb-1">{overallStats.subjectsCovered}/7</div>
              <div className="text-sm text-white/60">Disciplinas</div>
            </div>
          </motion.div>

          {/* Score Trend Chart */}
          {chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-3xl p-8 mb-12 gold-border"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-yellow-500" />
                Evolução das Pontuações
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#ffffff60" />
                  <YAxis domain={[0, 100]} stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ffd700',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#ffd700"
                    strokeWidth={3}
                    dot={{ fill: '#ffd700', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-center text-white/50 text-sm mt-4">
                {chartData.length < 20 ? 'Mostrando todas as tentativas' : 'Mostrando as últimas 20 tentativas'}
              </p>
            </motion.div>
          )}

          {/* Subject Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">
              Desempenho por Disciplina
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectProgress.map((subject, index) => {
                const color = subjectColors[subject.subject] || '#ffffff';
                const percentage = subject.averageScore;
                const circumference = 2 * Math.PI * 45;
                const strokeDashoffset = circumference - (percentage / 100) * circumference;

                return (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-yellow-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-1 font-montserrat group-hover:text-yellow-400 transition-colors">
                          {subject.subject}
                        </h4>
                        <p className="text-sm text-white/60">{subject.totalExamsTaken} exame(s)</p>
                      </div>

                      {/* Progress Circle */}
                      <div className="relative w-24 h-24">
                        <svg className="transform -rotate-90 w-24 h-24">
                          <circle
                            cx="48"
                            cy="48"
                            r="45"
                            stroke="#ffffff20"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="45"
                            stroke={color}
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s ease' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold" style={{ color }}>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-white/60 mb-1">Melhor Nota</div>
                        <div className="text-lg font-bold text-green-400">
                          {subject.highestScore.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-white/60 mb-1">Taxa Acerto</div>
                        <div className="text-lg font-bold text-blue-400">
                          {subject.totalQuestionsAnswered > 0
                            ? ((subject.totalCorrectAnswers / subject.totalQuestionsAnswered) * 100).toFixed(0)
                            : 0}%
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/exams/${subject.subject.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                      className="w-full btn-secondary py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-yellow-500/20 transition-colors"
                    >
                      <span>Continuar Aprendendo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center gap-3">
                <Award className="w-7 h-7 text-yellow-500" />
                Conquistas Desbloqueadas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="glass rounded-xl p-4 text-center border-2 border-yellow-500/30 hover:border-yellow-500 transition-all group"
                  >
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{achievement.name}</div>
                    <div className="text-xs text-white/50">{achievement.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-3xl p-8 gold-border"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-montserrat flex items-center gap-3">
              <Calendar className="w-7 h-7 text-yellow-500" />
              Atividade Recente
            </h3>
            <div className="space-y-4">
              {recentAttempts.slice(0, 10).map((attempt, index) => (
                <motion.div
                  key={attempt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    attempt.score.passed ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {attempt.score.passed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Star className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{attempt.subject}</div>
                    <div className="text-sm text-white/60">
                      {new Date(attempt.completedAt).toLocaleDateString('pt-PT')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      attempt.score.passed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {attempt.score.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-white/60">
                      {attempt.score.correctCount}/{attempt.score.totalQuestions}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserProgress;
