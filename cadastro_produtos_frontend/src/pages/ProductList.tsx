import { Link } from 'react-router-dom';
import { Plus, Search, Package, AlertCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function ProductList() {
  const { products, loading, error, deleteProduct, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch {
      // O contexto já trata o erro.
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-transparent">
      <PageHeader
        title="Cadastro de Produtos"
        subtitle="Gerencie seu catálogo de produtos"
        actionButton={
          <Button
            asChild
            size="lg"
            disabled={loading}
            className="h-14 rounded-2xl bg-slate-950 px-6 text-base font-bold text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <Link to="/add">
              <Plus className="mr-2 h-5 w-5" />
              Novo Produto
            </Link>
          </Button>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {error && (
          <div className="mb-6 flex items-start gap-4 rounded-3xl border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Erro ao carregar produtos</h3>
              <p className="mt-1 text-sm text-red-800">{error}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchProducts}
              className="ml-auto flex-shrink-0 rounded-xl"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Tentar Novamente
            </Button>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}
          </div>
        )}

        {!loading && (
          <>
            <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_45px_-36px_rgba(15,23,42,0.45)] sm:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-14 text-base shadow-none placeholder:text-slate-400"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-950 shadow-none">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.45)]">
                <p className="text-sm font-medium text-slate-600">Total de Produtos</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-slate-950">
                  {products.length}
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.45)]">
                <p className="text-sm font-medium text-slate-600">Produtos Exibidos</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-blue-600">
                  {filteredProducts.length}
                </p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.45)]">
                <p className="text-sm font-medium text-slate-600">Categorias</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-emerald-500">
                  {categories.length}
                </p>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[28px] border border-slate-200 bg-white p-12 text-center shadow-[0_22px_45px_-36px_rgba(15,23,42,0.45)]">
                <Package className="mx-auto mb-4 h-16 w-16 text-slate-300" />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Nenhum produto encontrado
                </h3>
                <p className="mb-6 text-slate-600">
                  {searchTerm || categoryFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece adicionando seu primeiro produto'}
                </p>
                {!searchTerm && categoryFilter === 'all' && (
                  <Button asChild className="rounded-2xl bg-slate-950 hover:bg-slate-800">
                    <Link to="/add">
                      <Plus className="mr-2 h-5 w-5" />
                      Adicionar Produto
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
