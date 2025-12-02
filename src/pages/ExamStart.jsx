import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../data/examData";
import { getDifficultyColor, getDifficultyLabel } from "../utils/examUtils";

const ExamStart = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  
  const exam = getExamById(examId);

  if (!exam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Exame não encontrado</h2>
          <Link to="/brainyforge" className="btn-primary px-6 py-3">
            Voltar ao Testing Hub
          </Link>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    if (!agreed) {
      alert("Por favor, aceite as regras do exame antes de continuar.");
      return;
    }
    navigate(`/exam/${examId}/take`);
  };

  const rules = [
    "O exame tem duração fixa. O tempo começará assim que você iniciar",
    "Todas as questões são de múltipla escolha com uma única resposta correcta",
    "Você pode navegar entre as questões livremente durante o exame",
    "Suas respostas são salvas automaticamente a cada 30 segundos",
    "O exame será automaticamente submetido quando o tempo terminar",
    "Após submeter, você não poderá alterar suas respostas",
    "A nota mínima para aprovação é " + exam.passing_score + "%",
    "Você pode refazer o exame quantas vezes quiser"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              to={`/exams/${exam.subject.toLowerCase()}`}
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar à lista de exames</span>
            </Link>

            {/* Exam Title Card */}
            <div className="glass rounded-3xl p-8 md:p-12 gold-border mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="text-sm text-yellow-500 mb-2 font-semibold">
                    {exam.subject}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                    {exam.title}
                  </h1>
                  <p className="text-xl text-white/70 font-poppins">
                    {exam.description}
                  </p>
                </div>
                
                {/* Difficulty Badge */}
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(exam.difficulty)} text-white text-sm font-semibold whitespace-nowrap ml-4`}>
                  {getDifficultyLabel(exam.difficulty)}
                </div>
              </div>

              {/* Exam Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Duração</div>
                    <div className="text-lg font-bold text-white">{exam.duration_minutes} minutos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Questões</div>
                    <div className="text-lg font-bold text-white">{exam.total_questions}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Nota Mínima</div>
                    <div className="text-lg font-bold text-white">{exam.passing_score}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Card */}
            <div className="glass rounded-3xl p-8 md:p-12 gold-border mb-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-white font-montserrat">
                  Regras do Exame
                </h2>
              </div>

              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    </div>
                    <p className="text-white/70 leading-relaxed font-poppins">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="glass rounded-3xl p-6 gold-border mb-8">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-6 h-6 rounded border-2 border-yellow-500/50 bg-transparent checked:bg-yellow-500 transition-all cursor-pointer appearance-none"
                  />
                  {agreed && (
                    <CheckCircle2 className="w-6 h-6 text-black absolute pointer-events-none" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1 group-hover:text-yellow-400 transition-colors">
                    Li e compreendi todas as regras do exame
                  </p>
                  <p className="text-sm text-white/60">
                    Estou pronto para iniciar e comprometido a fazer o meu melhor
                  </p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/exams/${exam.subject.toLowerCase()}`}
                className="flex-1 btn-secondary py-4 rounded-xl text-lg font-semibold text-center"
              >
                Cancelar
              </Link>
              
              <motion.button
                onClick={handleStartExam}
                disabled={!agreed}
                whileHover={agreed ? { scale: 1.02 } : {}}
                whileTap={agreed ? { scale: 0.98 } : {}}
                className={`flex-1 py-4 rounded-xl text-lg font-bold font-montserrat flex items-center justify-center gap-2 transition-all duration-300 ${
                  agreed
                    ? 'btn-primary neon-glow-hover'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Começar Exame</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-lg text-white/50 font-poppins italic">
                "O sucesso é a soma de pequenos esforços repetidos dia após dia. Boa sorte!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExamStart;
