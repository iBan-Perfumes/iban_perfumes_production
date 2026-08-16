'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  Package,
  Tags,
  X,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

const nav = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    group: 'Catalog',
    items: [
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/categories', label: 'Categories', icon: Tags },
    ],
  },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname() ?? '/admin';

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? 'bg-amber-50 font-medium text-amber-900 ring-1 ring-inset ring-amber-200'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`;

  const navBody = (
    <>
      <div className="flex items-center justify-between px-3 py-4 lg:px-4">
        <Link href="/admin" className="min-w-0" onClick={onClose}>
          <p className="font-tenor text-lg tracking-wide text-stone-900">i-BAN</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400">
            Admin
          </p>
        </Link>
        <button
          type="button"
          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 lg:hidden"
          aria-label="Close navigation"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-6 px-3 pb-4 lg:px-4">
        {nav.map((entry) => {
          if ('group' in entry) {
            return (
              <div key={entry.group}>
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                  {entry.group}
                </p>
                <div className="flex flex-col gap-1">
                  {entry.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={linkClass(active)}
                        aria-current={active ? 'page' : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const Icon = entry.icon;
          const active = isActive(pathname, entry.href, entry.exact);
          return (
            <Link
              key={entry.href}
              href={entry.href}
              onClick={onClose}
              className={linkClass(active)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {entry.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-200 p-3 lg:p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-stone-200 bg-white lg:sticky lg:top-0 lg:flex">
        {navBody}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/40"
            aria-label="Close navigation overlay"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(18rem,88vw)] flex-col bg-white shadow-xl">
            {navBody}
          </aside>
        </div>
      )}
    </>
  );
}
