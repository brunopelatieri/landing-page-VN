# PROMPT DE ENGENHARIA — Nova Esteira SIAPE (landing-page-VN)

> **Destinatário:** Claude Sonnet 4.6 (ou dev)  
> **Projeto base:** `landing-page-VN` (React 18 + Vite 5 + React Router DOM)  
> **Objetivo:** Adicionar a esteira de crédito consignado para Servidores Federais SIAPE ao projeto existente, sem quebrar nenhuma das esteiras já existentes (INSS e CLT).

---

## CONTEXTO DO PROJETO

Você está atuando em um projeto React + Vite de captação de leads chamado `landing-page-VN`. Ele já possui as seguintes esteiras:

- `/` → `VNPromotora.jsx` — Landing INSS com formulário qualificador de 2 etapas
- `/credito-consignado-clt` → `VNPromotoraCLT.jsx` — Landing CLT com formulário de 2 etapas
- `/obrigado` → página de agradecimento padrão
- `/obrigado-q` → agradecimento qualificado INSS com redirect WhatsApp
- `/obrigado-clt` → agradecimento da esteira CLT

**REGRA GERAL:** Nunca altere arquivos existentes, exceto `src/App.jsx` (para adicionar as novas rotas). Toda a nova funcionalidade será criada em arquivos novos.

---

## TAREFA — O QUE DEVE SER CRIADO

Crie os seguintes arquivos novos e adicione as rotas correspondentes em `src/App.jsx`:

| Arquivo novo | Rota | Descrição |
|---|---|---|
| `src/VNPromotoraSIAPE.jsx` | `/credito-consignado-siape` | Landing SIAPE (baseada na estrutura de `VNPromotora.jsx`) |
| `src/components/MultiStepFormSIAPE.jsx` | — | Formulário de 2 etapas exclusivo SIAPE |
| `src/ObrigadoSIAPE.jsx` | `/obrigado-siape` | Página de agradecimento SIAPE (baseada em `ObrigadoCLT.jsx`) |

---

## ARQUIVO 1 — `src/App.jsx` (APENAS ADIÇÃO DE ROTAS)

Adicione estas duas rotas ao array/switch de rotas existente. **Não remova nem modifique rotas existentes.**

```jsx
import VNPromotoraSIAPE from './VNPromotoraSIAPE';
import ObrigadoSIAPE from './ObrigadoSIAPE';

// Adicionar dentro do <Routes>:
<Route path="/credito-consignado-siape" element={<VNPromotoraSIAPE />} />
<Route path="/obrigado-siape" element={<ObrigadoSIAPE />} />
```

---

## ARQUIVO 2 — `src/VNPromotoraSIAPE.jsx`

### Instruções gerais

- Use `VNPromotora.jsx` como **molde estrutural** (layout, padrão de CSS inline, importação de Header/Footer, lógica de state).
- Substitua todo o **conteúdo textual e visual** pelo briefing SIAPE abaixo.
- **REMOVA completamente** qualquer bloco de alerta vermelho com texto "AVISO IMPORTANTE" que existir no componente original.
- **NÃO implemente** lógica de qualificação de lead. O redirecionamento após o submit é sempre e unicamente para `/obrigado-siape`.
- Importe e use `MultiStepFormSIAPE` no lugar do `MultiStepForm` original.
- Mantenha o padrão de `publicPath()` para imagens, `Header` e `Footer`.

---

### CONTEÚDO DA PÁGINA SIAPE (use exatamente estes textos)

#### SEO / Meta
```
title: "Empréstimo Consignado SIAPE | Servidor Federal — VN Promotora"
description: "Crédito consignado para servidores públicos federais. Taxa a partir de 1,80% a.m., até 96x, sem consulta ao Serasa. Aprovação rápida e 100% digital."
```

#### HERO — Headline principal
```
"Você é servidor público federal?
Seu dinheiro pode estar disponível agora — sem burocracia e com a menor taxa do mercado."
```

#### HERO — Subtítulo
```
"Empréstimo Consignado SIAPE com desconto direto no contracheque, parcelas fixas e aprovação em até 1 dia útil. Sem consulta ao Serasa."
```

#### HERO — CTA botão
```
"Simular grátis agora →"
```

#### HERO — Micro-copy abaixo do CTA
```
"Consulta gratuita • Sem compromisso • Sem consulta ao SPC/Serasa"
```

---

#### SEÇÃO — Vantagens (ícone + texto, lista de 7 itens)
```
✅ Taxa de juros até 3x menor que empréstimos comuns
✅ Parcelas descontadas direto no contracheque — sem preocupação com vencimentos
✅ Prazo de até 96 meses para pagar
✅ Aprovação mesmo com nome sujo no Serasa
✅ Contratação 100% online e pelo celular
✅ Dinheiro na conta em até 1 dia útil
✅ Portabilidade com troco disponível
```

---

#### SEÇÃO — Como funciona (passo a passo, 6 etapas)
```
1. Consulte sua margem disponível → Acesse o app SouGov.br e veja quanto pode comprometer
2. Simule o empréstimo → Escolha o valor, prazo e compare as propostas
3. Envie a documentação → 100% digital, pelo celular
4. Assine o contrato digitalmente → Sem precisar ir ao banco
5. Dinheiro na conta → Liberação em até 1 dia útil em muitas instituições
6. Desconto automático em folha → Sem preocupação com boletos ou datas de vencimento
```

---

#### SEÇÃO — Quem pode contratar (lista simples)
```
✅ Servidores públicos federais civis ativos
✅ Militares das Forças Armadas
✅ Aposentados e pensionistas federais
✅ Ocupantes de cargos e funções vinculadas ao SIAPE
✅ Servidores com restrição no Serasa/SPC (nome sujo)
```

---

#### SEÇÃO — Modalidades disponíveis (4 cards)
```
🆕 Novo Contrato
Exclusivo para quem tem margem livre ou até mesmo nunca pegou crédito consigo.

💰Aumento Salarial 2026
No mês de abril de 2026 todos servidores SIAPES tiveram aumento salarial, fazendo com que todos agora tenha margem disponível para pegar credito

🔁 Refinanciamento
Renegociação do saldo devedor com novas condições. Pode obter dinheiro extra mantendo ou reduzindo a parcela.

🔀 Portabilidade
Transferência do contrato para um banco com taxa mais baixa. É seu direito por lei — gratuita e sem burocracia.

💸 Portabilidade com Troco
Além de reduzir a taxa, você recebe a diferença em dinheiro na conta. Economize e ainda ganhe dinheiro extra.
```

---

#### SEÇÃO — Condições e taxas (tabela ou cards de dados)
```
Taxa máxima:        2/3 dos créditos bancários pessoais
Prazo máximo:       Até 96 meses (8 anos)
Margem p/ empréstimo: 35% da remuneração líquida
Margem p/ cartão:   5% da remuneração líquida
Aprovação:          Em até 1 dia útil
Consulta Serasa:    Não realizada
```

---

#### SEÇÃO — Portabilidade (argumento de venda)
```
Título: "Já tem consignado em outro banco? Você pode estar pagando caro demais."

Texto: "Com a Portabilidade SIAPE você transfere seu contrato para uma taxa menor e ainda pode receber um troco em dinheiro na conta. A transferência é gratuita — qualquer cobrança antecipada é proibida por lei. O banco de origem não pode criar dificuldades. É o seu direito."

Destaque: "Exemplo: em um contrato de R$ 15.000 com 84 parcelas a 2,05%/mês, ao fazer portabilidade para 1,65%/mês, a economia total pode superar R$ 3.300 — mais de 2 salários mínimos."
```

---

#### SEÇÃO — Prova social / contexto de mercado
```
"Mais de 1,3 milhão de servidores públicos federais são atendidos pelo SIAPE.
O segmento tem a menor inadimplência do Brasil — o que garante as menores taxas do mercado."
```

---

#### SEÇÃO — Aviso legal (rodapé de compliance — texto pequeno, discreto)
```
"As taxas, prazos e condições apresentados estão sujeitos à análise de crédito e podem variar conforme o convênio e a instituição financeira. A concessão de crédito depende de margem consignável disponível. As parcelas são descontadas diretamente em folha de pagamento. Consulte sempre as condições completas antes de contratar."
```

---

## ARQUIVO 3 — `src/components/MultiStepFormSIAPE.jsx`

### Visão geral do comportamento

- Formulário em **2 etapas** com **barra de progresso visual no topo** indicando a etapa atual (Etapa 1 de 2 / Etapa 2 de 2).
- 95% dos usuários estão em **dispositivos mobile** e muitos são **pessoas idosas** — todos os campos e botões devem ser grandes, com alto contraste e fácil leitura.
- **Todos os campos são obrigatórios.** Exibir mensagem de erro visual abaixo do campo caso tente avançar com campo vazio.
- **Não há lógica de qualificação.** Após o submit, sempre:
  1. Enviar dados via `POST` para `https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form`
  2. Redirecionar para `/obrigado-siape` usando `useNavigate()` do React Router.

---

### ETAPA 1 — Dados pessoais

Campos (em ordem):

1. **Nome completo** (`type="text"`, placeholder: "Seu nome completo", validação: mínimo 2 palavras)
2. **E-mail** (`type="email"`, placeholder: "seuemail@exemplo.com", validação: deve conter `@` e `.`)
3. **Celular** — usar a biblioteca `react-phone-input-2` com configuração:
   - `country="br"` (Brasil como padrão)
   - `onlyCountries={["br"]}` (bloquear outros países)
   - Máscara brasileira automática: `(11) 91234-5678`
   - Validação: mínimo 10 dígitos numéricos

4. **CPF** (`type="text"`, máscara: `000.000.000-00`, validação completa com algoritmo de dígitos verificadores)

Campo hidden obrigatório (inclua no payload do submit, não exibir na UI):
```jsx
// Inclua este valor no objeto de dados enviado ao webhook:
formName: "formSIAPE"
```

Botão ao final da Etapa 1:
```
"Continuar →"
(grande, cor destaque, largura 100% em mobile)
```

---

### ETAPA 2 — Perfil do servidor

Todos os campos são **radio buttons estilo card** — botões grandes e interativos, com no mínimo `min-height: 56px`, `font-size: 16px`, `border-radius: 10px`. Ao selecionar, o card deve mudar visivelmente de estado (borda colorida + background suave).

---

**Campo 1 — Categoria / ocupação**
Label: `"Qual categoria que melhor define sua ocupação ou vínculo atual?"`
Opções (copie exatamente, sem alterar):
```
○ Servidor Público Federal
○ Servidor Público Estadual
○ Servidor Público Municipal
○ Servidor Público Temporário (Contratado)
○ Beneficiário INSS / LOAS
○ Beneficiário Bolsa Família
○ Não possuo vínculo público ou benefício assistencial
```

---

**Campo 2 — Faixa etária**
Label: `"Qual sua idade hoje?"`
Opções (copie exatamente, sem alterar):
```
○ Até 50 anos
○ De 51 a 60 anos
○ De 61 a 65 anos
○ De 66 a 72 anos
○ 73 anos ou mais
```

---

**Campo 3 — Histórico de consignado**
Label: `"Quando foi a última vez que você contratou ou renovou um empréstimo consignado?"`
Opções (copie exatamente, sem alterar):
```
○ Há menos de 5 meses
○ Entre 6 e 11 meses
○ Há mais de 1 ano (Já paguei mais de 12 parcelas)
```

---

**Campo 4 — Situação atual**
Label: `"Qual a sua situação hoje?"`
Opções (copie exatamente, sem alterar):
```
○ Tenho margem livre e quero contratar agora
○ Tenho empréstimos antigos (mais de 1 ano) e quero renovar
○ Usei minha margem toda esse ano, mas quero novas oportunidades
○ Preciso de um cartão de crédito consignado
○ Estou sem margem, mas preciso de dinheiro
```

---

Botão final (submit) na Etapa 2:
```
"Enviar minha solicitação →"
(grande, cor destaque, largura 100% em mobile)
```

---

### Payload enviado ao webhook (POST, `Content-Type: application/json`)

```js
{
  formName: "formSIAPE",
  nome: "...",
  email: "...",
  celular: "...",
  cpf: "...",
  categoria: "...",   // valor selecionado no campo 1
  faixaEtaria: "...", // valor selecionado no campo 2
  historico: "...",   // valor selecionado no campo 3
  situacao: "..."     // valor selecionado no campo 4
}
```

Importante: use `mode: "no-cors"` no fetch (padrão do projeto, fire-and-forget):
```js
fetch("https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
```

Após o disparo do fetch (não aguardar resposta), chamar `trackMetaLead()` de `src/utils/metaPixel.js` com os dados disponíveis e em seguida `navigate("/obrigado-siape")`.

---

### UX — Comportamento da barra de progresso

```
[Etapa 1 de 2]  ●●○   "Seus dados"       → "Perfil"
[Etapa 2 de 2]  ●●●   "Seus dados"       → "Perfil" ✓
```

- Exibir indicador visual de progresso (ex: `Etapa 1 de 2`) com barra ou dots no topo do formulário.
- Botão "← Voltar" na Etapa 2 (acima do formulário ou abaixo do título), sem estilo de destaque.

---

## ARQUIVO 4 — `src/ObrigadoSIAPE.jsx`

### Instruções gerais

- Use `ObrigadoCLT.jsx` como **molde estrutural** (layout, Header, Footer, CSS inline).
- Substitua todo o **conteúdo textual** pelo conteúdo abaixo.
- **NÃO inclua** contador regressivo nem redirecionamento automático para WhatsApp (esse comportamento pertence apenas ao `ObrigadoQ.jsx`).
- Mantenha o padrão visual da página: centralizado, espaçoso, ícone de confirmação no topo.

### Conteúdo da página `/obrigado-siape`

```
Ícone: ✅ (verde, grande)

Título:
"Solicitação recebida com sucesso!"

Subtítulo / parágrafo principal:
"Obrigado, [nome não necessário aqui]! Nossa equipe especializada em Crédito Consignado SIAPE já recebeu sua solicitação e entrará em contato em breve com as melhores condições disponíveis para você."

Bloco de destaque (box):
"📋 O que acontece agora?
• Nosso especialista analisará seu perfil
• Você receberá uma proposta personalizada
• Todo o processo é gratuito e sem compromisso"

CTA secundário (botão WhatsApp — verde):
"💬 Prefere falar agora? Chame no WhatsApp"
(link: https://wa.me/5511000000000?text=Ol%C3%A1%2C+fiz+minha+solicita%C3%A7%C3%A3o+de+Consignado+SIAPE+e+gostaria+de+mais+informa%C3%A7%C3%B5es)
[Substitua o número pelo número real de WhatsApp da VN Promotora — se não souber, use placeholder comentado no código]

Texto de suporte abaixo do CTA:
"Atendimento especializado em Crédito Consignado para Servidores Federais SIAPE"
```

---

## CHECKLIST FINAL DE VALIDAÇÃO

Antes de considerar a implementação completa, valide cada item:

- [ ] `src/App.jsx` tem as rotas `/credito-consignado-siape` e `/obrigado-siape` adicionadas
- [ ] Nenhuma rota ou componente existente foi alterado ou removido
- [ ] `VNPromotoraSIAPE.jsx` não contém nenhum bloco de alerta vermelho "AVISO IMPORTANTE"
- [ ] `VNPromotoraSIAPE.jsx` importa e usa `MultiStepFormSIAPE` (não `MultiStepForm`)
- [ ] `MultiStepFormSIAPE.jsx` possui barra de progresso no topo com indicador de etapa
- [ ] Etapa 1 tem: Nome, E-mail, Celular (react-phone-input-2), CPF com máscara
- [ ] Etapa 2 tem os 4 campos radio com as opções EXATAS conforme especificado (sem alteração de texto)
- [ ] Os radio buttons são estilo card/botão grande (min-height 56px, font-size 16px)
- [ ] O campo hidden `formName: "formSIAPE"` está incluído no payload do submit
- [ ] O submit usa `mode: "no-cors"` e aponta para o webhook correto
- [ ] Não há lógica de qualificação — redirect sempre vai para `/obrigado-siape`
- [ ] `trackMetaLead()` é chamado antes do redirect (importado de `src/utils/metaPixel.js`)
- [ ] `ObrigadoSIAPE.jsx` não tem contador regressivo nem redirect automático para WhatsApp
- [ ] Todo o texto da landing SIAPE usa o conteúdo do briefing (sem conteúdo do briefing INSS)
- [ ] Layout é responsivo com breakpoint em 960px, compatível com mobile-first
- [ ] Fontes e tamanhos são acessíveis para usuários idosos (mínimo 16px no corpo)

---

## DEPENDÊNCIAS JÁ INSTALADAS NO PROJETO

As seguintes dependências já existem no `package.json` do projeto — não instale novamente:
- `react` `^18`
- `react-router-dom`
- `react-datepicker`
- `date-fns`

**A biblioteca `react-phone-input-2` pode ainda não estar instalada.** Antes de usá-la em `MultiStepFormSIAPE.jsx`, verifique o `package.json`. Se não estiver presente, adicione ao projeto com:
```bash
npm install react-phone-input-2
```
E importe corretamente no componente:
```jsx
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
```

---

## OBSERVAÇÕES FINAIS DE ARQUITETURA

1. **Não crie arquivos de estilo separados.** O projeto usa CSS inline e CSS como template string dentro do componente — siga o mesmo padrão dos demais componentes.
2. **Não use TypeScript.** O projeto é 100% JavaScript/JSX.
3. **Não altere `vite.config.js`, `vercel.json` ou scripts de build.** A nova rota SPA é tratada automaticamente pelos rewrites existentes.
4. **Mantenha o mesmo padrão de importação de imagens** usando `publicPath("images/...")` de `src/utils/publicPath.js`.
5. **Use `useNavigate` do `react-router-dom`** para o redirecionamento após submit — nunca `window.location.href` para não perder o contexto do roteador.

---
