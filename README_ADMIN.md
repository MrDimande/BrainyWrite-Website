# BrainyWrite - Guia de Administração

## 🚀 Configuração Inicial

### 1. Configurar Banco de Dados

```bash
# Criar banco de dados
psql -U postgres -c "CREATE DATABASE brainywrite_db;"

# Executar schema
psql -U postgres -d brainywrite_db -f database/schema.sql
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database Configuration
PGUSER=postgres
PGHOST=localhost
PGDATABASE=brainywrite_db
PGPASSWORD=seu_password
PGPORT=5432

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password
EMAIL_FROM=contato.brainywrite@gmail.com
ADMIN_EMAIL=contato.brainywrite@gmail.com

# JWT Secret (mude isso em produção!)
JWT_SECRET=seu-secret-key-super-seguro-aqui

# API Base URL (Frontend)
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Criar Usuário Administrador

```bash
# Criar admin padrão (username: admin, password: admin123)
node database/create-admin.js

# Ou criar admin customizado
node database/create-admin.js meuusername meuemail@email.com minhasenha
```

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

## 📧 Configuração de Email (Gmail)

### Passo 1: Ativar Autenticação de 2 Fatores
1. Acesse sua conta Google
2. Vá em Segurança
3. Ative a Verificação em duas etapas

### Passo 2: Gerar Senha de App
1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "App" e "Email"
3. Selecione "Outro (nome personalizado)" e digite "BrainyWrite"
4. Copie a senha gerada
5. Use esta senha no campo `EMAIL_PASS` do `.env`

## 🐳 Usando Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Opção 2: Apenas PostgreSQL

```bash
# Iniciar PostgreSQL
docker run -d \
  --name brainywrite_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brainywrite_db \
  -p 5432:5432 \
  postgres:15-alpine

# Executar schema
docker exec -i brainywrite_db psql -U postgres -d brainywrite_db < database/schema.sql
```

## 🔐 Acesso ao Admin

1. Acesse: http://localhost:5173/admin/login
2. Use as credenciais criadas:
   - Username: `admin`
   - Password: `admin123` (ou a senha que você definiu)

## 📊 Funcionalidades do Admin

### Dashboard
- **Visão Geral**: Estatísticas e dados recentes
- **Contatos**: Visualizar mensagens de contato
- **Cotações**: Gerenciar solicitações de cotação
- **Agendamentos**: Confirmar/cancelar agendamentos
- **Newsletter**: Ver lista de inscritos

### Endpoints da API

#### Autenticação
- `POST /api/admin/login` - Login do admin

#### Dados (Requer autenticação)
- `GET /api/contacts` - Listar contatos
- `GET /api/quotes` - Listar cotações
- `GET /api/appointments` - Listar agendamentos
- `GET /api/newsletter` - Listar inscritos
- `GET /api/admin/stats` - Estatísticas do dashboard

#### Atualizações (Requer autenticação)
- `PATCH /api/contacts/:id/read` - Marcar contato como lido
- `PATCH /api/quotes/:id/status` - Atualizar status da cotação
- `PATCH /api/appointments/:id/status` - Atualizar status do agendamento

## 🔒 Segurança

### Em Produção

1. **Altere o JWT_SECRET**: Use uma string aleatória e segura
2. **Use HTTPS**: Configure SSL/TLS
3. **Altere senha do admin**: Não use a senha padrão
4. **Configure CORS**: Limite as origens permitidas
5. **Use variáveis de ambiente**: Não commite o `.env`
6. **Backup do banco**: Configure backups regulares

### Geração de JWT Secret

```bash
# Gerar secret seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📝 Notas

- O sistema de email funciona mesmo sem configuração (apenas loga erros)
- O banco de dados é opcional (dados são apenas logados se não existir)
- Todas as rotas admin requerem autenticação JWT
- O token expira em 7 dias (configurável via `JWT_EXPIRES_IN`)

## 🆘 Troubleshooting

### Erro: "Database table not found"
- Execute o schema: `psql -d brainywrite_db -f database/schema.sql`

### Erro: "Invalid credentials"
- Verifique se o usuário existe: `SELECT * FROM admin_users;`
- Crie um novo admin: `node database/create-admin.js`

### Erro: "Email not sent"
- Verifique as configurações de email no `.env`
- Para Gmail, use App Password (não a senha normal)
- Verifique se a autenticação de 2 fatores está ativada

### Erro: "Connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique as credenciais no `.env`
- Verifique se a porta está correta

## 📚 Recursos

- [Documentação Nodemailer](https://nodemailer.com/about/)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação Docker](https://docs.docker.com/)
- [Documentação JWT](https://jwt.io/)

