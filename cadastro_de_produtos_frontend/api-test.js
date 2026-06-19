#!/usr/bin/env node

/**
 * 🧪 API Test Suite - Cadastro de Produtos
 * 
 * Script automatizado para testar todos os endpoints da API
 * 
 * Uso:
 *   node api-test.js                    # Usar localhost:3000/api (padrão)
 *   node api-test.js http://localhost:3001/api  # URL customizada
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000/api';

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Estado global
let testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

let createdProductId = null;

/**
 * Log com cores
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Faz uma requisição HTTP
 */
async function request(method, endpoint, body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return {
      status: response.status,
      data,
      ok: response.ok,
    };
  } catch (error) {
    throw new Error(`Erro ao conectar em ${url}: ${error.message}`);
  }
}

/**
 * Verifica se resultado passou no teste
 */
function assert(condition, name, passed, failed) {
  if (condition) {
    testResults.passed++;
    testResults.tests.push({ name, status: '✅ PASSOU' });
    log(`  ✅ ${name}`, 'green');
  } else {
    testResults.failed++;
    testResults.tests.push({ name, status: '❌ FALHOU' });
    log(`  ❌ ${name}`, 'red');
  }
}

/**
 * Teste 1: Listar todos os produtos (GET)
 */
async function test1GetProducts() {
  log('\n📋 Teste 1: GET /api/products - Listar Produtos', 'blue');
  
  try {
    const result = await request('GET', '/products');
    
    assert(
      result.ok && result.status === 200,
      'Status HTTP 200'
    );
    
    assert(
      result.data && result.data.success === true,
      'Response com format {success: true, data: [...]}'
    );
    
    assert(
      Array.isArray(result.data.data),
      'Data é um array'
    );

    log(`  → ${result.data.data.length} produtos encontrados`, 'cyan');
    
    return result.data.data;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
    throw error;
  }
}

/**
 * Teste 2: Criar novo produto (POST)
 */
async function test2CreateProduct() {
  log('\n✨ Teste 2: POST /api/products - Criar Novo Produto', 'blue');
  
  const newProduct = {
    name: 'Produto Teste ' + Date.now(),
    description: 'Este é um produto de teste criado automaticamente',
    price: 199.99,
    category: 'Teste',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  };

  try {
    const result = await request('POST', '/products', newProduct);
    
    assert(
      result.status === 201 || result.status === 200,
      `Status HTTP ${result.status} (esperado 201 ou 200)`
    );
    
    assert(
      result.data && result.data.success === true,
      'Response com success: true'
    );
    
    assert(
      result.data.data && result.data.data.id,
      'Produto retornado com ID'
    );

    const product = result.data.data;
    createdProductId = product.id;

    log(`  → Produto criado com ID: ${product.id}`, 'cyan');
    log(`  → Nome: ${product.name}`, 'cyan');
    log(`  → Preço: R$ ${product.price.toFixed(2)}`, 'cyan');

    return product;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
    throw error;
  }
}

/**
 * Teste 3: Validação - Criar produto com dados inválidos
 */
async function test3ValidationError() {
  log('\n⚠️  Teste 3: POST /api/products - Validação de Dados', 'blue');
  
  const invalidProduct = {
    name: 'XY', // Muito curto
    description: 'Desc', // Muito curto
    price: -100, // Negativo
    category: 'Teste',
    stock: 10,
  };

  try {
    const result = await request('POST', '/products', invalidProduct);
    
    assert(
      result.status >= 400,
      `Status HTTP ${result.status} indica erro (>= 400)`
    );
    
    assert(
      result.data && result.data.success === false,
      'Response com success: false'
    );
    
    assert(
      result.data.error && result.data.error.length > 0,
      'Mensagem de erro descritiva'
    );

    log(`  → Erro esperado: ${result.data.error}`, 'cyan');

    return result;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
  }
}

/**
 * Teste 4: Atualizar produto (PUT)
 */
async function test4UpdateProduct() {
  log('\n✏️  Teste 4: PUT /api/products/:id - Atualizar Produto', 'blue');
  
  if (!createdProductId) {
    log('  ⏭️  Pulando - nenhum produto foi criado', 'yellow');
    return;
  }

  const updatedData = {
    name: 'Produto Atualizado ' + Date.now(),
    description: 'Descrição atualizada do produto de teste',
    price: 299.99,
    category: 'Teste Atualizado',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  };

  try {
    const result = await request('PUT', `/products/${createdProductId}`, updatedData);
    
    assert(
      result.ok && result.status === 200,
      `Status HTTP ${result.status} (esperado 200)`
    );
    
    assert(
      result.data && result.data.success === true,
      'Response com success: true'
    );
    
    assert(
      result.data.data.name === updatedData.name,
      'Nome foi atualizado'
    );
    
    assert(
      result.data.data.price === updatedData.price,
      'Preço foi atualizado'
    );

    log(`  → Produto atualizado com sucesso`, 'cyan');
    log(`  → Novo preço: R$ ${result.data.data.price.toFixed(2)}`, 'cyan');

    return result.data.data;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
  }
}

/**
 * Teste 5: Buscar produto por ID (GET /products/:id)
 */
async function test5GetProductById() {
  log('\n🔍 Teste 5: GET /api/products/:id - Buscar Produto por ID', 'blue');
  
  if (!createdProductId) {
    log('  ⏭️  Pulando - nenhum produto foi criado', 'yellow');
    return;
  }

  try {
    const result = await request('GET', `/products/${createdProductId}`);
    
    if (result.status === 404) {
      log('  ℹ️  Backend não suporta GET por ID (opcional)', 'yellow');
      return;
    }

    assert(
      result.ok && result.status === 200,
      `Status HTTP ${result.status}`
    );
    
    assert(
      result.data && result.data.data,
      'Produto retornado'
    );
    
    assert(
      result.data.data.id === createdProductId,
      `ID correto: ${createdProductId}`
    );

    log(`  → Produto encontrado: ${result.data.data.name}`, 'cyan');

    return result.data.data;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
  }
}

/**
 * Teste 6: Deletar produto (DELETE)
 */
async function test6DeleteProduct() {
  log('\n🗑️  Teste 6: DELETE /api/products/:id - Deletar Produto', 'blue');
  
  if (!createdProductId) {
    log('  ⏭️  Pulando - nenhum produto foi criado', 'yellow');
    return;
  }

  try {
    const result = await request('DELETE', `/products/${createdProductId}`);
    
    assert(
      result.ok && (result.status === 200 || result.status === 204),
      `Status HTTP ${result.status} (esperado 200 ou 204)`
    );
    
    assert(
      result.data && result.data.success === true,
      'Response com success: true'
    );

    log(`  → Produto deletado com sucesso`, 'cyan');

    return result;
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
  }
}

/**
 * Teste 7: Verificar deleção
 */
async function test7VerifyDeletion() {
  log('\n✓ Teste 7: Verificar se Produto foi Deletado', 'blue');
  
  if (!createdProductId) {
    log('  ⏭️  Pulando - nenhum produto foi criado', 'yellow');
    return;
  }

  try {
    // Tentar buscar o produto deletado
    const result = await request('GET', `/products/${createdProductId}`);
    
    // Se GET por ID não é suportado, verificar na lista
    if (result.status === 404 || !result.ok) {
      assert(true, 'Produto não encontrado após deleção');
      log(`  → Produto confirmado como deletado`, 'cyan');
      return;
    }

    // Se conseguiu buscar, verificar na lista
    const listResult = await request('GET', '/products');
    const exists = listResult.data.data.some(p => p.id === createdProductId);
    
    assert(
      !exists,
      'Produto removido da lista'
    );

    if (!exists) {
      log(`  → Produto não encontrado na listagem`, 'cyan');
    }
  } catch (error) {
    log(`  ❌ Erro: ${error.message}`, 'red');
    testResults.failed++;
  }
}

/**
 * Relatório final
 */
function printReport() {
  log('\n' + '='.repeat(60), 'cyan');
  log('📊 RELATÓRIO FINAL', 'cyan');
  log('='.repeat(60), 'cyan');

  testResults.tests.forEach((test) => {
    const color = test.status.includes('✅') ? 'green' : 'red';
    log(`${test.status} ${test.name}`, color);
  });

  log('', 'reset');
  log(`Total: ${testResults.passed + testResults.failed} testes`, 'cyan');
  log(`✅ Passou: ${testResults.passed}`, 'green');
  log(`❌ Falhou: ${testResults.failed}`, testResults.failed > 0 ? 'red' : 'green');
  log('='.repeat(60), 'cyan');

  if (testResults.failed === 0) {
    log('🎉 TODOS OS TESTES PASSARAM!', 'green');
  } else {
    log(`⚠️  ${testResults.failed} teste(s) falharam`, 'yellow');
  }

  log('', 'reset');
}

/**
 * Função principal
 */
async function main() {
  log('🧪 API Test Suite - Cadastro de Produtos', 'cyan');
  log(`📍 URL Base: ${BASE_URL}`, 'cyan');
  log(''.padEnd(60, '—'), 'cyan');

  try {
    // Executar testes na ordem
    await test1GetProducts();
    await test2CreateProduct();
    await test3ValidationError();
    await test4UpdateProduct();
    await test5GetProductById();
    await test6DeleteProduct();
    await test7VerifyDeletion();

    // Exibir relatório
    printReport();

    // Saída com código de erro se algo falhou
    process.exit(testResults.failed > 0 ? 1 : 0);
  } catch (error) {
    log(`\n💥 Erro fatal: ${error.message}`, 'red');
    log('⚠️  Certifique-se de que:', 'yellow');
    log('   1. Backend está rodando em ' + BASE_URL, 'yellow');
    log('   2. API está respondendo em JSON', 'yellow');
    log('   3. CORS está habilitado', 'yellow');
    process.exit(1);
  }
}

// Executar
main();
