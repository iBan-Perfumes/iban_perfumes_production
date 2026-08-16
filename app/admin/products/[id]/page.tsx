import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/app/admin/products/ProductForm';
import { getProductAdmin, listCategoriesAdmin } from '@/lib/catalog-db';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductAdmin(id),
    listCategoriesAdmin(),
  ]);
  if (!product) notFound();

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-tenor text-3xl text-stone-900">Edit {product.name}</h1>
        <Link
          href={`/products/${product.slug}`}
          className="text-sm text-amber-800 hover:underline"
        >
          View on site
        </Link>
      </div>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          character: product.character,
          categoryId: product.categoryId,
          priceValue: product.priceValue,
          badge: product.badge,
          heroCopy: product.heroCopy,
          story: product.story,
          available: product.available,
          featured: product.featured,
          notePyramid: product.notePyramid,
          thumbnailImageId: product.thumbnailImageId,
          images: product.images,
        }}
      />
    </div>
  );
}
