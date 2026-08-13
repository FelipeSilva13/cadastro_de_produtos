import { Boxes, LayoutDashboard, Menu, Package, ShoppingCart, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PageHeaderProps { title: string; subtitle?: string; actionButton?: React.ReactNode; }

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/', label: 'Produtos', icon: Package },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/pedidos', label: 'Pedidos', icon: ShoppingCart },
];

export function PageHeader({ title, subtitle, actionButton }: PageHeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <>
    <header className="h-[74px] border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-5 sm:px-8">
        <button aria-label="Abrir menu" onClick={() => setOpen(true)} className="rounded-xl p-3 text-slate-800 hover:bg-slate-100"><Menu className="h-5 w-5" /></button>
        <div className="flex items-center gap-2 font-bold text-slate-950"><span className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white"><Boxes className="h-4 w-4" /></span><span className="text-xl">SysVendas</span></div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 bg-slate-950/20" onClick={() => setOpen(false)}><aside className="h-full w-[305px] bg-white shadow-xl" onClick={(event) => event.stopPropagation()}><div className="flex h-[88px] items-center justify-between border-b px-5"><div className="flex items-center gap-3 font-bold text-slate-950"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><Boxes className="h-5 w-5" /></span><span className="text-xl">SysVendas</span></div><button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button></div><nav className="space-y-1 p-5">{links.map(({ to, label, icon: Icon }) => <Link key={to} onClick={() => setOpen(false)} to={to} className={`flex items-center gap-4 rounded-xl px-4 py-3 font-semibold ${location.pathname === to ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}><Icon className="h-5 w-5" />{label}</Link>)}</nav><p className="absolute bottom-5 px-5 text-sm text-slate-400">SysVendas v1.0</p></aside></div>}
    <section className="bg-[#f8fafc]"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between"><div><h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-[32px]">{title}</h1>{subtitle && <p className="mt-1 text-base text-slate-500">{subtitle}</p>}</div>{actionButton && <div className="flex gap-3">{actionButton}</div>}</div></section>
  </>;
}
