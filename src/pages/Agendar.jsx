import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import api from '../config/api'
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  MessageCircle,
  CheckCircle,
  Send,
  AlertCircle
} from 'lucide-react'

const Agendar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const services = [
    'Produção de Trabalhos Académicos',
    'Acompanhamento Online - UNISED',
    'Acompanhamento Online - UNISA',
    'Acompanhamento Online - UCM',
    'Acompanhamento Online - São Tomás',
    'Consultoria Profissional'
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await fetch(api.appointment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          date: data.date,
          time: data.time,
          message: data.message || '',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao agendar consulta')
      }

      toast.success(result.message || 'Consulta agendada com sucesso! Entraremos em contato em breve.')
      reset()
    } catch (error) {
      console.error('Error submitting appointment:', error)
      toast.error(error.message || 'Erro ao agendar consulta. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      details: ['Segunda a Sexta: 8h às 18h', 'Sábado: 9h às 14h', 'Domingo: Fechado']
    },
    {
      icon: Phone,
      title: 'Contato',
      details: ['+258 84 123 4567', 'WhatsApp disponível']
    },
    {
      icon: MapPin,
      title: 'Localização',
      details: ['Maputo, Moçambique', 'Consultas presenciais e online']
    },
    {
      icon: MessageCircle,
      title: 'Tempo de Resposta',
      details: ['Máximo 24 horas', 'Resposta rápida garantida']
    }
  ]

  return (
    <div className="min-h-screen pt-16 bg-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-purple via-primary-blue to-primary-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white font-montserrat">
              Agendar <span className="gradient-text">Consulta</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
              Agende sua consulta gratuita e descubra como podemos transformar
              seus objetivos acadêmicos e profissionais em realidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Preencha o Formulário</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        {...register('name', { required: 'Nome é obrigatório' })}
                        type="text"
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        {...register('email', {
                          required: 'Email é obrigatório',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        type="email"
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Telefone/WhatsApp */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        {...register('phone', {
                          required: 'Telefone é obrigatório',
                          pattern: {
                            value: /^(\+258|258)?[0-9]{9}$/,
                            message: 'Formato de telefone moçambicano inválido'
                          }
                        })}
                        type="tel"
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="+258 84 123 4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Endereço Completo
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <input
                        {...register('address')}
                        type="text"
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Seu endereço completo"
                      />
                    </div>
                  </div>

                  {/* Serviço */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Serviço de Interesse *
                    </label>
                    <select
                      {...register('service', { required: 'Selecione um serviço' })}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">Selecione um serviço</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-gray-800">
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* Modalidade */}
                  <div>
                    <label className="block text-white font-medium mb-3">
                      Modalidade *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          {...register('modality', { required: 'Selecione uma modalidade' })}
                          type="radio"
                          value="presencial"
                          className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                        />
                        <span className="text-white">Presencial</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          {...register('modality', { required: 'Selecione uma modalidade' })}
                          type="radio"
                          value="online"
                          className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                        />
                        <span className="text-white">Online</span>
                      </label>
                    </div>
                    {errors.modality && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.modality.message}
                      </p>
                    )}
                  </div>

                  {/* Data e Hora */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Data Preferida *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          {...register('date', {
                            required: 'Data é obrigatória',
                            validate: (value) => {
                              const selectedDate = new Date(value)
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              return selectedDate >= today || 'Data não pode ser no passado'
                            }
                          })}
                          type="date"
                          className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        />
                      </div>
                      {errors.date && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Hora Preferida *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          {...register('time', { required: 'Hora é obrigatória' })}
                          type="time"
                          className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        />
                      </div>
                      {errors.time && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.time.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mensagem Adicional */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Mensagem Adicional
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300 resize-none"
                        placeholder="Conte-nos mais sobre suas necessidades..."
                      />
                    </div>
                  </div>

                  {/* Checkbox de termos */}
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        {...register('terms', { required: 'Você deve aceitar os termos' })}
                        type="checkbox"
                        className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 rounded focus:ring-primary-gold focus:ring-2 mt-1"
                      />
                      <span className="text-white/80 text-sm">
                        Aceito os <a href="/terms" className="text-primary-gold hover:underline">termos e condições</a> e
                        a <a href="/privacy" className="text-primary-gold hover:underline">política de privacidade</a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.terms.message}
                      </p>
                    )}
                  </div>

                  {/* Botão de envio */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-purple to-primary-blue text-white py-4 px-8 rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary-purple/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Agendando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Agendar Consulta</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-purple to-primary-blue rounded-xl flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{info.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-white/70 flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary-teal mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Políticas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Políticas de Agendamento</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Confirmação em até 24 horas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Reagendamento gratuito até 24h antes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Consulta inicial gratuita</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary-teal mr-2 mt-1 flex-shrink-0" />
                    <span>Suporte pós-consulta incluído</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Agendar
