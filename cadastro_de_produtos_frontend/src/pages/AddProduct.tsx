import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { ProductForm } from '../components/ProductForm';
import type { ProductFormData } from '../types/product';
import { useProductForm } from '../hooks/useProductForm';

export function AddProduct() {
  const navigate = useNavigate();
  const { handleSubmit, isLoading } = useProductForm({
    onSuccess: () => {
      navigate('/');
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    await handleSubmit(data);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
            <Plus className="w-8 h-8" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Adicionar Novo Produto
              </h1>
              <p className="text-slate-300 mt-1">
                Preencha os dados do produto abaixo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductForm
          onSubmit={onSubmit}
          submitLabel={isLoading ? 'Salvando...' : 'Adicionar Produto'}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
