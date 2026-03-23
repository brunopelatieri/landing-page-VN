# VN Promotora — Landing Pages (INSS + CLT)

Projeto React + Vite com múltiplas rotas de landing page e páginas de obrigado.

## Rotas do projeto

- `/` — Landing principal INSS
- `/credito-consignado-clt` — Landing CLT
- `/obrigado` — Obrigado padrão
- `/obrigado-q` — Obrigado qualificado (WhatsApp)
- `/obrigado-clt` — Obrigado CLT

## Stack

- React 18
- React Router DOM
- Vite 5
- Meta Pixel + Conversions API (endpoint backend separado)

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run build:cpanel
```

`build:cpanel` gera o pacote de deploy para hospedagem comum (cPanel/Hostinger), incluindo API PHP em `dist/api`.

## Estrutura principal

```text
landing-page-VN/
├── public/
│   ├── .htaccess
│   ├── _redirects
│   └── images/
├── src/
│   ├── components/
│   ├── utils/
│   ├── VNPromotora.jsx
│   ├── VNPromotoraCLT.jsx
│   ├── Obrigado.jsx
│   ├── ObrigadoQ.jsx
│   └── ObrigadoCLT.jsx
├── backend/
│   ├── php/
│   │   ├── meta-conversion.php
│   │   └── config.php.example
│   └── node/
│       └── meta-conversion-server.mjs
├── scripts/
│   └── prepare-cpanel.mjs
└── README-cpanel.md
```

## Variáveis de ambiente

### Frontend (Vite)

Usadas no build do front:

- `VITE_META_PIXEL_ID`
- `VITE_META_CAPI_ENDPOINT`

### Backend CAPI (PHP/Node)

- `META_PIXEL_ID`
- `META_CAPI_TOKEN`

Para hospedagem compartilhada sem env vars de servidor, use `api/config.php` (detalhado no guia cPanel).

## Deploy rápido

Para hospedagem comum PHP:

```bash
npm run build:cpanel
```

Depois suba o conteúdo de `dist/` para `public_html/`.

Guia detalhado:

- [`README-cpanel.md`](README-cpanel.md)

## Observações

- Não use `public/images/...` diretamente no código React; use `publicPath("images/...")`.
- O endpoint CAPI padrão do front está apontado para `/api/meta-conversion.php`.
