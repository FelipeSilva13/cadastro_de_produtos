# Guia de Integração - Frontend Cadastro de Produtos

## 📋 Visão Geral

Este é um frontend completo para gerenciamento de cadastro de produtos. O sistema está totalmente pronto para se integrar com um backend em `http://localhost:3000/api`.

## 🚀 Início Rápido

### Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Executar em desenvolvimento
npm run dev
```

### Configuração do Backend

O frontend espera que o backend esteja rodando em:
```
http://localhost:3000/api
```

Você pode alterar este endereço no arquivo `.env`:
```env
VITE_API_URL=http://seu-servidor:porta/api
```

## 📡 Endpoints Esperados

O backend deve implementar os seguintes endpoints REST:

### Lista de Produtos
```http
GET /api/products
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "Notebook Dell",
      "description": "Descrição do produto",
      "price": 3499.99,
      "category": "Informática",
      "stock": 15,
      "imageUrl": "https://exemplo.com/imagem.jpg",
      "createdAt": "2026-03-01T10:00:00Z",
      "updatedAt": "2026-03-01T10:00:00Z"
    }
  ]
}
```

### Criar Produto
```http
POST /api/products
Content-Type: application/json

{
  "name": "Notebook Dell",
  "description": "Descrição do produto",
  "price": 3499.99,
  "category": "Informática",
  "stock": 15,
  "imageUrl": "https://exemplo.com/imagem.jpg"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Notebook Dell",
    "description": "Descrição do produto",
    "price": 3499.99,
    "category": "Informática",
    "stock": 15,
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-01T10:00:00Z"
  }
}
```

### Atualizar Produto
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Notebook Dell (Atualizado)",
  "description": "Descrição atualizada",
  "price": 3699.99,
  "category": "Informática",
  "stock": 20,
  "imageUrl": "https://exemplo.com/imagem-nova.jpg"
}
```

**Resposta esperada:** Mesma estrutura do POST

### Deletar Produto
```http
DELETE /api/products/:id
```

**Resposta esperada:**
```json
{
  "success": true
}
```

## 🏗️ Estrutura do Projeto

```
src/
├── App.tsx                 # Aplicação principal com rotas
├── main.tsx               # Entry point
├── App.css                # Estilos globais
├── index.css              # CSS base
│
├── components/            # Componentes reutilizáveis
│   ├── ProductForm.tsx    # Formulário de produto
│   ├── ProductCard.tsx    # Card de produto
│   └── ui/                # Componentes de UI (shadcn)
│
├── pages/                 # Páginas da aplicação
│   ├── ProductList.tsx    # Lista de produtos
│   ├── AddProduct.tsx     # Adicionar produto
│   └── EditProduct.tsx    # Editar produto
│
├── contexts/              # Context API
│   └── ProductContext.tsx # Context para gerenciar estado de produtos
│
├── services/              # Serviços de API
│   └── api.ts            # Cliente HTTP centralizado
│
├── hooks/                 # Hooks customizados
│   └── useProductForm.ts # Hook para submissão de formulário
│
├── types/                 # Types TypeScript
│   └── product.ts        # Interface Product
│
└── assets/               # Assets estáticos
```

## 🔧 Detalhes da Integração

### Serviço de API (`src/services/api.ts`)

O arquivo `api.ts` fornece funções utilitárias para fazer requisições:

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from '@/services/api';

// GET
const products = await apiGet<Product[]>('/products');

// POST
const newProduct = await apiPost<Product>('/products', productData);

// PUT
const updatedProduct = await apiPut<Product>(`/products/${id}`, productData);

// DELETE
await apiDelete<void>(`/products/${id}`);
```

### Context de Produtos (`src/contexts/ProductContext.tsx`)

O `ProductContext` gerencia o estado global de produtos e fornece hooks para interagir com a API:

```typescript
import { useProducts } from '@/contexts/ProductContext';

function MyComponent() {
  const { 
    products,      // Array de produtos
    loading,       // Boolean indicando carregamento
    error,         // String com mensagem de erro (se houver)
    addProduct,    // Função para adicionar produto
    updateProduct, // Função para atualizar produto
    deleteProduct, // Função para deletar produto
    getProduct,    // Função para obter um produto por ID
    fetchProducts  // Função para recarregar lista de produtos
  } = useProducts();
}
```

### Hook Customizado (`src/hooks/useProductForm.ts`)

```typescript
import { useProductForm } from '@/hooks/useProductForm';

const { handleSubmit, isLoading } = useProductForm({
  onSuccess: (product) => {
    console.log('Produto criado:', product);
  },
  onError: (error) => {
    console.error('Erro:', error.message);
  }
});

// Usar no formulário
await handleSubmit(formData, productId); // productId é opcional
```

## 📌 Features Implementadas

✅ **Listagem de Produtos**
- Busca por nome/descrição
- Filtro por categoria
- Indicador de status de estoque
- Shimmer loading state

✅ **Criar Produto**
- Formulário completo com validação
- Campos: nome, descrição, preço, categoria, estoque, imagem

✅ **Editar Produto**
- Pré-preenchimento de dados
- Validação de formulário
- Feedback de sucesso/erro

✅ **Deletar Produto**
- Confirmação antes de deletar
- Loading state durante exclusão

✅ **Tratamento de Erros**
- Toast notifications (Sonner)
- Mensagens de erro detalhadas
- Botão para tentar novamente em caso de erro

✅ **Estados de Carregamento**
- Loading indicators visuais
- Desabilitação de botões durante operações
- Animações suaves

## 🎨 Componentes UI

O projeto usa componentes do [shadcn/ui](https://ui.shadcn.com/) em `src/components/ui/`:
- Button
- Input
- Label
- Textarea
- Select
- Card
- Badge
- AlertDialog
- Skeleton
- E muitos outros...

## 🔐 Tratamento de Erros

O sistema fornece tratamento completo de erros:

```typescript
import { ApiError } from '@/services/api';

try {
  await deleteProduct(id);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Erro ${error.status}: ${error.message}`);
  }
}
```

## 📱 Responsivo

- ✅ Mobile first design
- ✅ Touch-friendly buttons e inputs
- ✅ Animações suaves
- ✅ Grid adaptável (1 coluna mobile, 2 tablet, 3 desktop)

## 🌐 Internacionalização

- ✅ Formatação de moeda em PT-BR (R$)
- ✅ Textos em português
- ✅ Datas formatadas conforme locale

## 🧪 Testing

Para testar a integração com um backend local, você pode usar:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev  # ou seu comando de desenvolvimento
```

O frontend tentará conectar a `http://localhost:3000/api` automaticamente.

## 📚 Tecnologias

- React 19
- TypeScript
- React Router v7
- Vite
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Sonner (Toast notifications)
- Lucide React (Icons)

## ✅ Checklist de Integração com Backend

- [ ] Backend rodando em `http://localhost:3000/api`
- [ ] Endpoint `GET /products` implementado
- [ ] Endpoint `POST /products` implementado
- [ ] Endpoint `PUT /products/:id` implementado
- [ ] Endpoint `DELETE /products/:id` implementado
- [ ] Respostas seguem o formato esperado
- [ ] CORS configurado corretamente
- [ ] Validações de entrada no backend
- [ ] Testes de requisições com Postman/Insomnia

## 🚨 Troubleshooting

### Backend não conecta
- Verifique se o servidor está rodando em `http://localhost:3000`
- Verifique a variável `VITE_API_URL` no `.env`
- Verifique os logs de erro no console do navegador

### Erro CORS
- Configure o backend para aceitar requisições da origem do frontend
- Exemplo (Express): `app.use(cors())`

### Validação de formulário não funciona
- Certifique-se de que o campo tem o atributo `required` ou validação no `react-hook-form`
- Verifique o console para mensagens de erro

## 📝 Notas

- O sistema foi construído com foco em produção
- Todos os endpoints usam JSON
- As datas são formatadas em ISO 8601
- O tratamento de erro é robusto e user-friendly
- O código está bem documentado e fácil de manter

---

**Feito com ❤️ para integração perfeita com seu backend**
