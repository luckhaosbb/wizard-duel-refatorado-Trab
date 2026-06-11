# Relatório de Refatoração - Wizard Duel

## Problemas Encontrados
Durante a análise inicial do código (`index.js`), foram identificados os seguintes problemas de qualidade:
* **Números Mágicos:** Valores literais para atributos de HP, dano, magia e defesas espalhados diretamente nos `if`s das rotas.
* **Nomes sem Significado:** Uso constante de variáveis curtas e genéricas (`d`, `r`, `tmp`, `c`, `a`, `pw`, `mg`, `df`) dificultando a leitura do fluxo de dados.
* **Código Duplicado (DRY):** A lógica de cálculo de status baseados em espécie/casa e o laço `for` de embaralhamento de arrays estavam copiados e colados integralmente entre as rotas de draft e CPU.
* **Múltiplas Responsabilidades:** O arquivo `index.js` inicializava o servidor, chamava a API externa, calculava regras de negócio e retornava as rotas, tudo no mesmo escopo.
* **Code Smells (ESLint):** Comparações fracas (`==`), uso indevido de laços pesados e uso de `console.log` para tratamento de erros em blocos `catch`.

## Decisões Tomadas
Para adequar o projeto ao padrão de estilo da Airbnb e melhorar a manutenibilidade, as seguintes decisões arquiteturais foram aplicadas no Back-end:

1. **Correção de Linting:** Todos os erros de sintaxe estrutural (como `==`, `++`, `continue` e variáveis não utilizadas) foram corrigidos para passar na validação do ESLint. Os `console.log` de erro foram removidos dos blocos `catch`.
2. **Nomenclatura Semântica:** Todas as variáveis de dados vindas da API foram renomeadas para termos descritivos (`character`, `attributes`, `power`, `charactersList`).
3. **Extração de Constantes:** Foi criado o arquivo `constants.js` na raiz, centralizando todos os números de atributos, paginação da API e vida base.
4. **Isolamento de Serviços (DRY):** Criada a pasta `services/`. A comunicação com a API externa e a função de embaralhamento foram movidas para `potterApi.js`. Os cálculos de atributos foram abstraídos em funções puras dentro de `statsCalculator.js`.
5. **Separação de Rotas:** Criada a pasta `routes/`. As rotas `/pack`, `/spells` e `/cpu-deck` foram movidas para arquivos dedicados, importando as regras de negócio dos serviços.
6. **Limpeza do Entry Point:** O `index.js` foi reduzido para sua responsabilidade única: instanciar o servidor Express e acoplar os middlewares e rotas.

*Nota: Devido ao tempo de entrega, o foco da refatoração e da garantia de integridade foi aplicado de forma integral ao Back-end.*