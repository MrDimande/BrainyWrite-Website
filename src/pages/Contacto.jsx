import { motion } from 'framer-motion'
import {
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import api from '../config/api'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    apelido: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(api.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem')
      }

      toast.success(result.message || 'Obrigado pelo contacto! Responderemos em breve.')
      setFormData({
        nome: '',
        apelido: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast.error(error.message || 'Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat">
            Fale com a <span className="gradient-text">BrainyWrite</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
            Preencha o formulário ou utilize um dos nossos canais abaixo para falar connosco
            sobre o seu projecto académico ou profissional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Telefone */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 gold-border"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 gold-shadow">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-montserrat">Telefone</h3>
              <a
                href="tel:+2588780883476"
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-poppins"
              >
                +258 87 088 3476
              </a>
              <br />
              <a
                href="tel:+2588280883428"
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-poppins"
              >
                +258 82 088 3428
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 gold-border"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 gold-shadow">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-montserrat">Email</h3>
              <a
                href="mailto:contato.brainywrite@gmail.com"
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 break-all font-poppins"
              >
                contato.brainywrite@gmail.com
              </a>
            </motion.div>

            {/* Localização */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 gold-border"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 gold-shadow">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 font-montserrat">Localização</h3>
              <p className="text-white/70 text-sm leading-relaxed font-poppins">
                Av. Julius Nyerere<br />
                Polana Canico B<br />
                Maputo, Moçambique
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Julius+Nyerere,+Polana+Canico+B,+Maputo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm mt-2 inline-block font-poppins"
              >
                Ver no Google Maps →
              </a>
            </motion.div>

            {/* Horário */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 gold-border"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 gold-shadow">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3 font-montserrat">Horário de Atendimento</h3>
              <div className="space-y-2 text-sm text-white/70 font-poppins">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span className="text-yellow-400">08h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-yellow-400">08h00 - 13h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-red-400">Encerrado</span>
                </div>
              </div>
            </motion.div>

            {/* Redes Sociais */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 gold-border"
            >
              <h3 className="text-white font-semibold text-lg mb-4 font-montserrat">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/brainywrite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/brainywrite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/brainywrite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/2588780883476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass rounded-2xl p-8 gold-border"
            >
              <div className="mb-6 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-montserrat">
                  Envie-nos uma mensagem
                </h2>
                <p className="text-white/70 text-sm md:text-base font-poppins">
                  Responderemos o mais rápido possível, normalmente dentro de 24 horas úteis.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome e Apelido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2 font-montserrat">
                      Primeiro nome *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="Seu primeiro nome"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 font-montserrat">
                      Apelido *
                    </label>
                    <input
                      type="text"
                      name="apelido"
                      value={formData.apelido}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="Seu apelido"
                    />
                  </div>
                </div>

                {/* Email e Telefone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2 font-montserrat">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 font-montserrat">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="+258 XX XXX XXXX (WhatsApp)"
                    />
                  </div>
                </div>

                {/* Assunto */}
                <div>
                  <label className="block text-white font-medium mb-2 font-montserrat">
                    Assunto *
                  </label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="form-input w-full"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="consulta">Agendar Consulta</option>
                    <option value="cotacao">Solicitar Cotação</option>
                    <option value="servicos">Informações sobre Serviços</option>
                    <option value="parceria">Parceria ou Colaboração</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-white font-medium mb-2 font-montserrat">
                    Mensagem *
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-input w-full resize-none"
                    placeholder="Conte-nos como podemos ajudá-lo(a)..."
                  ></textarea>
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
