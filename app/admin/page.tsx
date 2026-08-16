import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  FolderTree,
  Package,
  PackageCheck,
  Plus,
  Tags,
} from 'lucide-react';
import {
  PageHeader,
  StatCard,
  StatusBadge,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/components/admin/ui';
import { getAdminStats, listProductsAdmin } from '@/lib/catalog-db';
import { formatRelativeTime } from '@/lib/format-relative';

export default async function AdminDashboardPage() {
  const [stats, products] = await Promise.all([
    getAdminStats(),
    listProductsAdmin(),
  ]);
  const recent = products.slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Manage your catalog, products, categories, and inventory."
        actions={
          <>
            <Link href="/admin/products/new" className={primaryButtonClassName()}>
              <Plus className="h-4 w-4" aria-hidden />
              Add Product
            </Link>
            <Link href="/admin/categories" className={secondaryButtonClassName()}>
              Manage Categories
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Products"
          value={stats.products}
          hint="Total products"
          href="/admin/products"
          icon={<Package className="h-5 w-5" aria-hidden />}
        />
        <StatCard
          label="Categories"
          value={stats.categories}
          hint="Active categories"
          href="/admin/categories"
          icon={<Tags className="h-5 w-5" aria-hidden />}
        />
        <StatCard
          label="Available"
          value={stats.available}
          hint="Published products"
          href="/admin/products"
          icon={<PackageCheck className="h-5 w-5" aria-hidden />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">
                Recent Products
              </h2>
              <p className="mt-0.5 text-xs text-stone-500">
                Latest updates from your catalog
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-medium text-amber-800 hover:underline"
            >
              View all
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-stone-400">
              No products yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-stone-100 bg-stone-50/80 text-[11px] uppercase tracking-[0.12em] text-stone-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Updated</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((row) => {
                    const thumb =
                      row.images.find((i) => i.id === row.thumbnailImageId) ??
                      row.images[0];
                    return (
                      <tr
                        key={row.id}
                        className="border-b border-stone-100 last:border-0"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-stone-100">
                              {thumb && (
                                <Image
                                  src={thumb.url}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-stone-900">
                                {row.name}
                              </p>
                              <p className="truncate text-xs text-stone-400">
                                /{row.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-stone-600">
                          {row.productCategories.length > 0
                            ? row.productCategories
                                .map((pc) => pc.category.name)
                                .join(', ')
                            : row.category.name}
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
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/products/${row.id}`}
                            className="text-xs font-medium text-amber-800 hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-900">Quick Actions</h2>
          <p className="mt-1 text-xs text-stone-500">
            Jump to common admin tasks
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50/50"
            >
              <Plus className="h-4 w-4 text-amber-800" aria-hidden />
              Add Product
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50/50"
            >
              <Package className="h-4 w-4 text-amber-800" aria-hidden />
              Manage Products
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50/50"
            >
              <FolderTree className="h-4 w-4 text-amber-800" aria-hidden />
              Manage Categories
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50/50"
            >
              <ExternalLink className="h-4 w-4 text-amber-800" aria-hidden />
              View Storefront
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
