# 🚀 Guia de Instalação do Sistema de Exames

Este guia explica como configurar o sistema completo de exames do BrainyWrite.

## ✅ Pré-requisitos

- ✅ PostgreSQL instalado e rodando
- ✅ Node.js 16+ instalado
- ✅ npm instalado
- ✅ Arquivo `.env` configurado

---

## 📋 Passo a Passo

### 1. **Instalar Novas Dependências**

```bash
npm install
```

As seguintes dependências foram adicionadas:
- `validator` - Validação e sanitização de dados
- `express-rate-limit` - Proteção contra spam e ataques

---

### 2. **Criar Tabelas do Sistema de Exames**

Execute o schema SQL para criar todas as tabelas necessárias:

```bash
# Windows (PowerShell)
psql -U postgres -d brainywrite_db -f database\exam_schema.sql

# Linux/Mac
psql -U postgres -d brainywrite_db -f database/exam_schema.sql
```

**OU manualmente no psql:**

```bash
psql -U postgres -d brainywrite_db
\i database/exam_schema.sql
\q
```

---

### 3. **Verificar Tabelas Criadas**

Entre no PostgreSQL e verifique:

```bash
psql -U postgres -d brainywrite_db
```

```sql
-- Listar todas as tabelas
\dt

-- Deverá ver:
-- users
-- exam_attempts
-- user_subject_progress
-- certificates
-- exam_states

-- Ver estrutura de uma tabela
\d users
\d exam_attempts

-- Sair
\q
```

---

###  4. **Reiniciar o Servidor**

Se o servidor backend estiver rodando, reinicie-o para carregar os novos middlewares:

```bash
# Pare o servidor (Ctrl+C) e reinicie
npm run server
```

---

## 📊 Tabelas Criadas

### `users`
- Usuários do sistema de exames (separado de `admin_users`)
- Campos: id, name, email, password_hash, phone, institution, etc.

### `exam_attempts`
- Histórico completo de todas as tentativas de exames
- Campos: user_id, exam_id, subject, score_percentage, user_answers (JSONB), etc.
- **Trigger automático** atualiza `user_subject_progress` após cada tentativa

### `user_subject_progress`
- Estatísticas agregadas por disciplina
- Campos: total_attempts, average_score, best_score, exams_passed, etc.

### `certificates`
- Certificados emitidos para exames aprovados
- Campos: certificate_code (único), exam_id, user_id, score_percentage, etc.

### `exam_states`
- Estados salvos para resumir exames incompletos
- Campos: user_id, exam_id, current_question, user_answers, time_remaining

---

## 🔐 Novos Middlewares de Segurança

### **Rate Limiting**
Protege contra spam e ataques:
- API geral: 100 requisições / 15 min
- Login: 5 tentativas / 15 min
- Registro: 3 tentativas / 1 hora
- Formulários: 10 envios / 1 hora
- Exames: 10 ações / 1 min
- Certificados: 20 requisições / 1 hora

### **Sanitização de Dados**
Protege contra XSS e injection:
- Validação automática de emails
- Escape de HTML
- Validação de datas futuras
- Limitação de tamanho de texto
- Validação de números inteiros e decimais

---

## 🌐 Novos Endpoints da API

### **Autenticação**
```
POST   /api/auth/register     - Registrar novo usuário
POST   /api/auth/login        - Login de usuário
GET    /api/auth/me           - Buscar info do usuário atual
POST   /api/auth/forgot-password - Recuperar senha
```

### **Exames**
```
POST   /api/exams/attempt            - Salvar tentativa de exame
GET    /api/exams/attempts           - Buscar histórico de exames
GET    /api/exams/progress/:subject? - Buscar progresso por disciplina
GET    /api/exams/stats              - Estatísticas gerais do usuário
POST   /api/exams/state/save         - Salvar estado de exame
GET    /api/exams/state/:examId      - Carregar estado salvo
DELETE /api/exams/state/:examId      - Limpar estado salvo
GET    /api/exams/admin/statistics   - Estatísticas para admin
```

### **Certificados**
```
POST   /api/certificates/generate           - Gerar certificado
GET    /api/certificates                    - Listar certificados do usuário
GET    /api/certificates/:id                - Buscar certificado específico
GET    /api/certificates/verify/:code       - Verificar certificado (público)
POST   /api/certificates/:id/resend-email   - Reenviar email de certificado
```

---

## 🧪 Testar o Sistema

### 1. **Criar um Usuário de Teste**

```bash
# Use Postman, Insomnia ou curl
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "phone": "+258 87 123 4567",
    "institution": "Universidade Eduardo Mondlane"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Conta criada com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    ...
  }
}
```

### 2. **Fazer Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### 3. **Salvar Tentativa de Exame**

```bash
curl -X POST http://localhost:5000/api/exams/attempt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "examId": "mat-001",
    "subject": "Matemática",
    "examTitle": "Álgebra Básica",
    "difficulty": "easy",
    "scorePercentage": 85.5,
    "correctCount": 8,
    "incorrectCount": 2,
    "totalQuestions": 10,
    "timeSpent": 1200,
    "userAnswers": {"1":"A","2":"B","3":"C"},
    "passed": true
  }'
```

---

## ✅ Verificar se Está Funcionando

Execute estas queries no PostgreSQL:

```sql
-- Ver usuários registados
SELECT id, name, email, created_at FROM users;

-- Ver tentativas de exames
SELECT * FROM exam_attempts ORDER BY completed_at DESC LIMIT 5;

-- Ver progresso por disciplina
SELECT * FROM user_subject_progress;

-- Ver estatísticas gerais dos usuários
SELECT * FROM user_overall_stats;

-- Ver estatísticas dos exames
SELECT * FROM exam_statistics;
```

---

## 🐛 Troubleshooting

### Erro: "relation users does not exist"
**Solução**: Execute o `exam_schema.sql` novamente

### Erro: "function update_updated_at_column() does not exist"
**Solução**: Execute primeiro o `schema.sql` principal, depois o `exam_schema.sql`

### Erro: "duplicate key value violates unique constraint"
**Solução**: Email já existe. Use outro email ou delete o usuário existente

### Rate Limit Exceeded
**Solução**: Aguarde o tempo indicado ou reinicie o servidor em desenvolvimento

---

## 📝 Próximos Passos

Agora que o backend está completo, você pode:

1. ✅ Atualizar o frontend para usar as novas APIs em vez de localStorage
2. ✅ Implementar geração de PDF para certificados
3. ✅ Criar dashboard admin para visualizar estatísticas
4. ✅ Adicionar envio de email para certificados
5. ✅ Implementar testes automatizados

---

## 📞 Suporte

Se tiver problemas, verifique:
- ✅ PostgreSQL está rodando
- ✅ Credenciais do `.env` estão corretas
- ✅ Todas as dependências foram instaladas
- ✅ O servidor backend está rodando

---

**Feito com ❤️ pela equipe BrainyWrite**
