import { CategoriesManager } from '@/components/admin/CategoriesManager';
import { listCategoriesAdmin } from '@/lib/catalog-db';

export default async function AdminCategoriesPage() {
  const rows = await listCategoriesAdmin();
  const categories = rows.map((row) => {
    const ids = new Set<string>([
      ...row.products.map((p) => p.id),
      ...row.productCategories.map((pc) => pc.productId),
    ]);
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      productCount: ids.size,
    };
  });

  return <CategoriesManager categories={categories} />;
}
