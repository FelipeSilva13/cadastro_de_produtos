import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { ApiError, apiDelete, apiGet, apiPost, apiPut } from '../services/api';
import type { Product, ProductFormData } from '../types/product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: ProductFormData) => Promise<Product>;
  updateProduct: (id: string, product: ProductFormData) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  fetchProductById: (id: string) => Promise<Product>;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiGet<Product[]>('/products');
      setProducts(data);
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Erro ao buscar produtos';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (productData: ProductFormData) => {
    try {
      const newProduct = await apiPost<Product>('/products', productData);
      setError(null);
      setProducts((prev) => [...prev, newProduct]);
      toast.success('Produto adicionado com sucesso!');
      return newProduct;
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Erro ao adicionar produto';
      setError(message);
      toast.error(message);
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productData: ProductFormData) => {
    try {
      const updatedProduct = await apiPut<Product>(`/products/${id}`, productData);
      setError(null);
      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === String(id) ? updatedProduct : product
        )
      );
      toast.success('Produto atualizado com sucesso!');
      return updatedProduct;
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Erro ao atualizar produto';
      setError(message);
      toast.error(message);
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await apiDelete<void>(`/products/${id}`);
      setError(null);
      setProducts((prev) => prev.filter((product) => String(product.id) !== String(id)));
      toast.success('Produto excluido com sucesso!');
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Erro ao excluir produto';
      setError(message);
      toast.error(message);
      throw err;
    }
  }, []);

  const getProduct = useCallback((id: string | number) => {
    return products.find((product) => String(product.id) === String(id));
  }, [products]);

  const fetchProductById = useCallback(async (id: string) => {
    const existingProduct = products.find((product) => String(product.id) === String(id));

    if (existingProduct) {
      return existingProduct;
    }

    try {
      const product = await apiGet<Product>(`/products/${id}`);
      setError(null);
      setProducts((prev) => {
        const alreadyExists = prev.some((item) => String(item.id) === String(product.id));

        if (alreadyExists) {
          return prev.map((item) =>
            String(item.id) === String(product.id) ? product : item
          );
        }

        return [...prev, product];
      });
      return product;
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : 'Erro ao buscar produto';
      setError(message);
      throw err;
    }
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        fetchProductById,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
}
