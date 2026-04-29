# ✅ Guia de Integração Passo-a-Passo

Instruções completas para integrar o backend com o frontend.

---

## 📋 Resumo da Fase de Integração

| Item | Status | Responsabilidade |
|------|--------|------------------|
| Frontend | ✅ PRONTO | Você já tem tudo |
| Backend | ⏳ TODO | Você precisa implementar |
| Configuração | 🔧 MANUAL | Você precisa fazer |
| Testes | 🧪 MANUAL | Você precisa testar |

---

## 🚀 FASE 1: Preparação do Ambiente

### 1.1 Upgrade do Node.js

**Problema:** Sistema está com Node 16.20.2, precisa ser 20.19.0+

**Solução:**
```bash
# Verificar versão atual
node --version

# Windows - Baixe e instale
# https://nodejs.org/en/download/ (LTS)

# Ou use nvm-windows
# https://github.com/coreybutler/nvm-windows/releases
```

**Verificar após upgrade:**
```bash
node --version    # Deve ser v20.19.0 ou superior
npm --version     # Deve ser 10+
```

### 1.2 Instalar Dependências Frontend

```bash
cd cadastro_produtos
npm install
```

**Esperado:** Sem erros 🟢

---

## 🔌 FASE 2: Implementar Backend

### 2.1 Estrutura Básica (Express.js)

Crie um arquivo `server.js` na raiz do seu projeto backend:

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Dados em memória (para teste rápido)
let products = [
  {
    id: '1',
    name: 'Produto Exemplo',
    description: 'Este é um produto de exemplo',
    price: 99.99,
    category: 'Exemplo',
    stock: 10,
    imageUrl: 'https://via.placeholder.com/400x300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 2;

// GET /api/products - Listar todos
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
  });
});

// POST /api/products - Criar
app.post('/api/products', (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    // Validações
    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Nome deve ter pelo menos 3 caracteres',
      });
    }

    if (!description || description.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Descrição deve ter pelo menos 10 caracteres',
      });
    }

    if (price < 0 || isNaN(price)) {
      return res.status(400).json({
        success: false,
        error: 'Preço deve ser um número positivo',
      });
    }

    if (stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({
        success: false,
        error: 'Stock deve ser um número inteiro positivo',
      });
    }

    const newProduct = {
      id: String(nextId++),
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT /api/products/:id - Atualizar
app.put('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado',
      });
    }

    // Validações (same as POST)
    if (name && name.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Nome deve ter pelo menos 3 caracteres',
      });
    }

    // Atualizar campos
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (category) product.category = category;
    if (stock !== undefined) product.stock = Number(stock);
    if (imageUrl !== undefined) product.imageUrl = imageUrl;
    product.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /api/products/:id - Deletar
app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado',
      });
    }

    products.splice(index, 1);

    res.json({
      success: true,
      message: 'Produto deletado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Backend rodando em http://localhost:${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api`);
  console.log(`🟢 Pronto para receber requisições\n`);
});
```

### 2.2 Instalar Dependências Backend

```bash
# Na raiz do seu projeto backend
npm install express cors
```

### 2.3 Executar Backend

```bash
# Terminal separado
node server.js

# Esperado:
# 🚀 Backend rodando em http://localhost:3000
# 📍 API Base: http://localhost:3000/api
# 🟢 Pronto para receber requisições
```

---

## 🎯 FASE 3: Executar Frontend

```bash
# Terminal novo (não feche o backend)
cd cadastro_produtos
npm run dev

# Esperado:
# ➜  Local:   http://localhost:5175/
# ➜  press h to show help
```

**Abra no navegador:** http://localhost:5175

Você deve ver:
- ✅ Página de listagem vazia ou com 1 produto de teste
- ✅ Botão "Adicionar Produto"
- ✅ Sem erros no console (F12)

---

## 🧪 FASE 4: Testar Integração

### 4.1 Teste Manual via UI

1. **Abra http://localhost:5175**
2. **Crie um novo produto:**
   - Clique em "Adicionar Produto" (ou "+")
   - Preencha os campos:
     - Nome: "Mouse Gamer"
     - Descrição: "Mouse óptico de alta precisão com DPI ajustável"
     - Preço: "149.90"
     - Categoria: "Periféricos"
     - Stock: "25"
   - Clique em "Salvar"
3. **Esperado:**
   - ✅ Toast verde dizendo "Produto adicionado com sucesso!"
   - ✅ Redirecionado para listagem
   - ✅ Novo produto aparece na lista

### 4.2 Teste com Script Automatizado

```bash
# Terminal novo
cd cadastro_produtos
node api-test.js

# Esperado:
# 📊 RELATÓRIO FINAL
# ✅ Passou: 7
# ❌ Falhou: 0
# 🎉 TODOS OS TESTES PASSARAM!
```

### 4.3 Teste com cURL

```bash
# Listar produtos
curl http://localhost:3000/api/products

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Teste",
    "description": "Descrição de teste muito boa",
    "price": 199.99,
    "category": "Teste",
    "stock": 50
  }'

# Esperado: JSON com success: true
```

---

## 🔧 FASE 5: Configurar Ambiente (Opcional)

### 5.1 Se Backend está em URL diferente

Se seu backend estiver em outra máquina ou porta:

**Arquivo:** `.env`
```bash
VITE_API_URL=http://seu-servidor.com:3000/api
```

**Ou edite:** `src/services/api.ts`
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'http://seu-servidor.com:3000/api';
```

### 5.2 Se Backend está em servidor real

1. **Atualize CORS no backend:**
   ```javascript
   app.use(cors({
     origin: 'https://seu-dominio.com',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
   }));
   ```

2. **Configure variável de ambiente:**
   ```
   VITE_API_URL=https://seu-servidor-api.com/api
   ```

---

## 📱 FASE 6: Testar Responsividade

### Desktop (1920x1080)
- [ ] 3 produtos por linha
- [ ] Cards com tamanho proporcional

### Tablet (768x1024)
- [ ] 2 produtos por linha
- [ ] Buttons acessíveis

### Mobile (375x667)
- [ ] 1 produto por linha
- [ ] Menu responsivo
- [ ] Touch-friendly buttons

**Teste no navegador:**
```
F12 → Toggle device toolbar (Ctrl+Shift+M)
Simule diferentes tamanhos
```

---

## 🎨 FASE 7: Personalização (Opcional)

### Mudar Cores Primárias

**Arquivo:** `src/app.tsx` ou `tailwind.config.ts`

Localize e altere:
```typescript
// De:
<button className="bg-red-600">Deletar</button>

// Para:
<button className="bg-blue-600">Deletar</button>
```

### Mudar Textos

Busque por:
- "Adicionar Produto" → altere em `components/PageHeader.tsx`
- "Editar" → altere em `components/ProductCard.tsx`
- "Nenhum produto encontrado" → altere em `pages/ProductList.tsx`

---

## ⚡ FASE 8: Ir para Produção

### Build do Frontend

```bash
npm run build

# Gera pasta dist/ pronta para deploy

# Testar build localmente:
npm run preview
```

### Deploy Frontend

**Opções:**
- Vercel: https://vercel.com (recomendado React)
- Netlify: https://netlify.com
- GitHub Pages: Forneça o repositório
- Seu próprio servidor

### Deploy Backend

**Opções:**
- Railway: https://railway.app
- Render: https://render.com
- Heroku: https://heroku.com
- Seu próprio servidor

**Exemplo Render:**
```bash
# 1. Crie um repositório Git
git init
git add .
git commit -m "Initial commit"

# 2. Faça push para GitHub

# 3. Conecte em https://render.com
# - Novo Web Service
# - Conecte repositório
# - Start Command: node server.js
# - Port: 3000
```

---

## 🚨 Checklist Final

Antes de considerar "pronto":

### Backend
- [ ] Todos 4 endpoints implementados (GET, POST, PUT, DELETE)
- [ ] Validações funcionando
- [ ] CORS configurado
- [ ] Rodando em http://localhost:3000/api
- [ ] Retorna JSON com `{ success: true, data: {...} }`

### Frontend
- [ ] npm install completou sem erros
- [ ] npm run dev roda sem erros
- [ ] Pode listar produtos
- [ ] Pode adicionar produto
- [ ] Pode editar produto
- [ ] Pode deletar produto
- [ ] Sem erros no console (F12)

### Integração
- [ ] Produtos aparecem quando criados
- [ ] Atualizações refletem em tempo real
- [ ] Deletar remove da lista
- [ ] Mensagens de erro aparecem (campos obrigatórios)
- [ ] Carregamentos mostram feedback visual

### Testes
- [ ] `node api-test.js` passa ✅
- [ ] Teste manual no navegador funciona ✅
- [ ] cURL retorna dados corretos ✅

---

## 📊 Visão Geral da Arquitetura Estabelecida

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR DO USUÁRIO                     │
│              http://localhost:5175                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/JSON
                       │
                ┌──────▼──────┐
                │   FRONTEND   │
                │   React 19   │
                │ Vite + TS    │
                └──────┬──────┘
                       │
      ┌────────────────┼────────────────┐
      │                │                │
   Components     Pages              Hooks
  ┌─────────┐  ┌─────────┐  ┌──────────────────┐
  │ProductCard│ │ProductList│  │useProductForm  │
  │ProductForm│ │AddProduct │  │useCallback     │
  │PageHeader │ │EditProduct│  │useEffect       │
  └─────────┘  └─────────┘  └──────────────────┘
      │                │                │
      └────────────────┼────────────────┘
                       │
                    Context
                  ProductContext
                       │
                    Services
                   src/services/api.ts
                       │
                       │ fetch() 🌐
                       │ CORS Headers
                       │
                ┌──────▼──────┐
                │   BACKEND    │
                │  Express.js  │
                │  Port 3000   │
                └──────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
  GET            POST/PUT            DELETE
/api/products    /api/products       /api/products/:id
  (Listar)      (Criar/Atualizar)     (Deletar)
    │                  │                  │
    └──────────────────┼──────────────────┘
                       │
                  [Dados em JSON]
                       │
                ┌──────▼──────┐        (Opcional)
                │   DATABASE   │  ◄────────┘
                │  MongoDB     │    ou
                │  PostgreSQL  │
                │  MySQL       │
                └──────────────┘
```

---

## 🎯 Próximos Passos

### Curto Prazo (Esta semana)
1. Implementar backend básico em Express
2. Testar com script `api-test.js`
3. Validar integração completa

### Médio Prazo (Próximas 2 semanas)
1. Conectar a banco de dados real (MongoDB/PostgreSQL)
2. Implementar autenticação (JWT)
3. Adicionar mais validações

### Longo Prazo (Próximo mês)
1. Deploy em servidor de produção
2. Configurar domínio DNS
3. Implementar CI/CD (GitHub Actions)
4. Adicionar testes automatizados

---

## 📞 Suporte

Se encontrar erros:

1. Consulte [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Verifique [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)
3. Revise [API_TESTING.md](./API_TESTING.md)
4. Rode script: `node api-test.js`

---

**Versão:** 1.0.0  
**Data:** 27 de março de 2026  
**Status:** ✅ Frontend completo e preparado para integração
