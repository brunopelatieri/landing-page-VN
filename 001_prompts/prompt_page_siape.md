## 👽 :20/04/2026

## Persona Editor Content

Você é um editor de sênior de excelência com anos de experiência na área de pesquisa e elaboração de texto para marketing de agência.
Faça uma busca me traga toda a informação sobre :
"O empréstimo SIAPE é um tipo de crédito consignado voltado para servidores públicos federais, aposentados e pensionistas vinculados ao SIAPE"
Pegue toda as informações possíveis que serão usadas para produção de material de marketing, principalmente para landing page, redes sociais e videos  para venda de crédito dessa modalidade. 
Crie esse documento em formato markdown.

---

## Prompt

Você é um engenheiro de prompt de excelência com anos de experiência em prompt para criação de landing.

Analise a estrutura do site da VNPromotora em anexo de nome: DOCUMENTACAO_LLM_SONNET_4_6.md
Após analise detalhada, crie um prompt para adicionar mais uma página, que será uma cópia da página principal (index) mas para venda de empréstimo para Servidores Federais SIAPE.
O caminho para esse página sera /credito-consignado-siape

Pegue o conteúdo do arquivo em anexo de nome: briefing-marketing-consignado-siape.md 
Crie o conteúdo adaptado para nova página /credito-consignado-siape que é a cópia da página index (crédito INSS) e substitua o conteúdo com foco em empréstimo para Servidores Federais SIAPE. 
Retire a o alerta em vermelho "AVISO IMPORTANTE"

Importante: Diferente do formulário da página index, esse novo formulário da página /credito-consignado-siape não qualifica as respostas para redirecionamento de páginas obrigado diferentes. Após o preenchimento, apenas faça:
 - Não qualifique nada
 - envie os dados para webhook: https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form
 - redirecione para novo página de obrigado em router: obrigado-siape
Crie a página /obrigado-siape seguindo o modelo da página /obrigado-clt apenas mudando o conteúdo (caso precise - foco empréstimo para Servidores Federais SIAPE)

## 🧾 Estruture o formulário da seguinte forma (Captação de lead)

Instructions for developing the form:

Apenas adapte o que for necessário do formulário em duas etapas com uma barra de navegação entre as etapas no top:

1 - Primeira etapa com os campos (input type text):
    - Nome
    - E-mail
    - Celular (Utilizar máscaras de preenchimento react-phone-input-2)

2 - Segunda etapa com os campos (input type radio):
     - Qual categoria que melhor define sua ocupação ou vínculo atual?
       - Servidor Público Federal
       - Servidor Público Estadual
       - Servidor Público Municipal
       - Servidor Público Temporário (Contratado)
       - Beneficiário INSS / LOAS
       - Beneficiário Bolsa Família
       - Não possuo vínculo público ou benefício assistencial

     - Qual sua idade hoje?
       - Até 50 anos
       - De 51 a 60 anos
       - De 61 a 65 anos
       - De 66 a 72 anos
       - 73 anos ou mais

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
 - Adicionar um input hidden: "<input type="hidden" name="formName" defaultValue="formSIAPE" />"
 - Barra de navegação entre as etapas no topo
 - Campos formatado para melhor experiência em mobile (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - Todos os campos são de preenchimento obrigatório
 - Obrigatório máscara de ajudar o preenchimento (celular: react-phone-input-2 2 CPF: máscara de CPF documento Brasil 000.000.000-00)
 - Nunca altere o texto das opções (input type radio)
 - Opções radio button estilo card ou botões grandes e interativos (95% dos usuários são em dispositivos mobile e são pessoas idosas)
 - No submit do form, todos os dados serão enviados via POST webhook: https://webhook.chatdevendas.online/webhook/9b66c4a2-c78a-4373-8d0e-bf90efea88c9-form