Seguindo o padrão crie uma segunda página que será acessível  uri: " /credito-consignado-clt"
Siga o prompt em anexo

---

# 🧩 ESTRUTURA DA SENDA PÁGINA COMPLETA CLT

---

## 🟢 1. HERO (ABOVE THE FOLD)

**Headline:**

> Empréstimo CLT sem Burocracia? É aqui!

**Subheadline:**

> Aproveite as vantagens de ser CLT e contrate seu consignado de forma simples e segura. Faça uma simulação gratuita.

Na section hero, faça:
Crie um carrossel com as imagens na pasta:
    1 - public/images/clt/vnpromotora_especializada-credito-1.webp
    2 - public/images/clt/vnpromotora_especializada-credito-5.webp
    3 - public/images/clt/vnpromotora_especializada-credito-6.webp
    4 - public/images/clt/vnpromotora_especializada-credito-7.webp

---

## 🔴 2. AVISO IMPORTANTE (COMPLIANCE)

**Título:**

> ⚠️ AVISO IMPORTANTE

**Texto:**

> Para sua segurança e conformidade com as normas vigentes, informamos um ponto essencial:

**Regras:**

* Essa modalidade de crédito está disponível apenas para trabalhadores em regime de contratação CLT.
* Tempo de registro mínimo de pelo menos 5 meses

---

## 🟢 3. SEÇÃO: POR QUE PREENCHER O FORMULÁRIO?

**Título:**

> Por que preencher o formulário?

**Texto principal:**

> Não importa se você ainda nunca pegou crédito consignado antes — este formulário é o primeiro passo para saber:

**Lista:**

* se você tem margem disponível;
* qual valor você pode solicitar;
* como funciona o processo passo a passo;
* e como nosso atendimento vai te orientar no WhatsApp.

**Fechamento:**

> Preencha o formulário abaixo.

---

## 📋 4. FORMULÁRIO (CAPTAÇÃO)

Instructions for developing the form:

Crie o formulário em duas etapas com uma barra de navegação entre as etapas no top:

1 - Primeira etapa com os campos (input type text):
    - Nome
    - E-mail
    - Celular (Utilizar máscaras de preenchimento react-phone-input-2)
    - CPF (com máscara 000.000.000-00 )

2 - Segunda etapa com os campos (input type radio):
     - Descreva sua situação atual:
       - Funcionário registrado com carteira assinada a 3 meses
       - Funcionário registrado com carteira assinada a 6 meses
       - Funcionário registrado com carteira assinada a 1 ano
       - Funcionário registrado com carteira assinada a mais de 2 anos
       - Sou funcionário PJ e quero pegar crédito
       - Estou no seguro desemprego e quero pegar crédito
       - Não trabalho e quero analisar linhas de crédito para mim

     - Você já pegou consignado CLT antes?
       - Não, nunca
       - Há menos de 5 meses.
       - Entre 6 e 11 meses.
       - Há mais de 1 ano (Já paguei mais de 12 parcelas).

     - Qual a sua situação hoje?
       - Estou precisando de dinheiro e quero contratar o crédito CLT
       - Quero analisar as taxas de juros e parcelas do crédito CLT
       - Quero ver se consigo pegar o crédito
       - Estou precisando de dinheiro urgente
       - 
**CTA botão:**
     - Botão "Enviar" na última etapa
    
Mandatory in the form:
 - Barra de navegação entre as etapas no topo
 - Campos formatado para melhor experiência em mobile (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - Todos os campos são de preenchimento obrigatório
 - Obrigatório máscara de ajudar o preenchimento (celular: react-phone-input-2 e CPF: máscara de CPF documento Brasil 000.000.000-00)
 - Nunca altere o texto das opções (input type radio)
 - Opções radio button estilo card ou botões grandes e interativos (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - No submit do form, todos os dados serão enviados via POST webhook: https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form

---

## 📘 5. SEÇÃO: O QUE VOCÊ PRECISA SABER

**Título:**

> O que você precisa saber

---

### 🔹 5.1 Por que o crédito CLT é ideal para você?

> Se você trabalha com carteira assinada e busca organizar suas finanças ou realizar um projeto, o consignado CLT é a escolha certa. Com ele, você acessa taxas muito menores do que as do cartão de crédito ou cheque especial, garantindo mais fôlego para o seu bolso.

---

### 🔹 5.2 Crédito Consignado CLT — Simples e direto na folha

> É uma modalidade de empréstimo prática e sem burocracia: as parcelas são descontadas automaticamente do seu salário (folha de pagamento), eliminando a preocupação com boletos ou datas de vencimento.

---

### 🔹 5.3 Segurança e experiência

> A VN Promotora utiliza sua expertise de mais de 20 anos no mercado financeiro para oferecer as melhores soluções para trabalhadores do setor privado, priorizando a transparência, a segurança dos dados e um atendimento humanizado.

Ilustre com a imagens na pasta:
    - public/images/clt/vnpromotora_especializada-credito-8.webp

---

## ⚙️ 6. COMO FUNCIONA O PROCESSO (PASSO A PASSO)

**Título:**

> Como funciona o processo (passo a passo)

**Lista (FAQ/steps):**

1. Preciso ter o nome limpo para conseguir o empréstimo?
2. O que acontece se eu for demitido ou pedir demissão?
3. Minha empresa fica sabendo do motivo do empréstimo?
4. Por que os juros são menores que os do banco ou cartão?
5. Posso antecipar as parcelas para pagar menos juros?

**CTA:**

> GARANTIR MEU CRÉDITO

Ilustre com a imagens na pasta:
    - public/images/clt/vnpromotora_especializada-credito-9.webp

---

