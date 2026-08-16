import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/app/admin/products/ProductForm';
import {
  PageHeader,
  secondaryButtonClassName,
} from '@/components/admin/ui';
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
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${product.name}`}
        description="Update product details, publishing, and gallery images."
        actions={
          <>
            <a
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClassName()}
            >
              View on site
            </a>
            <Link href="/admin/products" className={secondaryButtonClassName()}>
              Back
            </Link>
          </>
        }
      />
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          character: product.character,
          categoryIds:
            product.productCategories.length > 0
              ? product.productCategories.map((pc) => pc.categoryId)
              : [product.categoryId],
          priceValue: product.priceValue,
          badge: product.badge,
          heroCopy: product.heroCopy,
          story: product.story,
          available: product.available,
          featured: product.featured,
          notePyramid: product.notePyramid,
          thumbnailImageId: product.thumbnailImageId,
          images: product.images,
          variants: [...product.variants].sort(
            (a, b) => a.sortOrder - b.sortOrder
          ),
        }}
      />
    </div>
  );
}
