'use client';

import { useState, useTransition } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '@/app/admin/actions';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
  EmptyState,
  PageHeader,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/admin/ui';

export type AdminCategoryRow = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export function CategoriesManager({
  categories,
}: {
  categories: AdminCategoryRow[];
}) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const runDelete = () => {
    if (!deleteId) return;
    const fd = new FormData();
    fd.set('id', deleteId);
    startTransition(async () => {
      await deleteCategoryAction(fd);
      setDeleteId(null);
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage your product categories."
      />

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-stone-900">Add category</h2>
        <p className="mt-1 text-xs text-stone-500">
          Names must be unique. Slugs are generated automatically.
        </p>
        <form action={createCategoryAction} className="mt-4 flex flex-wrap gap-2">
          <input
            name="name"
            required
            placeholder="Category name"
            className="min-w-[220px] flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-700"
          />
          <button type="submit" className={primaryButtonClassName()}>
            <Plus className="h-4 w-4" aria-hidden />
            Add Category
          </button>
        </form>
      </section>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create your first category so you can assign products."
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-100 bg-stone-50/80 text-[11px] uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Products</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-stone-100 last:border-0"
                  >
                    <td className="px-5 py-3">
                      <form
                        action={updateCategoryAction}
                        className="flex max-w-md items-center gap-2"
                      >
                        <input type="hidden" name="id" value={row.id} />
                        <input
                          name="name"
                          defaultValue={row.name}
                          className="w-full rounded-lg border border-stone-200 px-2.5 py-1.5 text-sm outline-none focus:border-amber-700"
                          aria-label={`Rename ${row.name}`}
                        />
                        <button
                          type="submit"
                          className="shrink-0 text-xs font-medium text-amber-800 hover:underline"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-3 text-stone-500">{row.slug}</td>
                    <td className="px-5 py-3 text-stone-700">
                      {row.productCount}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        type="button"
                        disabled={row.productCount > 0}
                        title={
                          row.productCount > 0
                            ? 'Remove or reassign products before deleting'
                            : 'Delete category'
                        }
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:text-stone-300 disabled:no-underline"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {categories.map((row) => (
              <article
                key={row.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <form action={updateCategoryAction} className="space-y-3">
                  <input type="hidden" name="id" value={row.id} />
                  <label className="block text-sm">
                    <span className="text-stone-500">Name</span>
                    <input
                      name="name"
                      defaultValue={row.name}
                      className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-700"
                    />
                  </label>
                  <p className="text-xs text-stone-400">
                    /{row.slug} · {row.productCount} product
                    {row.productCount === 1 ? '' : 's'}
                  </p>
                  <div className="flex gap-2">
                    <button type="submit" className={secondaryButtonClassName()}>
                      Save
                    </button>
                    <button
                      type="button"
                      disabled={row.productCount > 0}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:text-stone-300"
                      onClick={() => setDeleteId(row.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </form>
              </article>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete category?"
        description="This action cannot be undone. Categories with products cannot be deleted."
        confirmLabel="Delete"
        pending={pending}
        onCancel={() => setDeleteId(null)}
        onConfirm={runDelete}
      />
    </div>
  );
}
