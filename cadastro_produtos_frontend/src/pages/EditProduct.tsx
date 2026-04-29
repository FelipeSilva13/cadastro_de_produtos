import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ProductForm } from '../components/ProductForm';
import { Button } from '../components/ui/button';
import { useProductForm } from '../hooks/useProductForm';
import { useProducts } from '../contexts/ProductContext';
import type { Product, ProductFormData } from '../types/product';

export function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getProduct, fetchProductById } = useProducts();
  const [product, setProduct] = useState<Product | undefined>(() => (
    id ? getProduct(id) : undefined
  ));
  const [isLoadingProduct, setIsLoadingProduct] = useState(Boolean(id && !product));
  const [loadFailed, setLoadFailed] = useState(false);
  const { handleSubmit, isLoading } = useProductForm({
    onSuccess: () => {
      navigate('/');
    },
  });

  useEffect(() => {
    if (!id) {
      setLoadFailed(true);
      setIsLoadingProduct(false);
      return;
    }

    const existingProduct = getProduct(id);
    if (existingProduct) {
      setProduct(existingProduct);
      setLoadFailed(false);
      setIsLoadingProduct(false);
      return;
    }

    let isMounted = true;
    setIsLoadingProduct(true);
    setLoadFailed(false);

    fetchProductById(id)
      .then((loadedProduct) => {
        if (!isMounted) {
          return;
        }

        setProduct(loadedProduct);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setLoadFailed(true);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingProduct(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fetchProductById, getProduct, id]);

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <p className="text-lg font-semibold text-slate-900">Carregando produto...</p>
          <p className="mt-2 text-sm text-slate-600">Buscando os dados para edicao.</p>
        </div>
      </div>
    );
  }

  if (!product || loadFailed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Produto nao encontrado
          </h2>
          <Button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para lista
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ProductFormData) => {
    if (id) {
      await handleSubmit(data, id);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/')}
            disabled={isLoading}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="flex items-center gap-3">
            <Pencil className="w-8 h-8" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Editar Produto
              </h1>
              <p className="text-slate-300 mt-1">
                Atualize as informacoes do produto
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductForm
          defaultValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            imageUrl: product.imageUrl,
          }}
          onSubmit={onSubmit}
          submitLabel={isLoading ? 'Salvando...' : 'Salvar Alteracoes'}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
