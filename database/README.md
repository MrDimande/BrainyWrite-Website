# Database Scripts

Esta pasta contém os scripts SQL para inicializar o banco de dados do BrainyWrite.

## 📋 Arquivos

### ✅ `schema.sql` - **USE ESTE ARQUIVO**
Este é o schema oficial e deve ser usado para criar o banco de dados.

**Características:**
- Usa `SERIAL` (INTEGER) para IDs (compatível com o código atual)
- Inclui todos os campos necessários
- Inclui a view `dashboard_stats`
- Inclui todos os índices e triggers
- **NÃO** insere usuário admin (use `create-admin.js`)

**Como usar:**
```bash
# Opção 1: Script NPM
npm run db:init

# Opção 2: Manual
psql -U postgres -c "CREATE DATABASE brainywrite_db;"
psql -U postgres -d brainywrite_db -f database/schema.sql
```

### ⚠️ `schema.uuid.backup.sql` - **NÃO USAR**
Este é um backup de uma versão alternativa que usa UUID. **NÃO USE ESTE ARQUIVO** - ele não é compatível com o código atual.

Foi mantido apenas como referência caso seja necessário migrar para UUID no futuro.

### `create-admin.js`
Script Node.js para criar usuário administrador com hash de senha correto.

**Como usar:**
```bash
# Admin padrão (username: admin, password: admin123)
npm run create-admin

# Admin customizado
npm run create-admin meuusername email@exemplo.com minhasenha
```

### `init.sh`
Script bash para inicialização do banco (usa `schema.sql`).

## 🔧 Estrutura do Banco

O banco de dados contém as seguintes tabelas:

1. **contactos** - Mensagens do formulário de contato
2. **cotacoes** - Solicitações de cotação
3. **agendamentos** - Agendamentos de consultas
4. **newsletter_subscribers** - Inscritos na newsletter
5. **admin_users** - Usuários administradores

E a view:
- **dashboard_stats** - Estatísticas para o dashboard admin

## ⚠️ Importante

- **SEMPRE use `schema.sql`** - é o único schema suportado
- **NÃO insira admin diretamente no SQL** - use `create-admin.js` para garantir hash correto
- **Backup antes de alterar** - faça backup antes de modificar o schema em produção

## 📝 Migrações Futuras

Se precisar alterar o schema:
1. Crie um script de migração SQL
2. Teste em ambiente de desenvolvimento
3. Faça backup do banco de produção
4. Execute a migração
5. Atualize este README

