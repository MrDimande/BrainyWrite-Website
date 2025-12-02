# 🧠 BrainyWrite

**Consultoria Acadêmica e Profissional em Moçambique**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

Website moderno e futurístico para consultoria multidisciplinar oferecendo soluções integradas em produção acadêmica, acompanhamento online, consultoria profissional e criativa.

## ✨ Características

- 🎨 **Design Futurístico** - Glassmorphism, gradientes animados, efeitos neon
- ⚡ **Performance Otimizada** - Code splitting, lazy loading, 12 chunks modulares
- 📱 **100% Responsivo** - Mobile-first design
- 🔒 **Seguro** - Autenticação JWT, bcrypt, variáveis de ambiente protegidas
- 🎯 **SEO Otimizado** - Meta tags completas, structured data, Open Graph
- 🚀 **Stack Moderno** - React 19, Vite, TailwindCSS 4, Framer Motion

## 🚀 Início Rápido

### Opção 1: Setup Automático (Recomendado)

```bash
# 1. Clone e instale
git clone <repository-url>
cd brainywrite

# 2. Configure ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 3. Setup completo (deps + DB + admin)
npm run setup

# 4. Inicie desenvolvimento
npm run dev:full  # Frontend + Backend simultâneo
```

**Pronto!** Acesse http://localhost:5173

### Opção 2: Setup Manual

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
cp .env.example .env
# Edite com suas credenciais

# 3. Criar banco de dados
npm run db:init

# 4. Criar usuário admin
npm run create-admin

# 5. Iniciar servidores
npm run server  # Terminal 1 - Backend em :5000
npm run dev     # Terminal 2 - Frontend em :5173
```

## 📋 Pré-requisitos

- **Node.js** 16 ou superior
- **PostgreSQL** 13 ou superior
- **npm** ou **yarn**
- **Git**

## 🔧 Configuração

### 1. Variáveis de Ambiente

O arquivo `.env` deve conter:

```env
# Database
PGUSER=postgres
PGHOST=localhost
PGDATABASE=brainywrite_db
PGPASSWORD=sua_senha_postgres
PGPORT=5432

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# Email (Gmail)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=contato.brainywrite@gmail.com
ADMIN_EMAIL=contato.brainywrite@gmail.com

# Security
JWT_SECRET=seu-secret-gerado-automaticamente

# API
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Configurar Email (Gmail)

1. Ative **2FA** na sua conta Google
2. Gere uma **senha de app**: https://myaccount.google.com/apppasswords
3. Adicione ao `.env` como `EMAIL_PASS`

### 3. Banco de Dados

```bash
# Usar script automático
npm run db:init

# Ou manualmente
psql -U postgres -c "CREATE DATABASE brainywrite_db;"
psql -U postgres -d brainywrite_db -f database/schema.sql
```

### 4. Usuário Admin

```bash
# Admin padrão (user: admin, pass: admin123)
npm run create-admin

# Admin customizado
npm run create-admin meuuser email@exemplo.com minhasenha
```

## 📁 Estrutura do Projeto

```
brainywrite/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Servicos.jsx
│   │   ├── Admin/          # Dashboard admin
│   │   └── ...
│   ├── config/             # Configurações
│   └── App.jsx             # App principal
│
├── database/               # Scripts PostgreSQL
│   ├── schema.sql          # Schema completo
│   └── create-admin.js     # Criação de admin
│
├── utils/                  # Backend utilities
│   ├── auth.js             # JWT authentication
│   └── emailService.js     # Email SMTP
│
├── server.js               # Express API
├── .env                    # Variáveis (NÃO COMMITAR)
└── package.json            # Dependencies
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Frontend dev server
npm run server           # Backend API
npm run dev:full         # Frontend + Backend
npm run build            # Build produção
npm run preview          # Preview build local
```

### Database

```bash
npm run db:init          # Criar DB + schema
npm run db:reset         # Reset completo
npm run create-admin     # Criar usuário admin
```

### Linting & Type Check

```bash
npm run lint             # ESLint
npm run lint:fix         # Fix automático
npm run type-check       # Verificar TypeScript
```

### Docker

```bash
npm run docker:up        # Iniciar containers
npm run docker:down      # Parar containers
npm run docker:logs      # Ver logs
npm run docker:rebuild   # Rebuild completo
```

### Utilidades

```bash
npm run setup            # Setup completo (primeira vez)
npm run clean            # Limpar dist e node_modules
```

## 🎨 Stack Tecnológico

### Frontend
- **React** 19.2 - UI library
- **Vite** 7.1 - Build tool ultra-rápido
- **TailwindCSS** 4.1 - Utility-first CSS
- **Framer Motion** 12.2 - Animações
- **React Router** 7.9 - Navegação
- **React Hook Form** 7.6 - Formulários
- **Lucide React** - Ícones modernos

### Backend
- **Node.js** + **Express** 5.1
- **PostgreSQL** - Banco de dados
- **JWT** + **bcrypt** - Autenticação
- **Nodemailer** - Envio de emails
- **CORS** - Cross-origin requests

### DevOps
- **Docker** + **Docker Compose**
- **ESLint** + **TypeScript**
- **Vite** build optimization

## 📡 Endpoints da API

### Públicos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/contact` | Enviar contato |
| POST | `/api/quote` | Solicitar cotação |
| POST | `/api/appointment` | Agendar consulta |
| POST | `/api/newsletter` | Inscrever newsletter |
| GET | `/api/health` | Health check |

### Admin (Requer JWT)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/admin/login` | Login admin |
| GET | `/api/contacts` | Listar contatos |
| GET | `/api/quotes` | Listar cotações |
| GET | `/api/appointments` | Listar agendamentos |
| GET | `/api/admin/stats` | Dashboard stats |
| PATCH | `/api/contacts/:id/read` | Marcar lido |
| PATCH | `/api/quotes/:id/status` | Atualizar status |

## 🔐 Segurança

- ✅ Senhas com **bcrypt** (salt 10)
- ✅ Autenticação **JWT** (expira em 7 dias)
- ✅ **CORS** configurado
- ✅ Validação de inputs
- ✅ **SQL injection** prevenido (parameterized queries)
- ✅ Variáveis sensíveis em `.env` (protegido por `.gitignore`)

## 📊 Performance

- ✅ **Code splitting** - 12 chunks modulares
- ✅ **Lazy loading** - Páginas carregadas sob demanda
- ✅ **Bundle otimizado** - Reduzido de 1MB → múltiplos chunks
- ✅ **Gzip** compression
- ✅ **Font preloading** (Inter, Space Grotesk)

## 🌐 Deploy

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy pasta dist/
```

### Backend (Railway/Render/Heroku)

```bash
# Configurar variáveis de ambiente
# Executar: npm run server
```

### Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Documentação

- [SETUP.md](SETUP.md) - Guia de configuração completo
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guia de contribuição
- [README_ADMIN.md](README_ADMIN.md) - Guia do painel admin

## 🐛 Troubleshooting

### Erro: "Database connection failed"
```bash
# Verificar PostgreSQL rodando
psql -U postgres -l

# Verificar credenciais no .env
```

### Erro: "Invalid credentials" (admin)
```bash
# Criar novo admin
npm run create-admin
```

### Erro: "Email not sent"
- Verificar `EMAIL_USER` e `EMAIL_PASS` no `.env`
- Para Gmail, usar **App Password**, não senha normal
- Confirmar 2FA ativado no Gmail

### Erro: "CORS blocked"
- Verificar `FRONTEND_URL` no `.env` do backend
- Verificar `VITE_API_BASE_URL` no `.env` do frontend

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

### Fluxo de Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar MinhaFeature'`)
4. Push para branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Website**: https://brainywrite.co.mz
- **Email**: contato.brainywrite@gmail.com
- **WhatsApp**: +258 87 850 9146
- **Endereço**: Av. Julius Nyerere, Polana Canico B, Maputo

## 🎯 Roadmap

- [ ] Testes automatizados (Jest/Vitest)
- [ ] CI/CD com GitHub Actions
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Notificações push
- [ ] Multi-idioma (PT/EN)
- [ ] Analytics dashboard
- [ ] API documentation (Swagger)

## ⭐ Features

- ✅ Sistema de cotação multi-step com cálculo automático
- ✅ Dashboard admin com estatísticas em tempo real
- ✅ Sistema de agendamento de consultas
- ✅ Newsletter com confirmação por email
- ✅ Blog com artigos técnicos
- ✅ Portfolio de trabalhos
- ✅ AI Assistant (chatbot)
- ✅ Formulários com validação avançada
- ✅ Toast notifications elegantes
- ✅ Animações fluidas (Framer Motion + GSAP)
- ✅ Design glassmorphism premium

---

**Feito com ❤️ pela equipe BrainyWrite**

[![Follow on GitHub](https://img.shields.io/github/followers/brainywrite?style=social)]()
[![Star on GitHub](https://img.shields.io/github/stars/brainywrite/brainywrite?style=social)]()
