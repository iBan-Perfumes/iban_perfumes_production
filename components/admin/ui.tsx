import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-tenor text-2xl tracking-tight text-stone-900 sm:text-[1.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-stone-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
  icon,
}: {
  label: string;
  value: number | string;
  hint: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
            {label}
          </p>
          <p className="mt-2 font-tenor text-3xl text-stone-900">{value}</p>
          <p className="mt-1 text-xs text-stone-400">{hint}</p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800 transition-colors group-hover:bg-amber-100">
          {icon}
        </span>
      </div>
    </Link>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white px-6 py-16 text-center">
      <h2 className="font-tenor text-xl text-stone-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-stone-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function StatusBadge({
  tone,
  children,
}: {
  tone: 'success' | 'neutral' | 'warning';
  children: ReactNode;
}) {
  const styles =
    tone === 'success'
      ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
      : tone === 'warning'
        ? 'bg-amber-50 text-amber-900 ring-amber-200'
        : 'bg-stone-100 text-stone-600 ring-stone-200';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${styles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === 'success'
            ? 'bg-emerald-500'
            : tone === 'warning'
              ? 'bg-amber-500'
              : 'bg-stone-400'
        }`}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function AdminCard({
  title,
  description,
  children,
  className = '',
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {(title || description) && (
        <div className="mb-5 border-b border-stone-100 pb-4">
          {title && (
            <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-xs text-stone-500">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function primaryButtonClassName(extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-lg bg-amber-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60 ${extra}`;
}

export function secondaryButtonClassName(extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 ${extra}`;
}
