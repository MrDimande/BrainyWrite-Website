import { motion } from 'framer-motion';
import {
    ArrowRight,
    Beaker,
    BookOpen,
    Brain,
    Calculator,
    CheckCircle2,
    Globe,
    History,
    Languages,
    Layers,
    Lightbulb,
    Microscope,
    PenTool,
    Rocket
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useAuthFetch } from '../contexts/AuthContext';
import { getDifficultyLabel, getOverallStats, getOverallStatsApi, getRecommendedDifficultyForSubject, getSubjectProgressByName } from '../utils/examUtils';

const BrainyForge = () => {
  const { user, isAuthenticated } = useAuth();
  const authFetch = useAuthFetch();
  const [overallStats, setOverallStats] = useState(null);
  const firstName = user?.name?.split(' ')[0] || user?.name || '';

  useEffect(() => {
    const loadStats = async () => {
      if (isAuthenticated) {
        const stats = await getOverallStatsApi(authFetch);
        setOverallStats(stats);
      } else {
        setOverallStats(getOverallStats());
      }
    };
    loadStats();
  }, [isAuthenticated]);
  const services = [
    {
      icon: Rocket,
      title: "Desenvolvimento Académico Premium",
      description: "Elevamos a qualidade, profundidade e estrutura dos teus projectos."
    },
    {
      icon: Lightbulb,
      title: "Criatividade Aplicada à Comunicação",
      description: "Transformamos ideias em mensagens claras, poderosas e memoráveis."
    },
    {
      icon: Brain,
      title: "Consultoria Estratégica & Produção Intelectual",
      description: "Guiamos o teu percurso académico e criativo com inteligência, visão e método."
    },
    {
      icon: BookOpen,
      title: "Laboratório de Competências Académicas",
      description: "Workshops e treinos intensivos para dominar a metodologia científica."
    },
    {
      icon: PenTool,
      title: "Mentoria para Escrita e Pesquisa",
      description: "Acompanhamento personalizado para desbloquear teu potencial de escrita."
    },
    {
      icon: Layers,
      title: "Design Cognitivo & Storytelling Técnico",
      description: "Estruturação visual e narrativa para apresentações de alto impacto."
    }
  ];

  const subjects = [
    { name: "Matemática", icon: Calculator, color: "text-blue-400" },
    { name: "Português", icon: Languages, color: "text-yellow-400" },
    { name: "Geografia", icon: Globe, color: "text-green-400" },
    { name: "Física", icon: Rocket, color: "text-purple-400" },
    { name: "Química", icon: Beaker, color: "text-pink-400" },
    { name: "Biologia", icon: Microscope, color: "text-emerald-400" },
    { name: "História", icon: History, color: "text-orange-400" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Particles Effect (Simplified CSS implementation) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black opacity-50"></div>
        <div className="absolute w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="relative z-10">
        {/* 1. HERO / INTRO */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-semibold tracking-wider mb-6 font-poppins">
              Laboratório Académico & Testing Hub da BrainyWrite
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-montserrat leading-tight">
              <span className="text-white">Brainy</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Forge</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-8 font-montserrat">
              O espaço onde treinas exames, desenvolves competências e afias as tuas ideias.
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-poppins">
              Na BrainyForge combinas consultoria, prática guiada e testes simulados para construir
              projectos sólidos e uma preparação consistente para os teus desafios académicos.
            </p>
            {isAuthenticated && overallStats && (
              <div className="mt-10 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="col-span-1 sm:col-span-3 mb-2">
                  <p className="text-sm text-white/60 font-poppins">
                    <span className="text-white font-semibold">Olá{firstName ? `, ${firstName}` : ''}!</span>{' '}
                    Este é o teu laboratório de treino. Continua a evoluir no BrainyForge Testing Hub.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 font-poppins">Exames realizados</p>
                  <p className="text-2xl font-bold text-yellow-400 font-montserrat">{overallStats.totalExams}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 font-poppins">Média geral</p>
                  <p className="text-2xl font-bold text-emerald-400 font-montserrat">{overallStats.averageScore.toFixed(1)}%</p>
                </div>
                <Link
                  to="/progress"
                  className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-between hover:bg-yellow-500/20 transition-colors group"
                >
                  <div>
                    <p className="text-xs text-yellow-300/90 font-poppins">Ver detalhes</p>
                    <p className="text-sm text-white font-montserrat font-semibold">Abrir Dashboard BrainyForge</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </section>

        {/* 2. PARÁGRAFO DESCRITIVO */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed font-poppins italic">
              "A BrainyForge é o nosso <span className="text-yellow-400 font-normal">núcleo de inovação</span>: onde criatividade,
              tecnologia e rigor científico se encontram. Aqui, estudantes e profissionais treinam, experimentam e
              transformam ideias em projectos académicos e criativos de alto impacto."
            </p>
          </motion.div>
        </section>

        {/* 3. GRADE DE SERVIÇOS / PILARES */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold font-montserrat mb-4">Nossos Pilares de <span className="text-yellow-400">Excelência</span></h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 rounded-xl bg-black/50 border border-yellow-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-yellow-400" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-montserrat group-hover:text-yellow-400 transition-colors">{service.title}</h4>
                  <p className="text-white/60 font-poppins text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. SECÇÃO ESPECIAL — TESTES & AVALIAÇÕES */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-900 to-black p-8 md:p-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mb-6">
                  <Beaker className="w-5 h-5" />
                  <span className="font-semibold tracking-wide text-sm">NOVA FUNCIONALIDADE</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
                  BrainyForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Testing Hub</span>
                </h3>
                <p className="text-xl text-white/70 max-w-2xl mx-auto font-poppins">
                  Um ambiente seguro para praticar exames, medir o teu progresso e transformar erros em aprendizagem
                  antes das provas reais.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    {[
                      "Simulação de exames nacionais reais com ambiente cronometrado",
                      "Correção automática, pontuação imediata e histórico de tentativas",
                      "Feedback claro para identificar temas fortes e fracos",
                      "Estatísticas de evolução pessoal para orientar o teu plano de estudo"
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-lg text-white/80 font-poppins">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-2 border-t border-white/10">
                    <div className="text-left">
                      <p className="text-[11px] text-yellow-400 font-semibold uppercase tracking-wide mb-1">Guia rápido</p>
                      <p className="text-sm text-white/70 font-poppins">1. Escolhe a disciplina que queres treinar.</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-yellow-400 font-semibold uppercase tracking-wide mb-1">Passo 2</p>
                      <p className="text-sm text-white/70 font-poppins">2. Seleciona o nível de dificuldade e inicia o exame.</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-yellow-400 font-semibold uppercase tracking-wide mb-1">Passo 3</p>
                      <p className="text-sm text-white/70 font-poppins">3. Revê os resultados e acompanha o teu progresso.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-white/60 font-poppins">Progresso Médio dos Alunos</span>
                      <span className="text-2xl font-bold text-yellow-400">85%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject, index) => {
                    const progress = getSubjectProgressByName(subject.name);
                    const hasData = progress.totalExamsTaken > 0;
                    const recommendedDifficulty = getRecommendedDifficultyForSubject(progress);

                    return (
                      <Link
                        key={index}
                        to={`/exams/${subject.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/30 hover:bg-white/10 transition-all text-left group block"
                      >
                        <subject.icon className={`w-6 h-6 mb-3 ${subject.color}`} />
                        <span className="block text-white font-semibold font-montserrat">{subject.name}</span>
                        {hasData && (
                          <span className="text-[11px] text-yellow-400 group-hover:text-yellow-300 transition-colors block mt-1">
                            Nível recomendado: {getDifficultyLabel(recommendedDifficulty)}
                          </span>
                        )}
                        <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Começar treino nesta disciplina →</span>
                      </Link>
                    );
                  })}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-center"
                  >
                    <span className="text-sm text-white/40">Mais disciplinas em breve...</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA FINAL */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 font-montserrat">Pronto para elevar o teu nível?</h2>
            <Link
              to="/contacto"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-black font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300"
            >
              <span>Inicia a tua Evolução com a BrainyForge</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-6 text-white/60 font-poppins">
              Desenvolve competências, constrói projectos brilhantes e liberta o teu potencial académico.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default BrainyForge;
