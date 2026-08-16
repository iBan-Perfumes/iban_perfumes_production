import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '@/app/admin/actions';
import { listCategoriesAdmin } from '@/lib/catalog-db';

export default async function AdminCategoriesPage() {
  const rows = await listCategoriesAdmin();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
        <h1 className="font-tenor text-3xl text-stone-900">Categories</h1>
        <p className="mt-2 text-sm text-stone-500">
          Create fragrance families used on product pages and filters.
        </p>

        <form action={createCategoryAction} className="mt-6 flex flex-wrap gap-3">
          <input
            name="name"
            required
            placeholder="Category name"
            className="min-w-[220px] flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700"
          />
          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
          >
            Add category
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-stone-100">
                <td className="px-4 py-3">
                  <form action={updateCategoryAction} className="flex gap-2">
                    <input type="hidden" name="id" value={row.id} />
                    <input
                      name="name"
                      defaultValue={row.name}
                      className="w-full max-w-xs rounded border border-stone-200 px-2 py-1"
                    />
                    <button
                      type="submit"
                      className="text-xs font-medium text-amber-800 hover:underline"
                    >
                      Save
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-stone-500">{row.slug}</td>
                <td className="px-4 py-3">{row.products.length}</td>
                <td className="px-4 py-3">
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      className="text-xs font-medium text-red-600 hover:underline"
                      disabled={row.products.length > 0}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-stone-400">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
