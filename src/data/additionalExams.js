// Additional Mathematics exams with varied difficulties

export const additionalMathExams = [
  {
    id: "mat-002",
    subject: "Matemática",
    title: "Geometria Plana - Nível Básico",
    description: "Áreas, perímetros e formas geométricas básicas",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      {
        id: 1,
        question_text: "Qual é a área de um retângulo com base 5m e altura 3m?",
        options: ["A) 8 m²", "B) 15 m²", "C) 16 m²", "D) 18 m²"],
        correct_answer: "B",
        explanation: "Área do retângulo = base × altura = 5 × 3 = 15 m²"
      },
      {
        id: 2,
        question_text: "O perímetro de um quadrado com lado 4cm é:",
        options: ["A) 8 cm", "B) 12 cm", "C) 16 cm", "D) 20 cm"],
        correct_answer: "C",
        explanation: "Perímetro = 4 × lado = 4 × 4 = 16 cm"
      },
      {
        id: 3,
        question_text: "Quantos lados tem um hexágono?",
        options: ["A) 5", "B) 6", "C) 7", "D) 8"],
        correct_answer: "B",
        explanation: "Hexágono é um polígono de 6 lados"
      },
      {
        id: 4,
        question_text: "A área de um triângulo com base 6cm e altura 4cm é:",
        options: ["A) 10 cm²", "B) 12 cm²", "C) 24 cm²", "D) 20 cm²"],
        correct_answer: "B",
        explanation: "Área = (base × altura) / 2 = (6 × 4) / 2 = 12 cm²"
      },
      {
        id: 5,
        question_text: "Um círculo tem raio 3cm. Qual é o seu diâmetro?",
        options: ["A) 3 cm", "B) 6 cm", "C) 9 cm", "D) 12 cm"],
        correct_answer: "B",
        explanation: "Diâmetro = 2 × raio = 2 × 3 = 6 cm"
      },
      {
        id: 6,
        question_text: "A soma dos ângulos internos de um triângulo é:",
        options: ["A) 90°", "B) 180°", "C) 270°", "D) 360°"],
        correct_answer: "B",
        explanation: "A soma dos ângulos internos de qualquer triângulo é sempre 180°"
      },
      {
        id: 7,
        question_text: "Se um ângulo mede 45°, qual é o seu complemento?",
        options: ["A) 35°", "B) 45°", "C) 55°", "D) 135°"],
        correct_answer: "B",
        explanation: "Ângulos complementares somam 90°. 90° - 45° = 45°"
      },
      {
        id: 8,
        question_text: "O perímetro de um triângulo equilátero com lado 5cm é:",
        options: ["A) 10 cm", "B) 15 cm", "C) 20 cm", "D) 25 cm"],
        correct_answer: "B",
        explanation: "Perímetro = 3 × lado = 3 × 5 = 15 cm"
      },
      {
        id: 9,
        question_text: "Quantas diagonais tem um quadrado?",
        options: ["A) 1", "B) 2", "C) 3", "D) 4"],
        correct_answer: "B",
        explanation: "Um quadrado tem 2 diagonais que se cruzam no centro"
      },
      {
        id: 10,
        question_text: "A área de um quadrado com lado 7m é:",
        options: ["A) 14 m²", "B) 28 m²", "C) 49 m²", "D) 56 m²"],
        correct_answer: "C",
        explanation: "Área do quadrado = lado² = 7² = 49 m²"
      }
    ]
  },
  
  {
    id: "mat-003",
    subject: "Matemática",
    title: "Funções e Gráficos",
    description: "Funções lineares, quadráticas e análise de gráficos",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      {
        id: 1,
        question_text: "Qual é a raiz da função f(x) = 2x - 6?",
        options: ["A) x = 2", "B) x = 3", "C) x = 4", "D) x = 6"],
        correct_answer: "B",
        explanation: "Raiz é quando f(x) = 0: 2x - 6 = 0, então x = 3"
      },
      {
        id: 2,
        question_text: "A função f(x) = x² - 4 tem quantas raízes reais?",
        options: ["A) 0", "B) 1", "C) 2", "D) 3"],
        correct_answer: "C",
        explanation: "x² - 4 = 0, então x² = 4, logo x = ±2 (duas raízes)"
      },
      {
        id: 3,
        question_text: "O vértice da parábola y = x² está em:",
        options: ["A) (0, 0)", "B) (1, 1)", "C) (0, 1)", "D) (1, 0)"],
        correct_answer: "A",
        explanation: "Para y = x², o vértice está na origem (0, 0)"
      },
      {
        id: 4,
        question_text: "Se f(x) = 3x + 2, qual é f(0)?",
        options: ["A) 0", "B) 2", "C) 3", "D) 5"],
        correct_answer: "B",
        explanation: "f(0) = 3(0) + 2 = 2"
      },
      {
        id: 5,
        question_text: "Uma função crescente tem coeficiente angular:",
        options: ["A) Negativo", "B) Zero", "C) Positivo", "D) Indefinido"],
        correct_answer: "C",
        explanation: "Funções crescentes têm coeficiente angular positivo (m > 0)"
      },
      {
        id: 6,
        question_text: "O gráfico de y = -x² + 4 tem concavidade:",
        options: ["A) Para cima", "B) Para baixo", "C) Não tem", "D) Depende de x"],
        correct_answer: "B",
        explanation: "Como o coeficiente de x² é negativo (-1), a concavidade é para baixo"
      },
      {
        id: 7,
        question_text: "Qual ponto pertence à reta y = 2x + 1?",
        options: ["A) (1, 2)", "B) (2, 5)", "C) (0, 2)", "D) (1, 1)"],
        correct_answer: "B",
        explanation: "Para x = 2: y = 2(2) + 1 = 5, então (2, 5) pertence à reta"
      },
      {
        id: 8,
        question_text: "A função f(x) = 5 é uma função:",
        options: ["A) Linear", "B) Constante", "C) Quadrática", "D) Exponencial"],
        correct_answer: "B",
        explanation: "f(x) = 5 é uma função constante (sempre retorna 5)"
      },
      {
        id: 9,
        question_text: "Duas retas paralelas têm coeficientes angulares:",
        options: ["A) Diferentes", "B) Iguais", "C) Opostos", "D) Inversos"],
        correct_answer: "B",
        explanation: "Retas paralelas têm o mesmo coeficiente angular"
      },
      {
        id: 10,
        question_text: "O domínio da função f(x) = √x é:",
        options: ["A) Todos os reais", "B) x ≥ 0", "C) x > 0", "D) x ≠ 0"],
        correct_answer: "B",
        explanation: "Raiz quadrada só aceita números não-negativos, então x ≥ 0"
      }
    ]
  },
  
  {
    id: "mat-004",
    subject: "Matemática",
    title: "Trigonometria Avançada",
    description: "Seno, cosseno, tangente e identidades trigonométricas",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      {
        id: 1,
        question_text: "Qual é o valor de sen(30°)?",
        options: ["A) 0", "B) 1/2", "C) √2/2", "D) √3/2"],
        correct_answer: "B",
        explanation: "sen(30°) = 1/2 é um valor trigonométrico fundamental"
      },
      {
        id: 2,
        question_text: "cos²(x) + sen²(x) é igual a:",
        options: ["A) 0", "B) 1", "C) 2", "D) sen(2x)"],
        correct_answer: "B",
        explanation: "Esta é a identidade trigonométrica fundamental: cos²(x) + sen²(x) = 1"
      },
      {
        id: 3,
        question_text: "tg(x) é igual a:",
        options: ["A) sen(x)/cos(x)", "B) cos(x)/sen(x)", "C) sen(x)·cos(x)", "D) 1/sen(x)"],
        correct_answer: "A",
        explanation: "Por definição, tg(x) = sen(x)/cos(x)"
      },
      {
        id: 4,
        question_text: "Qual é o período da função f(x) = sen(x)?",
        options: ["A) π", "B) 2π", "C) π/2", "D) 4π"],
        correct_answer: "B",
        explanation: "A função seno completa um ciclo a cada 2π radianos"
      },
      {
        id: 5,
        question_text: "sen(90°) é igual a:",
        options: ["A) 0", "B) 1/2", "C) 1", "D) √3/2"],
        correct_answer: "C",
        explanation: "sen(90°) = 1 é o valor máximo da função seno"
      },
      {
        id: 6,
        question_text: "Se cos(x) = 3/5 e x está no 1º quadrante, sen(x) vale:",
        options: ["A) 3/5", "B) 4/5", "C) 5/3", "D) 2/5"],
        correct_answer: "B",
        explanation: "Usando cos²(x) + sen²(x) = 1: sen²(x) = 1 - 9/25 = 16/25, logo sen(x) = 4/5"
      },
      {
        id: 7,
        question_text: "tg(45°) é igual a:",
        options: ["A) 0", "B) 1/2", "C) 1", "D) √2"],
        correct_answer: "C",
        explanation: "tg(45°) = 1 porque sen(45°) = cos(45°)"
      },
      {
        id: 8,
        question_text: "A amplitude da função y = 3·sen(x) é:",
        options: ["A) 1", "B) 2", "C) 3", "D) 6"],
        correct_answer: "C",
        explanation: "A amplitude é o coeficiente que multiplica o seno, portanto 3"
      },
      {
        id: 9,
        question_text: "cos(0°) é igual a:",
        options: ["A) 0", "B) 1", "C) -1", "D) 1/2"],
        correct_answer: "B",
        explanation: "cos(0°) = 1 é o valor máximo da função cosseno"
      },
      {
        id: 10,
        question_text: "Em qual quadrante seno e cosseno são ambos negativos?",
        options: ["A) 1º", "B) 2º", "C) 3º", "D) 4º"],
        correct_answer: "C",
        explanation: "No 3º quadrante (180° a 270°), ambos sen e cos são negativos"
      }
    ]
  },
  
  {
    id: "mat-005",
    subject: "Matemática",
    title: "Probabilidade e Estatística Básica",
    description: "Conceitos fundamentais de probabilidade, média e moda",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      {
        id: 1,
        question_text: "Ao lançar um dado, qual a probabilidade de sair 6?",
        options: ["A) 1/2", "B) 1/3", "C) 1/4", "D) 1/6"],
        correct_answer: "D",
        explanation: "O dado tem 6 faces, então P(6) = 1/6"
      },
      {
        id: 2,
        question_text: "A média de 2, 4, 6, 8 é:",
        options: ["A) 4", "B) 5", "C) 6", "D) 7"],
        correct_answer: "B",
        explanation: "Média = (2+4+6+8)/4 = 20/4 = 5"
      },
      {
        id: 3,
        question_text: "A moda do conjunto {3, 5, 5, 7, 9} é:",
        options: ["A) 3", "B) 5", "C) 7", "D) 9"],
        correct_answer: "B",
        explanation: "Moda é o valor mais frequente: 5 aparece duas vezes"
      },
      {
        id: 4,
        question_text: "Ao lançar uma moeda, a probabilidade de sair cara é:",
        options: ["A) 0", "B) 1/4", "C) 1/2", "D) 1"],
        correct_answer: "C",
        explanation: "Moeda tem 2 lados igualmente prováveis, então P(cara) = 1/2"
      },
      {
        id: 5,
        question_text: "A mediana de {1, 3, 5, 7, 9} é:",
        options: ["A) 1", "B) 3", "C) 5", "D) 7"],
        correct_answer: "C",
        explanation: "Mediana é o valor central quando ordenado: 5 está no meio"
      },
      {
        id: 6,
        question_text: "Num saco com 5 bolas vermelhas e 3 azuis, qual é P(vermelha)?",
        options: ["A) 3/8", "B) 5/8", "C) 1/2", "D) 2/3"],
        correct_answer: "B",
        explanation: "P(vermelha) = 5/(5+3) = 5/8"
      },
      {
        id: 7,
        question_text: "A amplitude do conjunto {10, 15, 20, 25} é:",
        options: ["A) 10", "B) 15", "C) 20", "D) 25"],
        correct_answer: "B",
        explanation: "Amplitude = máximo - mínimo = 25 - 10 = 15"
      },
      {
        id: 8,
        question_text: "Qual é a probabilidade de um evento certo?",
        options: ["A) 0", "B) 0,5", "C) 0,8", "D) 1"],
        correct_answer: "D",
        explanation: "Evento certo tem probabilidade = 1 (100%)"
      },
      {
        id: 9,
        question_text: "A média de 10 e 20 é:",
        options: ["A) 10", "B) 15", "C) 20", "D) 30"],
        correct_answer: "B",
        explanation: "Média = (10+20)/2 = 30/2 = 15"
      },
      {
        id: 10,
        question_text: "Quantos resultados possíveis ao lançar 2 moedas?",
        options: ["A) 2", "B) 3", "C) 4", "D) 6"],
        correct_answer: "C",
        explanation: "2 moedas: (C,C), (C,K), (K,C), (K,K) = 4 resultados"
      }
    ]
  }
];

// Additional Portuguese exams
export const additionalPortExams = [
  {
    id: "port-002",
    subject: "Português",
    title: "Ortografia e Acentuação",
    description: "Regras de acentuação, uso de S/Z/X/Ch e pontuação",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Qual palavra está escrita corretamente?", options: ["A) Exceção", "B) Excessão", "C) Esceção", "D) Ecseção"], correct_answer: "A", explanation: "Exceção escreve-se com x e ç." },
      { id: 2, question_text: "Qual destas palavras é proparoxítona?", options: ["A) Café", "B) Árvore", "C) Mesa", "D) Computador"], correct_answer: "B", explanation: "Árvore tem a antepenúltima sílaba tônica, logo é proparoxítona." },
      { id: 3, question_text: "O uso da crase está correto em:", options: ["A) Vou à escola", "B) Vou a escola", "C) Vou á escola", "D) Vou à ela"], correct_answer: "A", explanation: "Quem vai, vai a algum lugar + a (artigo) escola = à escola." },
      { id: 4, question_text: "Qual o plural de 'cidadão'?", options: ["A) Cidadões", "B) Cidadãos", "C) Cidadães", "D) Cidadãoes"], correct_answer: "B", explanation: "O plural correto de cidadão é cidadãos." },
      { id: 5, question_text: "Complete: Ele ___ que estudar mais.", options: ["A) tem", "B) têm", "C) teem", "D) ten"], correct_answer: "A", explanation: "Ele (singular) tem. Eles (plural) têm." },
      { id: 6, question_text: "Qual palavra deve ser acentuada?", options: ["A) Mesa", "B) Caju", "C) Voce", "D) Parede"], correct_answer: "C", explanation: "Você é oxítona terminada em e, logo leva acento." },
      { id: 7, question_text: "Sinônimo de 'efêmero':", options: ["A) Duradouro", "B) Passageiro", "C) Forte", "D) Antigo"], correct_answer: "B", explanation: "Efêmero significa algo que dura pouco, passageiro." },
      { id: 8, question_text: "Antônimo de 'altruísta':", options: ["A) Bondoso", "B) Egoísta", "C) Generoso", "D) Amável"], correct_answer: "B", explanation: "Altruísta pensa nos outros; egoísta pensa em si." },
      { id: 9, question_text: "Qual frase está pontuada corretamente?", options: ["A) Olá, tudo bem?", "B) Olá tudo, bem?", "C) Olá tudo bem?", "D) Olá, tudo, bem?"], correct_answer: "A", explanation: "O vocativo 'Olá' deve ser separado por vírgula." },
      { id: 10, question_text: "A palavra 'pássaro' tem quantos fonemas?", options: ["A) 7", "B) 6", "C) 5", "D) 8"], correct_answer: "B", explanation: "P-á-ss-a-r-o (ss conta como 1 som/fonema). 6 fonemas." }
    ]
  },
  {
    id: "port-003",
    subject: "Português",
    title: "Literatura Moçambicana",
    description: "Obras, autores e movimentos literários de Moçambique",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Quem escreveu 'Terra Sonâmbula'?", options: ["A) Mia Couto", "B) José Craveirinha", "C) Paulina Chiziane", "D) Ungulani Ba Ka Khosa"], correct_answer: "A", explanation: "Mia Couto é o autor de Terra Sonâmbula." },
      { id: 2, question_text: "Qual é considerada a primeira romancista moçambicana?", options: ["A) Noémia de Sousa", "B) Paulina Chiziane", "C) Lília Momplé", "D) Sónia Sultuane"], correct_answer: "B", explanation: "Paulina Chiziane publicou 'Balada de Amor ao Vento', o primeiro romance de uma moçambicana." },
      { id: 3, question_text: "José Craveirinha é conhecido como:", options: ["A) O poeta do amor", "B) O poeta maior", "C) O romancista", "D) O dramaturgo"], correct_answer: "B", explanation: "Craveirinha é frequentemente chamado de Poeta Maior de Moçambique." },
      { id: 4, question_text: "A obra 'Nós Matámos o Cão Tinhoso' é de:", options: ["A) Luís Bernardo Honwana", "B) Mia Couto", "C) Rui de Noronha", "D) Marcelino dos Santos"], correct_answer: "A", explanation: "É um clássico de Luís Bernardo Honwana." },
      { id: 5, question_text: "Qual destes não é um escritor moçambicano?", options: ["A) Ungulani Ba Ka Khosa", "B) Pepetela", "C) Eduardo White", "D) Armando Artur"], correct_answer: "B", explanation: "Pepetela é um escritor angolano." },
      { id: 6, question_text: "O poema 'Grito Negro' é de autoria de:", options: ["A) José Craveirinha", "B) Noémia de Sousa", "C) Rui de Noronha", "D) Rui Knopfli"], correct_answer: "A", explanation: "Um dos poemas mais famosos de Craveirinha." },
      { id: 7, question_text: "A 'Charrua' foi uma importante:", options: ["A) Revista literária", "B) Editora", "C) Livraria", "D) Biblioteca"], correct_answer: "A", explanation: "A revista Charrua foi fundamental para a literatura moçambicana nos anos 80." },
      { id: 8, question_text: "Quem escreveu 'Ualalapi'?", options: ["A) Mia Couto", "B) Ungulani Ba Ka Khosa", "C) Paulina Chiziane", "D) João Paulo Borges Coelho"], correct_answer: "B", explanation: "Ualalapi é a obra-prima de Ungulani Ba Ka Khosa." },
      { id: 9, question_text: "A poesia de combate está associada a qual período?", options: ["A) Pós-independência", "B) Luta de Libertação", "C) Século XIX", "D) Atualidade"], correct_answer: "B", explanation: "Poesia usada como arma cultural durante a luta contra o colonialismo." },
      { id: 10, question_text: "Mia Couto ganhou qual prêmio importante em 2013?", options: ["A) Nobel", "B) Camões", "C) Booker", "D) Pulitzer"], correct_answer: "B", explanation: "Ele venceu o Prêmio Camões, o mais importante da língua portuguesa." }
    ]
  },
  {
    id: "port-004",
    subject: "Português",
    title: "Análise e Interpretação de Texto",
    description: "Compreensão de leitura, inferências e tipos textuais",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Qual é a função da linguagem focada no emissor?", options: ["A) Conativa", "B) Emotiva", "C) Referencial", "D) Metalinguística"], correct_answer: "B", explanation: "Função emotiva ou expressiva foca nos sentimentos do emissor." },
      { id: 2, question_text: "O que é uma metáfora?", options: ["A) Comparação implícita", "B) Exagero", "C) Som repetido", "D) Oposição"], correct_answer: "A", explanation: "Metáfora é uma comparação sem usar conectivos como 'como'." },
      { id: 3, question_text: "Identifique a figura de linguagem: 'Chorou rios de lágrimas'.", options: ["A) Metáfora", "B) Hipérbole", "C) Eufemismo", "D) Ironia"], correct_answer: "B", explanation: "Hipérbole é o exagero intencional." },
      { id: 4, question_text: "Um texto dissertativo-argumentativo visa:", options: ["A) Contar uma história", "B) Descrever um objeto", "C) Convencer o leitor", "D) Instruir"], correct_answer: "C", explanation: "O objetivo principal é defender uma tese e convencer." },
      { id: 5, question_text: "O que é coesão textual?", options: ["A) Ideias lógicas", "B) Ligação gramatical entre partes", "C) Vocabulário rico", "D) Tamanho do texto"], correct_answer: "B", explanation: "Coesão refere-se aos mecanismos gramaticais que ligam o texto." },
      { id: 6, question_text: "Qual é o narrador onisciente?", options: ["A) Participa da história", "B) Sabe tudo sobre os personagens", "C) Observa de fora sem saber pensamentos", "D) É o protagonista"], correct_answer: "B", explanation: "O onisciente conhece passado, futuro e pensamentos de todos." },
      { id: 7, question_text: "O que é intertextualidade?", options: ["A) Texto sem sentido", "B) Diálogo entre textos", "C) Texto digital", "D) Texto traduzido"], correct_answer: "B", explanation: "Referência explícita ou implícita de um texto a outro." },
      { id: 8, question_text: "Qual a ideia central de um texto jornalístico?", options: ["A) Entreter", "B) Informar", "C) Emocionar", "D) Vender"], correct_answer: "B", explanation: "A função primária do jornalismo é informar fatos." },
      { id: 9, question_text: "O que é ambiguidade?", options: ["A) Clareza", "B) Duplo sentido", "C) Mentira", "D) Ironia"], correct_answer: "B", explanation: "Possibilidade de mais de uma interpretação." },
      { id: 10, question_text: "Qual tipo textual apresenta instruções?", options: ["A) Narrativo", "B) Descritivo", "C) Injuntivo", "D) Dissertativo"], correct_answer: "C", explanation: "Texto injuntivo dá ordens ou instruções (ex: receitas, manuais)." }
    ]
  },
  {
    id: "port-005",
    subject: "Português",
    title: "Verbos e Conjugação",
    description: "Tempos verbais, modos e vozes",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Qual verbo está no pretérito perfeito?", options: ["A) Cantava", "B) Cantei", "C) Cantara", "D) Cantaria"], correct_answer: "B", explanation: "Cantei indica uma ação concluída no passado." },
      { id: 2, question_text: "O futuro do pretérito indica:", options: ["A) Certeza", "B) Dúvida ou condição", "C) Ordem", "D) Passado distante"], correct_answer: "B", explanation: "Indica algo que aconteceria sob certa condição (ex: eu faria)." },
      { id: 3, question_text: "Qual é a voz passiva de 'O menino quebrou o vaso'?", options: ["A) O vaso quebrou", "B) O vaso foi quebrado pelo menino", "C) O menino tinha quebrado", "D) O vaso quebrou-se"], correct_answer: "B", explanation: "Sujeito paciente + verbo ser + particípio + agente da passiva." },
      { id: 4, question_text: "Verbo 'pôr' pertence a qual conjugação?", options: ["A) 1ª", "B) 2ª", "C) 3ª", "D) 4ª"], correct_answer: "B", explanation: "Vem do latim 'ponere', logo pertence à 2ª conjugação (vogal temática E)." },
      { id: 5, question_text: "Qual modo verbal expressa ordem?", options: ["A) Indicativo", "B) Subjuntivo", "C) Imperativo", "D) Infinitivo"], correct_answer: "C", explanation: "Imperativo é usado para ordens, pedidos ou conselhos." },
      { id: 6, question_text: "Conjugação correta de 'ver' na 1ª pessoa do singular do presente:", options: ["A) Vio", "B) Vejo", "C) Vêo", "D) Vi"], correct_answer: "B", explanation: "Eu vejo." },
      { id: 7, question_text: "O particípio de 'escrever' é:", options: ["A) Escrevido", "B) Escrito", "C) Escrevendo", "D) Escrevo"], correct_answer: "B", explanation: "Verbo irregular, particípio é escrito." },
      { id: 8, question_text: "Qual frase tem verbo no subjuntivo?", options: ["A) Eu vou", "B) Se eu fosse", "C) Ele foi", "D) Nós vamos"], correct_answer: "B", explanation: "'Fosse' é pretérito imperfeito do subjuntivo (hipótese)." },
      { id: 9, question_text: "Gerúndio de 'fazer':", options: ["A) Fazido", "B) Feito", "C) Fazendo", "D) Fazer"], correct_answer: "C", explanation: "Terminação -ndo indica gerúndio." },
      { id: 10, question_text: "Verbo 'haver' no sentido de existir é:", options: ["A) Pessoal", "B) Impessoal", "C) Auxiliar", "D) De ligação"], correct_answer: "B", explanation: "Não tem sujeito e fica na 3ª pessoa do singular." }
    ]
  }
];

// Additional Geography exams
export const additionalGeoExams = [
  {
    id: "geo-002",
    subject: "Geografia",
    title: "Climas de África",
    description: "Tipos climáticos, fatores e vegetação associada",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Qual clima predomina no norte de África?", options: ["A) Tropical", "B) Desértico", "C) Equatorial", "D) Mediterrânico"], correct_answer: "B", explanation: "O Deserto do Saara ocupa grande parte do norte." },
      { id: 2, question_text: "Onde se encontra o clima equatorial em África?", options: ["A) Sul", "B) Centro (Bacia do Congo)", "C) Norte", "D) Leste"], correct_answer: "B", explanation: "Na região central, próximo à linha do Equador." },
      { id: 3, question_text: "Qual vegetação está associada ao clima tropical húmido?", options: ["A) Deserto", "B) Savana", "C) Floresta Densa", "D) Tundra"], correct_answer: "B", explanation: "A savana é típica das regiões tropicais com estação seca." },
      { id: 4, question_text: "O clima mediterrânico ocorre em que extremidades de África?", options: ["A) Norte e Sul", "B) Leste e Oeste", "C) Apenas Norte", "D) Apenas Sul"], correct_answer: "A", explanation: "No extremo norte (Magrebe) e extremo sul (Cabo)." },
      { id: 5, question_text: "Qual fator mais influencia o clima na África Oriental (ex: Quênia)?", options: ["A) Latitude", "B) Altitude", "C) Oceanos", "D) Ventos"], correct_answer: "B", explanation: "A altitude elevada torna o clima mais ameno." },
      { id: 6, question_text: "O deserto do Namibe é um deserto:", options: ["A) Quente e interior", "B) Costeiro e frio", "C) Tropical", "D) Equatorial"], correct_answer: "B", explanation: "Influenciado pela corrente fria de Benguela." },
      { id: 7, question_text: "As chuvas no clima equatorial são:", options: ["A) Raras", "B) Sazonais", "C) Abundantes o ano todo", "D) Apenas no inverno"], correct_answer: "C", explanation: "Chove praticamente todos os dias." },
      { id: 8, question_text: "Qual é o maior deserto quente do mundo?", options: ["A) Calaári", "B) Namibe", "C) Saara", "D) Gobi"], correct_answer: "C", explanation: "O Saara, localizado no norte de África." },
      { id: 9, question_text: "A corrente de Benguela é:", options: ["A) Quente", "B) Fria", "C) Morna", "D) Estagnada"], correct_answer: "B", explanation: "Corrente fria que banha a costa sudoeste." },
      { id: 10, question_text: "O clima semiárido é característico do:", options: ["A) Sahel", "B) Congo", "C) Nilo", "D) Atlas"], correct_answer: "A", explanation: "O Sahel é a faixa de transição entre o Saara e a savana." }
    ]
  },
  {
    id: "geo-003",
    subject: "Geografia",
    title: "Hidrografia de Moçambique",
    description: "Rios, bacias hidrográficas e lagos de Moçambique",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Qual é o maior rio que desagua em Moçambique?", options: ["A) Limpopo", "B) Zambeze", "C) Save", "D) Rovuma"], correct_answer: "B", explanation: "O Rio Zambeze é o maior e mais importante." },
      { id: 2, question_text: "A barragem de Cahora Bassa fica no rio:", options: ["A) Limpopo", "B) Zambeze", "C) Púngue", "D) Incomáti"], correct_answer: "B", explanation: "Localizada no Rio Zambeze, província de Tete." },
      { id: 3, question_text: "O rio Rovuma faz fronteira com:", options: ["A) África do Sul", "B) Zimbábue", "C) Tanzânia", "D) Malawi"], correct_answer: "C", explanation: "Marca a fronteira norte com a Tanzânia." },
      { id: 4, question_text: "Qual rio nasce na África do Sul e desagua em Xai-Xai?", options: ["A) Save", "B) Limpopo", "C) Incomáti", "D) Maputo"], correct_answer: "B", explanation: "O Rio Limpopo." },
      { id: 5, question_text: "O Lago Niassa é partilhado com:", options: ["A) Zâmbia e Zimbábue", "B) Malawi e Tanzânia", "C) Suazilândia", "D) Quênia"], correct_answer: "B", explanation: "Moçambique, Malawi e Tanzânia partilham o lago." },
      { id: 6, question_text: "A maioria dos rios moçambicanos corre no sentido:", options: ["A) Norte-Sul", "B) Sul-Norte", "C) Oeste-Leste", "D) Leste-Oeste"], correct_answer: "C", explanation: "Do interior (alto relevo) para o Oceano Índico (leste)." },
      { id: 7, question_text: "O rio Save separa as províncias de:", options: ["A) Maputo e Gaza", "B) Sofala e Inhambane", "C) Tete e Manica", "D) Nampula e Zambézia"], correct_answer: "B", explanation: "Separa o sul (Inhambane) do centro (Sofala)." },
      { id: 8, question_text: "Qual destes rios não é internacional?", options: ["A) Zambeze", "B) Limpopo", "C) Messalo", "D) Incomáti"], correct_answer: "C", explanation: "O Messalo nasce e desagua dentro de Moçambique (Cabo Delgado)." },
      { id: 9, question_text: "A barragem de Massingir fica no rio:", options: ["A) Elefantes", "B) Zambeze", "C) Save", "D) Búzi"], correct_answer: "A", explanation: "Afluente do Limpopo." },
      { id: 10, question_text: "O regime dos rios moçambicanos é:", options: ["A) Nival", "B) Pluvial tropical", "C) Glacial", "D) Misto"], correct_answer: "B", explanation: "Depende das chuvas (pluvial) sazonais." }
    ]
  },
  {
    id: "geo-004",
    subject: "Geografia",
    title: "Recursos Naturais e Minerais",
    description: "Mineração, recursos energéticos e economia",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Onde se explora carvão mineral em grande escala?", options: ["A) Maputo", "B) Tete", "C) Nampula", "D) Niassa"], correct_answer: "B", explanation: "Moatize, em Tete, tem grandes reservas de carvão." },
      { id: 2, question_text: "O gás natural é explorado principalmente em:", options: ["A) Inhambane e Cabo Delgado", "B) Tete", "C) Manica", "D) Gaza"], correct_answer: "A", explanation: "Pande/Temane (Inhambane) e Bacia do Rovuma (Cabo Delgado)." },
      { id: 3, question_text: "As areias pesadas são exploradas em:", options: ["A) Moma e Chibuto", "B) Tete", "C) Manica", "D) Lichinga"], correct_answer: "A", explanation: "Moma (Nampula) e Chibuto (Gaza)." },
      { id: 4, question_text: "Ouro é tradicionalmente explorado em:", options: ["A) Manica", "B) Maputo", "C) Inhambane", "D) Sofala"], correct_answer: "A", explanation: "Província de Manica tem histórico de exploração de ouro." },
      { id: 5, question_text: "Rubis são extraídos em:", options: ["A) Montepuez (Cabo Delgado)", "B) Tete", "C) Beira", "D) Xai-Xai"], correct_answer: "A", explanation: "Montepuez tem uma das maiores minas de rubi do mundo." },
      { id: 6, question_text: "A principal fonte de energia elétrica de Moçambique é:", options: ["A) Solar", "B) Eólica", "C) Hidroelétrica", "D) Térmica"], correct_answer: "C", explanation: "Barragem de Cahora Bassa é a principal fonte." },
      { id: 7, question_text: "O alumínio é processado na Mozal, localizada em:", options: ["A) Beira", "B) Nacala", "C) Maputo (Beluluane)", "D) Tete"], correct_answer: "C", explanation: "Fica na província de Maputo." },
      { id: 8, question_text: "Grafite é explorada em:", options: ["A) Cabo Delgado", "B) Gaza", "C) Inhambane", "D) Sofala"], correct_answer: "A", explanation: "Balama, Cabo Delgado." },
      { id: 9, question_text: "Qual recurso é usado para produzir cimento?", options: ["A) Calcário", "B) Ouro", "C) Carvão", "D) Gás"], correct_answer: "A", explanation: "Calcário é a matéria-prima principal." },
      { id: 10, question_text: "A exploração de recursos não renováveis pode causar:", options: ["A) Aumento da biodiversidade", "B) Impactos ambientais", "C) Reflorestamento", "D) Chuvas regulares"], correct_answer: "B", explanation: "Poluição, desmatamento e erosão são impactos comuns." }
    ]
  },
  {
    id: "geo-005",
    subject: "Geografia",
    title: "Geografia Humana e Urbana",
    description: "População, migrações e urbanização",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A população moçambicana é predominantemente:", options: ["A) Idosa", "B) Jovem", "C) Adulta", "D) Envelhecida"], correct_answer: "B", explanation: "A base da pirâmide etária é larga, indicando muitos jovens." },
      { id: 2, question_text: "O movimento da população do campo para a cidade chama-se:", options: ["A) Êxodo rural", "B) Imigração", "C) Emigração", "D) Turismo"], correct_answer: "A", explanation: "Saída do campo para a cidade." },
      { id: 3, question_text: "A maior densidade populacional está em:", options: ["A) Niassa", "B) Nampula e Zambézia", "C) Tete", "D) Gaza"], correct_answer: "B", explanation: "São as províncias mais populosas." },
      { id: 4, question_text: "A taxa de natalidade em Moçambique é:", options: ["A) Baixa", "B) Muito baixa", "C) Alta", "D) Negativa"], correct_answer: "C", explanation: "Característica de países em desenvolvimento." },
      { id: 5, question_text: "Qual é a capital de Moçambique?", options: ["A) Beira", "B) Nampula", "C) Maputo", "D) Matola"], correct_answer: "C", explanation: "Maputo é a capital e maior cidade." },
      { id: 6, question_text: "O setor de atividade que emprega mais pessoas é:", options: ["A) Indústria", "B) Serviços", "C) Agricultura", "D) Mineração"], correct_answer: "C", explanation: "A agricultura familiar é a base de sustento da maioria." },
      { id: 7, question_text: "A cidade da Beira é importante pelo seu:", options: ["A) Aeroporto", "B) Porto", "C) Turismo de neve", "D) Minério"], correct_answer: "B", explanation: "O Porto da Beira serve o interior e países vizinhos." },
      { id: 8, question_text: "O que é crescimento vegetativo?", options: ["A) Natalidade - Mortalidade", "B) Imigração - Emigração", "C) Total de habitantes", "D) PIB"], correct_answer: "A", explanation: "Diferença entre nascimentos e mortes." },
      { id: 9, question_text: "Nacala é famosa por ter:", options: ["A) O porto de águas profundas", "B) Minas de ouro", "C) O maior rio", "D) A capital"], correct_answer: "A", explanation: "Melhor porto natural da costa oriental de África." },
      { id: 10, question_text: "Problema comum nas grandes cidades moçambicanas:", options: ["A) Excesso de habitação", "B) Ordenamento perfeito", "C) Assentamentos informais", "D) Falta de pessoas"], correct_answer: "C", explanation: "Crescimento desordenado leva a bairros informais." }
    ]
  }
];

// Additional Physics exams
export const additionalPhysExams = [
  {
    id: "fis-002",
    subject: "Física",
    title: "Energia e Trabalho",
    description: "Energia cinética, potencial e conservação de energia",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A unidade de energia no Sistema Internacional é:", options: ["A) Newton", "B) Joule", "C) Watt", "D) Volt"], correct_answer: "B", explanation: "Joule (J) é a unidade padrão para energia e trabalho." },
      { id: 2, question_text: "Energia associada ao movimento chama-se:", options: ["A) Potencial", "B) Cinética", "C) Térmica", "D) Elétrica"], correct_answer: "B", explanation: "Cinética vem do grego 'kinesis' (movimento)." },
      { id: 3, question_text: "A fórmula da energia cinética é:", options: ["A) m·g·h", "B) 1/2·m·v²", "C) F·d", "D) m·a"], correct_answer: "B", explanation: "Ec = 1/2 · massa · velocidade ao quadrado." },
      { id: 4, question_text: "Energia potencial gravitacional depende de:", options: ["A) Velocidade", "B) Altura", "C) Tempo", "D) Temperatura"], correct_answer: "B", explanation: "Epg = m·g·h, onde h é a altura." },
      { id: 5, question_text: "O princípio da conservação da energia diz que:", options: ["A) A energia perde-se", "B) A energia cria-se", "C) A energia transforma-se", "D) A energia é infinita"], correct_answer: "C", explanation: "A energia não se cria nem se perde, apenas se transforma." },
      { id: 6, question_text: "Trabalho é definido como:", options: ["A) Força x Tempo", "B) Força x Deslocamento", "C) Massa x Aceleração", "D) Potência x Velocidade"], correct_answer: "B", explanation: "W = F · d · cos(θ)." },
      { id: 7, question_text: "Qual destas é uma fonte de energia renovável?", options: ["A) Carvão", "B) Petróleo", "C) Solar", "D) Gás Natural"], correct_answer: "C", explanation: "A energia solar é inesgotável à escala humana." },
      { id: 8, question_text: "A potência é a taxa de variação da:", options: ["A) Força", "B) Energia", "C) Velocidade", "D) Massa"], correct_answer: "B", explanation: "Potência = Energia / Tempo." },
      { id: 9, question_text: "Um objeto em queda livre ganha:", options: ["A) Energia Potencial", "B) Energia Cinética", "C) Massa", "D) Altura"], correct_answer: "B", explanation: "A energia potencial converte-se em cinética à medida que cai." },
      { id: 10, question_text: "A unidade de potência é:", options: ["A) Joule", "B) Watt", "C) Newton", "D) Ampere"], correct_answer: "B", explanation: "Watt (W) equivale a Joule por segundo (J/s)." }
    ]
  },
  {
    id: "fis-003",
    subject: "Física",
    title: "Óptica Geométrica",
    description: "Reflexão, refração, espelhos e lentes",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A luz propaga-se em linha reta em meios:", options: ["A) Opacos", "B) Homogêneos e transparentes", "C) Heterogêneos", "D) Qualquer meio"], correct_answer: "B", explanation: "Princípio da propagação retilínea da luz." },
      { id: 2, question_text: "O fenômeno que ocorre quando a luz bate num espelho é:", options: ["A) Refração", "B) Reflexão", "C) Difração", "D) Dispersão"], correct_answer: "B", explanation: "A luz volta ao meio de origem." },
      { id: 3, question_text: "Uma lente convergente pode corrigir:", options: ["A) Miopia", "B) Hipermetropia", "C) Astigmatismo", "D) Estrabismo"], correct_answer: "B", explanation: "Lentes convergentes corrigem a dificuldade de ver de perto." },
      { id: 4, question_text: "A velocidade da luz no vácuo é aproximadamente:", options: ["A) 300.000 km/s", "B) 340 m/s", "C) 1.000 km/h", "D) Infinita"], correct_answer: "A", explanation: "c ≈ 3 × 10^8 m/s." },
      { id: 5, question_text: "Quando a luz passa do ar para a água, ela sofre:", options: ["A) Reflexão total", "B) Refração", "C) Absorção", "D) Nada"], correct_answer: "B", explanation: "Muda de velocidade e direção ao mudar de meio." },
      { id: 6, question_text: "Um espelho convexo forma imagens sempre:", options: ["A) Reais e maiores", "B) Virtuais, direitas e menores", "C) Reais e invertidas", "D) Virtuais e maiores"], correct_answer: "B", explanation: "Usado em retrovisores para ampliar o campo de visão." },
      { id: 7, question_text: "O arco-íris é causado pela:", options: ["A) Reflexão", "B) Dispersão", "C) Interferência", "D) Polarização"], correct_answer: "B", explanation: "A luz branca separa-se nas suas cores componentes." },
      { id: 8, question_text: "O ângulo de incidência é igual ao ângulo de:", options: ["A) Refração", "B) Reflexão", "C) Difração", "D) Crítico"], correct_answer: "B", explanation: "Lei da reflexão: i = r." },
      { id: 9, question_text: "Qual cor tem a maior frequência?", options: ["A) Vermelho", "B) Verde", "C) Azul", "D) Violeta"], correct_answer: "D", explanation: "Violeta tem a menor frequência visível, vermelho a maior... espere, violeta tem maior frequência e menor comprimento de onda." },
      { id: 10, question_text: "A miopia é corrigida com lentes:", options: ["A) Convergentes", "B) Divergentes", "C) Planas", "D) Cilíndricas"], correct_answer: "B", explanation: "Lentes divergentes focam a imagem na retina." }
    ]
  },
  {
    id: "fis-004",
    subject: "Física",
    title: "Eletricidade Básica",
    description: "Cargas, corrente, tensão e resistência",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A unidade de corrente elétrica é:", options: ["A) Volt", "B) Ampere", "C) Ohm", "D) Watt"], correct_answer: "B", explanation: "Ampere (A) mede o fluxo de carga." },
      { id: 2, question_text: "A Lei de Ohm é expressa por:", options: ["A) V = R/I", "B) V = R·I", "C) I = V·R", "D) R = V·I"], correct_answer: "B", explanation: "Tensão = Resistência × Corrente." },
      { id: 3, question_text: "Materiais que não conduzem bem eletricidade são:", options: ["A) Condutores", "B) Isolantes", "C) Semicondutores", "D) Metais"], correct_answer: "B", explanation: "Ex: borracha, plástico, vidro." },
      { id: 4, question_text: "Cargas de sinais opostos:", options: ["A) Atraem-se", "B) Repelem-se", "C) Anulam-se", "D) Nada acontece"], correct_answer: "A", explanation: "Positivo atrai negativo." },
      { id: 5, question_text: "A unidade de resistência elétrica é:", options: ["A) Volt", "B) Ohm", "C) Ampere", "D) Joule"], correct_answer: "B", explanation: "Ohm (Ω)." },
      { id: 6, question_text: "Num circuito em série, a corrente é:", options: ["A) Diferente em cada resistor", "B) A mesma em todos os pontos", "C) Nula", "D) Infinita"], correct_answer: "B", explanation: "A corrente tem apenas um caminho a percorrer." },
      { id: 7, question_text: "Qual partícula carrega carga negativa?", options: ["A) Próton", "B) Nêutron", "C) Elétron", "D) Fóton"], correct_answer: "C", explanation: "Elétrons orbitam o núcleo e têm carga negativa." },
      { id: 8, question_text: "A tensão elétrica também é chamada de:", options: ["A) Potência", "B) Diferença de Potencial (ddp)", "C) Resistência", "D) Carga"], correct_answer: "B", explanation: "É a força que impulsiona os elétrons." },
      { id: 9, question_text: "Um fusível serve para:", options: ["A) Aumentar a tensão", "B) Proteger o circuito", "C) Gerar energia", "D) Armazenar carga"], correct_answer: "B", explanation: "Funde-se se a corrente for excessiva, abrindo o circuito." },
      { id: 10, question_text: "A unidade de carga elétrica é:", options: ["A) Coulomb", "B) Ampere", "C) Volt", "D) Watt"], correct_answer: "A", explanation: "Coulomb (C)." }
    ]
  },
  {
    id: "fis-005",
    subject: "Física",
    title: "Termodinâmica",
    description: "Calor, temperatura e leis da termodinâmica",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Temperatura mede:", options: ["A) Calor total", "B) Agitação das partículas", "C) Pressão", "D) Volume"], correct_answer: "B", explanation: "É a medida da energia cinética média das moléculas." },
      { id: 2, question_text: "O zero absoluto corresponde a:", options: ["A) 0°C", "B) -273°C", "C) 100°C", "D) -100°C"], correct_answer: "B", explanation: "0 Kelvin ≈ -273,15°C." },
      { id: 3, question_text: "Calor flui espontaneamente de:", options: ["A) Frio para quente", "B) Quente para frio", "C) Baixo para alto", "D) Não flui"], correct_answer: "B", explanation: "Segunda Lei da Termodinâmica." },
      { id: 4, question_text: "Qual processo de propagação de calor ocorre no vácuo?", options: ["A) Condução", "B) Convecção", "C) Irradiação", "D) Nenhum"], correct_answer: "C", explanation: "Ocorre através de ondas eletromagnéticas (ex: Sol para Terra)." },
      { id: 5, question_text: "A 1ª Lei da Termodinâmica trata da:", options: ["A) Entropia", "B) Conservação da energia", "C) Zero absoluto", "D) Expansão térmica"], correct_answer: "B", explanation: "Q = W + ΔU (Calor = Trabalho + Variação de Energia Interna)." },
      { id: 6, question_text: "A mudança de sólido para líquido chama-se:", options: ["A) Fusão", "B) Vaporização", "C) Solidificação", "D) Sublimação"], correct_answer: "A", explanation: "Derretimento do gelo, por exemplo." },
      { id: 7, question_text: "Calor específico é:", options: ["A) Calor total", "B) Calor para elevar 1g em 1°C", "C) Calor latente", "D) Temperatura"], correct_answer: "B", explanation: "Propriedade específica de cada substância." },
      { id: 8, question_text: "Numa expansão adiabática:", options: ["A) A temperatura sobe", "B) Não há troca de calor", "C) A pressão mantém-se", "D) O volume diminui"], correct_answer: "B", explanation: "O sistema não troca calor com o ambiente (Q=0)." },
      { id: 9, question_text: "A entropia de um sistema isolado tende a:", options: ["A) Diminuir", "B) Aumentar", "C) Permanecer constante", "D) Zerar"], correct_answer: "B", explanation: "Mede o grau de desordem (2ª Lei)." },
      { id: 10, question_text: "A água ferve a 100°C ao nível do mar. Na montanha ferve a:", options: ["A) Mais de 100°C", "B) Menos de 100°C", "C) Exatamente 100°C", "D) 0°C"], correct_answer: "B", explanation: "Menor pressão atmosférica = menor ponto de ebulição." }
    ]
  }
];

// Additional Chemistry exams
export const additionalChemExams = [
  {
    id: "qui-002",
    subject: "Química",
    title: "Reações Químicas",
    description: "Tipos de reações, balanceamento e leis ponderais",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Numa reação química, os materiais iniciais chamam-se:", options: ["A) Produtos", "B) Reagentes", "C) Catalisadores", "D) Resíduos"], correct_answer: "B", explanation: "Reagentes transformam-se em produtos." },
      { id: 2, question_text: "A queima de papel é um fenômeno:", options: ["A) Físico", "B) Químico", "C) Biológico", "D) Nuclear"], correct_answer: "B", explanation: "Há formação de novas substâncias (cinzas, fumaça)." },
      { id: 3, question_text: "A Lei de Lavoisier diz que:", options: ["A) A massa conserva-se", "B) A massa perde-se", "C) A massa aumenta", "D) Tudo se perde"], correct_answer: "A", explanation: "Na natureza nada se cria, nada se perde, tudo se transforma." },
      { id: 4, question_text: "Balancear uma equação serve para igualar:", options: ["A) O volume", "B) O número de átomos", "C) A cor", "D) O estado físico"], correct_answer: "B", explanation: "Garantir a conservação da massa." },
      { id: 5, question_text: "Uma reação que libera calor é:", options: ["A) Endotérmica", "B) Exotérmica", "C) Isotérmica", "D) Adiabática"], correct_answer: "B", explanation: "Exo = fora, libera energia térmica." },
      { id: 6, question_text: "Ferrugem é resultado de:", options: ["A) Evaporação", "B) Oxidação", "C) Fusão", "D) Sublimação"], correct_answer: "B", explanation: "Reação do ferro com oxigênio e umidade." },
      { id: 7, question_text: "Qual destes é um sinal de reação química?", options: ["A) Mudança de cor", "B) Mudança de estado", "C) Quebra", "D) Mistura"], correct_answer: "A", explanation: "Liberação de gás, mudança de cor, formação de precipitado." },
      { id: 8, question_text: "A + B -> C é uma reação de:", options: ["A) Decomposição", "B) Síntese", "C) Simples troca", "D) Dupla troca"], correct_answer: "B", explanation: "Dois reagentes formam um único produto." },
      { id: 9, question_text: "Catalisadores servem para:", options: ["A) Parar a reação", "B) Acelerar a reação", "C) Consumir reagentes", "D) Aumentar produtos"], correct_answer: "B", explanation: "Aumentam a velocidade sem serem consumidos." },
      { id: 10, question_text: "A eletrólise da água produz:", options: ["A) Vapor", "B) Hidrogênio e Oxigênio", "C) Gelo", "D) Sal"], correct_answer: "B", explanation: "Decomposição da água por eletricidade: 2H2O -> 2H2 + O2." }
    ]
  },
  {
    id: "qui-003",
    subject: "Química",
    title: "Ácidos e Bases",
    description: "pH, indicadores e reações de neutralização",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "O pH de uma solução neutra é:", options: ["A) 0", "B) 7", "C) 14", "D) 1"], correct_answer: "B", explanation: "A 25°C, pH 7 é neutro (água pura)." },
      { id: 2, question_text: "Ácidos têm sabor:", options: ["A) Amargo", "B) Azedo", "C) Doce", "D) Salgado"], correct_answer: "B", explanation: "Como limão ou vinagre." },
      { id: 3, question_text: "Bases tornam o papel de tornassol vermelho em:", options: ["A) Azul", "B) Verde", "C) Amarelo", "D) Branco"], correct_answer: "A", explanation: "Bases azulam o tornassol vermelho." },
      { id: 4, question_text: "Ácido + Base produz:", options: ["A) Sal + Água", "B) Ácido mais forte", "C) Gás", "D) Metal"], correct_answer: "A", explanation: "Reação de neutralização." },
      { id: 5, question_text: "Qual destes é um ácido forte?", options: ["A) Vinagre (Acético)", "B) Limão (Cítrico)", "C) Ácido Clorídrico (HCl)", "D) Água"], correct_answer: "C", explanation: "HCl ioniza-se quase totalmente em água." },
      { id: 6, question_text: "O pH do suco gástrico é aproximadamente:", options: ["A) 2", "B) 7", "C) 10", "D) 14"], correct_answer: "A", explanation: "Muito ácido para digerir alimentos." },
      { id: 7, question_text: "A soda cáustica (NaOH) é uma:", options: ["A) Base", "B) Ácido", "C) Sal", "D) Óxido"], correct_answer: "A", explanation: "Hidróxido de sódio é uma base forte." },
      { id: 8, question_text: "Indicador fenolftaleína em base fica:", options: ["A) Incolor", "B) Rosa/Vermelho", "C) Azul", "D) Amarelo"], correct_answer: "B", explanation: "Fica rosa intenso em meio básico." },
      { id: 9, question_text: "Chuva ácida é causada por óxidos de:", options: ["A) Enxofre e Nitrogênio", "B) Ferro", "C) Cálcio", "D) Ouro"], correct_answer: "A", explanation: "SO2 e NOx reagem com água formando ácidos." },
      { id: 10, question_text: "Uma solução com pH 12 é:", options: ["A) Ácida", "B) Básica", "C) Neutra", "D) Salina"], correct_answer: "B", explanation: "pH > 7 é básico." }
    ]
  },
  {
    id: "qui-004",
    subject: "Química",
    title: "Estequiometria",
    description: "Cálculos químicos, mol e massa molar",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "O número de Avogadro vale aproximadamente:", options: ["A) 6,02 x 10^23", "B) 3,14", "C) 9,8", "D) 100"], correct_answer: "A", explanation: "Partículas em 1 mol de substância." },
      { id: 2, question_text: "A massa molar da água (H2O) é:", options: ["A) 16 g/mol", "B) 18 g/mol", "C) 20 g/mol", "D) 10 g/mol"], correct_answer: "B", explanation: "H(1)x2 + O(16) = 18." },
      { id: 3, question_text: "Quantos mols há em 36g de água?", options: ["A) 1", "B) 2", "C) 3", "D) 4"], correct_answer: "B", explanation: "36g / 18g/mol = 2 mols." },
      { id: 4, question_text: "Volume molar de um gás nas CNTP é:", options: ["A) 22,4 L", "B) 10 L", "C) 100 L", "D) 1 L"], correct_answer: "A", explanation: "Condições Normais de Temperatura e Pressão." },
      { id: 5, question_text: "Lei de Proust refere-se às:", options: ["A) Proporções definidas", "B) Massas iguais", "C) Volumes iguais", "D) Gases"], correct_answer: "A", explanation: "A composição de uma substância pura é constante." },
      { id: 6, question_text: "Massa molar do CO2 (C=12, O=16):", options: ["A) 28", "B) 44", "C) 32", "D) 18"], correct_answer: "B", explanation: "12 + (16x2) = 44 g/mol." },
      { id: 7, question_text: "O reagente limitante é aquele que:", options: ["A) Sobra", "B) Acaba primeiro", "C) Não reage", "D) É catalisador"], correct_answer: "B", explanation: "Limita a quantidade de produto formado." },
      { id: 8, question_text: "Quantos átomos há em 1 mol de Fe?", options: ["A) 1", "B) 6,02 x 10^23", "C) 56", "D) 26"], correct_answer: "B", explanation: "Definição de mol." },
      { id: 9, question_text: "Rendimento de 100% significa:", options: ["A) Perda total", "B) Conversão total teórica", "C) Metade reagiu", "D) Nada reagiu"], correct_answer: "B", explanation: "Não houve perdas na reação." },
      { id: 10, question_text: "A fórmula mínima indica:", options: ["A) A proporção mais simples", "B) O número real de átomos", "C) A estrutura 3D", "D) A massa"], correct_answer: "A", explanation: "Ex: Glicose C6H12O6 -> CH2O." }
    ]
  },
  {
    id: "qui-005",
    subject: "Química",
    title: "Química Orgânica Básica",
    description: "Hidrocarbonetos, funções orgânicas e nomenclatura",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "O elemento principal da química orgânica é:", options: ["A) Oxigênio", "B) Carbono", "C) Nitrogênio", "D) Hidrogênio"], correct_answer: "B", explanation: "O carbono é tetravalente e forma cadeias." },
      { id: 2, question_text: "Hidrocarbonetos contêm apenas:", options: ["A) C e O", "B) C e H", "C) H e O", "D) C e N"], correct_answer: "B", explanation: "Carbono e Hidrogênio." },
      { id: 3, question_text: "O metano (CH4) é um:", options: ["A) Alcano", "B) Alceno", "C) Alcino", "D) Álcool"], correct_answer: "A", explanation: "Ligações simples apenas." },
      { id: 4, question_text: "O grupo funcional do álcool é:", options: ["A) -COOH", "B) -OH", "C) -NH2", "D) -CHO"], correct_answer: "B", explanation: "Hidroxila ligada a carbono saturado." },
      { id: 5, question_text: "O eteno é usado para:", options: ["A) Amadurecer frutas", "B) Limpar vidros", "C) Salgar comida", "D) Pintar"], correct_answer: "A", explanation: "Hormônio vegetal gasoso." },
      { id: 6, question_text: "Benzeno é um composto:", options: ["A) Aromático", "B) Alifático", "C) Inorgânico", "D) Metálico"], correct_answer: "A", explanation: "Possui anel benzênico com ressonância." },
      { id: 7, question_text: "O vinagre contém ácido:", options: ["A) Fórmico", "B) Acético (Etanoico)", "C) Butírico", "D) Clorídrico"], correct_answer: "B", explanation: "Ácido etanoico a ~4%." },
      { id: 8, question_text: "Isômeros têm:", options: ["A) Mesma fórmula molecular", "B) Mesma estrutura", "C) Massas diferentes", "D) Átomos diferentes"], correct_answer: "A", explanation: "Mas arranjos estruturais diferentes." },
      { id: 9, question_text: "O petróleo é uma mistura de:", options: ["A) Sais", "B) Hidrocarbonetos", "C) Ácidos", "D) Bases"], correct_answer: "B", explanation: "Principal fonte de combustíveis e plásticos." },
      { id: 10, question_text: "O polietileno é um:", options: ["A) Monômero", "B) Polímero", "C) Átomo", "D) Gás"], correct_answer: "B", explanation: "Plástico comum feito de muitas unidades de eteno." }
    ]
  }
];

// Additional Biology exams
export const additionalBioExams = [
  {
    id: "bio-002",
    subject: "Biologia",
    title: "Ecologia e Meio Ambiente",
    description: "Cadeias alimentares, relações ecológicas e biomas",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "O conjunto de seres vivos de uma região chama-se:", options: ["A) Biótopo", "B) Biocenose", "C) Ecossistema", "D) Biosfera"], correct_answer: "B", explanation: "Também chamada de comunidade biológica." },
      { id: 2, question_text: "Quem produz seu próprio alimento é:", options: ["A) Consumidor", "B) Decompositor", "C) Produtor", "D) Parasita"], correct_answer: "C", explanation: "Seres autotróficos, como as plantas." },
      { id: 3, question_text: "A relação onde ambos se beneficiam é:", options: ["A) Parasitismo", "B) Mutualismo", "C) Competição", "D) Predatismo"], correct_answer: "B", explanation: "Ex: líquens (algas + fungos)." },
      { id: 4, question_text: "Qual nível trófico tem mais energia?", options: ["A) Produtores", "B) Consumidores 1º", "C) Consumidores 2º", "D) Decompositores"], correct_answer: "A", explanation: "A energia diminui ao longo da cadeia alimentar." },
      { id: 5, question_text: "O desmatamento causa principalmente:", options: ["A) Aumento de O2", "B) Erosão do solo", "C) Chuvas", "D) Frio"], correct_answer: "B", explanation: "Sem raízes, o solo fica exposto." },
      { id: 6, question_text: "Animais que comem plantas são:", options: ["A) Carnívoros", "B) Herbívoros", "C) Onívoros", "D) Detritívoros"], correct_answer: "B", explanation: "Consumidores primários." },
      { id: 7, question_text: "O efeito estufa é causado por:", options: ["A) Oxigênio", "B) Nitrogênio", "C) Dióxido de Carbono", "D) Hélio"], correct_answer: "C", explanation: "O CO2 retém o calor na atmosfera." },
      { id: 8, question_text: "Qual bioma é característico de Moçambique?", options: ["A) Tundra", "B) Savana (Miombo)", "C) Taiga", "D) Deserto"], correct_answer: "B", explanation: "O Miombo cobre grande parte do país." },
      { id: 9, question_text: "Decompositores são importantes para:", options: ["A) Comer plantas", "B) Reciclar matéria", "C) Produzir O2", "D) Caçar"], correct_answer: "B", explanation: "Transformam matéria orgânica em inorgânica." },
      { id: 10, question_text: "A sucessão ecológica termina no estágio:", options: ["A) Pioneiro", "B) Intermediário", "C) Clímax", "D) Inicial"], correct_answer: "C", explanation: "Estágio de estabilidade máxima." }
    ]
  },
  {
    id: "bio-003",
    subject: "Biologia",
    title: "Fisiologia Humana",
    description: "Sistemas do corpo humano: digestivo, circulatório e respiratório",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Onde ocorre a troca gasosa nos pulmões?", options: ["A) Brônquios", "B) Traqueia", "C) Alvéolos", "D) Laringe"], correct_answer: "C", explanation: "Pequenos sacos de ar onde O2 entra e CO2 sai." },
      { id: 2, question_text: "Qual órgão bombeia o sangue?", options: ["A) Fígado", "B) Coração", "C) Pulmão", "D) Rim"], correct_answer: "B", explanation: "Músculo cardíaco impulsiona o sangue." },
      { id: 3, question_text: "A digestão das proteínas começa no:", options: ["A) Boca", "B) Estômago", "C) Intestino", "D) Esôfago"], correct_answer: "B", explanation: "Pela ação da pepsina e ácido clorídrico." },
      { id: 4, question_text: "O sangue arterial é rico em:", options: ["A) CO2", "B) Oxigênio", "C) Nitrogênio", "D) Glicose"], correct_answer: "B", explanation: "Sangue oxigenado que sai dos pulmões." },
      { id: 5, question_text: "Qual a função dos rins?", options: ["A) Digestionar", "B) Filtrar o sangue", "C) Respirar", "D) Pensar"], correct_answer: "B", explanation: "Removem excretas e formam a urina." },
      { id: 6, question_text: "A insulina é produzida pelo:", options: ["A) Fígado", "B) Pâncreas", "C) Baço", "D) Estômago"], correct_answer: "B", explanation: "Regula o nível de açúcar no sangue." },
      { id: 7, question_text: "Onde ocorre a absorção de nutrientes?", options: ["A) Estômago", "B) Intestino Delgado", "C) Intestino Grosso", "D) Boca"], correct_answer: "B", explanation: "Através das vilosidades intestinais." },
      { id: 8, question_text: "Células vermelhas do sangue chamam-se:", options: ["A) Leucócitos", "B) Plaquetas", "C) Hemácias", "D) Neurônios"], correct_answer: "C", explanation: "Transportam oxigênio." },
      { id: 9, question_text: "O sistema nervoso central é composto por:", options: ["A) Nervos", "B) Encéfalo e Medula", "C) Coração", "D) Músculos"], correct_answer: "B", explanation: "Centro de comando do corpo." },
      { id: 10, question_text: "A bile é produzida no:", options: ["A) Vesícula", "B) Fígado", "C) Pâncreas", "D) Estômago"], correct_answer: "B", explanation: "E armazenada na vesícula biliar." }
    ]
  },
  {
    id: "bio-004",
    subject: "Biologia",
    title: "Genética Básica",
    description: "DNA, herança, Mendel e biotecnologia",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "Onde está o material genético na célula eucarionte?", options: ["A) Citoplasma", "B) Núcleo", "C) Membrana", "D) Ribossomo"], correct_answer: "B", explanation: "Protegido pela carioteca." },
      { id: 2, question_text: "Quem é o pai da genética?", options: ["A) Darwin", "B) Mendel", "C) Watson", "D) Pasteur"], correct_answer: "B", explanation: "Gregor Mendel e suas ervilhas." },
      { id: 3, question_text: "O DNA é formado por:", options: ["A) Aminoácidos", "B) Nucleotídeos", "C) Lipídios", "D) Açúcares"], correct_answer: "B", explanation: "Base nitrogenada + açúcar + fosfato." },
      { id: 4, question_text: "Genótipo refere-se a:", options: ["A) Aparência", "B) Constituição genética", "C) Ambiente", "D) Comportamento"], correct_answer: "B", explanation: "O conjunto de genes de um indivíduo." },
      { id: 5, question_text: "Um indivíduo AA é:", options: ["A) Heterozigoto", "B) Homozigoto dominante", "C) Recessivo", "D) Híbrido"], correct_answer: "B", explanation: "Alelos iguais e dominantes." },
      { id: 6, question_text: "Quantos cromossomos tem o ser humano?", options: ["A) 23", "B) 46", "C) 48", "D) 92"], correct_answer: "B", explanation: "23 pares." },
      { id: 7, question_text: "A síndrome de Down é uma:", options: ["A) Doença viral", "B) Trissomia do 21", "C) Monossomia", "D) Infecção"], correct_answer: "B", explanation: "Um cromossomo extra no par 21." },
      { id: 8, question_text: "O RNA difere do DNA por ter:", options: ["A) Timina", "B) Uracila", "C) Dupla hélice", "D) Desoxirribose"], correct_answer: "B", explanation: "No RNA, Uracila substitui Timina." },
      { id: 9, question_text: "Transgênicos são organismos:", options: ["A) Naturais", "B) Geneticamente modificados", "C) Extintos", "D) Clones"], correct_answer: "B", explanation: "Receberam genes de outra espécie." },
      { id: 10, question_text: "A mitose gera células:", options: ["A) Diferentes", "B) Idênticas", "C) Haploides", "D) Mortas"], correct_answer: "B", explanation: "Divisão para crescimento e reparo." }
    ]
  },
  {
    id: "bio-005",
    subject: "Biologia",
    title: "Botânica",
    description: "Estrutura das plantas, fotossíntese e reprodução vegetal",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A fotossíntese ocorre nos:", options: ["A) Cloroplastos", "B) Mitocôndrias", "C) Ribossomos", "D) Núcleos"], correct_answer: "A", explanation: "Organelas que contêm clorofila." },
      { id: 2, question_text: "O xilema transporta:", options: ["A) Seiva elaborada", "B) Seiva bruta (água)", "C) Oxigênio", "D) Hormônios"], correct_answer: "B", explanation: "Das raízes para as folhas." },
      { id: 3, question_text: "Plantas com flores e frutos são:", options: ["A) Briófitas", "B) Pteridófitas", "C) Gimnospermas", "D) Angiospermas"], correct_answer: "D", explanation: "Grupo mais evoluído e diverso." },
      { id: 4, question_text: "A parte masculina da flor é o:", options: ["A) Gineceu", "B) Androceu", "C) Pétala", "D) Sépala"], correct_answer: "B", explanation: "Conjunto de estames." },
      { id: 5, question_text: "A transpiração nas plantas ocorre pelos:", options: ["A) Estômatos", "B) Pelos", "C) Raízes", "D) Caules"], correct_answer: "A", explanation: "Poros nas folhas que regulam trocas gasosas." },
      { id: 6, question_text: "Musgos são exemplos de:", options: ["A) Briófitas", "B) Pteridófitas", "C) Angiospermas", "D) Algas"], correct_answer: "A", explanation: "Plantas pequenas sem vasos condutores." },
      { id: 7, question_text: "O fruto origina-se do:", options: ["A) Óvulo", "B) Ovário", "C) Estigma", "D) Pólen"], correct_answer: "B", explanation: "Após a fecundação, o ovário desenvolve-se." },
      { id: 8, question_text: "A raiz serve para:", options: ["A) Fotossíntese", "B) Fixação e absorção", "C) Reprodução", "D) Transpiração"], correct_answer: "B", explanation: "Absorve água e sais minerais." },
      { id: 9, question_text: "Gimnospermas (ex: pinheiros) têm:", options: ["A) Frutos", "B) Sementes nuas", "C) Flores coloridas", "D) Esporos apenas"], correct_answer: "B", explanation: "Não formam frutos." },
      { id: 10, question_text: "Hormônio responsável pelo crescimento vegetal:", options: ["A) Insulina", "B) Auxina", "C) Adrenalina", "D) Testosterona"], correct_answer: "B", explanation: "Estimula o alongamento celular." }
    ]
  }
];

// Additional History exams
export const additionalHistExams = [
  {
    id: "his-002",
    subject: "História",
    title: "Período Colonial em Moçambique",
    description: "Resistência, administração colonial e economia",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A Conferência de Berlim (1884-85) decidiu:", options: ["A) O fim da escravatura", "B) A partilha de África", "C) A independência", "D) O comércio livre"], correct_answer: "B", explanation: "Definiu as regras para a ocupação efetiva de África." },
      { id: 2, question_text: "Quem foi Gungunhana?", options: ["A) Um explorador", "B) O último imperador de Gaza", "C) Um comerciante", "D) Um missionário"], correct_answer: "B", explanation: "Líder da resistência contra os portugueses no sul." },
      { id: 3, question_text: "O sistema de prazos ocorria no:", options: ["A) Sul", "B) Vale do Zambeze", "C) Norte", "D) Costa"], correct_answer: "B", explanation: "Terras arrendadas pela coroa portuguesa." },
      { id: 4, question_text: "O trabalho forçado chamava-se:", options: ["A) Xibalo", "B) Mcelo", "C) Lobolo", "D) Kuphahla"], correct_answer: "A", explanation: "Sistema de exploração de mão-de-obra indígena." },
      { id: 5, question_text: "As Companhias Majestáticas administravam:", options: ["A) Todo o país", "B) Manica e Sofala / Niassa", "C) Maputo", "D) Gaza"], correct_answer: "B", explanation: "Tinham poderes soberanos sobre vastos territórios." },
      { id: 6, question_text: "A batalha de Coolela marcou:", options: ["A) A vitória de Gungunhana", "B) A derrota do Império de Gaza", "C) A independência", "D) O início do comércio"], correct_answer: "B", explanation: "Fim da resistência organizada no sul (1895)." },
      { id: 7, question_text: "O Estado Novo em Portugal (Salazar) iniciou em:", options: ["A) 1910", "B) 1933", "C) 1975", "D) 1890"], correct_answer: "B", explanation: "Intensificou a exploração colonial." },
      { id: 8, question_text: "O massacre de Mueda ocorreu em:", options: ["A) 1960", "B) 1970", "C) 1950", "D) 1964"], correct_answer: "A", explanation: "Evento gatilho para a luta armada." },
      { id: 9, question_text: "A cultura obrigatória no norte era:", options: ["A) Trigo", "B) Algodão", "C) Arroz", "D) Milho"], correct_answer: "B", explanation: "Para abastecer a indústria têxtil portuguesa." },
      { id: 10, question_text: "Quem eram os assimilados?", options: ["A) Portugueses", "B) Moçambicanos com 'status' europeu", "C) Escravos", "D) Soldados"], correct_answer: "B", explanation: "Tinham que provar saber ler e ter hábitos europeus." }
    ]
  },
  {
    id: "his-003",
    subject: "História",
    title: "Luta de Libertação Nacional",
    description: "FRELIMO, guerra colonial e independência",
    difficulty: "medium",
    duration_minutes: 30,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A FRELIMO foi fundada em:", options: ["A) 1960", "B) 1962", "C) 1964", "D) 1975"], correct_answer: "B", explanation: "Em Dar-es-Salaam, Tanzânia." },
      { id: 2, question_text: "O primeiro presidente da FRELIMO foi:", options: ["A) Samora Machel", "B) Eduardo Mondlane", "C) Joaquim Chissano", "D) Filipe Nyusi"], correct_answer: "B", explanation: "Arquiteto da unidade nacional." },
      { id: 3, question_text: "A luta armada iniciou em:", options: ["A) 25 de Junho", "B) 25 de Setembro de 1964", "C) 3 de Fevereiro", "D) 7 de Setembro"], correct_answer: "B", explanation: "No posto administrativo de Chai." },
      { id: 4, question_text: "Quem sucedeu Mondlane após sua morte?", options: ["A) Marcelino dos Santos", "B) Samora Machel", "C) Uria Simango", "D) Alberto Chipande"], correct_answer: "B", explanation: "Tornou-se líder e depois primeiro presidente." },
      { id: 5, question_text: "Os Acordos de Lusaka foram assinados em:", options: ["A) 1973", "B) 1974", "C) 1975", "D) 1976"], correct_answer: "B", explanation: "7 de Setembro de 1974, definindo a independência." },
      { id: 6, question_text: "A independência de Moçambique foi em:", options: ["A) 1974", "B) 1975", "C) 1980", "D) 1964"], correct_answer: "B", explanation: "25 de Junho de 1975." },
      { id: 7, question_text: "Josina Machel foi uma heroína da:", options: ["A) Educação", "B) Luta armada e mulher", "C) Saúde", "D) Economia"], correct_answer: "B", explanation: "Símbolo da emancipação da mulher moçambicana." },
      { id: 8, question_text: "A Operação Nó Górdio foi:", options: ["A) Uma ofensiva da FRELIMO", "B) Uma ofensiva colonial (Kaúlza de Arriaga)", "C) Um acordo de paz", "D) Uma festa"], correct_answer: "B", explanation: "Maior operação militar portuguesa para tentar travar a FRELIMO." },
      { id: 9, question_text: "Onde Mondlane foi assassinado?", options: ["A) Maputo", "B) Dar-es-Salaam", "C) Chai", "D) Mueda"], correct_answer: "B", explanation: "Por uma encomenda bomba em 1969." },
      { id: 10, question_text: "O hino nacional na independência era:", options: ["A) Pátria Amada", "B) Viva, Viva a FRELIMO", "C) Kanimambo", "D) Moçambique"], correct_answer: "B", explanation: "Substituído depois por Pátria Amada." }
    ]
  },
  {
    id: "his-004",
    subject: "História",
    title: "África Contemporânea",
    description: "Independências, conflitos e desenvolvimento",
    difficulty: "hard",
    duration_minutes: 40,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A OUA (Organização da Unidade Africana) foi fundada em:", options: ["A) 1960", "B) 1963", "C) 2000", "D) 1950"], correct_answer: "B", explanation: "Para promover a unidade e solidariedade africana." },
      { id: 2, question_text: "O Apartheid foi um sistema de segregação na:", options: ["A) Namíbia", "B) África do Sul", "C) Zimbábue", "D) Angola"], correct_answer: "B", explanation: "Regime racista que durou até 1994." },
      { id: 3, question_text: "Nelson Mandela foi libertado em:", options: ["A) 1980", "B) 1990", "C) 1994", "D) 2000"], correct_answer: "B", explanation: "Após 27 anos de prisão." },
      { id: 4, question_text: "A Primavera Árabe (2010) começou na:", options: ["A) Líbia", "B) Tunísia", "C) Egito", "D) Argélia"], correct_answer: "B", explanation: "Série de protestos no norte de África." },
      { id: 5, question_text: "O Pan-africanismo defende:", options: ["A) A divisão de África", "B) A união de todos os povos africanos", "C) O colonialismo", "D) O capitalismo"], correct_answer: "B", explanation: "Movimento político e cultural de solidariedade." },
      { id: 6, question_text: "Kwame Nkrumah foi líder do:", options: ["A) Quênia", "B) Gana", "C) Nigéria", "D) Senegal"], correct_answer: "B", explanation: "Primeiro país da África subsaariana a ficar independente." },
      { id: 7, question_text: "A Guerra Fria influenciou África através de:", options: ["A) Ajuda humanitária apenas", "B) Conflitos por procuração (proxy wars)", "C) Paz total", "D) Comércio livre"], correct_answer: "B", explanation: "EUA e URSS apoiaram lados opostos em guerras civis (ex: Angola, Moçambique)." },
      { id: 8, question_text: "O genocídio de 1994 ocorreu no:", options: ["A) Sudão", "B) Ruanda", "C) Congo", "D) Somália"], correct_answer: "B", explanation: "Conflito entre Hutus e Tutsis." },
      { id: 9, question_text: "A União Africana (UA) substituiu a OUA em:", options: ["A) 1990", "B) 2002", "C) 2010", "D) 1999"], correct_answer: "B", explanation: "Com foco maior em integração econômica e política." },
      { id: 10, question_text: "O Sudão do Sul tornou-se independente em:", options: ["A) 2000", "B) 2011", "C) 2005", "D) 2015"], correct_answer: "B", explanation: "O país mais jovem de África." }
    ]
  },
  {
    id: "his-005",
    subject: "História",
    title: "Cultura Moçambicana",
    description: "Artes, línguas e tradições",
    difficulty: "easy",
    duration_minutes: 25,
    passing_score: 60,
    total_questions: 10,
    questions: [
      { id: 1, question_text: "A Marrabenta é um estilo musical do:", options: ["A) Norte", "B) Sul", "C) Centro", "D) Oeste"], correct_answer: "B", explanation: "Originário de Maputo/Gaza." },
      { id: 2, question_text: "Malangatana foi um famoso:", options: ["A) Músico", "B) Pintor", "C) Escritor", "D) Político"], correct_answer: "B", explanation: "Reconhecido mundialmente por suas pinturas." },
      { id: 3, question_text: "A Timbila é patrimônio da humanidade e é dos:", options: ["A) Macuas", "B) Chopes", "C) Rongas", "D) Senas"], correct_answer: "B", explanation: "Instrumento tradicional de Inhambane (Zavala)." },
      { id: 4, question_text: "O Mapico é uma dança tradicional de:", options: ["A) Cabo Delgado", "B) Maputo", "C) Tete", "D) Sofala"], correct_answer: "A", explanation: "Dança dos Macondes com máscaras." },
      { id: 5, question_text: "A língua oficial de Moçambique é:", options: ["A) Emakhuwa", "B) Português", "C) Changana", "D) Inglês"], correct_answer: "B", explanation: "Definido na Constituição." },
      { id: 6, question_text: "O Tufo é uma dança típica de:", options: ["A) Nampula", "B) Gaza", "C) Manica", "D) Tete"], correct_answer: "A", explanation: "Dança de influência árabe no litoral norte." },
      { id: 7, question_text: "A escultura Makonde é feita em:", options: ["A) Pedra", "B) Pau-preto (Ébano)", "C) Barro", "D) Metal"], correct_answer: "B", explanation: "Famosa pelos detalhes e madeira escura." },
      { id: 8, question_text: "A Xigubo é uma dança:", options: ["A) De casamento", "B) Guerreira", "C) De chuva", "D) De colheita"], correct_answer: "B", explanation: "Tradicional do sul, simulando combate." },
      { id: 9, question_text: "O Nyau (Gule Wamkulu) é praticado em:", options: ["A) Tete", "B) Maputo", "C) Inhambane", "D) Niassa"], correct_answer: "A", explanation: "Dança de máscaras dos Chewas." },
      { id: 10, question_text: "A gastronomia moçambicana usa muito:", options: ["A) Queijo", "B) Leite de coco e amendoim", "C) Azeite", "D) Manteiga"], correct_answer: "B", explanation: "Base de pratos como Matapa e Caril." }
    ]
  }
];

