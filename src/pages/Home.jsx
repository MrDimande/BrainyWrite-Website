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
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Newsletter from "../components/Newsletter";
import { testimonials, getFeaturedTestimonials } from "../data/testimonials";

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
    founders: [
      {
        name: "Alberto Dimande",
        title: "Fundador e CEO",
        credentials:
          "Licenciado em Planeamento e Ordenamento Territorial, especialista em Programação e Desenvolvimento Web",
      },
      {
        name: "Rabeca Come",
        title: "Co-Fundadora",
        credentials:
          "Licenciada em Planeamento e Ordenamento Territorial, especialista em Pesquisa e Survey",
      },
    ],
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyInfo.founders.map((founder, index) => (
                  <motion.div
                    key={founder.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 gold-shadow">
                      <Users className="w-12 h-12 text-black" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 font-montserrat">
                      {founder.name}
                    </h4>
                    <p className="gradient-text font-semibold mb-3 font-poppins text-sm">
                      {founder.title}
                    </p>
                    <p className="text-white/70 text-xs leading-relaxed font-poppins">
                      {founder.credentials}
                    </p>
                  </motion.div>
                ))}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Nossos <span className="gradient-text">Serviços</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-poppins">
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

      {/* Depoimentos */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              O Que Nossos <span className="gradient-text">Clientes Dizem</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-poppins">
              Mais de 40 clientes satisfeitos compartilham suas experiências de
              sucesso com a BrainyWrite.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeaturedTestimonials(6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-2xl p-6 gold-border hover:glass-hover transition-all duration-300 flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-yellow-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white/80 leading-relaxed mb-6 flex-1 font-poppins italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center gold-shadow">
                      <span className="text-black font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold font-montserrat">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/60 text-sm font-poppins">
                        {testimonial.role} • {testimonial.institution}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/portfolio"
              className="btn-secondary px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              Ver Mais Depoimentos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 gold-border"
          >
            <Newsletter />
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white font-montserrat">
              Pronto para começar sua jornada de{" "}
              <span className="bg-gradient-to-r from-primary-gold to-primary-teal bg-clip-text text-transparent">
                sucesso
              </span>
              ?
            </h2>
            <p className="text-xl text-white/70 leading-relaxed font-poppins">
              Entre em contato conosco hoje mesmo e descubra como podemos
              transformar seus objetivos acadêmicos e profissionais em
              realidade.
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

export default Home;
