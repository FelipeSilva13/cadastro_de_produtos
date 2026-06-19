# Cadastro de Produtos - Frontend

Interface web do sistema de cadastro de produtos. O frontend foi criado com React, TypeScript e Vite, consumindo a API Spring Boot do backend.

## Visao Geral

O usuario consegue listar, buscar, filtrar, cadastrar, editar e excluir produtos. A aplicacao tambem permite enviar imagem no cadastro e na edicao de produtos, usando `multipart/form-data`.

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
|   |   |-- ProductList.tsx         # Lista, busca e filtros
|   |   |-- AddProduct.tsx          # Cadastro
|   |   `-- EditProduct.tsx         # Edicao
|   |-- services/
|   |   `-- ProdutoService.ts       # Servico auxiliar
|   |-- types/
|   |   `-- product.ts              # Tipos de produto
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

1. A tela inicial carrega a lista de produtos usando `ProductContext`.
2. `ProductContext` chama a API pelo Axios configurado em `api.ts`.
3. O backend retorna os produtos cadastrados no MySQL.
4. O usuario pode buscar, filtrar, cadastrar, editar ou excluir produtos.
5. Ao cadastrar ou editar com imagem, a imagem e enviada para o backend e servida depois pela rota `/uploads`.

## Observacoes de Manutencao

- A rota principal do backend aceita `/products` e `/produtos`.
- O caminho usado pela aplicacao React e `/products`.
- Para upload de imagem, o campo esperado pelo controller e `image`.
- As notificacoes de sucesso e erro sao exibidas com Sonner.
