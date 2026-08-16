import type { CatalogProduct } from '@/lib/catalog-types';

export type FeaturedPerfume = {
  id: string;
  name: string;
  description: string;
  perfumeImage: string;
  notesImage: string;
  price: string;
  badge?: string;
  slug: string;
};

export function toFeatured(p: CatalogProduct): FeaturedPerfume {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    perfumeImage: p.perfumeImage,
    notesImage: p.notesImage,
    price: p.price,
    badge: p.badge,
    slug: p.slug,
  };
}

export function mapFeatured(products: CatalogProduct[]): FeaturedPerfume[] {
  return products.filter((p) => p.featured && p.available).map(toFeatured);
}
