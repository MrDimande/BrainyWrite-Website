import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, BookOpen, GraduationCap, Briefcase, Lightbulb } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou o BW360, seu assistente virtual da BrainyWrite. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Ajuda Acadêmica',
      description: 'Orientações sobre trabalhos e estudos',
      action: 'Preciso de ajuda com meu trabalho acadêmico'
    },
    {
      icon: GraduationCap,
      title: 'Consultoria Educacional',
      description: 'Suporte para instituições de ensino',
      action: 'Quero saber sobre consultoria educacional'
    },
    {
      icon: Briefcase,
      title: 'Desenvolvimento Profissional',
      description: 'CV, entrevistas e carreira',
      action: 'Preciso de ajuda com desenvolvimento profissional'
    },
    {
      icon: Lightbulb,
      title: 'Inovação Digital',
      description: 'Soluções tecnológicas para educação',
      action: 'Quero saber sobre soluções digitais'
    }
  ];

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Respostas baseadas em palavras-chave
    if (message.includes('trabalho') || message.includes('acadêmico') || message.includes('monografia')) {
      return {
        content: 'Posso ajudá-lo com trabalhos acadêmicos! Oferecemos:\n\n• Produção de monografias e teses\n• Revisão e formatação\n• Orientação metodológica\n• Suporte para UNISED, UNISA, UCM e São Tomás\n\nGostaria de agendar uma consulta para discutir seu projeto específico?',
        suggestions: ['Agendar consulta', 'Ver preços', 'Falar com especialista']
      };
    }
    
    if (message.includes('cv') || message.includes('currículo') || message.includes('entrevista')) {
      return {
        content: 'Excelente! Nossos serviços de desenvolvimento profissional incluem:\n\n• Criação e otimização de CV\n• Cartas de motivação personalizadas\n• Preparação para entrevistas\n• Personal branding\n• LinkedIn optimization\n\nPosso conectá-lo com nossos especialistas em carreira.',
        suggestions: ['Ver portfólio', 'Agendar consulta', 'Baixar template CV']
      };
    }
    
    if (message.includes('preço') || message.includes('custo') || message.includes('quanto')) {
      return {
        content: 'Nossos preços variam conforme o serviço:\n\n• Trabalhos Acadêmicos: A partir de 5.000 MT\n• Acompanhamento Online: 3.000-8.000 MT/mês\n• Consultoria Profissional: 2.500-6.000 MT\n\nPara uma cotação personalizada, posso direcioná-lo ao nosso formulário de cotação.',
        suggestions: ['Solicitar cotação', 'Ver todos os serviços', 'Falar com consultor']
      };
    }
    
    if (message.includes('horário') || message.includes('contato') || message.includes('telefone')) {
      return {
        content: 'Nossos horários de atendimento:\n\n• Segunda a Sexta: 8:00 às 18:00\n• Sábado e Feriados: 9:00 às 14:00\n• Domingo: Encerrado\n\nContatos:\n• WhatsApp: +258 87 850 9146\n• Email: geral@bmcpro.co.mz\n• Localização: Av. Julius Nyerere, Polana Canico B, Maputo',
        suggestions: ['Agendar consulta', 'Enviar mensagem', 'Ver localização']
      };
    }
    
    if (message.includes('blog') || message.includes('artigo') || message.includes('conteúdo')) {
      return {
        content: 'Temos um blog rico com artigos sobre:\n\n• IA na Educação\n• Storytelling Educacional\n• E-Learning e Tendências\n• Metodologias Ativas\n\nTodos escritos por nosso fundador Alberto Dimande, especialista em Planeamento Territorial e Desenvolvimento Web.',
        suggestions: ['Ver blog', 'Ler artigos', 'Inscrever-se na newsletter']
      };
    }
    
    // Resposta padrão
    return {
      content: 'Obrigado pela sua mensagem! Como assistente BW360, posso ajudá-lo com:\n\n• Orientações acadêmicas\n• Consultoria profissional\n• Informações sobre nossos serviços\n• Agendamento de consultas\n• Suporte técnico\n\nComo posso ser mais específico em ajudá-lo?',
      suggestions: ['Ver serviços', 'Agendar consulta', 'Falar com humano']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de resposta
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        suggestions: botResponse.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const handleSuggestion = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary-gold rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 text-white" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] glass rounded-xl shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">BW360 Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary-purple text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestion(suggestion)}
                            className="px-3 py-1 bg-primary-gold/20 text-primary-gold rounded-full text-xs hover:bg-primary-gold/30 transition-colors duration-300"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-3">Ações rápidas:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors duration-300"
                    >
                      <action.icon className="w-4 h-4 text-primary-gold mb-1" />
                      <p className="text-xs font-medium text-white">{action.title}</p>
                      <p className="text-xs text-gray-400">{action.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-primary-purple text-white rounded-lg hover:bg-primary-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
