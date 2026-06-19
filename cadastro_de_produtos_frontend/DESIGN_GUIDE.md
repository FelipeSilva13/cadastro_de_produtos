# 📦 Sistema de Cadastro de Produtos - Guia Visual

## ✨ Telas Implementadas

Este documento descreve todas as telas e funcionalidades visuais implementadas no sistema.

---

## 1. 📋 Tela de Listagem de Produtos

**Rota:** `/`

### Componentes Visuais:

#### Header Gradiente
- Logo com ícone de pacote
- Título: "Cadastro de Produtos"
- Subtítulo: "Gerencie seu catálogo de produtos"
- Botão "Novo Produto" em destaque (vermelho)

#### Barra de Filtros
- **Campo de Busca**: Buscar por nome ou descrição em tempo real
- **Dropdown de Categorias**: Filtrar por categoria específica ou "Todas as categorias"

#### Cards de Estatísticas (3 colunas)
- **Total de Produtos**: Conta total
- **Produtos Exibidos**: Conforme filtros aplicados
- **Categorias**: Número único de categorias

#### Grid de Produtos
- **Responsivo**: 1 coluna (mobile) → 2 colunas (tablet) → 3 colunas (desktop)
- **Cada Card contém**:
  - Imagem do produto (ou placeholder)
  - Badge de status (Disponível/Estoque Baixo/Esgotado)
  - Nome do produto
  - Descrição (2 linhas máx)
  - Categoria
  - Preço em verde (formato R$)
  - Informação de estoque
  - Botões de Editar e Excluir

#### Estados Visuais:
- **Loading**: Skeleton screens enquanto carrega
- **Erro**: Mensagem vermelha com botão "Tentar Novamente"
- **Vazio**: Mensagem quando nenhum produto encontrado
- **Sucesso**: Toast notification ao excluir

---

## 2. ➕ Tela de Adicionar Produto

**Rota:** `/add`

### Componentes Visuais:

#### Header Gradiente
- Ícone de "Mais" (+)
- Título: "Adicionar Novo Produto"
- Subtítulo: "Preencha os dados do produto abaixo"
- Botão "Voltar" no topo

#### Formulário com Campos:

1. **Nome do Produto** ⭐
   - Input text
   - Validação: mínimo 3 caracteres
   - Mensagem de erro em tempo real

2. **Descrição** ⭐
   - Textarea (4 linhas)
   - Validação: mínimo 10 caracteres
   - Placeholder descritivo

3. **Preço (R$)** ⭐
   - Input numérico com centavos
   - Validação: apenas positivos
   - Step 0.01

4. **Quantidade em Estoque** ⭐
   - Input numérico inteiro
   - Validação: apenas positivos

5. **Categoria** ⭐
   - Dropdown com opções fixas
   - Categorias: Informática, Periféricos, Eletrônicos, Móveis, Acessórios, Outros

6. **URL da Imagem** (Opcional)
   - Input URL
   - Permite deixar em branco

#### Botões:
- **"Adicionar Produto"** (vermelho) - Envia dados
- **"Cancelar"** (outline) - Volta para lista

#### Estados:
- Formulário com validação onBlur
- Botões desabilitados durante submissão
- Mensagens de erro em vermelho

---

## 3. ✏️ Tela de Editar Produto

**Rota:** `/edit/:id`

### Componentes Visuais:

#### Similar à tela de Adicionar, com diferenças:
- Ícone de "Lápis" (edit)
- Título: "Editar Produto"
- Botão: "Salvar Alterações"
- Formulário **pré-preenchido** com dados do produto

#### Validações:
- Mesmas validações da criação
- Campo obrigatório se não foi carregado

---

## 4. 🎨 Design System

### Cores Utilizadas:
```
- Primária: Vermelho #dc2626 (bg-red-600)
- Header: Gradiente slate-900 → slate-800
- Fundo: slate-50
- Texto principal: slate-900
- Texto secundário: slate-600
- Bordas: slate-200
- Erro: red-600
- Sucesso: green-600
- Info: blue-600
```

### Tipografia:
- **Headers**: Bold, tracking-tight
- **Títulos**: 3xl-4xl
- **Labels**: Medium, slate-700
- **Placeholders**: slate-400

### Espaçamento:
- Padding cards: p-4 a p-6
- Gap entre elementos: gap-4 a gap-6
- Margin vertical: py-6 a py-12

---

## 5. 📱 Responsividade

### Breakpoints:
- **Mobile**: < 640px → 1 coluna
- **Tablet**: 640px - 1024px → 2 colunas
- **Desktop**: > 1024px → 3 colunas

### Adaptações:
- Textos mantêm legibilidade
- Botões touchable (min 44px altura)
- Grid se reajusta automaticamente
- Espaçamento aumenta em telas maiores

---

## 6. 💫 Interações e Animações

### Hover States:
- Cards: shadow aumenta e transição suave
- Botões: cor muda com transição
- Links: sublinhados ao indicar

### Transições:
```
- Duration: 200-300ms
- Easing: ease-in-out
- Propriedades: shadow, color, opacity
```

### Loading Estados:
- Skeleton screens enquanto busca produtos
- Spinner em botões durante submissão
- Cursor desabilitado em operações

---

## 7. 🗑️ Exclusão de Produto

### Dialog de Confirmação:
- Título: "Confirmar Exclusão"
- Mensagem: "Tem certeza que deseja excluir..."
- Dois botões: Cancelar e Excluir
- Confirmação obrigatória

### Feedback:
- Toast notification de sucesso
- Card removido da lista automaticamente
- Estatísticas atualizadas

---

## 8. 🔍 Busca e Filtros

### Busca em Tempo Real:
- Busca por nome e descrição
- Ignora maiúsculas/minúsculas
- Filtra enquanto digita

### Filtro por Categoria:
- Dropdown com "Todas as categorias"
- Dinâmico (gerado das categorias existentes)
- Combina com busca (AND logic)

### Lógica:
```
Produtos exibidos = 
  (nome OU descrição contém termo) E (categoria = selecionada OU todas)
```

---

## 9. 🔔 Notificações

### Toast Notifications (Sonner.js):
- **Sucesso (verde)**: Produto adicionado/atualizado/deletado
- **Erro (vermelho)**: Falha em operações
- **Info (azul)**: Informações gerais
- Posição: Canto superior direito
- Auto-close: 3-5 segundos

---

## 10. ⚠️ Tratamento de Erros

### Cenários Cobertos:
1. **Conexão não disponível**
   - Ícone de alerta
   - Mensagem: "Erro ao carregar produtos"
   - Botão "Tentar Novamente"

2. **Produto não encontrado**
   - Página dedicada
   - Mensagem clara
   - Botão para voltar

3. **Validação de formulário**
   - Mensagens de erro em tempo real
   - Destacadas em vermelho
   - Campo focado automaticamente

4. **Erro de submissão**
   - Toast com mensagem do servidor
   - Formulário mantém dados
   - Botão volta ao estado normal

---

## 11. 📊 Componentes Reutilizáveis

### Componentes Próprios:
- `PageHeader`: Header gradiente customizável
- `ProductCard`: Card com todos os detalhes
- `ProductForm`: Formulário compartilhado
- `ProductList`: Lista completa

### Componentes shadcn/ui:
- Button, Input, Label, Textarea
- Select, Card, Badge, AlertDialog
- E muitos outros...

---

## 12. 🔄 Fluxos de Usuário

### Adicionar Produto:
1. Clica "Novo Produto"
2. Preenche formulário
3. Clica "Adicionar Produto"
4. Validação executada
5. Requisição POST enviada
6. Sucesso → volta para lista
7. Novo produto aparece no topo

### Editar Produto:
1. Clica "Editar" no card
2. Formulário carrega com dados
3. Modifica informações
4. Clica "Salvar Alterações"
5. Validação executada
6. Requisição PUT enviada
7. Sucesso → volta para lista
8. Card atualizado

### Deletar Produto:
1. Clica "Excluir" no card
2. Dialog de confirmação abre
3. Confirma exclusão
4. Requisição DELETE enviada
5. Sucesso → card desaparece
6. Estatísticas atualizam

---

## 13. 🌐 Integração com Backend

Todos os componentes estão preparados para chamar:

```
GET    /api/products           - Listar todos
POST   /api/products           - Criar novo
PUT    /api/products/:id       - Atualizar
DELETE /api/products/:id       - Deletar
```

Ver [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) para detalhes.

---

## 14. ✨ Extras e Polish

### Acessibilidade:
- Labels associados aos inputs (htmlFor)
- ARIA attributes onde necessário
- Contraste de cores WCAG AA

### Performance:
- CSS-in-JS minimizado (Tailwind)
- Re-renders otimizados com React.memo
- Lazy loading de imagens suportado

### Segurança:
- Inputs sanitizados via react-hook-form
- Validação client e server-side esperada
- CORS configurável

---

## 📸 Screenshots Esperados

*As telas devem se parecer com as imagens do Figma fornecidas*

- Header gradiente escuro
- Botão "Novo Produto" em vermelho
- Cards com imagens dos produtos
- Badges de status visíveis
- Preços em verde
- Layout responsivo e limpo

---

## 🚀 Próximas Melhorias (Sugestões)

- [ ] Paginação de produtos
- [ ] Upload de imagens (não apenas URL)
- [ ] Filtros avançados
- [ ] Exportação em CSV/PDF
- [ ] Dark mode
- [ ] Modo offline com cache
- [ ] Histórico de alterações
- [ ] Busca por preço range
- [ ] Favoritos de produtos

---

**Criado em:** 27 de março de 2026  
**Versão:** 1.0.0  
**Status:** ✅ Pronto para integração com backend
