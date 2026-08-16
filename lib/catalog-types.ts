export type FragranceCategory = string;

export interface NotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductDetails {
  brand: string;
  format: string;
  volume: string;
  category: string;
  fragranceFamily: string;
  character: string;
  longevity: string;
  occasion: string;
  gender: string;
  concentration: string;
  country: string;
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
  shortDescription: string;
  family: string;
  volume: string;
  concentration: string;
  availability: string;
  previewImage: string;
  lifestyleBanner: string;
  gallery: { src: string; alt: string }[];
  details: ProductDetails;
  ingredients: string[];
}

export type CatalogSort =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc';

