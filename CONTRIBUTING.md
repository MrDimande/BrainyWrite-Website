# Contribuindo para o BrainyWrite

Obrigado por considerar contribuir para o BrainyWrite! Este documento fornece diretrizes para contribuições.

## 📋 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você concorda em manter este código.

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork
git clone https://github.com/seu-usuario/brainywrite.git
cd brainywrite
```

### 2. Configurar Ambiente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Configurar banco de dados
npm run db:init
npm run create-admin
```

### 3. Criar uma Branch

```bash
# Criar branch para sua feature/fix
git checkout -b feature/minha-feature
# ou
git checkout -b fix/corrigir-bug
```

### 4. Desenvolver

- Siga os padrões de código existentes
- Escreva código limpo e bem documentado
- Adicione comentários quando necessário
- Teste suas mudanças localmente

### 5. Commits

Use mensagens de commit descritivas seguindo o padrão:

```text
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)
```

**Tipos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos:**

```bash
git commit -m "feat(admin): adicionar filtro de busca no dashboard"
git commit -m "fix(api): corrigir validação de email no formulário de contato"
git commit -m "docs(readme): atualizar instruções de instalação"
```

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/minha-feature

# Criar Pull Request no GitHub
```

## 📝 Padrões de Código

### JavaScript/TypeScript

- Use **ES6+** features
- Prefira **const** e **let** sobre **var**
- Use **arrow functions** quando apropriado
- Siga o estilo do ESLint configurado

### React

- Use **functional components** e **hooks**
- Nomeie componentes com **PascalCase**
- Use **props destructuring**
- Mantenha componentes pequenos e focados

### Banco de Dados

- Use **parameterized queries** (prevenção SQL injection)
- Adicione **índices** para campos frequentemente consultados
- Documente mudanças no schema

### Estilo

- Use **TailwindCSS** para estilização
- Siga o design system existente
- Mantenha responsividade mobile-first

## 🧪 Testes

Antes de submeter:

```bash
# Verificar lint
npm run lint

# Verificar tipos (TypeScript)
npm run type-check

# Testar localmente
npm run dev:full
```

## 📚 Estrutura do Projeto

```text
brainywrite/
├── src/              # Frontend React
│   ├── components/   # Componentes reutilizáveis
│   ├── pages/        # Páginas da aplicação
│   ├── config/       # Configurações
│   ├── data/         # Dados estáticos (examData.js)
│   └── utils/        # Utilitários (examUtils.js, etc.)
├── database/         # Scripts SQL
├── utils/            # Backend utilities
├── server.js         # API Express
└── docs/             # Documentação
```

## 🎯 Sistema de Dificuldade (Testing Hub)

O Testing Hub (BrainyForge) possui um sistema de dificuldade integrado:

### Níveis de Dificuldade

| Nível   | Label (PT) | Cor (Tailwind)                  |
|---------|------------|---------------------------------|
| `easy`  | Fácil      | `from-green-500 to-emerald-500` |
| `medium`| Médio      | `from-yellow-500 to-orange-500` |
| `hard`  | Difícil    | `from-red-500 to-pink-500`      |

### Funções Principais (`src/utils/examUtils.js`)

- **`DIFFICULTY_LEVELS`**: Array com os níveis disponíveis.
- **`getDifficultyColor(difficulty)`**: Retorna classes Tailwind para o gradiente.
- **`getDifficultyLabel(difficulty)`**: Retorna o label em português.
- **`getRecommendedDifficultyForSubject(subjectProgress)`**: Calcula o nível recomendado com base na média do aluno:
  - `averageScore >= 80` → `hard`
  - `averageScore >= 60` → `medium`
  - `averageScore < 60` → `easy`

### Onde a Dificuldade Aparece

1. **BrainyForge** (`/brainyforge`): Mostra "Nível recomendado" por disciplina.
2. **ExamList** (`/exams/{subject}`): Filtro por dificuldade + badge em cada exame.
3. **ExamInterface** (`/exam/{id}/take`): Badge de dificuldade no header.
4. **ExamResults** (`/exam/{id}/results`): Badge + recomendações de próximos exames.

### Testes

```bash
# Rodar testes do sistema de dificuldade
npm test src/utils/examUtils.test.js
```

## 🖼️ Sistema de Imagens nas Questões

O Testing Hub suporta imagens educacionais nas questões dos exames.

### Estrutura de Pastas

```text
public/images/exams/
├── matematica/     # Gráficos, formas geométricas
├── geografia/      # Mapas, gráficos populacionais
├── fisica/         # Diagramas de circuitos, gráficos MRU
├── biologia/       # Células, DNA, anatomia
└── quimica/        # Tabela periódica, moléculas
```

### Estrutura de Dados da Questão

```javascript
{
  id: 1,
  question_text: "Qual é a solução do sistema?",
  options: ["A) x=6", "B) x=5", "C) x=7", "D) x=8"],
  correct_answer: "A",
  explanation: "Explicação detalhada...",
  // Campos opcionais para imagens:
  image_url: "/images/exams/matematica/sistema-equacoes.svg",
  image_alt: "Descrição acessível da imagem",
  image_caption: "Legenda exibida abaixo da imagem"
}
```

### Onde as Imagens Aparecem

1. **ExamInterface** (`/exam/{id}/take`): Imagem centralizada abaixo do texto da questão.
2. **ExamResults** (`/exam/{id}/results`): Imagem menor na revisão detalhada.

### Formatos Recomendados

- **SVG**: Preferido para diagramas, gráficos e ilustrações (escalável, leve).
- **PNG/WebP**: Para imagens fotográficas ou complexas.
- **Tamanho máximo**: 500KB por imagem.

## 🐛 Reportar Bugs

Use o template de issue do GitHub:

1. **Título claro e descritivo**
2. **Descrição do problema**
3. **Passos para reproduzir**
4. **Comportamento esperado vs atual**
5. **Screenshots** (se aplicável)
6. **Ambiente** (OS, Node version, etc)

## 💡 Sugerir Features

1. Verifique se a feature já não foi sugerida
2. Descreva claramente a funcionalidade
3. Explique o caso de uso
4. Considere alternativas

## ✅ Checklist antes de submeter PR

- [ ] Código segue os padrões do projeto
- [ ] Testes passam localmente
- [ ] Lint sem erros (`npm run lint`)
- [ ] Type check passa (`npm run type-check`)
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem o padrão de mensagens
- [ ] Branch atualizada com `main`/`master`

## 🔍 Revisão de Código

- PRs serão revisados por mantenedores
- Feedback será fornecido de forma construtiva
- Pode ser necessário fazer alterações antes do merge

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

## Obrigado

Sua contribuição é muito apreciada! Se tiver dúvidas, abra uma issue ou entre em contato.

---

**Dúvidas?** Abra uma issue com a tag `question` ou entre em contato com os mantenedores.
