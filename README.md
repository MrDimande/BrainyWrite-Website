# BrainyWrite - Assessoria Académica & Criativa

Um website moderno, futurístico e elegante para consultoria académica e criatividade em Moçambique. Desenvolvido com React, Vite e Tailwind CSS, oferecendo uma experiência de usuário excepcional com design glassmorphism e animações suaves.

## 🚀 Características

### ✨ Design Futurístico

- **Glassmorphism** - Efeitos de vidro com blur e transparência
- **Gradientes Animados** - Backgrounds dinâmicos com cores vibrantes
- **Neon Glow** - Efeitos de brilho e sombras coloridas
- **Animações Framer Motion** - Transições suaves e interativas
- **Grid Futurístico** - Background com padrões geométricos animados

### 📱 Responsividade Total

- **Mobile-First** - Design otimizado para dispositivos móveis
- **Breakpoints Inteligentes** - Adaptação perfeita em todas as telas
- **Touch-Friendly** - Interações otimizadas para touch
- **Performance** - Carregamento rápido em todos os dispositivos

### 🎯 Funcionalidades Principais

- **Navegação Intuitiva** - Menu responsivo com animações
- **Formulários Avançados** - Validação em tempo real com React Hook Form
- **Multi-Step Forms** - Formulário de cotação em 4 etapas
- **Toast Notifications** - Feedback visual para ações do usuário
- **Scroll Suave** - Navegação fluida entre seções

## 🛠️ Tecnologias Utilizadas

- **React 18+** - Biblioteca principal para interface
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **React Router** - Navegação entre páginas
- **React Hook Form** - Gerenciamento de formulários
- **React Hot Toast** - Notificações elegantes
- **Lucide React** - Ícones modernos e consistentes

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Navbar.jsx          # Navegação principal
│   ├── Footer.jsx          # Rodapé com informações
│   ├── Hero.jsx            # Seção hero da homepage
│   ├── ServiceCard.jsx     # Cards de serviços
│   └── ContactForm.jsx     # Formulário de contato
├── pages/
│   ├── Home.jsx            # Página inicial
│   ├── Servicos.jsx        # Página de serviços
│   ├── Agendar.jsx         # Página de agendamento
│   └── Cotacao.jsx         # Página de cotação
├── App.jsx                 # Componente principal
└── main.jsx                # Ponto de entrada
```

## 🎨 Paleta de Cores

```css
--primary-purple: #a855f7
--primary-blue: #3b82f6
--primary-gold: #f59e0b
--primary-teal: #14b8a6
--bg-dark: #0a0a0a
--glass-bg: rgba(255, 255, 255, 0.05)
--glass-border: rgba(255, 255, 255, 0.1)
```

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd bmc-pro-services
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra seu navegador em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist`.

## 📄 Páginas do Site

### 1. Homepage (/)

- **Hero Section** com título impactante e CTAs
- **Cards de Estatísticas** com animações
- **Seção Sobre Nós** com missão, visão e valores
- **Preview de Serviços** com cards interativos
- **CTA Final** para conversão

### 2. Serviços (/servicos)

- **Grid de Serviços** com cards expansíveis
- **Instituições Parceiras** com logos
- **Processo de Trabalho** em 4 etapas
- **Informações Detalhadas** de cada serviço

### 3. Agendamento (/agendar)

- **Formulário Completo** com validação
- **Informações de Contato** na sidebar
- **Políticas de Agendamento** transparentes
- **Feedback Visual** para o usuário

### 4. Cotação (/cotacao)

- **Formulário Multi-Step** em 4 etapas
- **Cálculo Automático** de preços
- **Garantias Exibidas** para confiança
- **Progress Bar** visual

## 🎭 Animações e Efeitos

### Efeitos Implementados

- **Parallax Scrolling** - Movimento de elementos
- **Particle Background** - Partículas flutuantes
- **GSAP Animations** - Animações complexas
- **Hover Effects** - Interações ao passar o mouse
- **Loading States** - Estados de carregamento
- **Smooth Transitions** - Transições suaves

### Classes CSS Customizadas

```css
.glass              /* Efeito glassmorphism */
on-glow             /* Brilho neon */
.gradient-text      /* Texto com gradiente */
.float              /* Animação flutuante */
.btn-primary        /* Botão principal */
.btn-secondary      /* Botão secundário */
.form-input         /* Input estilizado */
.card; /* Card com hover */
```

## 📱 Responsividade

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptações Mobile

- Menu hamburger
- Cards empilhados
- Formulários em coluna única
- Texto otimizado
- Touch targets adequados

## 🔧 Configuração

### Tailwind Config

```javascript
// Cores customizadas
colors: {
  primary: {
    purple: '#a855f7',
    blue: '#3b82f6',
    gold: '#f59e0b',
    teal: '#14b8a6',
  }
}

// Animações customizadas
animation: {
  'gradient': 'gradient 3s ease infinite',
  'float': 'float 3s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

## 🎯 Funcionalidades Avançadas

### Validação de Formulários

- Validação em tempo real
- Mensagens de erro personalizadas
- Formato de telefone moçambicano
- Validação de email
- Campos obrigatórios

### Navegação

- Scroll suave entre seções
- Menu sticky com backdrop blur
- Indicadores de página ativa
- Breadcrumbs visuais

### Performance

- Lazy loading de componentes
- Otimização de imagens
- Code splitting automático
- Bundle size otimizado

## 📊 SEO e Acessibilidade

### SEO

- Meta tags otimizadas
- Structured data (JSON-LD)
- Open Graph tags
- Twitter Cards
- Sitemap automático

### Acessibilidade

- ARIA labels
- Navegação por teclado
- Contraste adequado
- Screen reader friendly
- Focus indicators

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload da pasta dist para Netlify
```

### GitHub Pages

```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 📝 Licença

Este projecto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contacto

**BMC Pro Services**

- Email: contato@bmcpro.com
- Telefone: +258 87 088 3476
- Website: [bmcpro.co.mz](https://bmcpro.co.mz)

---

Desenvolvido com ❤️ para transformar desafios em oportunidades de sucesso.
