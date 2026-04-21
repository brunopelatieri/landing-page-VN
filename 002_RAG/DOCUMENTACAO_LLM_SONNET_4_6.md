# Documentacao Tecnica para LLM (Sonnet 4.6)

## 1) Objetivo do projeto

`landing-page-VN-SIAPE` e uma aplicacao React + Vite para captacao de leads da VN Promotora, com duas esteiras principais:

- Credito consignado para publico INSS.
- Credito consignado para publico CLT.

O projeto e focado em marketing/performance: paginas de alta conversao, formulario multi-etapas, envio de lead para webhook e rastreamento simultaneo via Meta Pixel + Meta Conversions API (CAPI).

## 2) Escopo funcional

### Rotas principais

- `/` -> Landing INSS.
- `/credito-consignado-clt` -> Landing CLT.
- `/obrigado` -> Pagina de agradecimento padrao.
- `/obrigado-q` -> Obrigado qualificado com redirecionamento para WhatsApp.
- `/obrigado-clt` -> Obrigado especifico da esteira CLT.

### Jornada de lead (alto nivel)

1. Usuario entra na landing (INSS ou CLT).
2. Preenche formulario multi-step com validacoes no front.
3. Front envia dados para webhook externo (`mode: "no-cors"`).
4. Front dispara `trackMetaLead()`:
   - Evento browser: `fbq("track", "Lead", ...)`.
   - Evento server-side: POST no endpoint CAPI (`/api/meta-conversion.php` por padrao).
5. Usuario e redirecionado para pagina de obrigado adequada.

## 3) Stack e runtime

- Frontend: React 18, React Router DOM, Vite 5.
- UI: estilos inline + CSS injetado por string nas paginas.
- Componentes auxiliares:
  - `react-datepicker`
  - `date-fns`
- Backend de CAPI:
  - PHP (`backend/php/meta-conversion.php`) para hospedagem compartilhada.
  - Node (`backend/node/meta-conversion-server.mjs`) para alternativa self-hosted.
  - Handler serverless (`api/meta-conversion.js`) para ambiente tipo Vercel.

## 4) Estrutura de codigo (visao orientada por dominio)

### Bootstrap e roteamento

- `src/main.jsx`: monta a aplicacao.
- `src/App.jsx`: define as rotas principais.

### Paginas de entrada (landings)

- `src/VNPromotora.jsx`:
  - Landing INSS.
  - Formulario em 2 etapas (`MultiStepForm`).
  - Segmentacao de lead qualificado vs nao qualificado.
- `src/VNPromotoraCLT.jsx`:
  - Landing CLT.
  - Formulario em 2 etapas (`MultiStepFormCLT`), incluindo data de nascimento.
  - FAQ expandivel no bloco de duvidas.

### Paginas de obrigado

- `src/Obrigado.jsx` (default export atual com nome interno `ObrigadoCLT`).
- `src/ObrigadoQ.jsx`: inclui redirecionamento automatico para WhatsApp em 5 segundos.
- `src/ObrigadoCLT.jsx`.

### Componentes compartilhados

- `src/components/Header.jsx`: barra superior com logo e link home.
- `src/components/Footer.jsx`: rodape institucional com unidades, CNPJ e tagline customizavel.

### Utilitarios

- `src/utils/publicPath.js`: constroi URLs de assets em `public/` respeitando `BASE_URL`.
- `src/utils/metaPixel.js`: encapsula disparo de evento de lead para Pixel + CAPI.

### Camada backend/conversao

- `backend/php/meta-conversion.php`: endpoint CAPI em PHP.
- `backend/php/config.php.example`: template para segredos no servidor.
- `backend/node/meta-conversion-server.mjs`: servidor Node HTTP para CAPI.
- `api/meta-conversion.js`: handler serverless (Node runtime) para CAPI.

### Build/deploy

- `scripts/prepare-cpanel.mjs`: copia endpoint PHP para `dist/api` no build de cPanel.
- `vite.config.js`: configuracao de build.
- `vercel.json`: configuracao de deploy Vercel (rewrite SPA + cache headers).

## 5) Logica de negocio dos formularios

## 5.1 INSS (`VNPromotora.jsx`)

### Etapa 1 (dados pessoais)

- Nome completo (minimo 2 palavras).
- Email (validacao simples por `@` e `.`).
- Celular (mascara e tamanho minimo).
- CPF (mascara + algoritmo validador de digitos).

### Etapa 2 (perfil)

- Beneficio.
- Faixa etaria.
- Historico de consignado.
- Situacao atual.

### Regra de qualificacao

O lead e considerado qualificado quando **todas** as condicoes batem em conjuntos pre-definidos no codigo:

- Beneficio elegivel.
- Faixa etaria elegivel.
- Historico elegivel.
- Situacao elegivel.

### Redirecionamento INSS

- Qualificado -> `/obrigado-q` (fluxo com WhatsApp).
- Nao qualificado -> `/obrigado`.

## 5.2 CLT (`VNPromotoraCLT.jsx`)

### Etapa 1 (dados pessoais)

- Nome completo.
- Email.
- Celular.
- CPF.

### Etapa 2 (perfil CLT)

- Data de nascimento:
  - obrigatoria
  - nao futura
  - idade minima 18 anos
- Situacao de trabalho.
- Historico de consignado CLT.
- Situacao atual.

### Redirecionamento CLT

- Sempre para `/obrigado-clt` apos envio.

## 6) Integracoes externas

## 6.1 Webhook de leads

Ambas as landings fazem POST para:

- `https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form`

Campos relevantes enviados incluem dados pessoais + metadados de formulario (`formName`, campos de perfil e tipo de pagina no CLT).

Observacao importante:

- O uso de `mode: "no-cors"` impede leitura de resposta no frontend.
- Isso prioriza disparo "fire-and-forget" para nao travar UX.

## 6.2 Meta Pixel + Conversions API

`trackMetaLead()` executa duas frentes:

1. Browser pixel:
   - `window.fbq("track", "Lead", {}, { eventID })`
2. Server-side CAPI:
   - POST com `event_name`, `event_id`, `fbp`, `fbc`, `page_url`, e dados do lead.

Nos endpoints CAPI (PHP/Node/serverless):

- Dados sensiveis sao normalizados e hasheados com SHA-256 (`em`, `ph`, `fn`, `ln`, `external_id`) antes do envio para Graph API.
- Evento enviado para:
  - `https://graph.facebook.com/v20.0/{pixelId}/events?access_token={token}`

## 7) Variaveis e segredos

### Frontend (Vite)

- `VITE_META_PIXEL_ID`
- `VITE_META_CAPI_ENDPOINT`

### Backend CAPI

- `META_PIXEL_ID`
- `META_CAPI_TOKEN`

### Em hospedagem compartilhada (PHP)

Quando nao houver env vars de servidor:

- Criar `api/config.php` a partir de `config.php.example`.
- Guardar `META_PIXEL_ID` e `META_CAPI_TOKEN` nesse arquivo.
- Proteger via `.htaccess` (ja previsto no projeto).

## 8) Build e deploy

### Desenvolvimento local

- `npm run dev`

### Build padrao

- `npm run build`

### Build para cPanel/Hostinger

- `npm run build:cpanel`

Esse comando:

1. Gera o frontend em `dist/`.
2. Copia endpoint PHP e arquivos de suporte para `dist/api/`.

### Vercel

- `vercel.json` define:
  - build command com Vite.
  - `outputDirectory: dist`.
  - rewrite SPA para `index.html`.
  - cache agressivo para `images` e `assets`.

## 9) Assets e convencoes de caminho

- Imagens ficam em `public/images/...`.
- Em React, a convencao local e usar `publicPath("images/...")`.
- Nao referenciar `public/images/...` literalmente nos componentes.

## 10) Caracteristicas de UX/UI

- Design responsivo com breakpoints principais em `960px`.
- Conteudo e CTAs direcionados para conversao.
- Carrosseis, secoes educativas, prova social e avisos regulatorios.
- Estilos majoritariamente inline + bloco de CSS string por pagina.

## 11) Riscos, debitos tecnicos e observacoes para manutencao

1. **Duplicacao de logica**:
   - Mascaras/validacoes de CPF e telefone aparecem em mais de uma pagina.
   - Pode ser extraido para utilitarios compartilhados.
2. **Arquitetura de estilos**:
   - Grande volume de estilo inline e CSS dentro de template string.
   - Dificulta padronizacao, reuso e manutencao em escala.
3. **Sem tipagem estatica**:
   - Projeto em JS/JSX puro; schema de payload e contratos ficam implcitos.
4. **Sem suite de testes automatizados**:
   - Nao ha testes unitarios/E2E versionados.
5. **Nome de funcao em `src/Obrigado.jsx`**:
   - default export funciona, mas o nome interno da funcao esta `ObrigadoCLT`, o que pode gerar confusao de leitura.
6. **Gestao de segredos**:
   - Necessario garantir que tokens reais nao sejam commitados.

## 12) Modelo mental para Sonnet 4.6 (como interpretar este repo)

Pense neste projeto como tres camadas:

1. **Aquisicao/Conversao (frontend landing)**  
   Conteudo, formulario, qualificacao e redirecionamento.
2. **Integracao de captacao (webhook + pixel)**  
   Envio de lead para automacao/comercial.
3. **Mensuracao server-side (CAPI)**  
   Confiabilidade de atribuicao de eventos no Meta.

Em qualquer alteracao, preserve estes principios:

- Nao quebrar a jornada de conversao.
- Nao remover rastreamento de eventos.
- Nao expor segredos no cliente.
- Manter consistencia das rotas de obrigado e dos campos enviados ao webhook.

## 13) Backlog recomendado (prioridade tecnica)

1. Extrair validadores e mascaras para `src/utils/form/`.
2. Criar camada unica para envio de lead (webhook + pixel) com retries opcionais.
3. Introduzir testes E2E minimos (rotas, submit, redirecionamentos).
4. Revisar nomes de componentes/exports para consistencia semantica.
5. Considerar migrar estilos para abordagem mais modular (CSS Modules ou Tailwind, por exemplo).

## 14) Comandos rapidos para onboarding de IA

```bash
npm install
npm run dev
```

Para build de producao:

```bash
npm run build
```

Para pacote cPanel:

```bash
npm run build:cpanel
```

---

Se uma LLM precisar atuar neste repositorio, comece sempre por:

1. Ler `src/App.jsx` para entender rotas.
2. Ler `src/VNPromotora.jsx` e `src/VNPromotoraCLT.jsx` para funil de conversao.
3. Ler `src/utils/metaPixel.js` para rastreamento.
4. Ler `backend/php/meta-conversion.php` para CAPI em producao compartilhada.
5. Ler `README-cpanel.md` para operacao de deploy real.
