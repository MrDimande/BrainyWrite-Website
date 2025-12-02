import { motion } from "framer-motion";
import {
  ArrowUp,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    sobre: [
      { name: "Missão", href: "/#missao" },
      { name: "Visão", href: "/#visao" },
      { name: "Valores", href: "/#valores" },
      { name: "Equipe", href: "/#equipe" },
    ],
    servicos: [
      { name: "Produção Acadêmica", href: "/servicos" },
      { name: "Acompanhamento Online", href: "/servicos" },
      { name: "Consultoria Profissional", href: "/servicos" },
      { name: "Formação", href: "/servicos" },
    ],
    links: [
      { name: "Agendar Consulta", href: "/agendar" },
      { name: "Solicitar Cotação", href: "/cotacao" },
      { name: "Portfólio", href: "/#portfolio" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/brainywrite",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/brainywrite",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/brainywrite",
      label: "LinkedIn",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/258878509146",
      label: "WhatsApp",
    },
  ];

  const getCurrentStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const hour = now.getHours();

    if (day === 0) return { status: "Fechado", color: "text-red-400" }; // Domingo

    if (day >= 1 && day <= 5) {
      // Segunda a Sexta
      if (hour >= 8 && hour < 18) {
        return { status: "Aberto", color: "text-green-400" };
      } else {
        return { status: "Fechado", color: "text-red-400" };
      }
    }

    if (day === 6) {
      // Sábado
      if (hour >= 9 && hour < 14) {
        return { status: "Aberto", color: "text-green-400" };
      } else {
        return { status: "Fechado", color: "text-red-400" };
      }
    }

    return { status: "Fechado", color: "text-red-400" };
  };

  const currentStatus = getCurrentStatus();

  return (
    <footer
      id="footer"
      className="relative bg-black/90 backdrop-blur-md border-t border-white/10"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">BW</span>
              </div>
              <span className="text-white font-bold text-xl">BrainyWrite</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed font-poppins">
              Transformamos desafios acadêmicos e profissionais em oportunidades
              de excelência. Sua jornada para o sucesso começa aqui.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white/70 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links - Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-6 font-montserrat">Sobre Nós</h3>
            <ul className="space-y-3">
              {footerLinks.sobre.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-yellow-400 transition-colors duration-300 font-poppins"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Links - Serviços */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-6 font-montserrat">Serviços</h3>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-yellow-400 transition-colors duration-300 font-poppins"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-white font-semibold text-lg mb-6 font-montserrat">
              Contacto
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <Mail className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato.brainywrite@gmail.com"
                  className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-poppins break-words"
                >
                  contato.brainywrite@gmail.com
                </a>
              </motion.div>

              {/* Telefone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <Phone className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:+2588780883476"
                    className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-poppins"
                  >
                    +258 87 088 3476
                  </a>
                  <a
                    href="tel:+2588280883428"
                    className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-poppins"
                  >
                    +258 82 088 3428
                  </a>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <MessageCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="https://wa.me/2588780883476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-poppins"
                >
                  WhatsApp
                </a>
              </motion.div>

              {/* Localização */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=Av.+Julius+Nyerere,+Polana+Canico+B,+Maputo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-yellow-400 transition-colors duration-300 text-sm font-poppins break-words"
                >
                  Av. Julius Nyerere, Polana Canico B, Maputo, Moçambique
                </a>
              </motion.div>

              {/* Horário */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 pt-2"
              >
                <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col space-y-1 text-sm text-white/70 font-poppins">
                  <div>
                    <span className="font-medium">Seg-Sex:</span> 08h00 - 17h00
                  </div>
                  <div>
                    <span className="font-medium">Sábado:</span> 08h00 - 13h00
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BrainyWrite. Todos os direitos
            reservados.
          </div>

          <div className="flex space-x-6 text-sm">
            <Link
              to="/privacy"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-300"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/terms"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-300"
            >
              Termos de Uso
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 z-50"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
