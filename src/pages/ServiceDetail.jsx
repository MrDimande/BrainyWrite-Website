import { motion } from 'framer-motion'
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  Award,
  Shield,
  Star,
  ArrowLeft,
  FileText,
  Globe,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const ServiceDetail = () => {
  const { serviceType } = useParams()

  const serviceDetails = {
    'producao-academica': {
      id: 'producao-academica',
      icon: BookOpen,
      title: 'Produção de Trabalhos Académicos',
      subtitle: 'Excelência Académica Garantida',
      description: 'Criamos trabalhos acadêmicos de alta qualidade, desde monografias até teses de doutoramento, com rigor científico e originalidade garantida. Nossa equipa de profissionais qualificados trabalha em estreita colaboração consigo para garantir que cada trabalho reflita seus conhecimentos e atenda às mais altas expectativas académicas.',

      whatWeDo: 'Desenvolvemos trabalhos académicos completos em diversas áreas do conhecimento, incluindo planeamento territorial, desenvolvimento urbano, educação, tecnologias, gestão, entre outras. Cada projecto é tratado com rigor científico, garantindo originalidade, relevância e qualidade excepcional.',

      whatWeHaveDone: [
        {
          title: 'Monografia em Planeamento Territorial',
          institution: 'Universidade Eduardo Mondlane',
          year: '2024',
          grade: '18/20',
          description: 'Desenvolvimento de monografia completa sobre Planeamento Urbano Sustentável em Maputo, com análise dos bairros informais'
        },
        {
          title: 'Projeto de Pesquisa em Desenvolvimento Urbano',
          institution: 'UNISA',
          year: '2024',
          grade: 'Aprovação em primeira tentativa',
          description: 'Estruturação completa de proposta de pesquisa sobre impactos do crescimento urbano na sustentabilidade ambiental'
        },
        {
          title: 'Tese de Doutoramento em Ordenamento Territorial',
          institution: 'UCM',
          year: '2023-2024',
          grade: '60% concluído',
          description: 'Assessoria especializada na elaboração de tese sobre Políticas Públicas de Ordenamento Territorial em Moçambique'
        }
      ],

      howWeDoIt: [
        {
          step: '01',
          icon: FileText,
          title: 'Consulta e Planeamento',
          description: 'Realizamos reunião inicial para entender completamente suas necessidades, requisitos específicos do trabalho, prazos e expectativas académicas.'
        },
        {
          step: '02',
          icon: BookOpen,
          title: 'Pesquisa e Análise',
          description: 'Conduzimos pesquisa bibliográfica extensiva, análise de dados relevantes e síntese de literatura científica actualizada na sua área de estudo.'
        },
        {
          step: '03',
          icon: Target,
          title: 'Desenvolvimento e Redacção',
          description: 'Criamos conteúdo científico de alta qualidade, seguindo rigorosamente as normas acadêmicas solicitadas (ABNT, APA, Vancouver).'
        },
        {
          step: '04',
          icon: CheckCircle,
          title: 'Revisão e Entrega',
          description: 'Realizamos revisão completa, formatação profissional, verificação de originalidade e entrega do trabalho final com toda documentação necessária.'
        }
      ],

      methods: [
        {
          icon: FileText,
          name: 'Metodologia Científica Rigorosa',
          description: 'Aplicamos metodologias de pesquisa adequadas ao seu projecto, garantindo validade científica e relevância acadêmica.'
        },
        {
          icon: Globe,
          name: 'Análise de Dados',
          description: 'Utilizamos ferramentas avançadas de análise estatística e qualitativa para processar e interpretar dados de forma precisa.'
        },
        {
          icon: TrendingUp,
          name: 'Planeamento Territorial com SIG',
          description: 'Aplicamos Sistemas de Informação Geográfica (SIG) para análise espacial e planeamento territorial detalhado.'
        },
        {
          icon: Zap,
          name: 'Tecnologias de IA',
          description: 'Utilizamos inteligência artificial para análise de literatura, síntese de conteúdo e verificação de originalidade.'
        }
      ],

      howToObtain: {
        steps: [
          'Preencha o formulário de cotação com detalhes do seu projecto',
          'Receba nossa proposta personalizada em até 48 horas',
          'Aprove a proposta e faça o pagamento conforme combinado',
          'Acompanhe o desenvolvimento do seu projecto em tempo real',
          'Receba o trabalho final com garantia de qualidade e originalidade'
        ],
        requirements: [
          'Tema e objectivo do trabalho claramente definidos',
          'Requisitos específicos da sua instituição',
          'Prazo desejado para entrega',
          'Área de estudo e nível académico',
          'Norma de formatação exigida (ABNT, APA, etc.)'
        ]
      },

      features: [
        'Monografias e Teses',
        'Artigos Científicos',
        'Projectos de Pesquisa',
        'Relatórios Técnicos',
        'Revisão e Formatação',
        'Normas ABNT, APA, Vancouver'
      ],

      price: 'A partir de 5.000 MT',
      priceNote: 'Preço varia conforme complexidade e prazo',
      buttonText: 'Solicitar Cotação'
    },
    'acompanhamento-online': {
      id: 'acompanhamento-online',
      icon: GraduationCap,
      title: 'Acompanhamento Online',
      subtitle: 'Suporte Académico Personalizado',
      description: 'Oferecemos suporte especializado para estudantes de universidades parceiras, com tutoria personalizada e assistência em tempo real. Nosso programa de acompanhamento é projectado para maximizar seu sucesso académico através de apoio contínuo e estratégico.',

      whatWeDo: 'Fornecemos suporte académico contínuo e personalizado para estudantes universitários, incluindo tutoria em disciplinas específicas, orientação em trabalhos acadêmicos, preparação para exames, e assistência com projectos de curso. Trabalhamos particularmente com estudantes de universidades parceiras como UNISED, UNISA, UCM, e USTM.',

      whatWeHaveDone: [
        {
          title: 'Acompanhamento de Estudante UNISED',
          institution: 'Universidade Pedagógica',
          year: '2024',
          grade: '17/20 final',
          description: 'Suporte completo durante semestre completo, incluindo orientação em 3 trabalhos acadêmicos e preparação para exames'
        },
        {
          title: 'Tutoria em Metodologia de Pesquisa',
          institution: 'UNISA',
          year: '2024',
          grade: 'Aprovação com distinção',
          description: 'Acompanhamento especializado em metodologia de pesquisa, resultando em proposta de dissertação aprovada'
        }
      ],

      howWeDoIt: [
        {
          step: '01',
          icon: Users,
          title: 'Avaliação Inicial',
          description: 'Realizamos diagnóstico completo das suas necessidades académicas e identificamos áreas que requerem maior atenção e desenvolvimento.'
        },
        {
          step: '02',
          icon: Award,
          title: 'Desenvolvimento de Plano',
          description: 'Criamos um plano de acompanhamento personalizado alinhado com seus objectivos académicos e calendário da universidade.'
        },
        {
          step: '03',
          icon: Clock,
          title: 'Sessões de Tutoria',
          description: 'Conduzimos sessões regulares de tutoria focadas em esclarecimento de dúvidas, prática de exercícios e desenvolvimento de competências.'
        },
        {
          step: '04',
          icon: CheckCircle,
          title: 'Monitoramento e Ajustes',
          description: 'Acompanhamos seu progresso continuamente e ajustamos estratégias conforme necessário para garantir sucesso académico sustentado.'
        }
      ],

      methods: [
        {
          icon: Users,
          name: 'Tutoria Individual',
          description: 'Sessões personalizadas 1-a-1 focadas nas suas necessidades específicas e estilo de aprendizado.'
        },
        {
          icon: Clock,
          name: 'Suporte 24/7',
          description: 'Disponibilidade para esclarecimento de dúvidas e assistência em momentos críticos antes de prazos ou exames.'
        },
        {
          icon: Award,
          name: 'Preparação para Avaliações',
          description: 'Estratégias específicas de preparação para exames, apresentações e trabalhos práticos.'
        },
        {
          icon: CheckCircle,
          name: 'Mentoria Académica',
          description: 'Orientação contínua sobre gestão de tempo, técnicas de estudo e desenvolvimento académico geral.'
        }
      ],

      howToObtain: {
        steps: [
          'Contacte-nos através do formulário ou WhatsApp',
          'Agende consulta gratuita para avaliação inicial',
          'Receba proposta de pacote de acompanhamento',
          'Inicie seu programa de tutoria personalizada',
          'Acompanhe seu progresso académico com relatórios regulares'
        ],
        requirements: [
          'Ser estudante de universidade parceira ou instituição reconhecida',
          'Compromisso com participação activa nas sessões',
          'Disponibilidade mínima para sessões semanais',
          'Documentos académicos relevantes'
        ]
      },

      features: [
        'UNISED (Universidade Pedagógica)',
        'UNISA (University of South Africa)',
        'UCM (Universidade Católica)',
        'USTM (Universidade São Tomás)',
        'Tutoria personalizada',
        'Assistência em provas e trabalhos'
      ],

      price: '3.000-8.000 MT/mês',
      priceNote: 'Conforme modalidade e carga horária',
      buttonText: 'Agendar Consulta'
    },
    'consultoria-profissional': {
      id: 'consultoria-profissional',
      icon: Briefcase,
      title: 'Consultoria Profissional e Criativa',
      subtitle: 'Desenvolve sua Carreira com Excelência',
      description: 'Desenvolvemos sua carreira profissional com estratégias personalizadas, desde currículos até personal branding. Nossa consultoria combina expertise em recursos humanos, marketing pessoal e estratégia de carreira para posicioná-lo como profissional de destaque.',

      whatWeDo: 'Oferecemos serviços completos de consultoria profissional, incluindo desenvolvimento de currículos impressionantes, cartas de motivação persuasivas, preparação para entrevistas de emprego, optimização de perfil LinkedIn, e criação de estratégias de personal branding. Ajudamos profissionais a destacarem-se no mercado de trabalho competitivo.',

      whatWeHaveDone: [
        {
          title: 'Criação de Personal Branding',
          client: 'Profissional de Planeamento Territorial',
          year: '2024',
          result: 'Posicionado como especialista reconhecido',
          description: 'Desenvolvimento de estratégia completa de marca pessoal, resultando em aumento significativo de oportunidades profissionais'
        },
        {
          title: 'Preparação para Entrevistas Internacionais',
          client: 'Engenheiro Ambiental',
          year: '2024',
          result: 'Seleccionado para posição de liderança',
          description: 'Coaching intensivo para entrevistas com organizações internacionais'
        }
      ],

      howWeDoIt: [
        {
          step: '01',
          icon: Users,
          title: 'Análise de Perfil',
          description: 'Avaliamos seu perfil profissional actual, competências, experiências e objectivos de carreira para desenvolver estratégia personalizada.'
        },
        {
          step: '02',
          icon: Award,
          title: 'Desenvolvimento de Estratégia',
          description: 'Criamos plano estratégico completo para alcançar seus objectivos profissionais, incluindo timeline e acções específicas.'
        },
        {
          step: '03',
          icon: TrendingUp,
          title: 'Implementação',
          description: 'Produzimos materiais profissionais de alta qualidade e implementamos estratégias de marketing pessoal e networking.'
        },
        {
          step: '04',
          icon: CheckCircle,
          title: 'Otimização e Suporte',
          description: 'Otimizamos continuamente sua presença profissional e oferecemos suporte contínuo para manter seu posicionamento competitivo.'
        }
      ],

      methods: [
        {
          icon: FileText,
          name: 'Análise de Mercado',
          description: 'Pesquisamos tendências do mercado de trabalho e oportunidades na sua área de especialização.'
        },
        {
          icon: Globe,
          name: 'Personal Branding',
          description: 'Desenvolvemos identidade profissional única e memorável que destaca seu valor no mercado.'
        },
        {
          icon: TrendingUp,
          name: 'Networking Estratégico',
          description: 'Orientamos estratégias de networking efectivas para expandir oportunidades profissionais.'
        },
        {
          icon: Zap,
          name: 'Optimização Digital',
          description: 'Maximizamos sua presença online através de LinkedIn optimizado e materiais digitais profissionais.'
        }
      ],

      howToObtain: {
        steps: [
          'Contacte-nos para consulta inicial gratuita',
          'Discuta seus objectivos profissionais e desafios',
          'Receba proposta de plano de consultoria personalizado',
          'Inicie desenvolvimento de sua marca profissional',
          'Acompanhe progresso através de relatórios mensais'
        ],
        requirements: [
          'Objectivos de carreira claramente definidos',
          'CV ou perfil profissional actualizado',
          'Área de especialização ou interesse',
          'Disponibilidade para sessões de consultoria'
        ]
      },

      features: [
        'Desenvolvimento de Currículos',
        'Cartas de Motivação',
        'Preparação para Entrevistas',
        'Personal Branding',
        'LinkedIn Optimization',
        'Planos de Carreira'
      ],

      price: '2.500-6.000 MT',
      priceNote: 'Pacotes personalizados disponíveis',
      buttonText: 'Explorar Serviços'
    }
  }

  const service = serviceDetails[serviceType]

  if (!service) {
    return (
      <div className="bg-black min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-12 max-w-md mx-auto gold-border">
            <h1 className="text-4xl font-bold mb-4 gradient-text font-montserrat">Serviço não encontrado</h1>
            <p className="text-white/70 mb-6 font-poppins">O serviço que você procura não existe ou foi removido.</p>
            <Link to="/servicos" className="btn-primary inline-flex items-center gap-2 font-poppins">
              Voltar aos Serviços
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden border-b border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,215,0,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,215,0,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/servicos" className="inline-flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors duration-300 mb-8 font-poppins">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar aos Serviços</span>
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center gold-shadow flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-12 h-12 text-black" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 font-montserrat leading-tight">
                  {service.title}
                </h1>
                <p className="text-2xl md:text-3xl gradient-text font-semibold font-poppins">{service.subtitle}</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed font-poppins">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* O Que Fazemos */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 gold-border"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              O Que <span className="gradient-text">Fazemos</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-4xl font-poppins">
              {service.whatWeDo}
            </p>
          </motion.div>
        </div>
      </section>

      {/* O Que Já Fizemos */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              O Que Já <span className="gradient-text">Fizemos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-poppins">
              Casos reais de sucesso e resultados comprovados
            </p>
          </motion.div>

          <div className="space-y-6">
            {service.whatWeHaveDone.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 gold-border hover:glass-hover transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-montserrat">{project.title}</h3>
                    <p className="text-yellow-400 font-semibold font-poppins">{project.institution || project.client} • {project.year}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-bold text-lg">{project.grade || project.result}</span>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed font-poppins">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Fazemos */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Como <span className="gradient-text">Fazemos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-poppins">
              Nossos processos meticulosamente planeados garantem qualidade em cada etapa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.howWeDoIt.map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 text-center gold-border hover:glass-hover transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 gold-shadow">
                    <StepIcon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-white font-bold text-2xl mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3 font-montserrat">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed font-poppins">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Métodos Utilizados */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Métodos <span className="gradient-text">Utilizados</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-poppins">
              Tecnologias e metodologias de ponta aplicadas ao seu projecto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.methods.map((method, index) => {
              const MethodIcon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 gold-border hover:glass-hover transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center gold-shadow">
                      <MethodIcon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 font-montserrat">{method.name}</h3>
                      <p className="text-white/70 leading-relaxed font-poppins">{method.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Como Obter o Serviço */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Como Obter o <span className="gradient-text">Serviço</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-poppins">
              Processo simples e transparente para iniciar sua jornada connosco
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Passos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 gold-border"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">Passos</h3>
              <div className="space-y-4">
                {service.howToObtain.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center font-bold text-white text-sm gold-shadow">
                      {index + 1}
                    </div>
                    <p className="text-white/80 leading-relaxed flex-1 font-poppins">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requisitos */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 gold-border"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">Requisitos</h3>
              <div className="space-y-3">
                {service.howToObtain.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/80 leading-relaxed font-poppins">{req}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Pronto para começar?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto font-poppins">
              Entre em contacto connosco e descubra como podemos ajudá-lo a alcançar seus objectivos académicos e profissionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cotacao"
                className="btn-primary text-lg px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 neon-glow-hover"
              >
                Solicitar Cotação
              </Link>
              <Link
                to="/agendar"
                className="btn-secondary text-lg px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                Agendar Consulta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
