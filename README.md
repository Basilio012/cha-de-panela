# Chá de Panela - Emanuelly e Mateus

Site interativo para escolher presentes do chá de panela com envio automático para WhatsApp.

## 🚀 Features

- ✨ Design elegante e responsivo
- 🎁 Lista interativa de presentes por categoria
- 📱 Coleta de dados com validação
- 💬 Envio automático para WhatsApp com os dados
- 🔒 Painel de administração para gerenciar presentes
- 📲 Funciona perfeitamente em mobile e desktop

## 🛠️ Tecnologias

- React 18
- JavaScript ES6+
- CSS3
- Lucide React (ícones)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## 🚀 Como Instalar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/cha-de-panela.git
cd cha-de-panela
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Build para Produção

```bash
npm run build
```

Cria uma pasta `build` otimizada para produção.

## 🌐 Deploy

### Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New" → "Project"
4. Selecione este repositório
5. Clique em "Deploy"
6. Seu site estará live em `seu-projeto.vercel.app`

### Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy automático

## ⚙️ Configuração

### Número do WhatsApp

Para alterar o número do WhatsApp, edite em `src/App.jsx`:

```javascript
const WHATSAPP_NUMBER = '556292684729';
```

Formato: `55` + DDD + número (sem caracteres especiais)

### Senha de Admin

Para alterar a senha do admin, edite em `src/App.jsx`:

```javascript
const ADMIN_PASSWORD = 'emanuelly2024';
```

## 📝 Estrutura do Projeto

```
cha-de-panela/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx           # Componente principal
│   └── index.js          # Ponto de entrada
├── package.json
├── .gitignore
└── README.md
```

## 🎯 Funcionalidades

### Lista de Presentes
- Browse presentes por categoria
- Clique para escolher um presente
- Formulário de dados do usuário
- Envio automático para WhatsApp

### Painel de Admin
- Acesso com senha
- Visualizar presentes confirmados
- Reativar presentes individuais
- Resetar todos os presentes

## 💬 Mensagem WhatsApp

Quando um usuário escolhe um presente, recebe automaticamente no WhatsApp:

```
🎁 *Nova Confirmação de Presente!*

*Presente Escolhido:* [Nome do Presente]

*Dados de Quem Escolheu:*
*Nome:* [Nome do Usuário]
*Telefone:* [Telefone]
*Mensagem:* [Se tiver preenchido]
```

## 📱 Responsividade

O site funciona perfeitamente em:
- 📱 Smartphones
- 📱 Tablets
- 🖥️ Desktops

## 🔒 Segurança

- Validação de formulários no cliente
- Formatação automática de telefone
- Filtro de caracteres especiais
- Sem armazenamento de dados sensíveis

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com Emanuelly e Mateus.

## 📄 Licença

Este projeto é para uso pessoal.

---

**Desenvolvido com ❤️ para o Chá de Panela**
