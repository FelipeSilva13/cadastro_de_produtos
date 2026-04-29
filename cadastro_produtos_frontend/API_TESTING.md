# 🧪 Guia de Testes - API Endpoints

Este arquivo contém exemplos de como testar cada endpoint da API usando cURL, Postman ou Insomnia.

---

## 📋 Configuração Base

**URL Base:** `http://localhost:3000/api`

**Headers padrão:**
```
Content-Type: application/json
```

---

## 1️⃣ GET /api/products - Listar Todos os Produtos

### cURL
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Content-Type: application/json"
```

### JavaScript Fetch
```javascript
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Notebook Dell Inspiron",
      "description": "Notebook com processador Intel Core i5, 8GB RAM, SSD 256GB",
      "price": 3499.99,
      "category": "Informática",
      "stock": 15,
      "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      "createdAt": "2026-03-01T10:00:00Z",
      "updatedAt": "2026-03-01T10:00:00Z"
    },
    {
      "id": "2",
      "name": "Mouse Logitech MX Master",
      "description": "Mouse ergonômico sem fio com sensor de alta precisão",
      "price": 449.90,
      "category": "Periféricos",
      "stock": 30,
      "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      "createdAt": "2026-03-05T10:00:00Z",
      "updatedAt": "2026-03-05T10:00:00Z"
    }
  ]
}
```

---

## 2️⃣ POST /api/products - Criar Novo Produto

### cURL
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teclado Mecânico RGB",
    "description": "Teclado mecânico com switches Cherry MX, RGB customizável",
    "price": 599.00,
    "category": "Periféricos",
    "stock": 20,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
  }'
```

### JavaScript Fetch
```javascript
const newProduct = {
  name: "Teclado Mecânico RGB",
  description: "Teclado mecânico com switches Cherry MX, RGB customizável",
  price: 599.00,
  category: "Periféricos",
  stock: 20,
  imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
};

fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct)
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Request Body
```json
{
  "name": "Teclado Mecânico RGB",
  "description": "Teclado mecânico com switches Cherry MX, RGB customizável",
  "price": 599.00,
  "category": "Periféricos",
  "stock": 20,
  "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
}
```

### Resposta Esperada (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "3",
    "name": "Teclado Mecânico RGB",
    "description": "Teclado mecânico com switches Cherry MX, RGB customizável",
    "price": 599.00,
    "category": "Periféricos",
    "stock": 20,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    "createdAt": "2026-03-27T10:30:00Z",
    "updatedAt": "2026-03-27T10:30:00Z"
  }
}
```

### Erros Possíveis

**400 Bad Request** - Dados inválidos:
```json
{
  "success": false,
  "error": "Nome é obrigatório"
}
```

**422 Unprocessable Entity** - Validação passou mas há problema nos dados:
```json
{
  "success": false,
  "error": "Preço deve ser um número positivo"
}
```

---

## 3️⃣ PUT /api/products/:id - Atualizar Produto

### cURL
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook Dell (Atualizado)",
    "description": "Descrição atualizada",
    "price": 3399.99,
    "category": "Informática",
    "stock": 25,
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
  }'
```

### JavaScript Fetch
```javascript
const updateData = {
  name: "Notebook Dell (Atualizado)",
  description: "Descrição atualizada",
  price: 3399.99,
  category: "Informática",
  stock: 25,
  imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
};

fetch('http://localhost:3000/api/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updateData)
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Request Body
```json
{
  "name": "Notebook Dell (Atualizado)",
  "description": "Descrição atualizada",
  "price": 3399.99,
  "category": "Informática",
  "stock": 25,
  "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
}
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Notebook Dell (Atualizado)",
    "description": "Descrição atualizada",
    "price": 3399.99,
    "category": "Informática",
    "stock": 25,
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    "createdAt": "2026-03-01T10:00:00Z",
    "updatedAt": "2026-03-27T11:00:00Z"
  }
}
```

### Erros Possíveis

**404 Not Found**:
```json
{
  "success": false,
  "error": "Produto não encontrado"
}
```

---

## 4️⃣ DELETE /api/products/:id - Deletar Produto

### cURL
```bash
curl -X DELETE http://localhost:3000/api/products/3 \
  -H "Content-Type: application/json"
```

### JavaScript Fetch
```javascript
fetch('http://localhost:3000/api/products/3', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Resposta Esperada (200 OK)
```json
{
  "success": true
}
```

### ou com confirmação

```json
{
  "success": true,
  "message": "Produto deletado com sucesso"
}
```

### Erros Possíveis

**404 Not Found**:
```json
{
  "success": false,
  "error": "Produto não encontrado"
}
```

---

## 🧪 Testando com Postman

### 1. Criar Collection
- Abra Postman
- Clique em "+ New"
- Selecione "Collection"
- Nomeie como "Cadastro de Produtos"

### 2. Criar Requests

#### GET /api/products
```
Method: GET
URL: http://localhost:3000/api/products
Headers: Content-Type: application/json
```

#### POST /api/products
```
Method: POST
URL: http://localhost:3000/api/products
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "price": 99.99,
  "category": "Categoria",
  "stock": 10,
  "imageUrl": "https://..."
}
```

#### PUT /api/products/1
```
Method: PUT
URL: http://localhost:3000/api/products/1
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "Produto Atualizado",
  "description": "Nova descrição",
  "price": 79.99,
  "category": "Nova Categoria",
  "stock": 15,
  "imageUrl": "https://..."
}
```

#### DELETE /api/products/1
```
Method: DELETE
URL: http://localhost:3000/api/products/1
Headers: Content-Type: application/json
```

---

## 🧪 Testando com Insomnia

Similar ao Postman, Insomnia também suporta as mesmas operações.

### Dicas
1. Use environment variables para URL base
2. Salve responses para referência
3. Use pre-request scripts para validação
4. Teste error cases também

---

## ✅ Validação de Dados

### Campos Obrigatórios
```
name         (string, min 3 caracteres)
description  (string, min 10 caracteres)
price        (number, >= 0)
category     (string)
stock        (number, >= 0)
```

### Campos Opcionais
```
imageUrl     (string, valid URL)
```

### Formatos Válidos

**Preço:**
```
3499.99   ✅ Válido
3499      ✅ Válido (convertido para 3499.00)
-100      ❌ Inválido (negativo)
3499.999  ⚠️ Depende do backend
```

**Categoria (exemplos):**
```
✅ Informática
✅ Periféricos
✅ Eletrônicos
✅ Móveis
✅ Acessórios
✅ Outro valor customizado
```

---

## 🔄 Fluxo de Teste Completo

### 1. Criar Produto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse Sem Fio",
    "description": "Mouse óptico sem fio com alcance de 10 metros",
    "price": 89.99,
    "category": "Periféricos",
    "stock": 50
  }'
```
**Resposta:** Deve retornar 201 com ID do novo produto (ex: "4")

### 2. Listar Produtos
```bash
curl -X GET http://localhost:3000/api/products
```
**Resposta:** Deve incluir o novo produto na lista

### 3. Atualizar Produto
```bash
curl -X PUT http://localhost:3000/api/products/4 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse Sem Fio (v2)",
    "description": "Mouse óptico sem fio melhorado",
    "price": 99.99,
    "category": "Periféricos",
    "stock": 40
  }'
```
**Resposta:** Deve retornar 200 com dados atualizados

### 4. Buscar Produto Específico (GET por ID)
Se seu backend suportar:
```bash
curl -X GET http://localhost:3000/api/products/4
```

### 5. Deletar Produto
```bash
curl -X DELETE http://localhost:3000/api/products/4
```
**Resposta:** Deve retornar 200 com `{ "success": true }`

### 6. Verificar Deleção
```bash
curl -X GET http://localhost:3000/api/products
```
**Resposta:** Produto 4 não deve mais estar na lista

---

## 🚨 Tratamento de Erros

O frontend espera que erros sigam este padrão:

```json
{
  "success": false,
  "error": "Mensagem de erro descritiva"
}
```

### Status HTTP Recomendados

| Status | Causa | Exemplo |
|---|---|---|
| 200 | Sucesso (GET/PUT/DELETE) | Produto atualizado |
| 201 | Criado (POST) | Novo produto criado |
| 400 | Requisição inválida | Dados malformados |
| 404 | Não encontrado | Produto não existe |
| 422 | Validação falhou | Preço negativo |
| 500 | Erro do servidor | Exception no backend |

---

## 📊 Dados de Teste

Use estes dados para testes:

```json
{
  "name": "Webcam Logitech C920",
  "description": "Webcam Full HD com microfone estéreo integrado",
  "price": 349.90,
  "category": "Periféricos",
  "stock": 25,
  "imageUrl": "https://images.unsplash.com/photo-1598805506267-5edd8c0fde90?w=500"
}
```

```json
{
  "name": "Monitor LG 27 4K",
  "description": "Monitor ultra HD com painel IPS e resolução 4K",
  "price": 1299.99,
  "category": "Periféricos",
  "stock": 8,
  "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
}
```

```json
{
  "name": "Headset Gamer HyperX",
  "description": "Headset gamer com som surround 7.1 e cancelamento de ruído",
  "price": 899.90,
  "category": "Acessórios",
  "stock": 12,
  "imageUrl": "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500"
}
```

---

## ✨ Dicas Práticas

### 1. Use variáveis de ambiente no Postman
```
{{base_url}}/products
onde base_url = http://localhost:3000/api
```

### 2. Salve respostas bem-sucedidas
Para referência durante desenvolvimento

### 3. Teste casos de erro
- Produto não existe (404)
- Dados inválidos (400/422)
- Servidor offline (500)

### 4. Valide tipos de dados
- Preço deve ser número, não string
- Stock deve ser inteiro
- Datas devem ser ISO 8601

### 5. Teste com e sem imageUrl
Alguns produtos podem não ter imagem

---

## 🎯 Checklist de Teste

- [ ] GET /api/products retorna 200
- [ ] POST /api/products cria novo produto
- [ ] Novo produto aparece em GET /api/products
- [ ] PUT /api/products/id atualiza corretamente
- [ ] DELETE /api/products/id remove produto
- [ ] Status HTTP corretos (201, 200, 404, etc)
- [ ] Response segue formato esperado
- [ ] Validações funcionam (campos obrigatórios)
- [ ] Erros retornam mensagens descritivas
- [ ] IDs são preservados após UPDATE
- [ ] Datas (createdAt/updatedAt) corretas

---

**Última atualização:** 27 de março de 2026  
**Versão:** 1.0.0
