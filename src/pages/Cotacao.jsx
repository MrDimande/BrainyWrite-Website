import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  Calendar, 
  DollarSign,
  Shield,
  Clock,
  Users,
  Award,
  Send,
  AlertCircle
} from 'lucide-react'

const Cotacao = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()

  const totalSteps = 4
  const watchedFields = watch()

  // Calcular preço em tempo real
  const calculatePrice = () => {
    let basePrice = 0
    const pages = parseInt(watchedFields.pages) || 0
    const level = watchedFields.academicLevel
    const deadline = watchedFields.deadline
    const services = watchedFields.additionalServices || []

    // Preço base por página
    if (level === 'licenciatura') basePrice = pages * 150
    else if (level === 'mestrado') basePrice = pages * 200
    else if (level === 'doutoramento') basePrice = pages * 300
    else if (level === 'pos-graduacao') basePrice = pages * 180

    // Acréscimo por urgência
    if (deadline) {
      const deadlineDate = new Date(deadline)
      const today = new Date()
      const daysDiff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
      
      if (daysDiff < 7) basePrice *= 1.5 // 50% de acréscimo
      else if (daysDiff < 14) basePrice *= 1.3 // 30% de acréscimo
      else if (daysDiff < 30) basePrice *= 1.1 // 10% de acréscimo
    }

    // Serviços adicionais
    services.forEach(service => {
      if (service === 'revisao-ortografica') basePrice += 500
      if (service === 'revisao-metodologica') basePrice += 1000
      if (service === 'formatacao-completa') basePrice += 800
      if (service === 'apresentacao-slides') basePrice += 1200
      if (service === 'plagio-check') basePrice += 300
    })

    setCalculatedPrice(Math.round(basePrice))
  }

  // Recalcular quando campos mudarem
  useState(() => {
    calculatePrice()
  }, [watchedFields])

  const workTypes = [
    'Monografia',
    'Dissertação',
    'Tese',
    'Artigo Científico',
    'Trabalho de Conclusão de Curso',
    'Projeto de Pesquisa',
    'Relatório',
    'Outro'
  ]

  const academicLevels = [
    { value: 'licenciatura', label: 'Licenciatura' },
    { value: 'mestrado', label: 'Mestrado' },
    { value: 'doutoramento', label: 'Doutoramento' },
    { value: 'pos-graduacao', label: 'Pós-Graduação' }
  ]

  const formattingStandards = [
    'ABNT',
    'APA',
    'Vancouver',
    'ISO',
    'Outra'
  ]

  const languages = [
    'Português',
    'Inglês',
    'Espanhol'
  ]

  const additionalServices = [
    { value: 'revisao-ortografica', label: 'Revisão Ortográfica' },
    { value: 'revisao-metodologica', label: 'Revisão Metodológica' },
    { value: 'formatacao-completa', label: 'Formatação Completa' },
    { value: 'apresentacao-slides', label: 'Apresentação em Slides' },
    { value: 'plagio-check', label: 'Plágio Check' }
  ]

  const guarantees = [
    'Originalidade garantida',
    'Revisões ilimitadas',
    'Confidencialidade total',
    'Entrega no prazo',
    'Suporte pós-entrega'
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Cotação solicitada com sucesso! Entraremos em contato em breve.')
    } catch (error) {
      toast.error('Erro ao solicitar cotação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  }

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
              Solicitar <span className="gradient-text">Cotação</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
              Preencha o formulário abaixo e receba uma cotação personalizada 
              para seu projeto acadêmico em até 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  index + 1 <= currentStep 
                    ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white' 
                    : 'bg-white/10 text-white/50'
                }`}>
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index + 1 < currentStep ? 'bg-gradient-to-r from-primary-purple to-primary-blue' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário Multi-Step */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* Etapa 1 - Informações Pessoais */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Informações Pessoais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Nome Completo *</label>
                      <input
                        {...register('name', { required: 'Nome é obrigatório' })}
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <input
                        {...register('email', { 
                          required: 'Email é obrigatório',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        type="email"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Telefone/WhatsApp *</label>
                      <input
                        {...register('phone', { 
                          required: 'Telefone é obrigatório',
                          pattern: {
                            value: /^(\+258|258)?[0-9]{9}$/,
                            message: 'Formato de telefone moçambicano inválido'
                          }
                        })}
                        type="tel"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="+258 84 123 4567"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Instituição de Ensino *</label>
                      <input
                        {...register('institution', { required: 'Instituição é obrigatória' })}
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Nome da sua instituição"
                      />
                      {errors.institution && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.institution.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Etapa 2 - Detalhes do Trabalho */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Detalhes do Trabalho</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Tipo de Trabalho *</label>
                      <select
                        {...register('workType', { required: 'Selecione o tipo de trabalho' })}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      >
                        <option value="" className="bg-gray-800">Selecione o tipo</option>
                        {workTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-800">
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.workType && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.workType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Categoria/Área do Conhecimento *</label>
                      <input
                        {...register('category', { required: 'Categoria é obrigatória' })}
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Ex: Administração, Engenharia, Medicina..."
                      />
                      {errors.category && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Número de Páginas: {watchedFields.pages || 10}
                      </label>
                      <input
                        {...register('pages', { 
                          required: 'Número de páginas é obrigatório',
                          min: { value: 10, message: 'Mínimo 10 páginas' },
                          max: { value: 300, message: 'Máximo 300 páginas' }
                        })}
                        type="range"
                        min="10"
                        max="300"
                        step="5"
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>10 páginas</span>
                        <span>300 páginas</span>
                      </div>
                      {errors.pages && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.pages.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Prazo de Entrega *</label>
                      <input
                        {...register('deadline', { 
                          required: 'Prazo é obrigatório',
                          validate: (value) => {
                            const deadlineDate = new Date(value)
                            const today = new Date()
                            return deadlineDate > today || 'Prazo deve ser no futuro'
                          }
                        })}
                        type="date"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                      />
                      {errors.deadline && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.deadline.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Etapa 3 - Especificações Acadêmicas */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Especificações Acadêmicas</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Nível Acadêmico *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {academicLevels.map((level) => (
                          <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              {...register('academicLevel', { required: 'Selecione o nível acadêmico' })}
                              type="radio"
                              value={level.value}
                              className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                            />
                            <span className="text-white">{level.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.academicLevel && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.academicLevel.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Normas de Formatação *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {formattingStandards.map((standard) => (
                          <label key={standard} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              {...register('formatting', { required: 'Selecione as normas de formatação' })}
                              type="radio"
                              value={standard}
                              className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                            />
                            <span className="text-white">{standard}</span>
                          </label>
                        ))}
                      </div>
                      {errors.formatting && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.formatting.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Idioma *</label>
                      <div className="grid grid-cols-3 gap-4">
                        {languages.map((language) => (
                          <label key={language} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              {...register('language', { required: 'Selecione o idioma' })}
                              type="radio"
                              value={language}
                              className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                            />
                            <span className="text-white">{language}</span>
                          </label>
                        ))}
                      </div>
                      {errors.language && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.language.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Etapa 4 - Detalhes do Projeto e Cotação */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Detalhes do Projeto</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Título do Trabalho *</label>
                      <input
                        {...register('title', { required: 'Título é obrigatório' })}
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300"
                        placeholder="Título do seu trabalho"
                      />
                      {errors.title && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Descrição do Projeto *</label>
                      <textarea
                        {...register('description', { required: 'Descrição é obrigatória' })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all duration-300 resize-none"
                        placeholder="Descreva seu projeto, objetivos, metodologia..."
                      />
                      {errors.description && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Já possui material de referência?</label>
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            {...register('hasReferences')}
                            type="radio"
                            value="sim"
                            className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                          />
                          <span className="text-white">Sim</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            {...register('hasReferences')}
                            type="radio"
                            value="nao"
                            className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 focus:ring-primary-gold focus:ring-2"
                          />
                          <span className="text-white">Não</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Serviços Adicionais</label>
                      <div className="grid grid-cols-2 gap-4">
                        {additionalServices.map((service) => (
                          <label key={service.value} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              {...register('additionalServices')}
                              type="checkbox"
                              value={service.value}
                              className="w-4 h-4 text-primary-gold bg-white/10 border-white/20 rounded focus:ring-primary-gold focus:ring-2"
                            />
                            <span className="text-white">{service.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cotação Calculada */}
                    <div className="bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2 text-primary-gold" />
                        Cotação Estimada
                      </h3>
                      <div className="text-4xl font-bold text-primary-gold mb-2">
                        {calculatedPrice.toLocaleString('pt-MZ')} MT
                      </div>
                      <p className="text-white/70 text-sm">
                        * Valor estimado baseado nas informações fornecidas. Cotação final será enviada em até 24 horas.
                      </p>
                    </div>

                    {/* Garantias */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Nossas Garantias</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {guarantees.map((guarantee, index) => (
                          <div key={index} className="flex items-center space-x-2 text-white/80">
                            <CheckCircle className="w-4 h-4 text-primary-teal flex-shrink-0" />
                            <span>{guarantee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navegação */}
            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </motion.button>

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-purple to-primary-blue text-white rounded-xl hover:shadow-lg hover:shadow-primary-purple/25 transition-all duration-300"
                >
                  <span>Próximo</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-purple to-primary-blue text-white rounded-xl hover:shadow-lg hover:shadow-primary-purple/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Cotação Detalhada</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Cotacao
