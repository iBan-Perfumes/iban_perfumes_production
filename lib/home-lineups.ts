import type { CatalogProduct } from '@/lib/catalog-types';

export const UNISEX_SLUGS = [
  'oris',
  'royal-berry',
  'from-heavens',
  'hala-paris',
  'cr7',
  'kl12',
  'liverpool',
  'pure-white',
] as const;

export const MASCULINE_SLUGS = ['jordan', 'marj'] as const;

const MASCULINE_SLUG_SET = new Set<string>(MASCULINE_SLUGS);

export function genderForSlug(slug: string): 'Masculine' | 'Unisex' {
  return MASCULINE_SLUG_SET.has(slug) ? 'Masculine' : 'Unisex';
}

export const homeLineups = {
  unisex: {
    id: 'unisex',
    eyebrow: 'UNISEX',
    heading: 'Crafted For Every Presence',
    description:
      'Fragrances designed beyond him or her — one collection for every personality, mood, and occasion.',
    image: '/images/cinematic/ORIS_BANNER_IMG.png',
    imageAlt: 'i-BAN unisex fragrance collection',
    imageOnLeft: true,
    backgroundClass: 'bg-white',
    slugs: UNISEX_SLUGS,
    productGridClass: 'grid gap-4 sm:grid-cols-2',
  },
  masculine: {
    id: 'masculine',
    eyebrow: 'MASCULINE',
    heading: 'Bold Woods, Quiet Power',
    description:
      'A focused pair of signature scents — aromatic woods and rich oud built for presence that does not need to announce itself.',
    image: '/images/men.jpg',
    imageAlt: 'Man applying cologne',
    imageOnLeft: false,
    backgroundClass: 'bg-stone-50',
    slugs: MASCULINE_SLUGS,
    productGridClass: 'space-y-4',
  },
} as const;

export type HomeLineup = (typeof homeLineups)[keyof typeof homeLineups];

export function productsForLineup(
  products: CatalogProduct[],
  slugs: readonly string[]
): CatalogProduct[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is CatalogProduct => Boolean(p));
}
