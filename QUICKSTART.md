# 🚀 Quick Start Guide - BrainyWrite

**Setup em 5 minutos!**

## ⚡ Setup Rápido

```bash
# 1. Clone
git clone <repository-url>
cd brainywrite

# 2. Configure .env
cp .env.example .env
# Edite .env com suas credenciais PostgreSQL

# 3. Setup automático (deps + DB + admin)
npm run setup

# 4. Inicie
npm run dev:full
```

**Pronto!** Acesse http://localhost:5173

---

## 🔑 Credenciais Padrão

**Admin Login**: http://localhost:5173/admin/login
- Username: `admin`
- Password: `admin123`

⚠️ **Mude a senha após primeiro login!**

---

## 📝 Configurações Essenciais (.env)

### 1. PostgreSQL
```env
PGUSER=postgres
PGPASSWORD=sua_senha_aqui
```

### 2. Email (Gmail)
```env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
```

**Como obter senha de app Gmail:**
1. Ative 2FA: https://myaccount.google.com/security
2. Gere App Password: https://myaccount.google.com/apppasswords
3. Use a senha gerada no `.env`

### 3. JWT Secret
✅ Já foi gerado automaticamente!

---

## 🎯 Próximos Passos

### Testar Funcionalidades
- [ ] Acesse homepage
- [ ] Teste formulário de contato
- [ ] Teste cotação (multi-step)
- [ ] Login admin
- [ ] Verifique dashboard

### Personalizar
- [ ] Altere logo em `/public`
- [ ] Edite conteúdo em `/src/data`
- [ ] Configure Google Analytics no `index.html`
- [ ] Adicione suas redes sociais

---

## 🆘 Problemas Comuns

### "Database connection failed"
```bash
# Verificar PostgreSQL rodando
psql -U postgres -l

# Ou reinstalar DB
npm run db:reset
```

### "Email not sent"
- Usar App Password do Gmail (não senha normal)
- Confirmar 2FA ativado

### "Admin login failed"
```bash
# Criar novo admin
npm run create-admin
```

---

## 📚 Documentação Completa

- [README.md](README.md) - Documentação principal
- [SETUP.md](SETUP.md) - Setup detalhado
- [CONTRIBUTING.md](CONTRIBUTING.md) - Como contribuir
- [README_ADMIN.md](README_ADMIN.md) - Guia admin

---

## 🛠️ Scripts Úteis

```bash
npm run dev           # Frontend apenas
npm run server        # Backend apenas
npm run dev:full      # Frontend + Backend

npm run build         # Build produção
npm run db:reset      # Resetar database
npm run create-admin  # Criar admin
```

---

**Precisa de ajuda?** Email: contato.brainywrite@gmail.com
