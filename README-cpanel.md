# Deploy cPanel / Hostinger (PHP) — Guia Completo

Este guia cobre a publicação do projeto em hospedagem compartilhada (cPanel/Hostinger), com frontend estático + endpoint PHP para Meta Conversions API.

## Checklist rápido (2 minutos)

1. Rode o build de publicação:
   ```bash
   npm run build:cpanel
   ```
2. Faça upload de **todo o conteúdo** de `dist/` para `public_html/`.
3. Em `public_html/api/`, copie:
   - `config.php.example` → `config.php`
4. Edite `config.php` e preencha:
   - `META_PIXEL_ID`
   - `META_CAPI_TOKEN`
5. Teste no navegador:
   - `/`
   - `/credito-consignado-clt`
   - `/obrigado-q`
   - envio de formulário (confira request para `/api/meta-conversion.php`)

Se isso funcionar, o deploy está pronto.

## 1) Pré-requisitos

- Node.js 18+ na sua máquina local
- Acesso ao painel da hospedagem (cPanel ou hPanel Hostinger)
- Domínio apontando para a conta
- SSL ativo (recomendado)

## 2) Configurar variáveis locais de build (frontend)

No arquivo `.env` do projeto, configure:

```env
VITE_META_PIXEL_ID=933858032944864
VITE_META_CAPI_ENDPOINT=/api/meta-conversion.php
```

Se quiser, mantenha também:

```env
META_PIXEL_ID=933858032944864
META_CAPI_TOKEN=SEU_TOKEN
```

Essas duas últimas são úteis para testes locais de backend.

## 3) Gerar pacote para cPanel/Hostinger

No terminal:

```bash
npm install
npm run build:cpanel
```

Esse comando gera:

- `dist/` com frontend
- `dist/api/meta-conversion.php`
- `dist/api/config.php.example`
- `dist/api/.htaccess` (proteção de arquivos sensíveis)

## 4) Upload no servidor

Faça upload do **conteúdo** de `dist/` para `public_html/` (não envie a pasta `dist` inteira como subpasta).

Estrutura final esperada:

```text
public_html/
├── index.html
├── .htaccess
├── assets/
├── images/
├── api/
│   ├── meta-conversion.php
│   ├── config.php.example
│   └── .htaccess
└── ...
```

## 5) Configurar token no servidor (PHP)

Dentro de `public_html/api/`:

1. Copie `config.php.example` para `config.php`
2. Edite `config.php` com:

```php
<?php
return [
    "META_PIXEL_ID" => "933858032944864",
    "META_CAPI_TOKEN" => "SEU_TOKEN_AQUI",
];
```

O `.htaccess` da pasta `api/` já bloqueia acesso externo ao `config.php`.

## 6) Confirmar `.htaccess` da raiz

O arquivo `.htaccess` na raiz pública (`public_html/.htaccess`) já está preparado para:

- fallback SPA (rotas React)
- preservar rota `/api/*`
- cache estático
- gzip/brotli (quando suportado)
- headers básicos de segurança

## 7) Testes pós-deploy

Valide:

1. Rotas SPA:
   - `/`
   - `/credito-consignado-clt`
   - `/obrigado`
   - `/obrigado-q`
   - `/obrigado-clt`
2. Recarregar página em rota interna (F5) sem erro 404
3. Enviar formulário INSS e CLT
4. Abrir DevTools > Network e confirmar POST para:
   - webhook do formulário
   - `/api/meta-conversion.php`
5. Verificar eventos no Meta Events Manager (Pixel + CAPI)

## 8) Troubleshooting (Hostinger/cPanel)

### 404 em rotas internas
- Verifique se `public_html/.htaccess` foi enviado.
- Em Hostinger, confirme que mod_rewrite está ativo (normalmente já está).

### `/api/meta-conversion.php` retorna 500
- Token ausente ou inválido em `api/config.php`
- Extensão `curl` desativada no PHP (habilite no painel)
- Bloqueio de saída para `graph.facebook.com` no servidor

### Pixel dispara, mas CAPI não
- `VITE_META_CAPI_ENDPOINT` incorreto no build
- Arquivo `api/meta-conversion.php` não está no caminho esperado
- erro de CORS/URL no console de rede

### Mudança de env não refletiu
- Variáveis `VITE_*` só entram no frontend em build.
- Rode novo build e faça novo upload.

## 9) Recomendação de segurança

- Não versionar `api/config.php` com token real.
- Mantenha `.gitignore` com:
  - `.env`
  - `backend/php/config.php`

## 10) Fluxo de atualização

1. Faça mudanças no código
2. Rode `npm run build:cpanel`
3. Suba novamente o conteúdo de `dist/`
4. Preserve `public_html/api/config.php` já configurado

