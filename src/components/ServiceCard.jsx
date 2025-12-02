import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const ServiceCard = ({ service, index }) => {
  const getServiceSlug = (title) => {
    const slugs = {
      'Produção de Trabalhos Académicos': 'producao-academica',
      'Acompanhamento Online': 'acompanhamento-online',
      'Consultoria Profissional e Criativa': 'consultoria-profissional'
    }
    return slugs[title] || ''
  }

  const serviceSlug = getServiceSlug(service.title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        y: -10,
        boxShadow: '0 20px 40px rgba(255, 215, 0, 0.2)'
      }}
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
        <p className="text-white/70 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Lista de benefícios */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index * 0.1) + (featureIndex * 0.05) + 0.3 }}
              className="flex items-center space-x-3 text-white/80"
            >
              <CheckCircle className="w-5 h-5 text-primary-teal flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Link
            to={serviceSlug ? `/servico/${serviceSlug}` : '#'}
            className="block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full btn-secondary text-center py-3 px-6 rounded-full font-semibold transition-all duration-300"
            >
              Ver Detalhes
            </motion.button>
          </Link>

          <Link
            to="/cotacao"
            className="block"
          >
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
  )
}

export default ServiceCard
