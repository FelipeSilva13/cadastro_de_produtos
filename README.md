# Sistema de Cadastro de Produtos

Sistema web para cadastro e gerenciamento de produtos, com frontend em React e backend em Spring Boot. A aplicacao permite listar, buscar, filtrar, cadastrar, editar e excluir produtos, incluindo upload de imagens.

## Visao Geral

O projeto esta dividido em tres partes principais:

```text
cadastro-de-produtos/
|-- cadastro_de_produtos/          # Backend Spring Boot
|-- cadastro_produtos_frontend/    # Frontend React + Vite
|-- docker-stack/                  # Docker Compose com MySQL, backend e frontend
|-- README.Docker.md
`-- README.md                     # Documentacao geral do sistema
```

## Como o Sistema Funciona

1. O usuario acessa o frontend pelo navegador.
2. O frontend carrega a lista de produtos pela API.
3. A API Spring Boot consulta e grava dados no MySQL usando Spring Data JPA.
4. Ao cadastrar ou editar um produto com imagem, o frontend envia `multipart/form-data`.
5. O backend salva a imagem na pasta `uploads/` e retorna a URL para exibicao.
6. O frontend atualiza a interface e mostra notificacoes de sucesso ou erro.

## Modulos

| Modulo | Pasta | Descricao |
|---|---|---|
| Frontend | `cadastro_produtos_frontend` | Interface React com rotas de listagem, cadastro e edicao |
| Backend | `cadastro_de_produtos` | API REST com controllers, services, repositories e entidades JPA |
| Infra local | `docker-stack` | Compose para subir MySQL, backend e frontend |

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- shadcn/ui, Radix UI, Sonner e Lucide React

### Backend

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- MySQL
- MapStruct
- Lombok
- Maven

### Infraestrutura

- Docker
- Docker Compose
- MySQL 8.4

## Portas

| Servico | Local | Docker Compose |
|---|---:|---:|
| Frontend Vite | `5175` | `3000` |
| Backend API | `8084` | `8084` |
| MySQL | `3306` | `3307` no host, `3306` no container |

## Executar com Docker Compose

Na raiz do projeto:

```bash
docker compose -f docker-stack/compose.yaml up --build
```

Acesse:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8084
MySQL:    localhost:3307
```

Para parar:

```bash
docker compose -f docker-stack/compose.yaml down
```

## Executar Localmente sem Docker

### 1. Banco de Dados

Crie um banco MySQL:

```sql
CREATE DATABASE cadastro_de_produtos;
```

Configuracao padrao do backend:

```text
URL:      jdbc:mysql://localhost:3306/cadastro_de_produtos
Usuario:  root
Senha:    felipe87
```

### 2. Backend

```powershell
cd cadastro_de_produtos
.\mvnw.cmd spring-boot:run
```

API:

```text
http://localhost:8084
```

### 3. Frontend

```bash
cd cadastro_produtos_frontend
npm install
npm run dev
```

Aplicacao:

```text
http://localhost:5175
```

## Principais Endpoints

### Produtos

| Metodo | Rota | Funcao |
|---|---|---|
| `GET` | `/products` ou `/produtos` | Listar produtos |
| `GET` | `/products/{id}` ou `/produtos/{id}` | Buscar produto por id |
| `POST` | `/products` ou `/produtos` | Criar produto |
| `PUT` | `/products/{id}` ou `/produtos/{id}` | Atualizar produto |
| `DELETE` | `/products/{id}` ou `/produtos/{id}` | Excluir produto |

### Outros Recursos

| Recurso | Rotas |
|---|---|
| Clientes | `/clientes` |
| Pedidos | `/pedidos` |
| Itens de pedido | `/item-produtos` |
| Imagens | `/uploads/{arquivo}` |

## Fluxo de Produto

```text
Tela React
  -> ProductContext
  -> Axios em src/api/api.ts
  -> API Spring Boot
  -> Service
  -> Repository
  -> MySQL
```

No cadastro com imagem:

```text
ProductForm
  -> FormData com produto + image
  -> ProdutoController
  -> ProdutoService
  -> FileStorageService
  -> uploads/
```

## Documentacao por Modulo

- [Frontend](cadastro_produtos_frontend/README.md)
- [Backend](cadastro_de_produtos/README.md)
- [Docker](README.Docker.md)

## Checklist de Funcionamento

- Backend respondendo em `http://localhost:8084`
- Banco MySQL disponivel
- Frontend aberto em `http://localhost:5175` ou `http://localhost:3000`
- CORS permitindo a origem do frontend
- Produtos carregando na tela inicial
- Cadastro, edicao e exclusao funcionando
- Imagens acessiveis pela rota `/uploads`

## Observacoes

- O frontend usa `/products` como rota principal de produtos.
- O backend tambem aceita `/produtos`.
- Em desenvolvimento local com Vite, o proxy encaminha `/api` para `http://localhost:8084`.
- No Docker Compose, o frontend roda na porta `3000`.
