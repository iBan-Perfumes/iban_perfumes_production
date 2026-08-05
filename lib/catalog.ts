export type FragranceCategory =
  | 'Fresh Fruity Musky'
  | 'Fresh Floral'
  | 'Fruity Floral'
  | 'Oud Leathery';

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  character: string;
  category: FragranceCategory;
  price: string;
  priceValue: number;
  badge?: string;
  perfumeImage: string;
  notesImage: string;
  notes: string[];
  available: boolean;
  featured: boolean;
  createdAt: string;
}

/** Single source of truth for i-BAN fragrances. Append new SKUs here only. */
export const catalogProducts: CatalogProduct[] = [
  {
    id: 'oris',
    slug: 'oris',
    name: 'ORIS',
    description:
      'A refined fusion of citrus, florals & warm woods — bergamot, jasmine, sandalwood.',
    character: 'Citrusy · Floral · Warm',
    category: 'Fresh Fruity Musky',
    price: '₹399',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/ORIS_PERFUME.png',
    notesImage: '/images/product_images/ORIS_NOTES.png',
    notes: ['Bergamot', 'Pineapple', 'Jasmine', 'Sandalwood', 'Musk'],
    available: true,
    featured: true,
    createdAt: '2025-11-01',
  },
  {
    id: 'royal-berry',
    slug: 'royal-berry',
    name: 'Royal Berry',
    description:
      'A luscious blend of juicy berries & sweet delight — playful, elegant & charming.',
    character: 'Fruity · Sweet · Enchanting',
    category: 'Fruity Floral',
    price: '₹399',
    priceValue: 399,
    badge: 'Guest Favourite',
    perfumeImage: '/images/product_images/ROYAL_BERRY_PERFUME.png',
    notesImage: '/images/product_images/ROYALBERRY_NOTES.png',
    notes: ['Strawberry', 'Raspberry', 'Violet', 'Vanilla', 'Amber'],
    available: true,
    featured: true,
    createdAt: '2025-09-15',
  },
  {
    id: 'from-heavens',
    slug: 'from-heavens',
    name: 'From Heavens',
    description:
      'A heavenly blend of freshness, florals & deep elegance — orange, lavender, oud.',
    character: 'Fresh · Floral · Heavenly',
    category: 'Fresh Floral',
    price: '₹349',
    priceValue: 349,
    badge: 'Limited',
    perfumeImage: '/images/product_images/FROM_HEAVENS_PERFUME.png',
    notesImage: '/images/product_images/FROM_HEAVENS_NOTE.png',
    notes: ['Orange', 'Lavender', 'Rose', 'Vanilla', 'Oud'],
    available: true,
    featured: false,
    createdAt: '2025-08-01',
  },
  {
    id: 'marj',
    slug: 'marj',
    name: 'MARJ',
    description:
      'A majestic blend of oud, spices & rich elegance — warm, spicy, enigmatic.',
    character: 'Warm · Spicy · Enigmatic',
    category: 'Oud Leathery',
    price: '₹399',
    priceValue: 399,
    badge: 'Signature',
    perfumeImage: '/images/product_images/MIRAJ_PERFUME.png',
    notesImage: '/images/product_images/MIRAJ_NOTES.png',
    notes: ['Oud', 'Honey', 'Saffron', 'Leather', 'Musk'],
    available: true,
    featured: true,
    createdAt: '2025-10-01',
  },
  {
    id: 'hala-paris',
    slug: 'hala-paris',
    name: 'Hala Paris',
    description:
      'A radiant blend of fruits, florals & sweet elegance — charming & feminine.',
    character: 'Fruity · Floral · Sweet',
    category: 'Fruity Floral',
    price: '₹349',
    priceValue: 349,
    badge: 'New',
    perfumeImage: '/images/product_images/HALA_PARIS_PERFUME.png',
    notesImage: '/images/product_images/HALA_PARIS_NOTES.png',
    notes: ['Litchi', 'Grapefruit', 'Jasmine', 'Rose', 'Vanilla'],
    available: true,
    featured: false,
    createdAt: '2025-12-01',
  },
];

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.slug === slug);
}

/** Derived from catalog — new categories appear automatically. */
export function getAllCategories(): FragranceCategory[] {
  return Array.from(new Set(catalogProducts.map((p) => p.category)));
}

/** Derived unique prices, ascending. */
export function getAllPrices(): string[] {
  return Array.from(new Set(catalogProducts.map((p) => p.price))).sort(
    (a, b) =>
      Number(a.replace(/[₹,]/g, '')) - Number(b.replace(/[₹,]/g, ''))
  );
}

export type CatalogSort =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc';

export function filterAndSortProducts(options: {
  category?: FragranceCategory | 'All';
  price?: string | 'All';
  sort?: CatalogSort;
}): CatalogProduct[] {
  const category = options.category ?? 'All';
  const price = options.price ?? 'All';
  const sort = options.sort ?? 'featured';

  let list = catalogProducts.filter((p) => p.available);

  if (category !== 'All') {
    list = list.filter((p) => p.category === category);
  }
  if (price !== 'All') {
    list = list.filter((p) => p.price === price);
  }

  const sorted = [...list];
  switch (sort) {
    case 'newest':
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }

  return sorted;
}
