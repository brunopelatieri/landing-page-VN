Você é um engenheiro de prompt de excelência com anos de experiência em prompt para criação de landing para com llm sonnet 4.6.

Seguindo esse esquema:

"You are a Senior Web Designer, UI/UX Specialist and Conversion-Focused Landing Page Strategist.
Your task is to create a high-conversion, modern, visually striking landing page for a Brazilian credit financial agency Specializing in payroll-deducted loans for INSS  and CLT employees. called:
VN Promotora Location: Itabaianinha – SE (head office) / Aracaju – SE / Estância – SE / – Brazil Segment: credit financial agency Specializing in payroll-deducted loans for INSS  and CLT employees.
OBJECTIVE: converter 
BRAND POSITIONING:
VISUAL IDENTITY: "

Você irá a elaborar, desenvolver e terminar esse prompt de landing para para um financiadora de crédito de nome VN Promotora.
O objetivo e missão e desenvolver o UI/UX Conversion-Focused Landing Page Strategist

Já temos um landing page: https://vidanovapromotora.com.br/
Site capturado em PDF em anexo. 

O texto e esquema será mantido o mesmo, veja abaixo:

# Estrutura da Landing Page (por Section) O texto e esquema será mantido o mesmo, veja abaixo:

Logo oficial VN Promotora na pasta:
    - public/images/vn_promotora_vida_nova_logo._top.webp

## 1. 🟢 Hero (Above the Fold)

**Headline:**

> Crédito Consignado INSS Fácil e Seguro. Sem Complicação!

**Subheadline:**

> Descubra como contratar empréstimo consignado pelo INSS mesmo sem experiência.
> Menos burocracia + acompanhamento no WhatsApp.

Na section hero, faça:
Crie um carrossel com as imagens na pasta:
    1 - public/images/carousel_01.webp
    2 - public/images/carousel_02.webp
    3 - public/images/carousel_03.webp
    4 - public/images/carousel_04.webp
    5 - public/images/carousel_05.webp

---

## 2. ⚠️ Alerta Importante (Quebra de objeção / compliance)

**Mensagem principal:**

* Benefícios **LOAS (BPC) NÃO permitem empréstimo**
* Qualquer oferta é irregular

**CTA negativo (filtragem):**

* Se recebe LOAS/BPC → **não preencher formulário**

👉 Função estratégica:

* Reduz leads inválidos
* Aumenta qualidade do funil

---

## 3. 📋 Seção: “Por que preencher o formulário?”

**Objetivo:** Educar + gerar micro-compromisso

**Promessas:**

* Saber se tem margem disponível
* Descobrir valor possível
* Entender o processo passo a passo
* Receber orientação via WhatsApp

---

## 4. 🧾 Formulário (Captação de lead)

**Campos:**

* Nome

* E-mail

* Celular

* Tipo de benefício:

  * INSS aposentado
  * Pensionista
  * Temporário
  * Invalidez (espécie 32)
  * Invalidez < 55 anos
  * LOAS/BPC (beneficiário ou representante)
  * Bolsa Família
  * Crédito pessoal
  * Sem benefício

* Idade (faixas)

* Situação atual:

  * Tem margem → quer crédito imediato
  * Quer portabilidade
  * Não tem margem → quer análise

* CPF

**CTA:**

> Enviar

Instructions for developing the form:

Crie o formulário em duas etapas com uma barra de navegação entre as etapas no top:

1 - Primeira etapa com os campos (input type text):
    - Nome
    - E-mail
    - Celular (Utilizar máscaras de preenchimento react-phone-input-2)
    - Celular

2 - Segunda etapa com os campos (input type radio):
     - Qual benefício você possui?
       - INSS aposentado
       - Pensionista
       - Temporário
       - Aposentado por Invalidez (Espécie 32)
       - Aposentado por Invalidez (Menos de 55 anos)
       - LOAS/BPC (beneficiário ou representante)
       - Auxílio Doença / Benefício Temporário
       - Bolsa Família
       - Crédito pessoal
       - Não tenho Benefício

     - Qual sua idade hoje?
       - Até 60 anos
       - De 61 a 65 anos
       - De 66 a 70 anos
       - De 71 a 76 anos
       - 77 anos ou mais

     - Quando foi a última vez que você contratou ou renovou um empréstimo consignado?
       - Há menos de 5 meses
       - Entre 6 e 11 meses
       - Há mais de 1 ano (Já paguei mais de 12 parcelas)

     - Qual a sua situação hoje?
       - Tenho margem livre e quero contratar agora
       - Tenho empréstimos antigos (mais de 1 ano) e quero renovar
       - Usei minha margem toda esse ano, mas quero novas oportunidades
       - Preciso de um cartão de crédito consignado
       - Estou sem margem, mas preciso de dinheiro

     - Botão "Enviar" na última etapa
    
Mandatory in the form:
 - Barra de navegação entre as etapas no topo
 - Campos formatado para melhor experiência em mobile (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - Todos os campos são de preenchimento obrigatório
 - Obrigatório máscara de ajudar o preenchimento (celular: react-phone-input-2 2 CPF: máscara de CPF documento Brasil 000.000.000-00)
 - Nunca altere o texto das opções (input type radio)
 - Opções radio button estilo card ou botões grandes e interativos (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - No submit do form, todos os dados serão enviados via POST webhook: https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form


---

## 5. 📘 Seção Educacional: “O que você precisa saber”

### 5.1 Benefício do consignado

* Juros menores
* Ajuda a organizar finanças

### 5.2 Explicação do produto

> Parcelas descontadas direto do benefício do INSS

### 5.3 Prova de autoridade

* +20 anos de experiência
* Foco em:

  * Transparência
  * Segurança
  * Atendimento humanizado ([VN Promotora][1])

**CTA:**

> FAÇA SEU CRÉDITO AGORA

Ilustre com a imagens na pasta:
    - public/images/vn_promotora_vida_first.web

---

## 6. ⚙️ Seção: Como funciona (Processo passo a passo)

**Steps:**

1. Preenche formulário
2. Atendimento automático via WhatsApp
3. Verificação de margem consignável
4. Simulação e preparação
5. Orientação até liberação

**Mensagem-chave:**

* Simples
* Guiado
* Sem complicação

**CTA:**

> GARANTIR MINHA PRÉ-DIGITAÇÃO

Ilustre com a imagens na pasta:
    - public/images/vn_promotora_vida_section_last.webp

---

## 7. 🧠 Reforço de marca (Prova + repetição)

> Atua há mais de 20 anos com crédito consignado
> Foco em transparência, segurança e atendimento humanizado ([VN Promotora][1])

---

## 8. 📍 Rodapé (Footer)

**Empresa:**

* VN Promotora
* CNPJ: 23.529.979/0001-95

**Horário:**

* Seg–Sex: 08h–18h

**Unidades:**

* Itabaianinha – SE (Matriz)
* Estância – SE
* Aracaju – SE

**Posicionamento final:**

> Especialistas em crédito consignado INSS e pré-digitação para aumento salarial 2026 ([VN Promotora][1])


Ilustre com a logo no rodapé na pasta:
    - public/images/vn_promotora_vida_nova_logo_white_footer.webp

