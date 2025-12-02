import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Eye, FileText, Lock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Coleta de Informações',
      content: `Coletamos informações que você nos fornece diretamente quando:
• Preenche formulários de contato, cotação ou agendamento
• Solicita nossos serviços
• Entra em contato conosco via email, telefone ou WhatsApp
• Interage com nosso website

As informações coletadas podem incluir:
• Nome completo
• Endereço de email
• Número de telefone
• Instituição de ensino
• Detalhes sobre projetos acadêmicos
• Informações sobre serviços solicitados`
    },
    {
      icon: Lock,
      title: 'Uso das Informações',
      content: `Utilizamos suas informações para:
• Fornecer e melhorar nossos serviços
• Responder às suas solicitações e perguntas
• Processar cotações e agendamentos
• Comunicar-nos sobre nossos serviços
• Enviar atualizações e informações relevantes
• Melhorar a experiência do usuário em nosso website
• Cumprir obrigações legais e regulatórias

Nunca vendemos ou alugamos suas informações pessoais a terceiros.`
    },
    {
      icon: Shield,
      title: 'Segurança dos Dados',
      content: `Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
• Criptografia de dados sensíveis
• Acesso restrito às informações pessoais
• Monitoramento regular de segurança
• Backups regulares dos dados
• Sistemas seguros de armazenamento

No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro. Embora nos esforcemos para proteger suas informações, não podemos garantir segurança absoluta.`
    },
    {
      icon: Eye,
      title: 'Compartilhamento de Informações',
      content: `Não compartilhamos suas informações pessoais, exceto nas seguintes situações:
• Com seu consentimento explícito
• Para cumprir obrigações legais
• Para proteger nossos direitos e segurança
• Com prestadores de serviços que nos ajudam a operar nosso negócio (sujeitos a acordos de confidencialidade)
• Em caso de fusão, aquisição ou venda de ativos (com notificação prévia)

Todos os prestadores de serviços são obrigados a manter a confidencialidade das informações.`
    },
    {
      icon: CheckCircle,
      title: 'Seus Direitos',
      content: `Você tem o direito de:
• Acessar suas informações pessoais
• Corrigir informações inexatas ou incompletas
• Solicitar a exclusão de suas informações
• Opor-se ao processamento de suas informações
• Solicitar a portabilidade de suas informações
• Retirar seu consentimento a qualquer momento

Para exercer seus direitos, entre em contato conosco através dos canais de comunicação disponíveis em nosso website.`
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center gold-shadow">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-montserrat">
                Política de Privacidade
              </h1>
              <p className="text-white/70 text-lg font-poppins">
                Última atualização: {new Date().toLocaleDateString('pt-MZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <p className="text-xl text-white/80 leading-relaxed font-poppins">
            Na BrainyWrite, levamos sua privacidade a sério. Esta política descreve como coletamos,
            usamos, protegemos e compartilhamos suas informações pessoais quando você utiliza nossos
            serviços ou interage com nosso website.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 gold-border hover:glass-hover transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center gold-shadow flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                      {section.title}
                    </h2>
                    <div className="text-white/80 leading-relaxed whitespace-pre-line font-poppins">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8 gold-border mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
            Cookies e Tecnologias Similares
          </h2>
          <p className="text-white/80 leading-relaxed mb-4 font-poppins">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso website.
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site.
          </p>
          <p className="text-white/80 leading-relaxed font-poppins">
            Você pode controlar o uso de cookies através das configurações do seu navegador.
            No entanto, desabilitar cookies pode afetar a funcionalidade de algumas partes do website.
          </p>
        </motion.div>

        {/* Changes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass rounded-2xl p-8 gold-border mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
            Alterações nesta Política
          </h2>
          <p className="text-white/80 leading-relaxed font-poppins">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre
            quaisquer alterações significativas publicando a nova política nesta página e atualizando
            a data de "Última atualização" no topo desta página.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass rounded-2xl p-8 gold-border mt-8 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
            Entre em Contato
          </h2>
          <p className="text-white/80 leading-relaxed mb-4 font-poppins">
            Se você tiver perguntas sobre esta Política de Privacidade ou sobre como tratamos suas
            informações pessoais, entre em contato conosco:
          </p>
          <div className="space-y-2 text-white/80 font-poppins">
            <p><strong>Email:</strong> contato.brainywrite@gmail.com</p>
            <p><strong>Telefone:</strong> +258 87 088 3476</p>
            <p><strong>Endereço:</strong> Av. Julius Nyerere, Polana Canico B, Maputo, Moçambique</p>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Link
            to="/"
            className="btn-primary px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;

