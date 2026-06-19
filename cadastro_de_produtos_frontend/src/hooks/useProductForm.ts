import { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import type { Product, ProductFormData } from '../types/product';

interface UseProductFormOptions {
  onSuccess?: (product: Product) => void;
  onError?: (error: Error) => void;
}

export function useProductForm(options?: UseProductFormOptions) {
  const { addProduct, updateProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    data: ProductFormData,
    productId?: string
  ): Promise<Product | null> => {
    setIsLoading(true);
    try {
      let result: Product;

      if (productId) {
        result = await updateProduct(productId, data);
      } else {
        result = await addProduct(data);
      }

      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Erro desconhecido');
      options?.onError?.(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
}
