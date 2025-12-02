# BrainyWrite - Guia de Configuração Completo

## 🚀 Início Rápido

### Opção 1: Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone <repository-url>
cd brainywrite

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 3. Inicie os serviços
docker-compose up -d

# 4. Crie o usuário admin
docker-compose exec backend npm run create-admin

# 5. Acesse o site
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# Admin: http://localhost:5173/admin/login
```

### Opção 2: Instalação Manual

```bash
# 1. Instale as dependências
npm install

# 2. Configure o banco de dados PostgreSQL
# Crie o banco de dados
psql -U postgres -c "CREATE DATABASE brainywrite_db;"

# Execute o schema
psql -U postgres -d brainywrite_db -f database/schema.sql

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 4. Crie o usuário admin
npm run create-admin

# 5. Inicie o servidor backend
npm run server

# 6. Em outro terminal, inicie o frontend
npm run dev
```

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

## 🔐 Criação de Usuário Admin

### Usando o script
```bash
# Admin padrão (username: admin, password: admin123)
npm run create-admin

# Admin customizado
npm run create-admin meuusername meuemail@email.com minhasenha
```

### Credenciais padrão
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@brainywrite.com`

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

## 🗄️ Estrutura do Banco de Dados

### Tabelas
- `contactos` - Mensagens de contato
- `cotacoes` - Solicitações de cotação
- `agendamentos` - Agendamentos de consulta
- `newsletter_subscribers` - Inscritos na newsletter
- `admin_users` - Usuários administradores

### Scripts SQL
- `database/schema.sql` - Schema completo do banco
- `database/init.sh` - Script de inicialização

## 🔧 Variáveis de Ambiente

### Database
```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=brainywrite_db
PGPASSWORD=seu_password
PGPORT=5432
```

### Server
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Email
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-app-password
EMAIL_FROM=contato.brainywrite@gmail.com
ADMIN_EMAIL=contato.brainywrite@gmail.com
```

### Security
```env
JWT_SECRET=seu-secret-key-super-seguro-aqui
```

### API (Frontend)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📱 Endpoints da API

### Públicos
- `POST /api/contact` - Enviar mensagem de contato
- `POST /api/quote` - Solicitar cotação
- `POST /api/appointment` - Agendar consulta
- `POST /api/newsletter` - Inscrever-se na newsletter
- `GET /api/health` - Health check

### Admin (Requer autenticação)
- `POST /api/admin/login` - Login do admin
- `GET /api/contacts` - Listar contatos
- `GET /api/quotes` - Listar cotações
- `GET /api/appointments` - Listar agendamentos
- `GET /api/newsletter` - Listar inscritos
- `GET /api/admin/stats` - Estatísticas do dashboard
- `PATCH /api/contacts/:id/read` - Marcar contato como lido
- `PATCH /api/quotes/:id/status` - Atualizar status da cotação
- `PATCH /api/appointments/:id/status` - Atualizar status do agendamento

## 🐳 Docker

### Comandos Docker
```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Reconstruir imagens
docker-compose build --no-cache

# Executar comando no container
docker-compose exec backend <comando>
```

### Docker Compose
- `docker-compose.yml` - Configuração para desenvolvimento
- `docker-compose.prod.yml` - Configuração para produção

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

## 📝 Scripts NPM

```bash
# Desenvolvimento
npm run dev          # Iniciar frontend
npm run server       # Iniciar backend
npm run start        # Iniciar backend

# Build
npm run build        # Build do frontend

# Admin
npm run create-admin # Criar usuário admin

# Docker
npm run docker:up    # Iniciar serviços Docker
npm run docker:down  # Parar serviços Docker
npm run docker:logs  # Ver logs dos serviços
```

## 🆘 Troubleshooting

### Erro: "Database table not found"
```bash
# Execute o schema
psql -U postgres -d brainywrite_db -f database/schema.sql
```

### Erro: "Invalid credentials"
```bash
# Crie um novo admin
npm run create-admin
```

### Erro: "Email not sent"
- Verifique as configurações de email no `.env`
- Para Gmail, use App Password (não a senha normal)
- Verifique se a autenticação de 2 fatores está ativada

### Erro: "Connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique as credenciais no `.env`
- Verifique se a porta está correta

### Erro: "CORS error"
- Verifique se `FRONTEND_URL` está configurado corretamente
- Verifique se o CORS está configurado no `server.js`

## 📚 Documentação Adicional

- [README.md](README.md) - Documentação principal
- [README_ADMIN.md](README_ADMIN.md) - Guia de administração
- [SOLUCAO_ERRO_FETCH.md](SOLUCAO_ERRO_FETCH.md) - Solução de erros de fetch

## 🔗 Links Úteis

- [Documentação Nodemailer](https://nodemailer.com/about/)
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação Docker](https://docs.docker.com/)
- [Documentação JWT](https://jwt.io/)

## 📞 Suporte

Se você encontrar problemas, verifique:
1. Logs do servidor: `npm run server` ou `docker-compose logs -f`
2. Console do navegador: Abra as DevTools (F12)
3. Verifique as variáveis de ambiente: `.env`
4. Verifique o banco de dados: `psql -U postgres -d brainywrite_db`

## ✅ Checklist de Configuração

- [ ] PostgreSQL instalado e configurado
- [ ] Banco de dados criado
- [ ] Schema executado
- [ ] Variáveis de ambiente configuradas
- [ ] Email configurado (Gmail App Password)
- [ ] Usuário admin criado
- [ ] Servidor backend rodando
- [ ] Frontend rodando
- [ ] Testado login admin
- [ ] Testado envio de email
- [ ] Testado formulários (contato, cotação, agendamento)

