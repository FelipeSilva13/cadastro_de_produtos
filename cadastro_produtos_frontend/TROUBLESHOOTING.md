# 🔧 Troubleshooting - Erros Comuns

Guia para resolver os erros mais frequentes durante a integração frontend/backend.

---

## 🌐 Erro: CORS - "Access to XMLHttpRequest blocked"

### ❌ Mensagem de Erro
```
Access to XMLHttpRequest at 'http://localhost:3000/api/products' from origin 
'http://localhost:5175' has been blocked by CORS policy
```

### 🎯 Causa
Backend não está configurado para aceitar requisições de localhost:5175 (frontend)

### ✅ Solução

#### Backend (Express.js)
```javascript
const cors = require('cors');

// Adicionar antes das rotas
app.use(cors({
  origin: 'http://localhost:5175', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
}));
```

#### Backend (Node.js puro)
```javascript
response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5175');
response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

#### Backend (Nest.js)
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:5175',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

#### Para QUALQUER URL (desenvolvimento)
```javascript
app.use(cors()); // Permite todos os origins
```

### 🧪 Teste
```bash
curl -X OPTIONS http://localhost:3000/api/products \
  -H "Origin: http://localhost:5175" \
  -v
```

Procure por:
```
< Access-Control-Allow-Origin: http://localhost:5175
< Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

---

## 🚫 Erro: 404 - "Cannot POST /api/products"

### ❌ Mensagem de Erro
```json
{
  "error": "Cannot POST /api/products",
  "status": 404
}
```

### 🎯 Causa
Os endpoints não estão definidos no backend

### ✅ Solução

Verifique se está com as 4 rotas definidas:

```javascript
// GET - Listar todos
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: [] });
});

// POST - Criar
app.post('/api/products', (req, res) => {
  res.status(201).json({ success: true, data: {} });
});

// PUT - Atualizar
app.put('/api/products/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

// DELETE - Deletar
app.delete('/api/products/:id', (req, res) => {
  res.json({ success: true });
});
```

---

## 📡 Erro: "Cannot read property 'id' of undefined"

### ❌ Mensagem de Erro
```
TypeError: Cannot read property 'id' of undefined
```

No console do navegador, geralmente linha em ProductCard.tsx ou ProductForm.tsx

### 🎯 Causa
API está retornando `undefined` ou estrutura incorreta

### ✅ Solução

Backend deve retornar exatamente este formato:

```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Produto",
    "description": "Desc",
    "price": 99.99,
    "category": "Cat",
    "stock": 10,
    "imageUrl": "...",
    "createdAt": "2026-03-27T10:00:00Z",
    "updatedAt": "2026-03-27T10:00:00Z"
  }
}
```

### Teste com cURL
```bash
curl http://localhost:3000/api/products | jq .
```

Salida esperada:
```json
{
  "success": true,
  "data": [...]
}
```

---

## ❌ Erro: 500 - "Internal Server Error"

### ❌ Mensagem de Erro
```json
{
  "error": "Internal Server Error",
  "status": 500
}
```

### 🎯 Causas Possíveis
1. Exception não tratada no backend
2. Banco de dados offline/inacessível
3. Variável de ambiente não definida
4. Erro de sintaxe no código

### ✅ Solução

1. **Verifique os logs do backend:**
```bash
# Se está rodando em outro terminal
Procure pela stack trace (linhas em vermelho)
```

2. **Verifique conexão com banco:**
```bash
# Para MongoDB
mongosh mongodb://localhost:27017

# Para PostgreSQL
psql -U user -d database -h localhost
```

3. **Adicione tratamento de erro no backend:**
```javascript
app.post('/api/products', (req, res) => {
  try {
    // seu código
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

4. **Verifique variáveis de ambiente:**
```bash
# Se está usando .env
cat .env
```

---

## 🔌 Erro: "Failed to fetch" / "Network Error"

### ❌ Mensagem de Erro
```
TypeError: Failed to fetch
```

ou

```
ERROR Error: Network error
```

### 🎯 Causas
1. Backend não está rodando
2. URL está errada
3. Backend está em porta diferente
4. Firewall bloqueando

### ✅ Solução

1. **Verifique se backend está rodando:**
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

2. **Teste a URL diretamente:**
```bash
curl http://localhost:3000/api/products

# Se der erro, tente:
curl -v http://localhost:3000/api/products
```

3. **Verifique a porta:**
```bash
# Se backend está em outra porta, atualize
# src/services/api.ts

export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'http://localhost:3001/api';  // Mude 3000 para 3001
```

4. **Reinicie ambos:**
```bash
# Terminal 1: Backend
node server.js

# Terminal 2: Frontend
npm run dev
```

---

## 📤 Erro: "Validation failed" / 400 Bad Request

### ❌ Mensagem de Erro
```json
{
  "success": false,
  "error": "Validation failed: name is required"
}
```

### 🎯 Causa
Formulário enviando dados inválidos

### ✅ Solução

Verifique o formato dos dados sendo enviados:

```javascript
// Em ProductForm.tsx, adicione logs:
const onSubmit = async (data: ProductFormData) => {
  console.log('Enviando:', data); // Veja os dados
  // ...
};
```

Certifique-se que:
- `name` tem pelo menos 3 caracteres
- `description` tem pelo menos 10 caracteres  
- `price` é um número >= 0
- `stock` é um número >= 0
- `category` não é vazio

Valide no backend:
```javascript
app.post('/api/products', (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  if (!name || name.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Nome deve ter pelo menos 3 caracteres'
    });
  }
  
  // ... outras validações
});
```

---

## 🖼️ Erro: Imagens não carregam

### ❌ Visível
Cards aparecem com quebr-quebra de imagem (ícone de imagem quebrada)

### 🎯 Causa
`imageUrl` inválido ou recurso inacessível

### ✅ Solução

1. **Verifique a URL no Produto:**
   ```bash
   # Teste se a URL é válida
   curl -I https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500
   # Deve retornar 200
   ```

2. **Use URLs válidas de teste:**
   ```
   https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500
   https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500
   https://via.placeholder.com/400x300
   ```

3. **Adicione fallback em ProductCard:**
   ```tsx
   <img 
     src={product.imageUrl || 'https://via.placeholder.com/400x300'}
     onError={(e) => {
       e.currentTarget.src = 'https://via.placeholder.com/400x300';
     }}
     alt={product.name}
   />
   ```

---

## 🔄 Erro: Dados não atualizam em tempo real

### ❌ Visível
Criar/atualizar produto mas lista não reflete a mudança

### 🎯 Causa
Context não está sendo sincronizado corretamente

### ✅ Solução

Não há cache no context - dados vêm só do backend. Verifique:

1. **Context está chamando API:**
```typescript
// ProductContext.tsx - verificar que addProduct chama apiPost
const addProduct = useCallback(async (productData: ProductFormData) => {
  const newProduct = await apiPost<Product>('/products', productData);
  setProducts((prev) => [...prev, newProduct]);
  return newProduct;
}, []);
```

2. **ProductList refaz fetch após ações:**
```typescript
useEffect(() => {
  fetchProducts(); // Chamado ao montar
}, []); // Dependency array vazio = apenas uma vez
```

3. **Para atualizar em tempo real, adicione:**
```typescript
// Após adicionar/atualizar/deletar, refaça a busca
const handleSuccess = async () => {
  await fetchProducts(); // Recarrega lista inteira
  navigate('/');
};
```

---

## 🗂️ Erro: "Cannot find module" ou "404 on module"

### ❌ Mensagem de Erro
```
Module not found: Error: Can't resolve './src/services/api'
```

### 🎯 Causa
Arquivo não foi criado ou caminho incorreto

### ✅ Solução

Verifique estrutura de arquivos:
```
src/
  services/
    api.ts          ← Deve existir
  contexts/
    ProductContext.tsx
  components/
    ProductCard.tsx
    ProductForm.tsx
  pages/
    ProductList.tsx
    AddProduct.tsx
    EditProduct.tsx
```

Se faltar `src/services/api.ts`, crie:
```bash
mkdir src/services
# Copie o conteúdo de API_BASE_UR do arquivo BACKEND_INTEGRATION.md
```

---

## 🎨 Erro: Estilos não aparecem

### ❌ Visível
Componentes aparecem sem cores/espaçamento

### 🎯 Causa
Tailwind CSS não foi compilado

### ✅ Solução

```bash
# Reinstale dependências
npm install

# Verifique se tem tailwind instalado
npm list tailwindcss

# Reconstrói
npm run dev
```

Verifique se `index.css` tem os imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📊 Erro: Tipagem TypeScript incorreta

### ❌ Mensagem de Erro
```
Type 'unknown' is not assignable to type 'Product'
```

### 🎯 Causa
API retornando dados com tipo diferente do esperado

### ✅ Solução

Atualize o tipo de resposta em `api.ts`:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = (await response.json()) as ApiResponse<T>;
  
  if (!json.success) {
    throw new ApiError(json.error || 'Erro desconhecido', 'UNKNOWN');
  }
  
  return json.data as T;
}
```

---

## 🧪 Checklist de Troubleshooting

Quando algo não funciona, execute na ordem:

- [ ] Backend está rodando? `curl http://localhost:3000/api/products`
- [ ] Frontend está rodando? Veja em http://localhost:5175
- [ ] CORS está configurado? Veja `Access-Control-Allow-Origin` header
- [ ] Resposta em JSON válido? Teste com `curl -H "Content-Type: application/json"`
- [ ] Estrutura de resposta?
  ```json
  { "success": true, "data": {...} }
  ```
- [ ] IDs retornados como string ou número?
- [ ] Datas em ISO 8601? `2026-03-27T10:00:00Z`
- [ ] Console do browser tem erros? Abra DevTools (F12)
- [ ] Console do backend tem erros? Procure por stack trace

---

## 📞 Script de Diagnóstico Rápido

```bash
# Execute isso se algo não funcionar
echo "🔍 Testando Backend..."
curl -s http://localhost:3000/api/products | head -c 100
echo ""
echo ""
echo "🔍 Verificando porta 3000..."
netstat -ano | findstr :3000
echo ""
echo "🔍 Verificando porta 5175..."
netstat -ano | findstr :5175
```

---

## 🆘 Se Nada Funcionar

1. **Reinicie ambos:**
   ```bash
   # Feche os dois terminais (Ctrl+C)
   # Reabra ambos e execute:
   npm run dev      # Frontend
   node server.js   # Backend
   ```

2. **Limpe cache:**
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

3. **Verifique Node.js:**
   ```bash
   node --version  # Deve ser 20.19.0+
   npm --version   # Deve ser 10+
   ```

4. **Abra DevTools (F12)** e veja:
   - Aba "Network" - requisições e erros
   - Aba "Console" - erros JavaScript
   - Aba "Application" - LocalStorage, cookies

5. **Se ainda não funcionar:**
   - Compartilhe a captura da aba Network (F12)
   - Compartilhe o erro do console
   - Compartilhe o tipo de requisição que está fazendo

---

**Última atualização:** 27 de março de 2026  
**Versão:** 1.0.0
