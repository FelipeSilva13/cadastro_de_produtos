import { Link } from 'react-router-dom';
import { Pencil, Trash2, Package } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../types/product';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => Promise<void>;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Esgotado', variant: 'destructive' as const };
    if (stock < 10) return { label: 'Estoque Baixo', variant: 'outline' as const };
    return { label: 'Disponível', variant: 'default' as const };
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(String(product.id));
    } finally {
      setIsDeleting(false);
    }
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <Card className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_35px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-30px_rgba(15,23,42,0.35)]">
      <CardHeader className="relative p-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">
            <Package className="h-16 w-16 text-slate-400" />
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <Badge
            variant={stockStatus.variant}
            className="rounded-full border-0 bg-slate-950 px-4 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            {stockStatus.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-2xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950">
            {product.name}
          </h3>
          <p className="line-clamp-2 min-h-[3.5rem] text-base leading-7 text-slate-600">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            {product.category}
          </span>
          <span className="text-2xl font-extrabold tracking-[-0.04em] text-emerald-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="text-sm text-slate-500">
          Estoque:{' '}
          <span className="font-semibold text-slate-700">{product.stock} unidades</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-1 gap-3 p-6 pt-0 sm:grid-cols-2 sm:pt-0">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-14 w-full rounded-2xl border-slate-300 bg-white text-base font-semibold text-slate-950 hover:bg-slate-50"
          disabled={isDeleting}
        >
          <Link to={`/edit/${product.id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="lg"
              className="h-14 w-full rounded-2xl bg-rose-600 text-base font-semibold hover:bg-rose-700"
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o produto <strong>"{product.name}"</strong>?
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
