# VN Promotora — Landing Page

Landing page de alta conversão para crédito consignado INSS.

---

## 📁 Estrutura do Projeto

```
vnpromotora/
├── index.html                  ← Entry point HTML
├── package.json                ← Dependências
├── vite.config.js              ← Configuração do build
├── vercel.json                 ← Config Vercel (opcional)
├── .gitignore
├── public/
│   ├── .htaccess               ← Config Apache (hospedagem compartilhada)
│   ├── _redirects              ← Config Netlify (opcional)
│   └── images/                 ← ✅ JÁ ESTÁ EM PRODUÇÃO — não apagar
│       ├── vn_promotora_vida_nova_logo._top.webp
│       ├── carousel_01.webp
│       ├── carousel_02.webp
│       ├── carousel_03.webp
│       ├── carousel_04.webp
│       ├── carousel_05.webp
│       ├── vn_promotora_vida_first.webp
│       ├── vn_promotora_vida_section_last.webp
│       └── vn_promotora_vida_nova_logo_white_footer.webp
└── src/
    ├── main.jsx                ← React entry point
    └── VNPromotora.jsx         ← Componente principal da landing page
```

---

## ⚡ Instalação e Build Local

### Pré-requisitos
- Node.js 18+ instalado → https://nodejs.org

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em desenvolvimento (localhost)
```bash
npm run dev
```
Acesse: http://localhost:5173

### 3. Gerar build de produção
```bash
npm run build
```
A pasta **`dist/`** será criada — é ela que você faz o upload para o servidor.

### 4. Testar o build localmente antes do deploy
```bash
npm run preview
```

---

## 🚀 Deploy — Hospedagem Compartilhada (cPanel / Hostinger / Locaweb)

1. Rode `npm run build` na sua máquina
2. Acesse o **Gerenciador de Arquivos** ou use FTP (FileZilla)
3. Faça upload de **todo o conteúdo da pasta `dist/`** para a raiz do domínio (`public_html/`)
4. O arquivo `.htaccess` já está incluído no `dist/` e configura o roteamento SPA automaticamente
5. A pasta `public/images/` já está em produção — **não apague**

> ⚠️ O upload é do **conteúdo** de `dist/`, não da pasta `dist/` em si.

Estrutura no servidor após o upload:
```
public_html/
├── index.html
├── .htaccess
├── _redirects
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/          ← já estava em produção
    └── ...
```

---

## ☁️ Deploy — Vercel (gratuito, recomendado)

1. Crie conta em https://vercel.com
2. Conecte seu repositório GitHub
3. Importe o projeto — Vercel detecta automaticamente o Vite
4. Deploy automático em cada push

Ou via CLI:
```bash
npm install -g vercel
vercel
```

---

## 🌐 Deploy — Netlify (gratuito)

1. Acesse https://app.netlify.com
2. Arraste e solte a pasta `dist/` na interface do Netlify
3. Pronto — o arquivo `_redirects` já resolve o roteamento SPA

---

## 🔧 Configurações importantes

### Webhook do formulário
O endpoint está configurado em `src/VNPromotora.jsx`:
```js
const WEBHOOK_URL =
  "https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form";
```

### Imagens
Todas as imagens devem estar em `public/images/` (já em produção).
O Vite copia automaticamente o conteúdo de `public/` para `dist/` durante o build.

### Responsividade
- **Mobile** ( < 960px ): layout original, otimizado para idosos
- **Desktop** ( ≥ 960px ): layout em duas colunas

---

## 📦 Dependências

| Pacote | Versão | Função |
|--------|--------|--------|
| react | ^18.3 | UI framework |
| react-dom | ^18.3 | Renderização |
| vite | ^5.4 | Build tool / dev server |
| @vitejs/plugin-react | ^4.3 | Suporte JSX |

---

## 📞 Suporte

VN Promotora — CNPJ: 23.529.979/0001-95  
Seg–Sex: 08h–18h  
Itabaianinha – SE (Matriz) | Estância – SE | Aracaju – SE
