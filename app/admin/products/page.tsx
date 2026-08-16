import { ProductsManager } from '@/components/admin/ProductsManager';
import { listProductsAdmin } from '@/lib/catalog-db';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const rows = await listProductsAdmin();
  const products = rows.map((row) => {
    const thumb =
      row.images.find((i) => i.id === row.thumbnailImageId) ?? row.images[0];
    const categoryNames =
      row.productCategories.length > 0
        ? row.productCategories.map((pc) => pc.category.name)
        : [row.category.name];
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      priceValue: row.priceValue,
      available: row.available,
      featured: row.featured,
      updatedAt: row.updatedAt.toISOString(),
      categoryName: categoryNames[0] ?? row.category.name,
      categoryNames,
      thumbUrl: thumb?.url ?? null,
    };
  });

  return (
    <ProductsManager products={products} initialQuery={params.q ?? ''} />
  );
}
