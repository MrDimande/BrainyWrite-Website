import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, FileText, Scale, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Aceitação dos Termos',
      content: `Ao acessar e utilizar o website da BrainyWrite, você concorda em cumprir e estar vinculado
a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar
nosso website ou serviços.

Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou utilizam
nossos serviços.`
    },
    {
      icon: CheckCircle,
      title: 'Uso do Serviço',
      content: `Você concorda em utilizar nossos serviços apenas para fins legais e de acordo com estes
Termos de Uso. Especificamente, você concorda em:

• Fornecer informações precisas e completas ao solicitar nossos serviços
• Manter a confidencialidade de qualquer informação confidencial fornecida
• Não utilizar nossos serviços para qualquer propósito ilegal ou não autorizado
• Não interferir ou interromper o funcionamento do website
• Não tentar acessar áreas restritas do website
• Respeitar os direitos de propriedade intelectual da BrainyWrite e de terceiros`
    },
    {
      icon: Scale,
      title: 'Serviços Fornecidos',
      content: `A BrainyWrite oferece serviços de consultoria acadêmica e profissional, incluindo:

• Produção de trabalhos acadêmicos (monografias, teses, artigos)
• Acompanhamento online para estudantes universitários
• Consultoria profissional (CV, carreira, branding)
• Revisão e formatação de trabalhos acadêmicos

Todos os serviços são fornecidos com base em acordos específicos e termos de contrato que serão
discutidos e acordados antes do início de qualquer trabalho.`
    },
    {
      icon: AlertCircle,
      title: 'Responsabilidades do Cliente',
      content: `Como cliente, você é responsável por:

• Fornecer informações precisas e completas sobre seu projeto
• Comunicar claramente suas necessidades e expectativas
• Fornecer feedback oportuno durante o processo de trabalho
• Realizar pagamentos conforme acordado
• Utilizar os trabalhos entregues de acordo com as políticas de sua instituição
• Manter a confidencialidade de qualquer informação confidencial compartilhada

A BrainyWrite não se responsabiliza pelo uso inadequado dos trabalhos entregues.`
    },
    {
      icon: XCircle,
      title: 'Limitação de Responsabilidade',
      content: `Na medida máxima permitida por lei:

• A BrainyWrite não garante resultados específicos de aprovação ou notas
• Não nos responsabilizamos por decisões tomadas com base em nossos serviços
• Não garantimos que o website estará sempre disponível ou livre de erros
• Não nos responsabilizamos por perdas indiretas, consequenciais ou danos especiais
• Nossa responsabilidade total é limitada ao valor pago pelos serviços

Você reconhece que os resultados acadêmicos dependem de múltiplos fatores além do nosso controle.`
    },
    {
      icon: CheckCircle,
      title: 'Propriedade Intelectual',
      content: `Todos os materiais fornecidos pela BrainyWrite, incluindo trabalhos acadêmicos, são
propriedade intelectual do cliente após o pagamento completo e entrega.

No entanto:
• A BrainyWrite retém o direito de utilizar trabalhos anonimizados para fins de portfólio
• O cliente concorda em não revender ou redistribuir os trabalhos sem autorização
• Todos os trabalhos são originalmente criados e verificados para originalidade
• O cliente é responsável por garantir que o uso dos trabalhos esteja em conformidade
  com as políticas de sua instituição`
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
              <Scale className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-montserrat">
                Termos de Uso
              </h1>
              <p className="text-white/70 text-lg font-poppins">
                Última atualização: {new Date().toLocaleDateString('pt-MZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <p className="text-xl text-white/80 leading-relaxed font-poppins">
            Estes Termos de Uso regem o uso do website e serviços da BrainyWrite.
            Ao utilizar nossos serviços, você concorda em cumprir estes termos.
            Leia cuidadosamente antes de utilizar nossos serviços.
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

        {/* Payment Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8 gold-border mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
            Termos de Pagamento
          </h2>
          <div className="text-white/80 leading-relaxed space-y-4 font-poppins">
            <p>
              <strong>Formas de Pagamento:</strong> Aceitamos pagamentos através de transferência
              bancária, M-Pesa, e outros métodos acordados.
            </p>
            <p>
              <strong>Prazos de Pagamento:</strong> Os prazos de pagamento serão acordados
              individualmente com cada cliente e especificados no contrato de serviço.
            </p>
            <p>
              <strong>Reembolsos:</strong> Políticas de reembolso serão discutidas e acordadas
              antes do início dos serviços, conforme especificado no contrato individual.
            </p>
          </div>
        </motion.div>

        {/* Modifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass rounded-2xl p-8 gold-border mt-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
            Modificações dos Termos
          </h2>
          <p className="text-white/80 leading-relaxed font-poppins">
            Reservamos o direito de modificar estes Termos de Uso a qualquer momento.
            Notificaremos sobre alterações significativas publicando os novos termos nesta página
            e atualizando a data de "Última atualização". O uso continuado de nossos serviços após
            tais modificações constitui sua aceitação dos novos termos.
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
            Se você tiver perguntas sobre estes Termos de Uso, entre em contato conosco:
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

export default Terms;

