# ⚡ Quick Start - Cadastro de Produtos

## 🚀 Iniciar em 3 Passos

### 1️⃣ Atualizar Node.js (OBRIGATÓRIO)
```powershell
# Verificar versão atual
node --version

# Se for menor que 20.19, faça upgrade:
# https://nodejs.org/ (LTS recomendado)
# OU use nvm-windows: https://github.com/coreybutler/nvm-windows
```

### 2️⃣ Instalar Dependências
```bash
cd cadastro_produtos
npm install
```

### 3️⃣ Rodar em Desenvolvimento
```bash
npm run dev
```

✅ Frontend rodará em: `http://localhost:5175`

---

## 📋 Verifica Antes de Começar

Seu backend precisa estar rodando em:
```
http://localhost:3000/api
```

E implementar estes endpoints:
```
GET    /api/products           #  Listar todos
POST   /api/products           #  Criar novo
PUT    /api/products/:id       #  Atualizar
DELETE /api/products/:id       #  Deletar
```

Ver: **[BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)** para detalhes

---

## 📂 O Que Foi Criado

```
cadastro_produtos/
│
├── 📋 DOCUMENTAÇÃO
│   ├── SETUP.md                     # Como configurar
│   ├── BACKEND_INTEGRATION.md       # Integração com API
│   ├── DESIGN_GUIDE.md              # Design visual e UX
│   ├── NAVIGATION.md                # Fluxos e rotas
│   ├── .env.example                 # Variáveis de ambiente
│   
├── src/
│   ├── App.tsx                      # Roteamento
│   ├── main.tsx                     # Entry point
│   │
│   ├── pages/
│   │   ├── ProductList.tsx          # Lista (HOME)
│   │   ├── AddProduct.tsx           # Adicionar (/add)
│   │   └── EditProduct.tsx          # Editar (/edit/:id)
│   │
│   ├── components/
│   │   ├── ProductCard.tsx          # Card de produto
│   │   ├── ProductForm.tsx          # Formulário
│   │   ├── PageHeader.tsx           # Header gradiente
│   │   └── ui/                      # shadcn/ui components
│   │
│   ├── contexts/
│   │   └── ProductContext.tsx       # Estado global
│   │
│   ├── services/
│   │   └── api.ts                   # Cliente HTTP
│   │
│   ├── hooks/
│   │   └── useProductForm.ts        # Hook para formulário
│   │
│   ├── types/
│   │   └── product.ts               # Interfaces TypeScript
│   │
│   ├── App.css                      # Estilos globais
│   └── index.css                    # CSS base
│
├── package.json                     # Dependências
├── vite.config.ts                   # Configuração Vite
├── tsconfig.json                    # Configuração TypeScript
├── tailwind.config.ts               # Configuração Tailwind
├── eslint.config.js                 # Linter config
└── index.html                       # HTML base
```

---

## 🎯 Funcionalidades

| Funcionalidade | Status | Arquivo |
|---|---|---|
| Listar Produtos | ✅ | `ProductList.tsx` |
| Buscar Produtos | ✅ | `ProductList.tsx` |
| Filtrar por Categoria | ✅ | `ProductList.tsx` |
| Adicionar Produto | ✅ | `AddProduct.tsx` + `ProductForm.tsx` |
| Editar Produto | ✅ | `EditProduct.tsx` + `ProductForm.tsx` |
| Deletar Produto | ✅ | `ProductCard.tsx` |
| Validação de Formulário | ✅ | `ProductForm.tsx` |
| Toast Notifications | ✅ | `ProductContext.tsx` |
| Loading States | ✅ | `ProductList.tsx` |
| Error Handling | ✅ | `api.ts` + `ProductContext.tsx` |
| Design Responsivo | ✅ | Tailwind CSS |
| API Integration | ✅ | `services/api.ts` |

---

## 📊 Componentes React

```
App
├── ProductList
│   ├── PageHeader
│   ├── Input (busca)
│   ├── Select (filtro)
│   ├── Stats (3 cards)
│   └── ProductCard[] (grid)
│       ├── Badge (estoque)
│       └── AlertDialog (confirmar exclusão)
│
├── AddProduct
│   ├── PageHeader
│   └── ProductForm
│       ├── Input (nome)
│       ├── Textarea (descrição)
│       ├── Input (preço)
│       ├── Input (estoque)
│       ├── Select (categoria)
│       ├── Input (imagem)
│       └── Button[] (submit/cancel)
│
└── EditProduct
    ├── PageHeader
    └── ProductForm (mesma de AddProduct)
```

---

## 🌐 Endpoints da API

Seu backend deve responder conforme abaixo:

### GET /api/products
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Notebook",
      "description": "...",
      "price": 3499.99,
      "category": "Informática",
      "stock": 15,
      "imageUrl": "https://...",
      "createdAt": "2026-03-01T10:00:00Z",
      "updatedAt": "2026-03-01T10:00:00Z"
    }
  ]
}
```

### POST /api/products
**Request Body:**
```json
{
  "name": "Produto",
  "description": "Descrição",
  "price": 99.99,
  "category": "Categoria",
  "stock": 10,
  "imageUrl": "https://..."
}
```

**Response:** Mesmo formato do GET

### PUT /api/products/:id
**Request Body:** Mesmo do POST

**Response:** Mesmo do GET (produto atualizado)

### DELETE /api/products/:id
**Response:**
```json
{
  "success": true
}
```

---

## 🎨 Design

### Headers
- Gradiente: `from-slate-900 to-slate-800`
- Ícones: Lucide React
- Responsivo: Flex column/row

### Cards
- Imagem: 192px altura
- Badge: Overlay top-right
- Botões: Flex 1 com gap
- Hover: Shadow aumenta

### Formulários
- Labels: Medium gray
- Inputs: Background light
- Errors: Red 600
- Validação: OnBlur + onChange

### Cores
- Primária: Red 600 (botões)
- Sucesso: Green 600 (preços)
- Erro: Red 600 (alertas)
- Info: Blue 600 (stats)

---

## 🧪 Testar Conexão com Backend

1. Abra DevTools (F12)
2. Vá para aba "Network"
3. Recarregue a página
4. Procure por requisições para `http://localhost:3000/api/products`

### Esperado:
- ✅ Status 200
- ✅ Response: `{ "success": true, "data": [...] }`
- ✅ Produtos aparecem na tela

### Se não aparecer:
- ❌ Backend não está rodando
- ❌ URL incorreta em `.env`
- ❌ CORS não configurado no backend

Solução: Ver [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

---

## 📦 Build para Produção

```bash
npm run build
```

Gera pasta `dist/` pronta para deploy.

---

## 🐛 Troubleshooting

### Erro: "Vite requires Node.js version 20.19+"
**Solução:** Atualizar Node.js

### Erro: "Cannot find module"
**Solução:** Rodar `npm install`

### Produtos não carregam
**Solução:** 
1. Verificar se backend está rodando
2. Verificar URL em `.env`
3. Verificar CORS no backend
4. Ver Network tab em DevTools

### Formulário não valida
**Solução:**
- Verificar console (F12)
- Checar se campos têm `name` attribute
- Confirmar `react-hook-form` está importado

### Toast não aparece
**Solução:**
- Verificar se está dentro `BrowserRouter` + `ProductProvider`
- Verificar import de `Sonner`

---

## 📚 Documentação Completa

| Documento | Conteúdo |
|---|---|
| [SETUP.md](SETUP.md) | Como instalar e começar |
| [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) | Integração com API |
| [DESIGN_GUIDE.md](DESIGN_GUIDE.md) | Design visual e UX |
| [NAVIGATION.md](NAVIGATION.md) | Rotas e fluxos de usuário |
| [.env.example](.env.example) | Variáveis de ambiente |

---

## ✅ Checklist Final

- [ ] Node.js 20+ instalado
- [ ] `npm install` executado
- [ ] Backend rodando em `http://localhost:3000`
- [ ] `.env` configurado (se necessário)
- [ ] `npm run dev` sem erros
- [ ] Frontend abre em `http://localhost:5175`
- [ ] Produtos carregam na lista
- [ ] Botão "Novo Produto" funciona
- [ ] Formulário valida corretamente
- [ ] Produto criado aparece na lista
- [ ] Edição funciona
- [ ] Exclusão funciona
- [ ] Busca funciona
- [ ] Filtro funciona

---

## 🎉 Pronto!

Seu sistema de cadastro de produtos está:
- ✅ Funcionando completamente
- ✅ Pronto para backend
- ✅ Disponível em produção
- ✅ Com toda documentação

**Divirta-se!** 🚀

---

**Criado em:** 27 de março de 2026  
**Versão:** 1.0.0  
**License:** MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
