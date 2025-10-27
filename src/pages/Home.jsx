import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

const Home = () => {
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
      ],
      price: "A partir de 5.000 MT",
      priceNote: "Preço varia conforme complexidade",
      buttonText: "Solicitar Cotação",
    },
    {
      icon: GraduationCap,
      title: "Acompanhamento Online",
      description:
        "Suporte especializado para estudantes de universidades parceiras, com tutoria personalizada e assistência em tempo real.",
      features: [
        "UNISED (Universidade Pedagógica)",
        "UNISA (University of South Africa)",
        "UCM (Universidade Católica)",
        "São Tomás de Moçambique",
        "Tutoria personalizada",
      ],
      price: "3.000-8.000 MT/mês",
      priceNote: "Conforme modalidade e carga horária",
      buttonText: "Agendar Consulta",
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
      ],
      price: "2.500-6.000 MT",
      priceNote: "Pacotes personalizados disponíveis",
      buttonText: "Explorar Serviços",
    },
  ];

  const aboutSections = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Transformar desafios acadêmicos e profissionais em oportunidades de excelência, proporcionando soluções inovadoras e personalizadas que impulsionam o sucesso de nossos clientes.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser a principal referência em consultoria acadêmica e profissional em Moçambique e África lusófona, reconhecida pela qualidade excepcional e impacto transformador.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Excelência, Integridade, Inovação e Compromisso são os pilares fundamentais que orientam nossa atuação e fortalecem nossos relacionamentos com clientes e parceiros.",
    },
    {
      icon: Lightbulb,
      title: "Essência",
      description:
        "Paixão genuína por educação e desenvolvimento profissional, com foco no crescimento sustentável e transformação pessoal de cada indivíduo que confia em nossos serviços.",
    },
  ];

  const companyInfo = {
    founded: "2023",
    experience: "2+ anos",
    clients: "40+ clientes satisfeitos",
    projects: "50+ projetos realizados",
    founder: "Alberto Dimande",
    founderTitle: "Fundador e CEO",
    founderCredentials:
      "Licenciado em Planeamento e Ordenamento Territorial, especialista em Programação e Desenvolvimento Web",
  };

  const guarantees = [
    "Originalidade garantida",
    "Revisões ilimitadas",
    "Confidencialidade total",
    "Entrega no prazo",
    "Suporte pós-entrega",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Sobre Nós Section */}
      <section id="sobre" className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Sobre a <span className="gradient-text">BrainyWrite</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Somos especialistas em transformar desafios em oportunidades de
              crescimento, oferecendo soluções personalizadas para seu sucesso
              acadêmico e profissional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aboutSections.map((section, index) => {
              const sectionId = section.title
                .toLowerCase()
                .replace(" ", "-")
                .replace("ã", "a")
                .replace("õ", "o");
              return (
                <motion.div
                  key={section.title}
                  id={sectionId}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 text-center hover:glass-hover transition-all duration-300 gold-border"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 gold-shadow">
                    <section.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-montserrat">
                    {section.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-poppins">
                    {section.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Secção Equipe */}
          <motion.div
            id="equipe"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 text-center hover:glass-hover transition-all duration-300 gold-border mt-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 gold-shadow">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-montserrat">
              Equipe
            </h3>
            <p className="text-white/70 leading-relaxed font-poppins">
              Contamos com uma equipa multidisciplinar de profissionais
              qualificados, especializados em diversas áreas académicas e
              profissionais para garantir excelência em cada projecto.
            </p>
          </motion.div>

          {/* Informações da Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/20 rounded-3xl p-8 md:p-12 mb-12 gold-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 font-montserrat">
                  Sobre a BrainyWrite
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6 font-poppins">
                  Fundada em 2021, a BrainyWrite nasceu da paixão por
                  transformar vidas através da educação e desenvolvimento
                  profissional. Nossa empresa combina expertise técnica com
                  compreensão profunda das necessidades locais, oferecendo
                  soluções que realmente fazem a diferença.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text mb-1 font-montserrat">
                      {companyInfo.experience}
                    </div>
                    <div className="text-sm text-white/70">Experiência</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text mb-1 font-montserrat">
                      {companyInfo.clients}
                    </div>
                    <div className="text-sm text-white/70 font-poppins">
                      Clientes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text mb-1 font-montserrat">
                      {companyInfo.projects}
                    </div>
                    <div className="text-sm text-white/70 font-poppins">
                      Projetos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text mb-1 font-montserrat">
                      {companyInfo.founded}
                    </div>
                    <div className="text-sm text-white/70">Fundação</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 gold-shadow">
                  <Users className="w-16 h-16 text-black" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 font-montserrat">
                  {companyInfo.founder}
                </h4>
                <p className="gradient-text font-semibold mb-3 font-poppins">
                  {companyInfo.founderTitle}
                </p>
                <p className="text-white/70 text-sm leading-relaxed font-poppins">
                  {companyInfo.founderCredentials}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Diferencial e Garantias */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-gold/20 to-primary-teal/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Nosso Diferencial
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Acompanhamento personalizado 24/7 com uma equipe de
                  especialistas dedicados ao seu sucesso. Somos seu parceiro
                  estratégico para excelência acadêmica e profissional.
                </p>
                <div className="flex items-center space-x-2 text-primary-gold">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">
                    Equipe especializada e comprometida
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  Nossas Garantias
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {guarantees.map((guarantee, index) => (
                    <motion.div
                      key={guarantee}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-white/80"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-teal flex-shrink-0" />
                      <span>{guarantee}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview de Serviços */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossos{" "}
              <span className="bg-gradient-to-r from-primary-gold to-primary-teal bg-clip-text text-transparent">
                Serviços
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Soluções completas para seu desenvolvimento acadêmico e
              profissional, com qualidade garantida e suporte especializado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pronto para começar sua jornada de{" "}
              <span className="bg-gradient-to-r from-primary-gold to-primary-teal bg-clip-text text-transparent">
                sucesso
              </span>
              ?
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Entre em contato conosco hoje mesmo e descubra como podemos
              transformar seus objetivos acadêmicos e profissionais em
              realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/agendar"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-purple to-primary-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-primary-purple/25 transition-all duration-300"
              >
                Agendar Consulta Gratuita
              </motion.a>
              <motion.a
                href="/cotacao"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Solicitar Cotação
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
