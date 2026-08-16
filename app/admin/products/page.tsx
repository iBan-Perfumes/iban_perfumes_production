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
    const variants = [...row.variants].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    const first = variants[0];
    const displayPrice = first
      ? first.offerPrice != null && first.offerPrice > 0
        ? first.offerPrice
        : first.mrp
      : row.priceValue;
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      priceValue: displayPrice,
      variantCount: variants.length,
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
