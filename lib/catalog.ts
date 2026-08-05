export type FragranceCategory =
  | 'Fresh Fruity Musky'
  | 'Fresh Floral'
  | 'Fruity Floral'
  | 'Oud Leathery';

export interface NotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

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
  notePyramid: NotePyramid;
  heroCopy: string;
  story: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
}

function flattenNotes(pyramid: NotePyramid): string[] {
  return [...pyramid.top, ...pyramid.heart, ...pyramid.base];
}

/** Single source of truth for i-BAN fragrances. Append new SKUs here only. */
const catalogProductsBase: Omit<CatalogProduct, 'notes'>[] = [
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
    notePyramid: {
      top: ['Bergamot', 'Pineapple'],
      heart: ['Jasmine'],
      base: ['Sandalwood', 'Musk'],
    },
    heroCopy:
      'Citrusy. Floral. Warm. A sophisticated blend that opens with fresh citrus and sweet nuances, blooms into delicate florals, and settles into a warm, sensual base.',
    story:
      'A refreshing fusion of citrus freshness, tropical sweetness, elegant jasmine and smooth sandalwood finished with soft musk. ORIS is crafted for everyday presence—bright at the open, refined through the heart, and quietly lasting on the skin.',
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
    notePyramid: {
      top: ['Strawberry', 'Raspberry'],
      heart: ['Violet'],
      base: ['Vanilla', 'Amber'],
    },
    heroCopy:
      'Fruity. Sweet. Enchanting. A delightful fusion of vibrant berries and zesty citrus, blossoming florals, and a warm, sensual base that lingers beautifully.',
    story:
      'Royal Berry captures playful elegance—juicy berries and soft florals wrapped in a warm vanilla–amber trail. Designed for moments that feel light, charming, and memorable from morning to evening.',
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
    notePyramid: {
      top: ['Orange'],
      heart: ['Lavender', 'Rose'],
      base: ['Vanilla', 'Oud'],
    },
    heroCopy:
      'Fresh. Floral. Heavenly. A divine blend that opens with juicy citrus and soft fruits, blooms into a heart of delicate florals, and settles into a warm, rich base that lingers like a dream.',
    story:
      'From Heavens balances calm and radiance—fresh citrus and lavender rise into romantic rose, then rest on warm vanilla and deep oud. A fragrance for quiet confidence and elevated everyday wear.',
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
    notePyramid: {
      top: ['Honey', 'Saffron'],
      heart: ['Oud'],
      base: ['Leather', 'Musk'],
    },
    heroCopy:
      'Warm. Spicy. Enigmatic. A powerful fusion of rich oud and exotic spices, softened by florals and woods, resting on a deep, sensual base that leaves an unforgettable trail.',
    story:
      'MARJ is a bold signature scent—honey and saffron open into rich oud, finishing on luxurious leather and soft musk. Crafted for presence that feels deep, warm, and unmistakably memorable.',
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
    notePyramid: {
      top: ['Litchi', 'Grapefruit'],
      heart: ['Jasmine', 'Rose'],
      base: ['Vanilla'],
    },
    heroCopy:
      'Fruity. Floral. Sweet. A delightful harmony of juicy fruits and delicate florals, wrapped in a sweet, soft base that lingers gracefully. Charming, feminine & irresistibly elegant.',
    story:
      'Hala Paris is radiant and graceful—litchi and grapefruit sparkle over jasmine and rose, settling into soft vanilla. A feminine everyday fragrance that feels charming from first spray to last impression.',
    available: true,
    featured: false,
    createdAt: '2025-12-01',
  },
];

export const catalogProducts: CatalogProduct[] = catalogProductsBase.map((p) => ({
  ...p,
  notes: flattenNotes(p.notePyramid),
}));

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.slug === slug);
}

/** Related products: same category first, then featured, exclude current. */
export function getRelatedProducts(
  slug: string,
  limit = 4
): CatalogProduct[] {
  const current = getProductBySlug(slug);
  if (!current) return catalogProducts.filter((p) => p.available).slice(0, limit);

  const others = catalogProducts.filter((p) => p.available && p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others
    .filter((p) => p.category !== current.category)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return [...sameCategory, ...rest].slice(0, limit);
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
