import Link from 'next/link';
import { getAdminStats } from '@/lib/catalog-db';

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
      <h1 className="font-tenor text-3xl text-stone-900">Dashboard</h1>
      <p className="mt-2 text-sm text-stone-500">
        Manage your catalog, categories, and product imagery.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Products', value: stats.products, href: '/admin/products' },
          {
            label: 'Categories',
            value: stats.categories,
            href: '/admin/categories',
          },
          {
            label: 'Available',
            value: stats.available,
            href: '/admin/products',
          },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-stone-200 bg-stone-50 p-5 transition-colors hover:border-amber-300"
          >
            <p className="text-xs uppercase tracking-wider text-stone-500">
              {card.label}
            </p>
            <p className="mt-2 font-tenor text-3xl text-stone-900">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
        >
          Add product
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Manage categories
        </Link>
      </div>
    </div>
  );
}
