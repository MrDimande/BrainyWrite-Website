import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  Award,
  Shield,
  ArrowRight,
  Star,
  BookMarked,
  Search,
  PenTool,
  FileText,
  BarChart3,
  Presentation,
  Languages,
  Mic,
  FileCheck,
  BookOpenCheck,
  Target,
} from "lucide-react";

const Servicos = () => {
  const getServiceSlug = (title) => {
    const slugs = {
      "Produção de Trabalhos Académicos": "producao-academica",
      "Acompanhamento Online": "acompanhamento-online",
      "Consultoria Profissional e Criativa": "consultoria-profissional",
      "Formação e Capacitação": "formacao-capacitacao",
      "Consultoria em Pesquisa": "consultoria-pesquisa",
      "Revisão e Correção de Textos": "revisao-correcao",
      "Metodologia Científica": "metodologia-cientifica",
      "Análise de Dados": "analise-dados",
      "Preparação de Apresentações": "preparacao-apresentacoes",
      "Tradução de Documentos": "traducao-documentos",
      "Orientação para Defesa Oral": "orientacao-defesa-oral",
      "Consultoria em Publicações Científicas": "consultoria-publicacoes",
      "Formatação de Referências Bibliográficas": "formatacao-referencias",
      "Mentoria Acadêmica": "mentoria-academica",
    };
    return slugs[title] || "";
  };

  const services = [
    {
      icon: BookOpen,
      title: "Produção de Trabalhos Académicos",
      description:
        "Criamos trabalhos acadêmicos de alta qualidade, desde monografias até teses de doutoramento, com rigor científico e originalidade garantida.",
      features: [
        "Monografias e Teses",
        "Artigos Científicos",
        "Projetos de Pesquisa",
        "Relatórios Técnicos",
        "Revisão e Formatação",
        "Normas ABNT, APA, Vancouver",
      ],
      buttonText: "Solicitar Cotação",
      details: {
        timeline: "7-30 dias",
        revisions: "Ilimitadas",
        guarantee: "100% original",
        support: "24/7",
      },
    },
    {
      icon: GraduationCap,
      title: "Acompanhamento Online",
      description:
        "Suporte especializado para estudantes de universidades parceiras, com tutoria personalizada e assistência em tempo real.",
      features: [
        "UPM (Universidade Pedagógica)",
        "UNISA (University of South Africa)",
        "UCM (Universidade Católica)",
        "USTM (São Tomás de Moçambique)",
        "Tutoria personalizada",
        "Assistência em provas e trabalhos",
      ],
      buttonText: "Agendar Consulta",
      details: {
        timeline: "Flexível",
        revisions: "Contínuas",
        guarantee: "Suporte garantido",
        support: "24/7",
      },
    },
    {
      icon: Briefcase,
      title: "Consultoria Profissional e Criativa",
      description:
        "Desenvolvemos sua carreira profissional com estratégias personalizadas, desde currículos até personal branding.",
      features: [
        "Desenvolvimento de Currículos",
        "Cartas de Motivação",
        "Preparação para Entrevistas",
        "Personal Branding",
        "LinkedIn Optimization",
        "Planos de Carreira",
      ],
      buttonText: "Explorar Serviços",
      details: {
        timeline: "3-14 dias",
        revisions: "3 inclusas",
        guarantee: "Satisfação garantida",
        support: "Pós-entrega",
      },
    },
    {
      icon: BookMarked,
      title: "Formação e Capacitação",
      description:
        "Cursos e workshops especializados para desenvolvimento de competências acadêmicas e profissionais.",
      features: [
        "Metodologia de Pesquisa",
        "Redação Científica",
        "Técnicas de Apresentação",
        "Gestão de Projetos",
        "Ferramentas Digitais",
        "Certificados de Conclusão",
      ],
      buttonText: "Ver Cursos",
      details: {
        timeline: "Flexível",
        revisions: "Contínuas",
        guarantee: "Material didático",
        support: "Durante curso",
      },
    },
    {
      icon: Search,
      title: "Consultoria em Pesquisa",
      description:
        "Orientações especializadas para desenvolvimento de pesquisas científicas, desde a concepção até a análise de resultados.",
      features: [
        "Design de Pesquisa",
        "Metodologias Quantitativas",
        "Metodologias Qualitativas",
        "Análise Estatística",
        "Interpretação de Resultados",
        "Validação Científica",
      ],
      buttonText: "Solicitar Consulta",
      details: {
        timeline: "Conforme projeto",
        revisions: "Contínuas",
        guarantee: "Rigor científico",
        support: "Acompanhamento",
      },
    },
    {
      icon: PenTool,
      title: "Revisão e Correção de Textos",
      description:
        "Serviços profissionais de revisão textual, correção gramatical e ajustes de formatação para trabalhos acadêmicos.",
      features: [
        "Revisão Gramatical",
        "Correção Ortográfica",
        "Ajustes de Formatação",
        "Melhoria de Estilo",
        "Verificação de Normas",
        "Feedback Detalhado",
      ],
      buttonText: "Enviar Texto",
      details: {
        timeline: "2-7 dias",
        revisions: "Incluídas",
        guarantee: "Qualidade garantida",
        support: "Durante revisão",
      },
    },
    {
      icon: FileText,
      title: "Metodologia Científica",
      description:
        "Suporte especializado na estruturação metodológica de pesquisas, definição de objetivos e hipóteses de estudo.",
      features: [
        "Estruturação Metodológica",
        "Definição de Objetivos",
        "Formulação de Hipóteses",
        "Escolha de Métodos",
        "Validação Metodológica",
        "Orientação Contínua",
      ],
      buttonText: "Agendar Consulta",
      details: {
        timeline: "5-15 dias",
        revisions: "2 inclusas",
        guarantee: "Metodologia validada",
        support: "Acompanhamento",
      },
    },
    {
      icon: BarChart3,
      title: "Análise de Dados",
      description:
        "Processamento e análise estatística de dados de pesquisa, com interpretação de resultados e visualizações.",
      features: [
        "Processamento de Dados",
        "Análise Estatística",
        "Visualizações Gráficas",
        "Interpretação de Resultados",
        "Relatórios Analíticos",
        "Ferramentas Especializadas",
      ],
      buttonText: "Solicitar Análise",
      details: {
        timeline: "5-14 dias",
        revisions: "Incluídas",
        guarantee: "Precisão garantida",
        support: "Durante análise",
      },
    },
    {
      icon: Presentation,
      title: "Preparação de Apresentações",
      description:
        "Criação de apresentações profissionais e acadêmicas, otimizadas para defesas, conferências e apresentações corporativas.",
      features: [
        "Apresentações Acadêmicas",
        "Slides Profissionais",
        "Design Personalizado",
        "Estruturação de Conteúdo",
        "Técnicas de Apresentação",
        "Material de Apoio",
      ],
      buttonText: "Solicitar Orçamento",
      details: {
        timeline: "3-10 dias",
        revisions: "2 inclusas",
        guarantee: "Design profissional",
        support: "Pós-entrega",
      },
    },
    {
      icon: Languages,
      title: "Tradução de Documentos",
      description:
        "Serviços profissionais de tradução acadêmica e técnica em múltiplos idiomas, mantendo a precisão científica e o rigor acadêmico.",
      features: [
        "Tradução Português/Inglês",
        "Tradução Inglês/Português",
        "Tradução Acadêmica",
        "Tradução Técnica",
        "Tradução Certificada",
        "Revisão de Traduções",
      ],
      buttonText: "Solicitar Tradução",
      details: {
        timeline: "3-15 dias",
        revisions: "1 inclusa",
        guarantee: "Qualidade garantida",
        support: "Durante tradução",
      },
    },
    {
      icon: Mic,
      title: "Orientação para Defesa Oral",
      description:
        "Preparação especializada para defesas de tese, dissertação e apresentações acadêmicas, incluindo técnicas de oratória e gestão de nervosismo.",
      features: [
        "Simulação de Defesa",
        "Preparação de Argumentos",
        "Técnicas de Oratória",
        "Gestão de Nervosismo",
        "Preparação para Perguntas",
        "Feedback Personalizado",
      ],
      buttonText: "Agendar Sessão",
      details: {
        timeline: "2-5 dias",
        revisions: "Incluídas",
        guarantee: "Confiança garantida",
        support: "Até defesa",
      },
    },
    {
      icon: BookOpenCheck,
      title: "Consultoria em Publicações Científicas",
      description:
        "Apoio completo para publicação de artigos científicos em revistas indexadas, desde a escolha do periódico até a submissão final.",
      features: [
        "Escolha de Periódicos",
        "Preparação para Submissão",
        "Resposta a Revisores",
        "Ajustes Editoriais",
        "Normas de Publicação",
        "Indexação e Impacto",
      ],
      buttonText: "Consultar Especialista",
      details: {
        timeline: "15-60 dias",
        revisions: "Contínuas",
        guarantee: "Acompanhamento total",
        support: "Até publicação",
      },
    },
    {
      icon: FileCheck,
      title: "Formatação de Referências Bibliográficas",
      description:
        "Formatação profissional de referências bibliográficas e citações conforme normas ABNT, APA, Vancouver, Chicago e outras normas acadêmicas.",
      features: [
        "Formatação ABNT",
        "Formatação APA",
        "Formatação Vancouver",
        "Formatação Chicago",
        "Verificação de Citações",
        "Atualização Automática",
      ],
      buttonText: "Enviar Documento",
      details: {
        timeline: "1-3 dias",
        revisions: "1 inclusa",
        guarantee: "Normas corretas",
        support: "Durante formatação",
      },
    },
    {
      icon: Target,
      title: "Mentoria Acadêmica",
      description:
        "Acompanhamento personalizado de longo prazo para desenvolvimento acadêmico e profissional, com foco em objetivos específicos.",
      features: [
        "Plano de Desenvolvimento",
        "Acompanhamento Regular",
        "Definição de Metas",
        "Orientação Contínua",
        "Suporte Motivacional",
        "Avaliação de Progresso",
      ],
      buttonText: "Conhecer Mentorias",
      details: {
        timeline: "Mensal/Trimestral",
        revisions: "Contínuas",
        guarantee: "Acompanhamento dedicado",
        support: "Durante mentoria",
      },
    },
  ];

  const institutions = [
    { name: "UPM", fullName: "Universidade Pedagógica", logo: "🎓" },
    {
      name: "UCM",
      fullName: "Universidade Católica de Moçambique",
      logo: "⛪",
    },
    {
      name: "UNISCED",
      fullName: "Universidade Pedagógica de Moçambique",
      logo: "📖",
    },
    {
      name: "USTM",
      fullName: "Universidade São Tomás de Moçambique",
      logo: "📚",
    },
    { name: "UNISA", fullName: "University of South Africa", logo: "🌍" },
    {
      name: "ISCIM",
      fullName: "Instituto Superior de Comunicação e Imagem de Moçambique",
      logo: "🎬",
    },
    { name: "ISPO", fullName: "Instituto Superior de Polítecnico", logo: "🏛️" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Entendemos suas necessidades e objetivos específicos",
      icon: Users,
    },
    {
      step: "02",
      title: "Proposta Personalizada",
      description: "Criamos um plano de trabalho sob medida para você",
      icon: Award,
    },
    {
      step: "03",
      title: "Execução e Acompanhamento",
      description: "Desenvolvemos seu projeto com qualidade e prazo garantidos",
      icon: Clock,
    },
    {
      step: "04",
      title: "Entrega e Suporte",
      description:
        "Entregamos o resultado final e oferecemos suporte pós-entrega",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-black/90 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat">
              Nossos <span className="gradient-text">Serviços</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
              Soluções completas para seu desenvolvimento académico e
              profissional, com qualidade garantida e suporte especializado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
              Soluções <span className="gradient-text">Completas</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-poppins">
              Oferecemos uma gama completa de serviços para atender todas as suas necessidades acadêmicas e profissionais.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const serviceSlug = getServiceSlug(service.title);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group glass rounded-2xl p-8 hover:glass-hover transition-all duration-300 relative overflow-hidden gold-border"
                >
                  {/* Efeito de brilho dourado no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Ícone */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 gold-shadow"
                    >
                      <service.icon className="w-8 h-8 text-black" />
                    </motion.div>

                    {/* Título */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 font-montserrat">
                      {service.title}
                    </h3>

                    {/* Descrição */}
                    <p className="text-white/70 mb-6 leading-relaxed font-poppins">
                      {service.description}
                    </p>

                    {/* Lista de benefícios */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + featureIndex * 0.05 + 0.3,
                          }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3 text-white/80 font-poppins"
                        >
                          <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Detalhes do serviço */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold gradient-text font-montserrat">
                          {service.details.timeline}
                        </div>
                        <div className="text-white/60 text-sm font-poppins">
                          Prazo
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold gradient-text font-montserrat">
                          {service.details.revisions}
                        </div>
                        <div className="text-white/60 text-sm font-poppins">
                          Revisões
                        </div>
                      </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="space-y-3">
                      <Link to={serviceSlug ? `/servico/${serviceSlug}` : "#"}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full btn-secondary text-center py-3 px-6 rounded-full font-semibold transition-all duration-300"
                        >
                          Ver Detalhes
                        </motion.button>
                      </Link>

                      <Link to="/cotacao">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full btn-primary py-3 px-6 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group neon-glow-hover"
                        >
                          <span>{service.buttonText}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instituições Parceiras */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Instituições com as quais{" "}
              <span className="gradient-text">já colaborámos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-poppins">
              Temos orgulho em já ter desenvolvido projectos, consultorias e
              trabalhos académicos com estudantes e profissionais provenientes
              de diversas universidades e instituições de ensino, tanto
              nacionais como internacionais.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {institutions.map((institution, index) => (
              <motion.div
                key={institution.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center hover:glass-hover transition-all duration-300 gold-border group"
              >
                <div className="text-4xl mb-4">{institution.logo}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 font-montserrat">
                  {institution.name}
                </h3>
                <p className="text-white/70 text-sm font-poppins">
                  {institution.fullName}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo de Trabalho */}
      <section className="py-20 bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Como <span className="gradient-text">Trabalhamos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-poppins">
              Um processo estruturado e transparente para garantir a qualidade e
              satisfação em cada projecto que desenvolvemos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  {/* Número do passo */}
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {step.step}
                  </div>

                  {/* Linha conectora */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-purple to-primary-blue transform translate-x-8" />
                  )}
                </div>

                {/* Ícone */}
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 gold-shadow">
                  <step.icon className="w-8 h-8 text-black" />
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-bold text-white mb-3 font-montserrat">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-poppins">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-montserrat">
              Pronto para começar seu{" "}
              <span className="gradient-text">projecto</span>?
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-poppins">
              Entre em contacto connosco e descubra como podemos transformar
              seus objectivos académicos e profissionais em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendar">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 neon-glow-hover"
                >
                  Agendar Consulta Gratuita
                </motion.button>
              </Link>
              <Link to="/cotacao">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  Solicitar Cotação
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
