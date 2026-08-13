# Cadastro de Produtos - Frontend

Interface web do sistema SysVendas. O frontend foi criado com React, TypeScript e Vite, consumindo a API Spring Boot do backend.

## Visao Geral

O sistema permite gerenciar produtos, clientes, pedidos, carrinho e checkout. A interface segue o estilo de dashboard do prototipo no Figma, com cabecalho SysVendas, menu lateral e indicadores visuais de status.

## Funcionalidades Implementadas

- **Dashboard:** indicadores de vendas do dia, pedidos pendentes, clientes, estoque baixo e grafico visual dos ultimos sete dias.
- **Produtos:** listagem, busca por nome ou numero, filtros, cadastro, edicao, exclusao e upload de imagem.
- **Numero do produto:** campo obrigatorio e positivo, exibido nos cards e usado na busca.
- **Clientes:** formulario organizado em dados pessoais, contato e endereco.
- **Pedidos:** dashboard com contadores, busca, filtros por status, cliente e periodo, tabela de pedidos, detalhes e cancelamento.
- **Carrinho e checkout:** selecao de cliente e produtos, alteracao de quantidade, desconto, resumo do total e escolha entre Pix, cartao ou dinheiro.
- **Status de pedido:** pendente em amarelo, pago em verde e cancelado em vermelho.

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- shadcn/ui e Radix UI
- Sonner para notificacoes
- Lucide React para icones

## Estrutura Principal

```text
cadastro_produtos_frontend/
|-- src/
|   |-- api/
|   |   `-- api.ts                  # Cliente HTTP Axios
|   |-- components/
|   |   |-- PageHeader.tsx          # Cabecalho das paginas
|   |   |-- ProductCard.tsx         # Card de produto
|   |   |-- ProductForm.tsx         # Formulario de produto
|   |   `-- ui/                     # Componentes de UI
|   |-- contexts/
|   |   `-- ProductContext.tsx      # Estado e operacoes de produtos
|   |-- hooks/
|   |   `-- useProductForm.ts       # Regras do formulario
|   |-- pages/
|   |   |-- Dashboard.tsx           # Indicadores gerais
|   |   |-- ProductList.tsx         # Lista, busca e filtros
|   |   |-- AddProduct.tsx          # Cadastro
|   |   `-- EditProduct.tsx         # Edicao
|   |   |-- Customers.tsx           # Cadastro de cliente
|   |   |-- Orders.tsx              # Lista, filtros e detalhes de pedidos
|   |   `-- Sales.tsx               # Novo pedido, carrinho e checkout
|   |-- services/
|   |   `-- ProdutoService.ts       # Servico auxiliar
|   |-- types/
|   |   `-- product.ts              # Tipos de produto
|   |   `-- sales.ts                # Tipos de cliente, pedido e carrinho
|   |-- App.tsx                     # Rotas da aplicacao
|   `-- main.tsx                    # Entrada React
|-- .env.example
|-- Dockerfile
|-- package.json
`-- vite.config.ts
```

## Rotas da Aplicacao

| Rota | Tela | Funcao |
|---|---|---|
| `/` | Lista de produtos | Exibe produtos, busca, filtra e permite excluir |
| `/add` | Cadastro de produto | Cria um novo produto |
| `/edit/:id` | Edicao de produto | Atualiza um produto existente |
| `/dashboard` | Dashboard | Mostra indicadores e resumo visual do sistema |
| `/clientes` | Novo cliente | Cadastra cliente com dados de contato e endereco |
| `/pedidos` | Lista de pedidos | Busca, filtra, visualiza detalhes e cancela pedidos |
| `/vendas` | Novo pedido | Monta carrinho, aplica desconto e confirma pagamento |

## Integracao com a API

O cliente HTTP fica em `src/api/api.ts`.

Por padrao, a base da API usa:

```ts
import.meta.env.VITE_API_URL || '/api'
```

No desenvolvimento com Vite, `vite.config.ts` cria um proxy:

```text
/api -> http://localhost:8084
/uploads -> http://localhost:8084/uploads
```

Assim, chamadas para `/api/products` sao encaminhadas para o backend em `http://localhost:8084/products`.

## Endpoints Usados pelo Frontend

| Metodo | Endpoint no frontend | Endpoint no backend | Funcao |
|---|---|---|---|
| `GET` | `/products` | `/products` | Listar produtos |
| `GET` | `/products/{id}` | `/products/{id}` | Buscar produto por id |
| `POST` | `/products` | `/products` | Criar produto com imagem opcional |
| `PUT` | `/products/{id}` | `/products/{id}` | Atualizar produto |
| `DELETE` | `/products/{id}` | `/products/{id}` | Excluir produto |
| `GET` | `/clientes` | `/clientes` | Listar clientes para selecao no pedido |
| `POST` | `/clientes` | `/clientes` | Cadastrar cliente |
| `GET` | `/pedidos` | `/pedidos` | Listar pedidos no dashboard de pedidos |
| `POST` | `/pedidos` | `/pedidos` | Criar pedido com itens e desconto |
| `POST` | `/pedidos/{id}/pagamentos` | `/pedidos/{id}/pagamentos` | Confirmar pagamento do pedido |
| `POST` | `/pedidos/{id}/cancelar` | `/pedidos/{id}/cancelar` | Cancelar pedido |

Para cadastro e edicao com imagem, o frontend envia um `FormData` com:

- `produto`: JSON do produto como `application/json`
- `image`: arquivo selecionado pelo usuario

## Variaveis de Ambiente

Crie um arquivo `.env` com base no `.env.example`:

```env
VITE_API_URL=/api
VITE_ENV=development
```

Tambem e possivel apontar direto para o backend:

```env
VITE_API_URL=http://localhost:8084
```

## Como Executar Localmente

Requisitos:

- Node.js compativel com o Vite usado no projeto
- Backend rodando em `http://localhost:8084`

Comandos:

```bash
npm install
npm run dev
```

A aplicacao fica disponivel em:

```text
http://localhost:5175
```

## Scripts

| Script | Funcao |
|---|---|
| `npm run dev` | Inicia o servidor Vite |
| `npm run build` | Gera build de producao |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa o ESLint |

## Docker

O `Dockerfile` inicia o Vite em modo desenvolvimento na porta `3000`.

Quando usado pelo `docker-stack/compose.yaml`, o frontend fica em:

```text
http://localhost:3000
```

## Fluxo de Funcionamento

1. O menu SysVendas permite navegar entre Dashboard, Produtos, Clientes e Pedidos.
2. Produtos e clientes sao carregados pela API para compor um novo pedido.
3. Na tela de vendas, o usuario seleciona o cliente, adiciona produtos ao carrinho e informa desconto.
4. O checkout calcula subtotal, desconto e valor final; depois envia a forma de pagamento.
5. A lista de pedidos permite acompanhar status, filtrar resultados, visualizar itens e cancelar pedidos.
6. Ao cadastrar ou editar produto com imagem, a imagem e enviada para o backend e servida pela rota `/uploads`.

## Observacoes de Manutencao

- A rota principal do backend aceita `/products` e `/produtos`.
- O caminho usado pela aplicacao React e `/products`.
- Para upload de imagem, o campo esperado pelo controller e `image`.
- As notificacoes de sucesso e erro sao exibidas com Sonner.
