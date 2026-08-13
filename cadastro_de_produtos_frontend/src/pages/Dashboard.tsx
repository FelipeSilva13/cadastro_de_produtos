import { AlertTriangle, CircleDollarSign, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../api/api';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/button';
import type { Customer, Order } from '../types/sales';
import type { Product } from '../types/product';

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]); const [customers, setCustomers] = useState<Customer[]>([]); const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { Promise.all([apiGet<Order[]>('/pedidos'), apiGet<Customer[]>('/clientes'), apiGet<Product[]>('/products')]).then(([o, c, p]) => { setOrders(o); setCustomers(c); setProducts(p); }).catch(() => undefined); }, []);
  const todaySales = useMemo(() => orders.filter((order) => order.status === 'PAGO' && order.dataPedido === new Date().toISOString().slice(0, 10)).reduce((sum, order) => sum + order.total, 0), [orders]);
  const stats = [{ label: 'Vendas Hoje', value: money(todaySales), icon: CircleDollarSign, color: 'bg-emerald-100 text-emerald-600' }, { label: 'Pedidos Pendentes', value: orders.filter((o) => o.status === 'PENDENTE_PAGAMENTO').length, icon: ShoppingCart, color: 'bg-amber-100 text-amber-600' }, { label: 'Total de Clientes', value: customers.length, icon: Users, color: 'bg-blue-100 text-blue-600' }, { label: 'Estoque Baixo', value: products.filter((p) => p.stock < 10).length, icon: AlertTriangle, color: 'bg-rose-100 text-rose-600' }];
  return <div className="min-h-screen bg-[#f8fafc]"><PageHeader title="Dashboard" subtitle="Visão geral do sistema" actionButton={<><Button asChild variant="outline"><Link to="/clientes">＋ Cliente</Link></Button><Button asChild><Link to="/vendas">＋ Pedido</Link></Button></>} /><main className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8"><div className="grid gap-5 md:grid-cols-2">{stats.map(({ label, value, icon: Icon, color }) => <section key={label} className="flex min-h-28 items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"><div><p className="text-base text-slate-500">{label}</p><p className="mt-1 text-3xl font-extrabold text-slate-950">{value}</p></div><span className={`grid h-12 w-12 place-items-center rounded-full ${color}`}><Icon className="h-6 w-6" /></span></section>)}</div><section className="mt-7 rounded-2xl border border-slate-200 bg-white p-7"><h2 className="font-bold text-slate-950">↗ Vendas — Últimos 7 Dias</h2><div className="mt-9 flex h-52 items-end gap-4 border-b border-dashed border-slate-200 pb-1">{Array.from({ length: 7 }).map((_, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-md bg-blue-600" style={{ height: `${Math.max(3, Math.min(100, orders.length * 14 + (index % 3) * 8))}%` }} /><span className="text-xs text-slate-500">{index + 6}/08</span></div>)}</div></section></main></div>;
}
