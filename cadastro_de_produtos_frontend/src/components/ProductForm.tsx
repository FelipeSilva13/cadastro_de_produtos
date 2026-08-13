import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles } from 'lucide-react';
import type { ProductFormData } from '../types/product';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { apiPost } from '../api/api';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  submitLabel: string;
  onCancel: () => void;
}

const categories = [
  'Informática',
  'Periféricos',
  'Eletrônicos',
  'Móveis',
  'Acessórios',
  'Outros',
];

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    mode: 'onBlur',
    defaultValues: defaultValues || {
      numero: 0,
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: '',
    },
  });

  const selectedCategory = watch('category');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const gerarDescricao = async () => {
    const name = watch('name')?.trim();
    const category = watch('category')?.trim();
    const currentDescription = watch('description')?.trim();

    if (!name || !category) {
      alert('Informe o nome e a categoria do produto antes de gerar a descrição.');
      return;
    }

    const produto = {
      nome: name,
      categoria: category,
      descricao: currentDescription || `${name} ${category}`,
    };

    try {
      setIsGeneratingDescription(true);
      const response = await apiPost<{ descricao: string }>('/produtos/api/descricao', produto);

      setValue('description', response.descricao, { shouldValidate: true });
    } catch (error) {
      console.error('Erro ao gerar descrição com IA:', error);
      alert('Não foi possível gerar a descrição com IA no momento.');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <CardTitle className="text-slate-900">{submitLabel}</CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Preencha os campos abaixo para {submitLabel.toLowerCase()}
        </p>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="numero" className="text-slate-700 font-medium">Numero do Produto *</Label>
            <Input
              id="numero"
              type="number"
              min="1"
              {...register('numero', {
                valueAsNumber: true,
                required: 'Numero e obrigatorio',
                min: { value: 1, message: 'Informe um numero positivo' },
              })}
              placeholder="Ex: 1001"
              className="border-slate-300 bg-slate-50 focus:bg-white"
            />
            {errors.numero && <p className="text-sm text-red-600 font-medium">{errors.numero.message}</p>}
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">
              Nome do Produto *
            </Label>
            <Input
              id="name"
              {...register('name', { 
                required: 'Nome é obrigatório',
                minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
              })}
              placeholder="Ex: Notebook Dell Inspiron"
              className="border-slate-300 bg-slate-50 focus:bg-white"
            />
            {errors.name && (
              <p className="text-sm text-red-600 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="description" className="text-slate-700 font-medium">
                Descrição *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={gerarDescricao}
                disabled={isGeneratingDescription || isSubmitting}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Sparkles className="w-4 h-4" />
                {isGeneratingDescription ? 'Gerando...' : 'Descrição com IA'}
              </Button>
            </div>
            <Textarea
              id="description"
              {...register('description', { 
                required: 'Descrição é obrigatória',
                minLength: { value: 10, message: 'Descrição deve ter pelo menos 10 caracteres' }
              })}
              placeholder="Descreva as características e especificações do produto..."
              rows={4}
              className="border-slate-300 bg-slate-50 focus:bg-white resize-none"
            />
            {errors.description && (
              <p className="text-sm text-red-600 font-medium">{errors.description.message}</p>
            )}
          </div>

          {/* Preço e Estoque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-700 font-medium">
                Preço (R$) *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('price', {
                  required: 'Preço é obrigatório',
                  validate: (val) => parseFloat(val as any) >= 0 || 'Preço deve ser positivo',
                })}
                placeholder="0.00"
                className="border-slate-300 bg-slate-50 focus:bg-white"
              />
              {errors.price && (
                <p className="text-sm text-red-600 font-medium">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-slate-700 font-medium">
                Quantidade em Estoque *
              </Label>
              <Input
                id="stock"
                type="number"
                {...register('stock', {
                  required: 'Quantidade é obrigatória',
                  validate: (val) => parseInt(val as any) >= 0 || 'Quantidade deve ser positiva',
                })}
                placeholder="0"
                className="border-slate-300 bg-slate-50 focus:bg-white"
              />
              {errors.stock && (
                <p className="text-sm text-red-600 font-medium">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700 font-medium">
              Categoria *
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={(value: string) => setValue('category', value)}
            >
              <SelectTrigger className="border-slate-300 bg-slate-50 focus:bg-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register('category', { required: 'Categoria é obrigatória' })}
            />
            {errors.category && (
              <p className="text-sm text-red-600 font-medium">{errors.category.message}</p>
            )}
          </div>

          {/* URL da Imagem */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-slate-700 font-medium">
              URL da Imagem (opcional)
            </Label>
            <Input
              id="imageUrl"
              type="url"
              {...register('imageUrl')}
              placeholder="https://exemplo.com/imagem.jpg"
              className="border-slate-300 bg-slate-50 focus:bg-white"
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-600 font-medium">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label htmlFor="imageFile" className="text-slate-700 font-medium">
              Imagem do Produto (arquivo)
            </Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              {...register('imageFile')}
              className="border-slate-300 bg-slate-50 focus:bg-white"
            />
            <p className="text-sm text-slate-500">
              Você pode enviar uma imagem do seu computador. Se selecionar um arquivo, a URL será ignorada.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <Button 
              type="submit" 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 h-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : submitLabel}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 border-slate-300 hover:bg-slate-50 font-medium py-2 h-auto"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
