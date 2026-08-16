import type { CatalogProduct, CatalogSort } from '@/lib/catalog-types';

export function filterAndSortProducts(
  products: CatalogProduct[],
  options: {
    category?: string | 'All';
    price?: string | 'All';
    sort?: CatalogSort;
  }
): CatalogProduct[] {
  let list = products.filter((p) => p.available);

  if (options.category && options.category !== 'All') {
    list = list.filter((p) => p.category === options.category);
  }
  if (options.price && options.price !== 'All') {
    list = list.filter((p) => p.price === options.price);
  }

  const sort = options.sort ?? 'featured';
  switch (sort) {
    case 'newest':
      return [...list].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'price-asc':
      return [...list].sort((a, b) => a.priceValue - b.priceValue);
    case 'price-desc':
      return [...list].sort((a, b) => b.priceValue - a.priceValue);
    case 'name-asc':
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    case 'featured':
    default:
      return [...list].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
  }
}
