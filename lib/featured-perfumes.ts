import type { CatalogProduct } from '@/lib/catalog';
import { catalogProducts } from '@/lib/catalog';

/** @deprecated Prefer CatalogProduct from lib/catalog — kept for existing imports. */
export interface FeaturedPerfume {
  id: string;
  name: string;
  description: string;
  perfumeImage: string;
  notesImage: string;
  price: string;
  badge?: string;
}

function toFeatured(p: CatalogProduct): FeaturedPerfume {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    perfumeImage: p.perfumeImage,
    notesImage: p.notesImage,
    price: p.price,
    badge: p.badge,
  };
}

/** Derived from catalog — no duplicated product list. */
export const featuredPerfumes: FeaturedPerfume[] =
  catalogProducts.map(toFeatured);
