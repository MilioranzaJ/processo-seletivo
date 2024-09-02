# Visualização de Contratos Públicos

Este projeto visa criar uma solução para visualizar informações de contratos de órgãos públicos utilizando a API REST do Portal Nacional de Contratações Públicas (PNCP). A API pode ser acessada [neste link](https://pncp.gov.br/api/consulta/swagger-ui/index.html).

## Requisitos

- Consumir a API do PNCP para obter contratos de um órgão público específico.
- Mostrar as informações do órgão e os contratos que possuem data inicial de vigência dentro do período informado.

## Funcionalidades

A aplicação web deve:

1. **Obter Contratos:**
   - Consumir a API do PNCP fornecendo o CNPJ do órgão público e um período de datas (data inicial e final).
   
2. **Exibir Informações:**
   - Mostrar as informações do órgão.
   - Listar todos os contratos do órgão que possuem data inicial de vigência dentro do período informado.
     - Para cada contrato, exibir:
       - Data de vigência inicial
       - Data de vigência final
       - Razão social do fornecedor
       - Objeto do contrato
       - Valor inicial do contrato