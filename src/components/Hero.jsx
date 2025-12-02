import { motion } from 'framer-motion'
import { ArrowRight, Award, Target, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const stats = [
    { icon: Target, value: '2+', label: 'Anos de Experiência' },
    { icon: Users, value: '50+', label: 'Projetos Realizados' },
    { icon: Award, value: '40+', label: 'Clientes Satisfeitos' },
    { icon: Zap, value: '10', label: 'Áreas de Atuação' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-spacing">
      {/* Background com gradiente dourado animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Grid futurístico dourado */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge dourado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-6 py-3 text-yellow-300 text-sm font-medium font-poppins gold-shadow"
          >
            <span>🔥 Consultoria Acadêmica de Excelência desde 2023</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-montserrat"
          >
            A arte de revelar o seu{' '}
            <span className="gradient-text font-bold">
              sucesso
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins"
          >
            Paixão por resultados, tecnologia que entende você
          </motion.p>

          {/* Botões CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/agendar"
              className="group btn-primary text-lg px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center space-x-2 neon-glow-hover"
            >
              <span>Agendar Consulta com BW360 Assistant</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/servicos"
              className="group btn-secondary text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <span>Explorar Serviços</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards de estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-6 text-center hover:glass-hover transition-all duration-300 gold-border"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center gold-shadow">
                  <stat.icon className="w-7 h-7 text-black" />
                </div>
              </div>
              <div className="text-4xl font-bold gradient-text mb-2 font-montserrat">{stat.value}</div>
              <div className="text-white/70 text-sm font-poppins">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator dourado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-yellow-500/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-yellow-500/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
