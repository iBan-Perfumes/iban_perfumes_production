import Link from 'next/link';
import { ProductForm } from '@/app/admin/products/ProductForm';
import { PageHeader, secondaryButtonClassName } from '@/components/admin/ui';
import { listCategoriesAdmin } from '@/lib/catalog-db';

export default async function NewProductPage() {
  const categories = await listCategoriesAdmin();

  return (
    <div className="space-y-6">
      <PageHeader
        title="New product"
        description="Create a fragrance with gallery images and storefront details."
        actions={
          <Link href="/admin/products" className={secondaryButtonClassName()}>
            Back
          </Link>
        }
      />
      {categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-stone-500">
            Create a category first before adding products.
          </p>
          <Link
            href="/admin/categories"
            className={`${secondaryButtonClassName()} mt-4`}
          >
            Manage categories
          </Link>
        </div>
      ) : (
        <ProductForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      )}
    </div>
  );
}
