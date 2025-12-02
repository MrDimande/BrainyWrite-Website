# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-12-01

### Adicionado
- ✨ Sistema completo de consultoria acadêmica e profissional
- 🎨 Design futurístico com glassmorphism e animações
- 📱 13 páginas totalmente responsivas (Home, Serviços, Blog, Portfolio, Admin, etc.)
- 🔐 Sistema de autenticação JWT + bcrypt
- 📧 Integração com email via Nodemailer (Gmail SMTP)
- 💼 Dashboard admin com estatísticas em tempo real
- 📝 Formulário de cotação multi-step com cálculo automático
- 📅 Sistema de agendamento de consultas
- 📰 Newsletter com confirmação por email
- 🤖 AI Assistant (componente chatbot)
- 🗄️ Banco de dados PostgreSQL com 5 tabelas
- 🔒 Variáveis de ambiente seguras (.env)
- ⚡ Code splitting com lazy loading (12 chunks)
- 📊 SEO otimizado (Open Graph, Twitter Cards, JSON-LD)
- 🐳 Docker + Docker Compose configurado
- 📚 Documentação completa (README, SETUP, CONTRIBUTING)
- 🛠️ Scripts NPM úteis (db:init, create-admin, dev:full, etc.)

### Tecnologias
- Frontend: React 19.2 + Vite 7.1 + TailwindCSS 4.1
- Backend: Node.js + Express 5.1 + PostgreSQL
- Autenticação: JWT + bcryptjs
- Animações: Framer Motion + GSAP
- Email: Nodemailer
- Formulários: React Hook Form
- Roteamento: React Router 7.9

### Segurança
- JWT secret gerado criptograficamente (128 chars hex)
- Senhas com bcrypt (salt 10)
- CORS configurado
- SQL injection prevention (parameterized queries)
- Credenciais protegidas em .env (gitignore)

### Performance
- Bundle otimizado com code splitting
- Lazy loading de componentes
- 12 chunks modulares (down de 1MB monolítico)
- Gzip compression
- Font preloading

### Documentação
- README.md principal reformulado
- CONTRIBUTING.md com guia de contribuição
- SETUP.md com configuração completa
- README_ADMIN.md com guia do painel admin
- .env.example como template
- CHANGELOG.md (este arquivo)
- LICENSE (MIT)

---

## Formato

### [Versão] - Data

#### Adicionado
- Novas funcionalidades

#### Modificado
- Mudanças em funcionalidades existentes

#### Depreciado
- Funcionalidades que serão removidas

#### Removido
- Funcionalidades removidas

#### Corrigido
- Correções de bugs

#### Segurança
- Melhorias de segurança

---

**Template para futuras versões:**

## [Unreleased]

### Adicionado
- 

### Modificado
- 

### Corrigido
-
