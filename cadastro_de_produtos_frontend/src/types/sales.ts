export interface Customer {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}

export interface CartItem {
  productId: number | string;
  nome: string;
  precoUnitario: number;
  quantidade: number;
}

export type PaymentMethod = 'CARTAO' | 'DINHEIRO' | 'PIX';

export type OrderStatus = 'PENDENTE_PAGAMENTO' | 'PAGO' | 'CANCELADO';

export interface OrderItem {
  id: number;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Order {
  id: number;
  clienteId: number;
  clienteNome: string;
  dataPedido: string;
  total: number;
  desconto: number;
  status: OrderStatus;
  itens: OrderItem[];
}
