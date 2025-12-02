// Sample exam data for all 7 subjects
// Each subject has 2 exams with 10 questions each


import {
    additionalBioExams,
    additionalChemExams,
    additionalGeoExams,
    additionalHistExams,
    additionalMathExams,
    additionalPhysExams,
    additionalPortExams
} from './additionalExams.js';

export const sampleExams = {
  matematica: [
   {
      id: "mat-001",
      subject: "Matemática",
      title: "Álgebra e Equações - 10ª Classe",
      description: "Teste de equações lineares, sistemas e inequações",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Resolva a equação: 3x + 7 = 22",
          options: ["A) x = 5", "B) x = 4", "C) x = 6", "D) x = 7"],
          correct_answer: "A",
          explanation: "Subtraindo 7 de ambos os lados: 3x = 15, logo x = 5"
        },
        {
          id: 2,
          question_text: "Qual é o valor de x em: 2(x - 3) = 10?",
          options: ["A) x = 6", "B) x = 7", "C) x = 8", "D) x = 9"],
          correct_answer: "C",
          explanation: "Expandindo: 2x - 6 = 10, então 2x = 16, logo x = 8"
        },
        {
          id: 3,
          question_text: "Se 5x - 2 = 3x + 6, qual é o valor de x?",
          options: ["A) x = 2", "B) x = 3", "C) x = 4", "D) x = 5"],
          correct_answer: "C",
          explanation: "Agrupando termos: 5x - 3x = 6 + 2, então 2x = 8, logo x = 4"
        },
        {
          id: 4,
          question_text: "Qual é a solução do sistema: x + y = 10 e x - y = 2?",
          options: ["A) x=6, y=4", "B) x=5, y=5", "C) x=7, y=3", "D) x=8, y=2"],
          correct_answer: "A",
          explanation: "Somando as equações: 2x = 12, então x = 6. Substituindo: y = 4",
          image_url: "/images/exams/matematica/sistema-equacoes.svg",
          image_alt: "Gráfico mostrando duas retas que se intersectam no ponto (6,4)",
          image_caption: "Sistema de equações lineares - ponto de interseção"
        },
        {
          id: 5,
          question_text: "Resolva: (x + 3)² = 25",
          options: ["A) x = 2 ou x = -8", "B) x = 3 ou x = -7", "C) x = 4 ou x = -6", "D) x = 5 ou x = -5"],
          correct_answer: "A",
          explanation: "Tirando a raiz quadrada: x + 3 = ±5, então x = 2 ou x = -8"
        },
        {
          id: 6,
          question_text: "Se f(x) = 2x + 1, qual é f(5)?",
          options: ["A) 9", "B) 10", "C) 11", "D) 12"],
          correct_answer: "C",
          explanation: "f(5) = 2(5) + 1 = 10 + 1 = 11"
        },
        {
          id: 7,
          question_text: "Qual inequação representa: 'o dobro de um número é maior que 12'?",
          options: ["A) 2x > 12", "B) 2x < 12", "C) x > 12", "D) 2x = 12"],
          correct_answer: "A",
          explanation: "O dobro de x é 2x, e deve ser maior (>) que 12"
        },
        {
          id: 8,
          question_text: "Resolva: x/4 + 2 = 5",
          options: ["A) x = 10", "B) x = 12", "C) x = 14", "D) x = 16"],
          correct_answer: "B",
          explanation: "x/4 = 3, multiplicando por 4: x = 12"
        },
        {
          id: 9,
          question_text: "Qual é o coeficiente angular da reta y = 3x - 5?",
          options: ["A) -5", "B) 3", "C) 5", "D) -3"],
          correct_answer: "B",
          explanation: "Na forma y = mx + b, m é o coeficiente angular, então m = 3",
          image_url: "/images/exams/matematica/grafico-linear.svg",
          image_alt: "Gráfico de uma função linear y = mx + b",
          image_caption: "Função linear - coeficiente angular"
        },
        {
          id: 10,
          question_text: "Se 4x = 28, qual é o valor de x + 3?",
          options: ["A) 8", "B) 9", "C) 10", "D) 11"],
          correct_answer: "C",
          explanation: "4x = 28, então x = 7. Portanto, x + 3 = 7 + 3 = 10"
        }
      ]
    },
    ...additionalMathExams
  ],

  portugues: [
    {
      id: "port-001",
      subject: "Português",
      title: "Gramática e Interpretação - 10ª Classe",
      description: "Teste de análise sintática, ortografia e compreensão textual",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Qual é o sujeito da frase: 'Os alunos estudaram muito para a prova'?",
          options: ["A) Os alunos", "B) estudaram", "C) para a prova", "D) muito"],
          correct_answer: "A",
          explanation: "O sujeito é quem pratica a ação do verbo. 'Os alunos' praticam a ação de estudar."
        },
        {
          id: 2,
          question_text: "Qual alternativa está correta quanto à ortografia?",
          options: ["A) Escessão", "B) Exceção", "C) Excessão", "D) Eceção"],
          correct_answer: "B",
          explanation: "A forma correta é 'exceção', com 'x' e 'ç'."
        },
        {
          id: 3,
          question_text: "Em 'A criança chorou muito', o verbo está no:",
          options: ["A) Presente", "B) Futuro", "C) Pretérito Perfeito", "D) Gerúndio"],
          correct_answer: "C",
          explanation: "'Chorou' é o pretérito perfeito do verbo chorar, indica ação concluída no passado."
        },
        {
          id: 4,
          question_text: "Qual é a função sintática de 'livro' em: 'Maria comprou um livro'?",
          options: ["A) Sujeito", "B) Predicado", "C) Objeto Direto", "D) Adjunto Adverbial"],
          correct_answer: "C",
          explanation: "'Livro' é o objeto direto, complemento do verbo comprar sem preposição."
        },
        {
          id: 5,
          question_text: "Qual frase apresenta uma metáfora?",
          options: [
            "A) O céu está azul",
            "B) Seus olhos são estrelas",
            "C) A menina corre rápido",
            "D) O carro é vermelho"
          ],
          correct_answer: "B",
          explanation: "Metáfora compara sem usar 'como'. 'Olhos são estrelas' é comparação implícita."
        },
        {
          id: 6,
          question_text: "Qual é o plural de 'cidadão'?",
          options: ["A) cidadões", "B) cidadãos", "C) cidadães", "D) cidadãoes"],
          correct_answer: "B",
          explanation: "Palavras terminadas em -ão fazem plural em -ãos, -ães ou -ões. 'Cidadão' vira 'cidadãos'."
        },
        {
          id: 7,
          question_text: "Em 'Rapidamente, ele saiu', a palavra 'rapidamente' é:",
          options: ["A) Adjetivo", "B) Advérbio", "C) Substantivo", "D) Verbo"],
          correct_answer: "B",
          explanation: "Advérbios de modo geralmente terminam em -mente e modificam verbos."
        },
        {
          id: 8,
          question_text: "Qual frase está na voz passiva?",
          options: [
            "A) O professor ensinou a lição",
            "B) A lição foi ensinada pelo professor",
            "C) Todos aprenderam",
            "D) Ele fez o trabalho"
          ],
          correct_answer: "B",
          explanation: "Voz passiva: sujeito sofre a ação. 'A lição foi ensinada' (sofre a ação)."
        },
        {
          id: 9,
          question_text: "Qual pronome completa: '_____ livro é meu'?",
          options: ["A) Este", "B) Essa", "C) Aquele", "D) Estes"],
          correct_answer: "A",
          explanation: "'Este' é pronome demonstrativo masculino singular para algo próximo."
        },
        {
          id: 10,
          question_text: "Qual palavra é um substantivo abstrato?",
          options: ["A) Mesa", "B) Felicidade", "C) Cadeira", "D) Livro"],
          correct_answer: "B",
          explanation: "Substantivos abstratos designam sentimentos, qualidades. 'Felicidade' é abstrato."
        }
      ]
    },
    ...additionalPortExams
  ],

  geografia: [
    {
      id: "geo-001",
      subject: "Geografia",
      title: "Geografia de Moçambique - 10ª Classe",
      description: "Teste sobre clima, relevo e recursos naturais de Moçambique",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Qual é a capital de Moçambique?",
          options: ["A) Beira", "B) Maputo", "C) Nampula", "D) Tete"],
          correct_answer: "B",
          explanation: "Maputo é a capital e maior cidade de Moçambique.",
          image_url: "/images/exams/geografia/mapa-mocambique.svg",
          image_alt: "Mapa de Moçambique com a capital Maputo destacada",
          image_caption: "Mapa de Moçambique"
        },
        {
          id: 2,
          question_text: "Quantas províncias tem Moçambique?",
          options: ["A) 9", "B) 10", "C) 11", "D) 12"],
          correct_answer: "C",
          explanation: "Moçambique tem 11 províncias, incluindo a cidade de Maputo.",
          image_url: "/images/exams/geografia/grafico-populacao.svg",
          image_alt: "Gráfico de população por região de Moçambique",
          image_caption: "Distribuição populacional por região"
        },
        {
          id: 3,
          question_text: "Qual é o maior rio de Moçambique?",
          options: ["A) Rio Limpopo", "B) Rio Save", "C) Rio Zambeze", "D) Rio Rovuma"],
          correct_answer: "C",
          explanation: "O Rio Zambeze é o maior rio que atravessa Moçambique."
        },
        {
          id: 4,
          question_text: "O clima predominante em Moçambique é:",
          options: ["A) Equatorial", "B) Tropical", "C) Temperado", "D) Desértico"],
          correct_answer: "B",
          explanation: "Moçambique tem clima predominantemente tropical, com estações chuvosa e seca."
        },
        {
          id: 5,
          question_text: "Qual oceano banha a costa de Moçambique?",
          options: ["A) Atlântico", "B) Pacífico", "C) Índico", "D) Ártico"],
          correct_answer: "C",
          explanation: "Moçambique é banhado pelo Oceano Índico a leste."
        },
        {
          id: 6,
          question_text: "A Barragem de Cahora Bassa está localizada no rio:",
          options: ["A) Limpopo", "B) Zambeze", "C) Save", "D) Incomati"],
          correct_answer: "B",
          explanation: "Cahora Bassa é uma das maiores barragens de África, no Rio Zambeze."
        },
        {
          id: 7,
          question_text: "Qual província é conhecida pela produção de caju?",
          options: ["A) Gaza", "B) Inhambane", "C) Nampula", "D) Maputo"],
          correct_answer: "C",
          explanation: "Nampula é a maior produtora de caju de Moçambique."
        },
        {
          id: 8,
          question_text: "O Monte Binga, ponto mais alto de Moçambique, está na província de:",
          options: ["A) Tete", "B) Manica", "C) Zambézia", "D) Niassa"],
          correct_answer: "B",
          explanation: "Monte Binga (2436m) localiza-se na província de Manica."
        },
        {
          id: 9,
          question_text: "Qual é o principal porto de Moçambique?",
          options: ["A) Porto da Beira", "B) Porto de Nacala", "C) Porto de Maputo", "D) Porto de Pemba"],
          correct_answer: "C",
          explanation: "O Porto de Maputo é o principal e mais movimentado de Moçambique."
        },
        {
          id: 10,
          question_text: "O Parque Nacional da Gorongosa localiza-se em:",
          options: ["A) Sofala", "B) Gaza", "C) Inhambane", "D) Manica"],
          correct_answer: "A",
          explanation: "O Parque Nacional da Gorongosa está na província de Sofala."
        }
      ]
    },
    ...additionalGeoExams
  ],

  fisica: [
    {
      id: "fis-001",
      subject: "Física",
      title: "Mecânica e Movimento - 10ª Classe",
      description: "Teste de cinemática, dinâmica e leis de Newton",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "A velocidade é a relação entre:",
          options: [
            "A) Massa e tempo",
            "B) Distância e tempo",
            "C) Força e massa",
            "D) Energia e trabalho"
          ],
          correct_answer: "B",
          explanation: "Velocidade = distância percorrida / tempo gasto (v = d/t)",
          image_url: "/images/exams/fisica/mru-grafico.svg",
          image_alt: "Gráfico de posição vs tempo no MRU",
          image_caption: "Movimento Retilíneo Uniforme"
        },
        {
          id: 2,
          question_text: "A unidade de força no Sistema Internacional é:",
          options: ["A) Joule", "B) Pascal", "C) Newton", "D) Watt"],
          correct_answer: "C",
          explanation: "A força é medida em Newton (N) no SI."
        },
        {
          id: 3,
          question_text: "A primeira lei de Newton é também conhecida como:",
          options: [
            "A) Lei da ação e reação",
            "B) Lei da inércia",
            "C) Lei da aceleração",
            "D) Lei da gravidade"
          ],
          correct_answer: "B",
          explanation: "A 1ª Lei de Newton é a Lei da Inércia: corpo em repouso tende a permanecer em repouso."
        },
        {
          id: 4,
          question_text: "Se um corpo percorre 100m em 10s, sua velocidade média é:",
          options: ["A) 5 m/s", "B) 10 m/s", "C) 15 m/s", "D) 20 m/s"],
          correct_answer: "B",
          explanation: "v = d/t = 100m/10s = 10 m/s"
        },
        {
          id: 5,
          question_text: "A segunda lei de Newton relaciona:",
          options: [
            "A) Força, massa e aceleração",
            "B) Trabalho e energia",
            "C) Pressão e volume",
            "D) Velocidade e tempo"
          ],
          correct_answer: "A",
          explanation: "F = m × a (Força = massa × aceleração)"
        },
        {
          id: 6,
          question_text: "A energia cinética depende de:",
          options: [
            "A) Apenas da massa",
            "B) Apenas da velocidade",
            "C) Da massa e da velocidade",
            "D) Da altura"
          ],
          correct_answer: "C",
          explanation: "Ec = (1/2) × m × v². Depende de massa e velocidade."
        },
        {
          id: 7,
          question_text: "A aceleração da gravidade na Terra é aproximadamente:",
          options: ["A) 8 m/s²", "B) 9,8 m/s²", "C) 10,5 m/s²", "D) 12 m/s²"],
          correct_answer: "B",
          explanation: "g ≈ 9,8 m/s² (aproximadamente 10 m/s² para cálculos)"
        },
        {
          id: 8,
          question_text: "Um corpo em queda livre possui:",
          options: [
            "A) Velocidade constante",
            "B) Aceleração constante",
            "C) Força constante zero",
            "D) Massa variável"
          ],
          correct_answer: "B",
          explanation: "Em queda livre, a aceleração é constante e igual a g."
        },
        {
          id: 9,
          question_text: "A terceira lei de Newton afirma que:",
          options: [
            "A) F = m × a",
            "B) Toda ação tem uma reação igual e oposta",
            "C) Corpos tendem a manter seu estado",
            "D) Energia se conserva"
          ],
          correct_answer: "B",
          explanation: "3ª Lei: para toda ação há uma reação de igual intensidade e direção oposta."
        },
        {
          id: 10,
          question_text: "Trabalho é o produto de:",
          options: [
            "A) Força e distância",
            "B) Massa e velocidade",
            "C) Tempo e aceleração",
            "D) Energia e tempo"
          ],
          correct_answer: "A",
          explanation: "Trabalho (W) = Força × deslocamento (W = F × d)"
        }
      ]
    },
    ...additionalPhysExams
  ],

  quimica: [
    {
      id: "quim-001",
      subject: "Química",
      title: "Tabela Periódica e Ligações - 10ª Classe",
      description: "Teste sobre elementos químicos, tabela periódica e ligações",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Qual é o símbolo químico do oxigénio?",
          options: ["A) O", "B) Ox", "C) O2", "D) OX"],
          correct_answer: "A",
          explanation: "O símbolo químico do oxigénio é 'O'.",
          image_url: "/images/exams/quimica/tabela-periodica.svg",
          image_alt: "Tabela periódica com elementos destacados",
          image_caption: "Elementos da Tabela Periódica"
        },
        {
          id: 2,
          question_text: "Quantos elementos existem na tabela periódica atual?",
          options: ["A) 100", "B) 110", "C) 118", "D) 120"],
          correct_answer: "C",
          explanation: "Atualmente, a tabela periódica reconhece 118 elementos."
        },
        {
          id: 3,
          question_text: "A fórmula química da água é:",
          options: ["A) H2O", "B) HO", "C) H2O2", "D) HO2"],
          correct_answer: "A",
          explanation: "Água tem 2 átomos de hidrogênio e 1 de oxigênio: H₂O",
          image_url: "/images/exams/quimica/molecula-agua.svg",
          image_alt: "Estrutura molecular da água H2O",
          image_caption: "Molécula de Água (H₂O)"
        },
        {
          id: 4,
          question_text: "Os elementos de um mesmo grupo têm:",
          options: [
            "A) Mesmo número de elétrons de valência",
            "B) Mesma massa atômica",
            "C) Mesmo número atômico",
            "D) Mesmas propriedades físicas"
          ],
          correct_answer: "A",
          explanation: "Elementos do mesmo grupo (coluna) têm o mesmo número de elétrons na camada de valência."
        },
        {
          id: 5,
          question_text: "O sal de cozinha (NaCl) é formado por ligação:",
          options: ["A) Covalente", "B) Metálica", "C) Iónica", "D) de Hidrogénio"],
          correct_answer: "C",
          explanation: "NaCl forma-se por ligação iónica entre Na+ e Cl-."
        },
        {
          id: 6,
          question_text: "Qual dos seguintes é um metal alcalino?",
          options: ["A) Ferro", "B) Cálcio", "C) Sódio", "D) Cloro"],
          correct_answer: "C",
          explanation: "Sódio (Na) pertence ao grupo 1, os metais alcalinos."
        },
        {
          id: 7,
          question_text: "A massa atómica representa:",
          options: [
            "A) Número de prótons",
            "B) Número de elétrons",
            "C) Soma de prótons e neutrões",
            "D) Número de neutrões"
          ],
          correct_answer: "C",
          explanation: "Massa atômica ≈ número de prótons + número de nêutrons."
        },
        {
          id: 8,
          question_text: "O número atómico indica:",
          options: [
            "A) Número de neutrões",
            "B) Número de prótons",
            "C) Massa do átomo",
            "D) Número de eletrões de valência"
          ],
          correct_answer: "B",
          explanation: "Número atômico (Z) = número de prótons no núcleo."
        },
        {
          id: 9,
          question_text: "Os gases nobres são conhecidos por serem:",
          options: ["A) Muito reativos", "B) Inertes", "C) Metais", "D) Ácidos"],
          correct_answer: "B",
          explanation: "Gases nobres (grupo 18) são inertes, muito pouco reativos."
        },
        {
          id: 10,
          question_text: "O dióxido de carbono tem fórmula:",
          options: ["A) CO", "B) CO2", "C) C2O", "D) CO3"],
          correct_answer: "B",
          explanation: "Dióxido de carbono: 1 carbono + 2 oxigénios = CO₂"
        }
      ]
    },
    ...additionalChemExams
  ],

  biologia: [
    {
      id: "bio-001",
      subject: "Biologia",
      title: "Célula e Organização - 10ª Classe",
      description: "Teste sobre estrutura celular e sistemas biológicos",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Qual é a menor unidade da vida?",
          options: ["A) Tecido", "B) Órgão", "C) Célula", "D) Sistema"],
          correct_answer: "C",
          explanation: "A célula é a menor unidade estrutural e funcional dos seres vivos.",
          image_url: "/images/exams/biologia/celula-animal.svg",
          image_alt: "Diagrama de uma célula animal com organelas",
          image_caption: "Estrutura da Célula Animal"
        },
        {
          id: 2,
          question_text: "A fotossíntese ocorre em qual organela?",
          options: ["A) Mitocôndria", "B) Cloroplasto", "C) Núcleo", "D) Ribossomo"],
          correct_answer: "B",
          explanation: "Cloroplastos são as organelas onde ocorre a fotossíntese nas plantas."
        },
        {
          id: 3,
          question_text: "O DNA está localizado principalmente:",
          options: ["A) No citoplasma", "B) No núcleo", "C) Na membrana", "D) Nos ribossomos"],
          correct_answer: "B",
          explanation: "O DNA está no núcleo celular (células eucarióticas).",
          image_url: "/images/exams/biologia/dna-estrutura.svg",
          image_alt: "Estrutura de dupla hélice do DNA",
          image_caption: "Estrutura do DNA"
        },
        {
          id: 4,
          question_text: "Qual organela é responsável pela produção de energia?",
          options: ["A) Ribossomo", "B) Lisossomo", "C) Mitocôndria", "D) Complexo de Golgi"],
          correct_answer: "C",
          explanation: "Mitocôndrias produzem ATP, a 'moeda energética' da célula."
        },
        {
          id: 5,
          question_text: "A membrana celular é:",
          options: [
            "A) Totalmente impermeável",
            "B) Semipermeável",
            "C) Rígida",
            "D) Inexistente em animais"
          ],
          correct_answer: "B",
          explanation: "A membrana celular é semipermeável, permitindo passagem seletiva."
        },
        {
          id: 6,
          question_text: "Os seres vivos que não têm núcleo definido são:",
          options: ["A) Eucariontes", "B) Procariontes", "C) Multicelulares", "D) Vertebrados"],
          correct_answer: "B",
          explanation: "Procariontes (como bactérias) não têm núcleo delimitado por membrana."
        },
        {
          id: 7,
          question_text: "A função dos ribossomos é:",
          options: [
            "A) Produzir energia",
            "B) Sintetizar proteínas",
            "C) Armazenar DNA",
            "D) Digerir partículas"
          ],
          correct_answer: "B",
          explanation: "Ribossomos são responsáveis pela síntese de proteínas."
        },
        {
          id: 8,
          question_text: "Qual é o produto principal da fotossíntese?",
          options: ["A) CO2", "B) H2O", "C) Glicose", "D) N2"],
          correct_answer: "C",
          explanation: "Fotossíntese produz glicose (C₆H₁₂O₆) e liberta oxigénio."
        },
        {
          id: 9,
          question_text: "A respiração celular ocorre em:",
          options: ["A) Cloroplastos", "B) Mitocôndrias", "C) Ribossomos", "D) Lisossomos"],
          correct_answer: "B",
          explanation: "Respiração celular (produção de ATP a partir de glicose) ocorre nas mitocôndrias."
        },
        {
          id: 10,
          question_text: "Os tecidos são formados por:",
          options: [
            "A) Órgãos semelhantes",
            "B) Células semelhantes",
            "C) Sistemas",
            "D) Organismos"
          ],
          correct_answer: "B",
          explanation: "Tecidos são conjuntos de células semelhantes com função específica."
        }
      ]
    },
    ...additionalBioExams
  ],

  historia: [
    {
      id: "hist-001",
      subject: "História",
      title: "História de Moçambique - 10ª Classe",
      description: "Teste sobre independência e história moderna de Moçambique",
      difficulty: "medium",
      duration_minutes: 30,
      passing_score: 60,
      total_questions: 10,
      questions: [
        {
          id: 1,
          question_text: "Moçambique tornou-se independente em que ano?",
          options: ["A) 1965", "B) 1970", "C) 1975", "D) 1980"],
          correct_answer: "C",
          explanation: "Moçambique obteve independência de Portugal em 25 de junho de 1975."
        },
        {
          id: 2,
          question_text: "Quem foi o primeiro presidente de Moçambique independente?",
          options: [
            "A) Samora Machel",
            "B) Joaquim Chissano",
            "C) Armando Guebuza",
            "D) Eduardo Mondlane"
          ],
          correct_answer: "A",
          explanation: "Samora Machel foi o primeiro presidente (1975-1986)."
        },
        {
          id: 3,
          question_text: "A FRELIMO foi fundada em:",
          options: ["A) 1952", "B) 1962", "C) 1972", "D) 1975"],
          correct_answer: "B",
          explanation: "A Frente de Libertação de Moçambique foi fundada em 1962."
        },
        {
          id: 4,
          question_text: "Moçambique foi colonizado por:",
          options: ["A) Inglaterra", "B) França", "C) Portugal", "D) Espanha"],
          correct_answer: "C",
          explanation: "Moçambique foi colónia portuguesa por quase 500 anos."
        },
        {
          id: 5,
          question_text: "Eduardo Mondlane foi:",
          options: [
            "A) Fundador da FRELIMO",
            "B) Primeiro presidente",
            "C) Líder da RENAMO",
            "D) Colonizador português"
          ],
          correct_answer: "A",
          explanation: "Eduardo Mondlane fundou a FRELIMO em 1962."
        },
        {
          id: 6,
          question_text: "A guerra civil em Moçambique terminou em:",
          options: ["A) 1980", "B) 1986", "C) 1992", "D) 1995"],
          correct_answer: "C",
          explanation: "O Acordo Geral de Paz foi assinado em 1992, terminando a guerra civil."
        },
        {
          id: 7,
          question_text: "A língua oficializada em Moçambique é:",
          options: ["A) Inglês", "B) Francês", "C) Português", "D) Swahili"],
          correct_answer: "C",
          explanation: "Português é a língua oficial herdada do período colonial."
        },
        {
          id: 8,
          question_text: "Samora Machel faleceu em:",
          options: ["A) 1975", "B) 1980", "C) 1986", "D) 1990"],
          correct_answer: "C",
          explanation: "Samora Machel morreu num acidente de aviação em 1986."
        },
        {
          id: 9,
          question_text: "A RENAMO foi liderada por:",
          options: [
            "A) Samora Machel",
            "B) Afonso Dhlakama",
            "C) Eduardo Mondlane",
            "D) Joaquim Chissano"
          ],
          correct_answer: "B",
          explanation: "Afonso Dhlakama liderou a RENAMO durante muitos anos."
        },
        {
          id: 10,
          question_text: "As primeiras eleições multipartidárias em Moçambique foram em:",
          options: ["A) 1990", "B) 1992", "C) 1994", "D) 1997"],
          correct_answer: "C",
          explanation: "As primeiras eleições livres e multipartidárias foram realizadas em 1994."
        }
      ]
    },
    ...additionalHistExams
  ]
};

// Get exams by subject
export const getExamsBySubject = (subject) => {
  const subjectKey = subject.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sampleExams[subjectKey] || [];
};

// Get single exam by ID
export const getExamById = (examId) => {
  for (const subject in sampleExams) {
    const exam = sampleExams[subject].find(e => e.id === examId);
    if (exam) return exam;
  }
  return null;
};

// Get all subjects with exam counts
export const getAllSubjectsWithCounts = () => {
  return Object.keys(sampleExams).map(key => ({
    id: key,
    name: sampleExams[key][0]?.subject || key,
    examCount: sampleExams[key].length,
    questionCount: sampleExams[key].reduce((acc, exam) => acc + exam.total_questions, 0)
  }));
};
