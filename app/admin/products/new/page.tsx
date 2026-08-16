import Link from 'next/link';
import { ProductForm } from '@/app/admin/products/ProductForm';
import { listCategoriesAdmin } from '@/lib/catalog-db';

export default async function NewProductPage() {
  const categories = await listCategoriesAdmin();

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-tenor text-3xl text-stone-900">New product</h1>
        <Link href="/admin/products" className="text-sm text-stone-500 hover:underline">
          Back
        </Link>
      </div>
      {categories.length === 0 ? (
        <p className="text-sm text-stone-500">
          Create a category first before adding products.
        </p>
      ) : (
        <ProductForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      )}
    </div>
  );
}
