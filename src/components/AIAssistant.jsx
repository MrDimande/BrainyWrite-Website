import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Bot, Briefcase, GraduationCap, MessageCircle, Send, Star, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! 👋 Sou o BW360, seu assistente virtual da BrainyWrite. Estou aqui para ajudá-lo com qualquer dúvida sobre nossos serviços, processos ou sobre a empresa. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Trabalhos Acadêmicos',
      description: 'Monografias, teses e artigos',
      action: 'Quero saber sobre trabalhos acadêmicos'
    },
    {
      icon: GraduationCap,
      title: 'Acompanhamento Online',
      description: 'Tutoria para universidades',
      action: 'Como funciona o acompanhamento online?'
    },
    {
      icon: Briefcase,
      title: 'Consultoria Profissional',
      description: 'CV, carreira e branding',
      action: 'Preciso de ajuda profissional'
    },
    {
      icon: Star,
      title: 'Ver Portfólio',
      description: 'Nossos projetos realizados',
      action: 'Mostre-me o portfólio'
    }
  ];

  const generateBotResponse = (userMessage, context = []) => {
    const message = userMessage.toLowerCase().trim();
    const recentContext = context.slice(-3).join(' ').toLowerCase();
    const fullContext = `${message} ${recentContext}`;

    // Saudações e cumprimentos
    if (message.match(/^(oi|olá|olá|hey|e aí|bom dia|boa tarde|boa noite|hello|hi)$/i)) {
      return {
        content: 'Olá! 😊 Fico feliz em falar com você! Como posso ajudá-lo hoje? Posso falar sobre nossos serviços, processos, preços, ou qualquer outra dúvida que tenha sobre a BrainyWrite.',
        suggestions: ['Ver serviços', 'Saber preços', 'Como funciona?']
      };
    }

    // Agradecimentos
    if (message.match(/(obrigad[oa]|valeu|thanks|thank you|grato)/i)) {
      return {
        content: 'De nada! 😊 Fico feliz em ajudar! Se tiver mais alguma dúvida, estou sempre aqui. Deseja saber mais sobre algum de nossos serviços?',
        suggestions: ['Ver serviços', 'Falar com humano', 'Ver portfólio']
      };
    }

    // Trabalhos acadêmicos - múltiplas variações
    if (fullContext.match(/(trabalho|acadêmico|monografia|tese|dissertação|artigo científico|projeto de pesquisa|relatório técnico|tcc|trabalho de conclusão)/i)) {
      const responses = [
        {
          content: 'Ótimo! Trabalhamos com produção completa de trabalhos acadêmicos! 📚\n\nOferecemos:\n\n• Monografias e Teses (Licenciatura, Mestrado, Doutoramento)\n• Artigos Científicos\n• Projetos de Pesquisa\n• Relatórios Técnicos\n• Revisão e Formatação (ABNT, APA, Vancouver, ISO)\n\nTrabalhamos com rigor científico, garantindo originalidade e qualidade. Qual é o seu nível acadêmico?',
          suggestions: ['Ver preços', 'Solicitar cotação', 'Como funciona?']
        },
        {
          content: 'Perfeito! Somos especialistas em trabalhos acadêmicos! 🎓\n\nNossos diferenciais:\n\n✅ Originalidade garantida (100%)\n✅ Revisões ilimitadas\n✅ Formatação profissional\n✅ Suporte para UNISED, UNISA, UCM, USTM e outras\n✅ Entrega no prazo\n✅ Confidencialidade total\n\nQual tipo de trabalho você precisa?',
          suggestions: ['Ver detalhes', 'Solicitar cotação', 'Falar com especialista']
        }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Acompanhamento Online
    if (fullContext.match(/(acompanhamento|tutoria|suporte|online|unesed|unisa|ucm|são tomás|ustm|universidade pedagógica)/i)) {
      return {
        content: 'Excelente escolha! Nosso acompanhamento online oferece suporte completo! 🎓\n\nTrabalhamos com:\n\n• UPM (Universidade Pedagógica)\n• UNISA (University of South Africa)\n• UCM (Universidade Católica)\n• USTM (São Tomás de Moçambique)\n• E outras instituições\n\nO que oferecemos:\n\n✅ Tutoria personalizada 1-a-1\n✅ Suporte 24/7 para dúvidas\n✅ Preparação para exames\n✅ Assistência em trabalhos e provas\n✅ Mentoria acadêmica contínua\n\nPreço: 3.000-8.000 MT/mês (conforme modalidade)\n\nGostaria de agendar uma consulta?',
        suggestions: ['Agendar consulta', 'Ver preços', 'Como funciona?']
      };
    }

    // Consultoria Profissional
    if (fullContext.match(/(cv|currículo|entrevista|carreira|profissional|branding|linkedin|desenvolvimento profissional|emprego|trabalho)/i)) {
      return {
        content: 'Perfeito! Ajudamos você a destacar-se profissionalmente! 💼\n\nNossos serviços incluem:\n\n• Criação e otimização de CV profissional\n• Cartas de motivação personalizadas\n• Preparação completa para entrevistas\n• Personal Branding estratégico\n• Otimização de perfil LinkedIn\n• Planos de carreira personalizados\n\nJá ajudamos muitos profissionais a alcançarem seus objetivos! Quer ver alguns casos de sucesso?',
        suggestions: ['Ver portfólio', 'Agendar consulta', 'Ver preços']
      };
    }

    // Preços e valores
    if (fullContext.match(/(preço|preços|custo|quanto|valor|tarifa|pagamento|forma de pagamento)/i)) {
      return {
        content: 'Ótima pergunta! Nossos preços são personalizados conforme cada projeto! 💰\n\nFaixas de preço:\n\n• Trabalhos Acadêmicos: A partir de 2.500 MT\n  (varia conforme páginas, nível, prazo e complexidade)\n\n• Acompanhamento Online: 3.000-8.000 MT/mês\n  (conforme modalidade e carga horária)\n\n• Consultoria Profissional: 500-6.000 MT\n  (pacotes personalizados disponíveis)\n\n💡 Para uma cotação exata, recomendo preencher nosso formulário de cotação. Ele calcula automaticamente o valor baseado nas suas necessidades específicas!',
        suggestions: ['Solicitar cotação', 'Ver todos os serviços', 'Falar com consultor']
      };
    }

    // Contato e localização
    if (fullContext.match(/(contato|telefone|whatsapp|email|localização|endereço|onde|maputo|moçambique)/i)) {
      return {
        content: 'Aqui estão nossos dados de contato! 📞\n\n📱 Telefone/WhatsApp:\n• +258 87 088 3476\n• +258 82 088 3428\n\n📧 Email:\n• contato.brainywrite@gmail.com\n\n📍 Localização:\n• Av. Julius Nyerere\n• Polana Canico B\n• Maputo, Moçambique\n\n🕐 Horário de Atendimento:\n• Segunda a Sexta: 08h00 - 17h00\n• Sábado: 08h00 - 13h00\n• Domingo: Encerrado\n\nEstamos sempre prontos para ajudar! 😊',
        suggestions: ['Agendar consulta', 'Enviar mensagem', 'Ver no mapa']
      };
    }

    // Blog e conteúdo
    if (fullContext.match(/(blog|artigo|conteúdo|publicação|alberto dimande|ia|inteligência artificial|storytelling|e-learning)/i)) {
      return {
        content: 'Temos um blog incrível com conteúdo de qualidade! 📝\n\nNossos artigos abordam:\n\n• IA na Educação\n• Storytelling Educacional\n• E-Learning e Tendências\n• Metodologias Ativas\n• Planeamento Territorial\n\nTodos escritos por nosso fundador Alberto Dimande, especialista em Planeamento e Ordenamento Territorial, com experiência em Programação e Desenvolvimento Web.\n\nOs artigos são pensados especialmente para o contexto moçambicano e africano! Quer dar uma olhada?',
        suggestions: ['Ver blog', 'Ler artigos', 'Sobre o autor']
      };
    }

    // Portfólio e casos de sucesso
    if (fullContext.match(/(portfólio|projetos|casos|sucesso|realizados|exemplos|trabalhos feitos)/i)) {
      return {
        content: 'Temos orgulho do nosso portfólio! 🌟\n\nJá realizamos:\n\n• 50+ projetos concluídos\n• 40+ clientes satisfeitos\n• Trabalhos para UEM, UNISA, UCM, USTM e outras\n• Monografias, teses e artigos científicos\n• Projetos de consultoria profissional\n\nNossos resultados:\n✅ Taxa de aprovação: 100%\n✅ Notas médias: 17-18/20\n✅ Satisfação do cliente: 4.8/5\n\nQuer ver alguns casos específicos?',
        suggestions: ['Ver portfólio', 'Ver detalhes', 'Falar com cliente']
      };
    }

    // Processo e como funciona
    if (fullContext.match(/(como funciona|processo|passo|etapas|como trabalham|metodologia)/i)) {
      return {
        content: 'Ótima pergunta! Nosso processo é simples e transparente! 🔄\n\n📋 Passo a passo:\n\n1️⃣ Consulta Inicial\n   Entendemos suas necessidades e objetivos\n\n2️⃣ Proposta Personalizada\n   Criamos um plano de trabalho sob medida\n\n3️⃣ Execução e Acompanhamento\n   Desenvolvemos com qualidade e prazo garantidos\n\n4️⃣ Entrega e Suporte\n   Entregamos o resultado e oferecemos suporte pós-entrega\n\nVocê acompanha tudo em tempo real e pode solicitar revisões ilimitadas! Quer saber mais sobre algum passo específico?',
        suggestions: ['Ver detalhes', 'Agendar consulta', 'Ver garantias']
      };
    }

    // Garantias
    if (fullContext.match(/(garantia|garantido|confiança|seguro|confidencial|originalidade|plágio)/i)) {
      return {
        content: 'Temos garantias sólidas para sua tranquilidade! 🛡️\n\n✅ Originalidade garantida (100%)\n✅ Revisões ilimitadas até você ficar satisfeito\n✅ Confidencialidade total\n✅ Entrega sempre no prazo\n✅ Suporte pós-entrega\n✅ Satisfação garantida ou seu dinheiro de volta\n\nTrabalhamos com transparência total e você pode acompanhar cada etapa do processo. Sua confiança é nossa prioridade!',
        suggestions: ['Ver portfólio', 'Falar com cliente', 'Agendar consulta']
      };
    }

    // Sobre a empresa
    if (fullContext.match(/(sobre|empresa|brainywrite|quem somos|história|missão|visão|valores|alberto|rabeca|fundador|co-fundadora)/i)) {
      return {
        content: 'Ótimo que queira nos conhecer melhor! 🏢\n\nA BrainyWrite é uma consultoria acadêmica e profissional fundada em 2023, com foco em transformar desafios em oportunidades de excelência.\n\n👥 Fundadores:\n\n👤 Alberto Dimande - Fundador e CEO\n   • Licenciado em Planeamento e Ordenamento Territorial\n   • Especialista em Programação e Desenvolvimento Web\n\n👤 Rabeca Come - Co-Fundadora\n   • Licenciada em Planeamento e Ordenamento Territorial\n   • Especialista em Pesquisa e Survey\n\n🎯 Missão: Transformar desafios acadêmicos e profissionais em oportunidades de excelência\n\n👁️ Visão: Ser referência em consultoria acadêmica e profissional em Moçambique\n\n💎 Valores: Excelência, Integridade, Inovação e Compromisso\n\nJá atendemos 40+ clientes satisfeitos! Quer fazer parte?',
        suggestions: ['Ver serviços', 'Agendar consulta', 'Ver portfólio']
      };
    }

    // Instituições parceiras
    if (fullContext.match(/(universidade|instituição|parceira|upm|unisa|ucm|ustm|uem|colaboração)/i)) {
      return {
        content: 'Trabalhamos com diversas instituições! 🎓\n\nInstituições com as quais já colaboramos:\n\n• UPM (Universidade Pedagógica)\n• UCM (Universidade Católica de Moçambique)\n• UNISCED (Universidade Pedagógica de Moçambique)\n• USTM (Universidade São Tomás de Moçambique)\n• UNISA (University of South Africa)\n• ISCIM (Instituto Superior de Comunicação e Imagem)\n• ISPO (Instituto Superior Politécnico)\n• E outras...\n\nTemos experiência com os padrões e requisitos de cada instituição! Sua universidade está na lista?',
        suggestions: ['Ver serviços', 'Agendar consulta', 'Falar com especialista']
      };
    }

    // Agendamento e cotação
    if (fullContext.match(/(agendar|consulta|marcar|cotacao|cotação|solicitar|pedir|formulário)/i)) {
      return {
        content: 'Perfeito! Vamos começar! 🚀\n\nVocê pode:\n\n📅 Agendar uma consulta gratuita\n   • Discutimos suas necessidades\n   • Criamos um plano personalizado\n   • Sem compromisso!\n\n💰 Solicitar uma cotação detalhada\n   • Formulário rápido e fácil\n   • Cálculo automático de preço\n   • Resposta em até 24h\n\nQual prefere? Posso te guiar em qualquer uma das opções!',
        suggestions: ['Agendar consulta', 'Solicitar cotação', 'Ver preços']
      };
    }

    // Respostas de despedida
    if (fullContext.match(/(tchau|até|bye|até logo|até breve|nos falamos|falou)/i)) {
      return {
        content: 'Foi um prazer conversar com você! 👋\n\nEspero ter ajudado! Se tiver mais alguma dúvida, estou sempre aqui. Boa sorte com seus projetos!\n\nLembre-se: estamos aqui para transformar seus desafios em oportunidades de sucesso! 💪✨',
        suggestions: []
      };
    }

    // Resposta padrão mais natural e útil
    const defaultResponses = [
      {
        content: 'Entendo! Deixe-me ajudá-lo melhor. 😊\n\nPosso falar sobre:\n\n📚 Trabalhos Acadêmicos (monografias, teses, artigos)\n🎓 Acompanhamento Online (tutoria para universidades)\n💼 Consultoria Profissional (CV, carreira, branding)\n💰 Preços e cotações\n📞 Contato e localização\n📝 Blog e conteúdo\n🌟 Portfólio e casos de sucesso\n\nSobre o que você gostaria de saber mais?',
        suggestions: ['Ver serviços', 'Saber preços', 'Como funciona?']
      },
      {
        content: 'Interessante! 🤔\n\nPara te ajudar melhor, posso falar sobre:\n\n• Nossos 3 serviços principais\n• Como funciona nosso processo\n• Preços e formas de pagamento\n• Garantias e qualidade\n• Casos de sucesso\n• Como agendar ou solicitar cotação\n\nO que mais te interessa?',
        suggestions: ['Ver todos os serviços', 'Agendar consulta', 'Ver portfólio']
      }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
    const newContext = [...conversationContext, inputMessage];
    setConversationContext(newContext);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de resposta (mais natural)
    const delay = 800 + Math.random() * 700; // Entre 800ms e 1500ms

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, newContext);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse.content,
        suggestions: botResponse.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const handleSuggestion = (suggestion) => {
    // Navegação baseada em sugestões
    if (suggestion.includes('cotação') || suggestion.includes('Solicitar')) {
      navigate('/cotacao');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Agendar') || suggestion.includes('consulta')) {
      navigate('/agendar');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('portfólio') || suggestion.includes('Portfólio')) {
      navigate('/portfolio');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('blog') || suggestion.includes('Blog')) {
      navigate('/blog');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('serviços') || suggestion.includes('Serviços')) {
      navigate('/servicos');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('contato') || suggestion.includes('Contacto')) {
      navigate('/contacto');
      setIsOpen(false);
      return;
    }

    // Caso contrário, apenas preenche a mensagem
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
                  <div className={`max-w-[85%] flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-purple to-primary-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-black" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary-purple text-white rounded-tr-none'
                          : 'bg-gray-700 text-gray-100 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestion(suggestion)}
                              className="px-3 py-1.5 bg-primary-gold/20 text-primary-gold rounded-full text-xs hover:bg-primary-gold/30 transition-all duration-300 hover:scale-105 font-medium"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />

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
