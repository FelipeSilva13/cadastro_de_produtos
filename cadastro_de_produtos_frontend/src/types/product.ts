export interface Product {
  id: number | string;
  numero: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  numero: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  imageFile?: FileList | File | null;
}
