# 🗺️ Mapa de Navegação - Cadastro de Produtos

## Estrutura de Rotas

```
/                          ← HOME / LISTA DE PRODUTOS
├── Header com logo
├── Barra de busca e filtros
├── Estatísticas (3 cards)
└── Grid de produtos
    ├── [Produto 1] → /edit/1
    ├── [Produto 2] → /edit/2
    └── [Produto 3] → /edit/3

/add                       ← ADICIONAR NOVO PRODUTO
├── Header com ícone +
├── Formulário vazio
└── Botões: Adicionar / Cancelar

/edit/:id                  ← EDITAR PRODUTO
├── Header com ícone edit
├── Formulário preenchido
└── Botões: Salvar / Cancelar
```

---

## Fluxo de Usuário Completo

### 1️⃣ Visualizar Produtos
```
[Iniciar App]
    ↓
[Carrega lista via GET /api/products]
    ↓
[Exibe ProductList com:
  - Produtos em grid
  - Busca
  - Filtros
  - Estatísticas]
```

### 2️⃣ Adicionar Novo Produto
```
[Clica "Novo Produto"]
    ↓
[Abre página /add]
    ↓
[Preenche formulário]
    ↓
[Clica "Adicionar Produto"]
    ↓
[Validação local]
    ↓
[POST /api/products]
    ↓
[Sucesso?]
  ├─ SIM → [Toast: "Adicionado!"]
  │         [Volta para /]
  │         [Atualiza lista]
  │
  └─ NÃO → [Toast: "Erro!"]
           [Formulário mantém dados]
```

### 3️⃣ Editar Produto
```
[Clica "Editar" no card]
    ↓
[Abre página /edit/123]
    ↓
[Carrega dados do produto]
    ↓
[Preenche formulário]
    ↓
[Usuário modifica]
    ↓
[Clica "Salvar Alterações"]
    ↓
[Validação local]
    ↓
[PUT /api/products/123]
    ↓
[Sucesso?]
  ├─ SIM → [Toast: "Atualizado!"]
  │         [Volta para /]
  │         [Card atualiza]
  │
  └─ NÃO → [Toast: "Erro!"]
           [Formulário mantém dados]
```

### 4️⃣ Deletar Produto
```
[Clica "Excluir" no card]
    ↓
[Abre dialog de confirmação]
    ↓
[Usuário confirma]
    ↓
[DELETE /api/products/123]
    ↓
[Sucesso?]
  ├─ SIM → [Toast: "Deletado!"]
  │         [Card desaparece]
  │         [Estatísticas atualizam]
  │
  └─ NÃO → [Toast: "Erro!"]
           [Card permanece visível]
```

---

## Componentes e Props

### 📄 Pages
```
ProductList
├── Props: (context only)
├── State: searchTerm, categoryFilter
└── Effects: fetchProducts on mount

AddProduct
├── Props: (router only)
├── State: isLoading
└── Effects: navigate on success

EditProduct
├── Props: id (from URL)
├── State: isLoading
└── Effects: navigate on success / handle not found
```

### 🎨 Components
```
ProductCard
├── Props: product, onDelete
├── State: isDeleting
└── Handlers: handleDelete, handleDelete

ProductForm
├── Props: defaultValues, onSubmit, submitLabel, onCancel
├── State: form state (react-hook-form)
└── Handlers: handleSubmit, field changes

PageHeader
├── Props: title, subtitle, actionButton
└── Display: Gradient header with info
```

### 🔄 Context
```
ProductContext
├── State: products[], loading, error
├── Methods:
│   ├── fetchProducts()
│   ├── addProduct()
│   ├── updateProduct()
│   ├── deleteProduct()
│   └── getProduct()
└── Provides: useProducts() hook
```

### 🪝 Hooks
```
useProductForm()
├── Props: onSuccess?, onError?
├── Returns: { handleSubmit, isLoading }
└── Auto handles: API calls + error toast
```

---

## Call Stack de uma Ação

### Adicionar Produto - Stack Completo:

```
[USER CLICKS "Adicionar Produto"]
    ↓
ProductForm.onSubmit(data)
    ↓
AddProduct.handleSubmit(data) [via useProductForm]
    ↓
ProductContext.addProduct(data) [via useProducts]
    ↓
apiPost('/products', data) [from services/api.ts]
    ↓
fetch(API_BASE_URL + '/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
    ↓
REDE /// HTTP POST ///
    ↓
BACKEND Response:
  {
    "success": true,
    "data": { "id": "new-id", ...productData }
  }
    ↓
ProductContext atualiza:
  - setProducts([...products, newProduct])
    ↓
Toast: "Produto adicionado com sucesso!"
    ↓
useProductForm callback → navigate('/') [onSuccess]
    ↓
ProductList recarrega e mostra novo produto
```

---

## Estado de Dados

### Context State
```typescript
{
  products: Product[],        // Todos os produtos
  loading: boolean,           // Carregando?
  error: string | null,       // Mensagem de erro
  addProduct: async function,
  updateProduct: async function,
  deleteProduct: async function,
  getProduct: function,
  fetchProducts: async function
}
```

### Product Interface
```typescript
{
  id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  stock: number,
  imageUrl?: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Contract

### Requisição POST /api/products
```json
REQUEST:
{
  "name": "Notebook",
  "description": "Notebook 15 polegadas",
  "price": 3499.99,
  "category": "Informática",
  "stock": 15,
  "imageUrl": "https://..."
}

RESPONSE (201 CREATED):
{
  "success": true,
  "data": {
    "id": "abc123",
    "name": "Notebook",
    "description": "Notebook 15 polegadas",
    "price": 3499.99,
    "category": "Informática",
    "stock": 15,
    "imageUrl": "https://...",
    "createdAt": "2026-03-27T10:30:00Z",
    "updatedAt": "2026-03-27T10:30:00Z"
  }
}
```

### Requisição GET /api/products
```json
RESPONSE (200 OK):
{
  "success": true,
  "data": [
    { Product 1 },
    { Product 2 },
    { Product 3 }
  ]
}
```

### Requisição PUT /api/products/:id
```json
REQUEST:
{
  "name": "Notebook (Updated)",
  "description": "...",
  ...
}

RESPONSE (200 OK):
{
  "success": true,
  "data": { Product atualizado }
}
```

### Requisição DELETE /api/products/:id
```json
RESPONSE (200 OK):
{
  "success": true
}
```

---

## Tratamento de Erros

### Network Error
```
Frontend tenta conectar
    ↓
Falha em conectar
    ↓
ApiError: "Erro de conexão. Verifique se o....."
    ↓
Toast: Error message
    ↓
ProductList: Mostra botão "Tentar Novamente"
```

### Validation Error
```
Usuário submete formulário
    ↓
React Hook Form valida
    ↓
Campo tem erro
    ↓
Mensagem de erro em vermelho abaixo do campo
    ↓
Botão fica desabilitado enquanto há erro
```

### Server Error
```
POST /api/products
    ↓
Backend retorna:
{
  "success": false,
  "error": "Preço inválido"
}
    ↓
Frontend valida response.ok = false
    ↓
Lança ApiError com status do backend
    ↓
Toast: "Preço inválido"
```

---

## Performance

### Otimizações Implementadas

✅ **React Rendering**
  - Context separado por feature
  - useCallback para memoização
  - Sem re-renders desnecessários

✅ **Network**
  - API responses são mínimas
  - Sem duplicate requests
  - Error retry disponível

✅ **Bundle**
  - Vite: Fast HMR em dev
  - Tree-shaking automático
  - Code splitting por rota (Route Lazy Loading - futuro)

✅ **CSS**
  - Tailwind purga classes não usadas
  - CSS-in-JS minimizado em build

---

## Responsividade

### Breakpoints Tailwind

```
Mobile:   < 640px   (sm)
Tablet:   640-1024px (md)
Desktop:  > 1024px   (lg, xl, 2xl)
```

### Layout Changes

```
ProductList:
  - Mobile (1 col): Stack vertical
  - Tablet (2 col): Grid 2 colunas
  - Desktop (3 col): Grid 3 colunas

ProductCard:
  - Sempre responsivo
  - Texto adapta
  - Botões mantêm tamanho touchable

PageHeader:
  - Mobile: Coluna (vertical)
  - Desktop: Linha (horizontal)
```

---

## Diagrama de Dependências

```
App.tsx
├── Router (react-router)
├── ProductProvider (context)
│   └── ProductContext.tsx
│       ├── api.ts (fetch calls)
│       └── toast (sonner)
│
├── ProductList.tsx
│   ├── PageHeader
│   ├── Input (shadcn)
│   ├── Select (shadcn)
│   ├── ProductCard (x3 em grid)
│   │   ├── useProducts (context)
│   │   └── AlertDialog (shadcn)
│   └── Button (shadcn)
│
├── AddProduct.tsx
│   ├── PageHeader
│   ├── ProductForm
│   │   ├── useForm (react-hook-form)
│   │   └── Input, Textarea, Select (shadcn)
│   └── useProductForm (hook)
│
└── EditProduct.tsx
    ├── PageHeader
    ├── ProductForm
    └── useProductForm (hook)
```

---

**Última atualização:** 27 de março de 2026  
**Versão:** 1.0.0
