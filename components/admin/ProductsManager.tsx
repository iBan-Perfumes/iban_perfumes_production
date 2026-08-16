'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, useTransition } from 'react';
import {
  ExternalLink,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react';
import {
  deleteProductAction,
  toggleProductFlagAction,
} from '@/app/admin/actions';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
  EmptyState,
  PageHeader,
  StatusBadge,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/admin/ui';
import { formatRelativeTime } from '@/lib/format-relative';

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  priceValue: number;
  available: boolean;
  featured: boolean;
  updatedAt: string;
  categoryName: string;
  categoryNames: string[];
  thumbUrl: string | null;
};

export function ProductsManager({
  products,
  initialQuery = '',
}: {
  products: AdminProductRow[];
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<'all' | 'available' | 'hidden'>('all');
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!menuId) return;
    const onDoc = () => setMenuId(null);
    window.addEventListener('click', onDoc);
    return () => window.removeEventListener('click', onDoc);
  }, [menuId]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.flatMap((p) => p.categoryNames ?? [p.categoryName]))
      ).sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const names = p.categoryNames?.length ? p.categoryNames : [p.categoryName];
      if (category !== 'all' && !names.includes(category)) return false;
      if (status === 'available' && !p.available) return false;
      if (status === 'hidden' && p.available) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query)
      );
    });
  }, [products, q, category, status]);

  const clearFilters = () => {
    setQ('');
    setCategory('all');
    setStatus('all');
  };

  const hasFilters = Boolean(q.trim()) || category !== 'all' || status !== 'all';

  const runToggle = (id: string, field: 'available' | 'featured') => {
    const fd = new FormData();
    fd.set('id', id);
    fd.set('field', field);
    startTransition(async () => {
      await toggleProductFlagAction(fd);
      setMenuId(null);
    });
  };

  const runDelete = () => {
    if (!deleteId) return;
    const fd = new FormData();
    fd.set('id', deleteId);
    startTransition(async () => {
      await deleteProductAction(fd);
      setDeleteId(null);
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog and product images."
        actions={
          <Link href="/admin/products/new" className={primaryButtonClassName()}>
            <Plus className="h-4 w-4" aria-hidden />
            Add Product
          </Link>
        }
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              aria-hidden
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-700 focus:bg-white"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700"
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as 'all' | 'available' | 'hidden')
            }
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="available">Published</option>
            <option value="hidden">Hidden</option>
          </select>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className={secondaryButtonClassName()}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={products.length === 0 ? 'No products yet' : 'No products found'}
          description={
            products.length === 0
              ? 'Create your first fragrance to start building the catalog.'
              : 'Try adjusting your search or filters, or create a new product.'
          }
          action={
            <Link href="/admin/products/new" className={primaryButtonClassName()}>
              <Plus className="h-4 w-4" aria-hidden />
              Add Product
            </Link>
          }
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-stone-100 bg-stone-50/80 text-[11px] uppercase tracking-[0.12em] text-stone-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Price</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Updated</th>
                    <th className="px-5 py-3 font-medium">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-stone-100">
                            {row.thumbUrl && (
                              <Image
                                src={row.thumbUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="44px"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 font-medium text-stone-900">
                              <span className="truncate">{row.name}</span>
                              {row.featured && (
                                <Star
                                  className="h-3.5 w-3.5 shrink-0 fill-amber-500 text-amber-500"
                                  aria-label="Featured"
                                />
                              )}
                            </p>
                            <p className="truncate text-xs text-stone-400">
                              /{row.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-stone-600">
                        {(row.categoryNames?.length
                          ? row.categoryNames
                          : [row.categoryName]
                        ).join(', ')}
                      </td>
                      <td className="px-5 py-3 text-stone-700">
                        ₹{row.priceValue}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge
                          tone={row.available ? 'success' : 'neutral'}
                        >
                          {row.available ? 'Published' : 'Hidden'}
                        </StatusBadge>
                      </td>
                      <td className="px-5 py-3 text-stone-500">
                        {formatRelativeTime(row.updatedAt)}
                      </td>
                      <td className="relative px-5 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                          aria-label={`Actions for ${row.name}`}
                          aria-expanded={menuId === row.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuId((id) => (id === row.id ? null : row.id));
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        {menuId === row.id && (
                          <div
                            role="menu"
                            className="absolute right-5 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 text-left shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link
                              href={`/admin/products/${row.id}`}
                              role="menuitem"
                              className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                              onClick={() => setMenuId(null)}
                            >
                              Edit
                            </Link>
                            <a
                              href={`/products/${row.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              role="menuitem"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                              onClick={() => setMenuId(null)}
                            >
                              View
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <button
                              type="button"
                              role="menuitem"
                              className="block w-full px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
                              onClick={() => runToggle(row.id, 'available')}
                            >
                              {row.available ? 'Mark hidden' : 'Publish'}
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              className="block w-full px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
                              onClick={() => runToggle(row.id, 'featured')}
                            >
                              {row.featured
                                ? 'Remove featured'
                                : 'Mark featured'}
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setMenuId(null);
                                setDeleteId(row.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {filtered.map((row) => (
              <article
                key={row.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    {row.thumbUrl && (
                      <Image
                        src={row.thumbUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-stone-900">
                          {row.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {(row.categoryNames?.length
                            ? row.categoryNames
                            : [row.categoryName]
                          ).join(', ')}{' '}
                          · ₹{row.priceValue}
                        </p>
                      </div>
                      <StatusBadge
                        tone={row.available ? 'success' : 'neutral'}
                      >
                        {row.available ? 'Live' : 'Hidden'}
                      </StatusBadge>
                    </div>
                    <p className="mt-2 text-xs text-stone-400">
                      Updated {formatRelativeTime(row.updatedAt)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/products/${row.id}`}
                        className={secondaryButtonClassName('!px-3 !py-1.5 text-xs')}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete product?"
        description="This action cannot be undone. The product and its images will be permanently removed."
        confirmLabel="Delete"
        pending={pending}
        onCancel={() => setDeleteId(null)}
        onConfirm={runDelete}
      />
    </div>
  );
}
