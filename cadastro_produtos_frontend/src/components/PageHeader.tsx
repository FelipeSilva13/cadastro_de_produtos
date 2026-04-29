import { Package } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actionButton }: PageHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-[0_10px_35px_-28px_rgba(15,23,42,0.45)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <Package className="h-7 w-7 text-slate-900" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base font-medium text-slate-600 sm:text-[1.35rem]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actionButton && (
          <div className="flex justify-start lg:justify-end">
            {actionButton}
          </div>
        )}
      </div>
    </header>
  );
}
