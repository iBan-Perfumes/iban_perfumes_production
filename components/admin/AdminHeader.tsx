'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Menu,
  Search,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

function breadcrumbFor(pathname: string) {
  if (pathname === '/admin') return [{ label: 'Dashboard', href: '/admin' }];
  if (pathname.startsWith('/admin/products/new')) {
    return [
      { label: 'Products', href: '/admin/products' },
      { label: 'New', href: '/admin/products/new' },
    ];
  }
  if (pathname.match(/^\/admin\/products\/[^/]+$/)) {
    return [
      { label: 'Products', href: '/admin/products' },
      { label: 'Edit', href: pathname },
    ];
  }
  if (pathname.startsWith('/admin/products')) {
    return [{ label: 'Products', href: '/admin/products' }];
  }
  if (pathname.startsWith('/admin/categories')) {
    return [{ label: 'Categories', href: '/admin/categories' }];
  }
  return [{ label: 'Admin', href: '/admin' }];
}

export function AdminHeader({
  adminEmail,
  onMenuClick,
  initialQuery = '',
}: {
  adminEmail: string;
  onMenuClick: () => void;
  initialQuery?: string;
}) {
  const pathname = usePathname() ?? '/admin';
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const crumbs = breadcrumbFor(pathname);
  const initial = adminEmail.trim().charAt(0).toUpperCase() || 'A';

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1 text-sm md:flex">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1">
              {i > 0 && <span className="text-stone-300">/</span>}
              <Link
                href={c.href}
                className={
                  i === crumbs.length - 1
                    ? 'truncate font-medium text-stone-900'
                    : 'truncate text-stone-500 hover:text-stone-800'
                }
                aria-current={i === crumbs.length - 1 ? 'page' : undefined}
              >
                {c.label}
              </Link>
            </span>
          ))}
        </nav>

        <form
          className="mx-auto hidden w-full max-w-md md:block"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            router.push(q ? `/admin/products?q=${encodeURIComponent(q)}` : '/admin/products');
          }}
        >
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-700 focus:bg-white"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            View Storefront
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-2 py-1.5 text-sm hover:bg-stone-50"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-800 text-xs font-semibold text-white">
                {initial}
              </span>
              <span className="hidden max-w-[9rem] truncate text-stone-700 sm:inline">
                {adminEmail}
              </span>
              <ChevronDown className="h-4 w-4 text-stone-400" aria-hidden />
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
              >
                <div className="border-b border-stone-100 px-3 py-2">
                  <p className="truncate text-sm font-medium text-stone-900">
                    {adminEmail}
                  </p>
                  <p className="text-xs text-stone-400">Administrator</p>
                </div>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    role="menuitem"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-stone-600 hover:bg-stone-50"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    Log out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
