import Image from 'next/image';
import Link from 'next/link';
import {
  deleteProductAction,
  toggleProductFlagAction,
} from '@/app/admin/actions';
import { listProductsAdmin } from '@/lib/catalog-db';

export default async function AdminProductsPage() {
  const rows = await listProductsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
        <div>
          <h1 className="font-tenor text-3xl text-stone-900">Products</h1>
          <p className="mt-2 text-sm text-stone-500">
            Create and edit fragrances, galleries, and thumbnails.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Flags</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const thumb =
                row.images.find((i) => i.id === row.thumbnailImageId) ??
                row.images[0];
              return (
                <tr key={row.id} className="border-b border-stone-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-100">
                        {thumb && (
                          <Image
                            src={thumb.url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{row.name}</p>
                        <p className="text-xs text-stone-400">/{row.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {row.category.name}
                  </td>
                  <td className="px-4 py-3">₹{row.priceValue}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <form action={toggleProductFlagAction}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="field" value="available" />
                        <button
                          type="submit"
                          className="text-xs text-stone-600 hover:underline"
                        >
                          {row.available ? 'Available' : 'Hidden'}
                        </button>
                      </form>
                      <form action={toggleProductFlagAction}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="field" value="featured" />
                        <button
                          type="submit"
                          className="text-xs text-stone-600 hover:underline"
                        >
                          {row.featured ? 'Featured' : 'Not featured'}
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${row.id}`}
                        className="text-xs font-medium text-amber-800 hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={row.id} />
                        <button
                          type="submit"
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-stone-400">
                  No products yet. Add your first fragrance.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
