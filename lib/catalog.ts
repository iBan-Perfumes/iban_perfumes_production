/**
 * Shared catalog types and PDP copy.
 * Product data is loaded from Neon via `@/lib/catalog-db`.
 */
export type {
  CatalogProduct,
  CatalogSort,
  FragranceCategory,
  NotePyramid,
  ProductDetails,
  ProductVariant,
} from '@/lib/catalog-types';

export { sharedHowToUse, sharedSafety } from '@/lib/catalog-db';
