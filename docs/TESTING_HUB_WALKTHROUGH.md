# Testing Hub (BrainyForge) - Guia Completo

Este documento descreve todas as funcionalidades do Testing Hub, incluindo o sistema de dificuldade, imagens nas questões e dashboard de progresso.

## 📍 Navegação

| Rota | Descrição |
|------|-----------|
| `/brainyforge` | Página principal do Testing Hub |
| `/exams/{disciplina}` | Lista de exames por disciplina |
| `/exam/{id}/start` | Tela de início do exame |
| `/exam/{id}/take` | Interface do exame |
| `/exam/{id}/results` | Resultados e revisão |
| `/progress` | Dashboard de progresso do usuário |

---

## 🎯 Sistema de Dificuldade

### Níveis Disponíveis

| Nível | Label | Cor | Critério de Recomendação |
|-------|-------|-----|--------------------------|
| `easy` | Fácil | Verde | Média < 60% |
| `medium` | Médio | Amarelo/Laranja | Média 60-79% |
| `hard` | Difícil | Vermelho | Média ≥ 80% |

### Onde Aparece

1. **BrainyForge** (`/brainyforge`)
   - Cada disciplina mostra "Nível recomendado: X" baseado no histórico do aluno
   - Só aparece se o aluno já fez exames naquela disciplina

2. **ExamList** (`/exams/{disciplina}`)
   - Filtro de dificuldade com botões: Todas, Fácil, Médio, Difícil
   - Nível recomendado tem destaque visual (anel amarelo)
   - Cada card de exame mostra badge de dificuldade

3. **ExamInterface** (`/exam/{id}/take`)
   - Badge de dificuldade no header fixo, ao lado do título

4. **ExamResults** (`/exam/{id}/results`)
   - Badge de dificuldade junto ao título do exame
   - Seção "Próximos passos recomendados" com até 3 exames sugeridos

### Lógica de Recomendação

```javascript
// src/utils/examUtils.js
getRecommendedDifficultyForSubject(subjectProgress) {
  const average = subjectProgress?.averageScore || 0;
  if (average >= 80) return 'hard';
  if (average >= 60) return 'medium';
  return 'easy';
}
```

---

## 🖼️ Sistema de Imagens

### Estrutura de Pastas

```
public/images/exams/
├── matematica/
│   ├── grafico-linear.svg      # Função linear y = mx + b
│   ├── triangulo-pitagoras.svg # Teorema de Pitágoras
│   └── sistema-equacoes.svg    # Sistema de equações lineares
├── geografia/
│   ├── mapa-mocambique.svg     # Mapa com capital destacada
│   └── grafico-populacao.svg   # Gráfico de barras por região
├── fisica/
│   ├── circuito-serie.svg      # Circuito elétrico em série
│   └── mru-grafico.svg         # Gráfico posição x tempo
├── biologia/
│   ├── celula-animal.svg       # Célula com organelas
│   └── dna-estrutura.svg       # Dupla hélice do DNA
└── quimica/
    ├── tabela-periodica.svg    # Elementos destacados
    └── molecula-agua.svg       # Estrutura H₂O
```

### Campos da Questão

```javascript
{
  id: 1,
  question_text: "Texto da pergunta",
  options: ["A) ...", "B) ...", "C) ...", "D) ..."],
  correct_answer: "A",
  explanation: "Explicação detalhada",
  // Campos opcionais para imagens:
  image_url: "/images/exams/matematica/sistema-equacoes.svg",
  image_alt: "Descrição acessível para leitores de tela",
  image_caption: "Legenda exibida abaixo da imagem"
}
```

### Exibição

- **Durante o exame**: Imagem centralizada, max 288px altura, com legenda
- **Na revisão**: Imagem menor (max 192px), alinhada à esquerda

---

## 📊 Dashboard de Progresso (`/progress`)

### Estatísticas Gerais

- Total de exames realizados
- Média geral de pontuação
- Taxa de aprovação
- Tempo total de estudo

### Por Disciplina

- Exames realizados
- Média de pontuação
- Maior pontuação
- Última tentativa

### Gráfico de Evolução

- Linha temporal das últimas 20 tentativas
- Mostra evolução da pontuação ao longo do tempo

### Conquistas (Achievements)

| Conquista | Critério |
|-----------|----------|
| 🎯 Primeiros Passos | Completou 1 exame |
| 📚 Estudante Persistente | Completou 10 exames |
| 🌟 Pontuação Perfeita | Obteve 100% em algum exame |
| 👑 Mestre da Disciplina | Média ≥90% em uma disciplina |
| 🎓 Polivalente | Fez exames em todas as 7 disciplinas |
| 💪 Dedicado | Completou 25 exames |

---

## ✅ Checklist de Verificação

### UserProgress Dashboard
- [ ] Carrega estatísticas gerais corretamente
- [ ] Exibe progresso por disciplina
- [ ] Gráfico de evolução renderiza com dados
- [ ] Conquistas são calculadas corretamente
- [ ] Tentativas recentes aparecem ordenadas

### Exames e Dificuldade
- [ ] Todos os exames carregam em `/exams/{disciplina}`
- [ ] Filtro de dificuldade funciona (Todas/Fácil/Médio/Difícil)
- [ ] Badge de dificuldade aparece em todos os cards
- [ ] Nível recomendado tem destaque visual
- [ ] Mensagem aparece quando não há exames no filtro

### Imagens nas Questões
- [ ] Imagens carregam no ExamInterface
- [ ] Legenda (caption) aparece abaixo da imagem
- [ ] Imagens aparecem na revisão de resultados
- [ ] Imagens são responsivas em mobile

### Design Responsivo
- [ ] BrainyForge: grid adapta em mobile
- [ ] ExamList: filtros empilham em telas pequenas
- [ ] ExamInterface: imagem redimensiona corretamente
- [ ] ExamResults: cards de recomendação empilham

---

## 🧪 Testes Automatizados

```bash
# Rodar todos os testes
npm test

# Rodar em modo watch
npm run test:watch

# Testes específicos do sistema de dificuldade
npm test src/utils/examUtils.test.js
```

### Cobertura de Testes

- `DIFFICULTY_LEVELS` — constante com níveis
- `getDifficultyColor()` — cores por nível
- `getDifficultyLabel()` — labels em português
- `getRecommendedDifficultyForSubject()` — lógica de recomendação

---

## 🔧 Troubleshooting

### Imagens não carregam
1. Verificar se o arquivo existe em `public/images/exams/`
2. Confirmar que o caminho começa com `/images/...`
3. Verificar extensão do arquivo (.svg, .png, .webp)

### Filtro de dificuldade não funciona
1. Verificar se o exame tem campo `difficulty` definido
2. Confirmar valores válidos: `easy`, `medium`, `hard`

### Dashboard sem dados
1. Fazer pelo menos um exame completo
2. Verificar localStorage: `brainyforge_exam_attempts`
3. Limpar cache se necessário: `localStorage.clear()`

### Recomendações não aparecem
1. Verificar se há outros exames na mesma disciplina
2. Confirmar que existem exames com a dificuldade recomendada
3. O exame atual é excluído das recomendações

---

## 📝 Adicionando Novos Conteúdos

### Novo Exame com Imagens

1. Criar imagem SVG em `public/images/exams/{disciplina}/`
2. Adicionar exame em `src/data/examData.js` ou `additionalExams.js`
3. Incluir campos de imagem nas questões relevantes

### Nova Disciplina

1. Criar pasta em `public/images/exams/{nova-disciplina}/`
2. Adicionar array em `sampleExams` no `examData.js`
3. Adicionar cor em `subjectColors` no `UserProgress.jsx`
4. Adicionar ícone e cor em `subjects` no `BrainyForge.jsx`

---

*Última atualização: Dezembro 2025*
