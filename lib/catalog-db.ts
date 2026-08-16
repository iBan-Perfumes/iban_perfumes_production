import { and, asc, desc, eq, ne, sql } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';
import { getDb } from '@/lib/db';
import {
  categories,
  productImages,
  products,
  type NotePyramidJson,
} from '@/lib/db/schema';
import { SITE_NAME } from '@/lib/site';
import type {
  CatalogProduct,
  CatalogSort,
  FragranceCategory,
  NotePyramid,
  ProductDetails,
} from '@/lib/catalog-types';

export type { CatalogProduct, CatalogSort, FragranceCategory, NotePyramid };

export const sharedHowToUse = [
  'Spray on pulse points — wrists, neck, and behind the ears.',
  'Avoid rubbing the fragrance into the skin to preserve the note pyramid.',
  'Apply after a shower on clean, moisturized skin for best longevity.',
  'Store upright, away from direct sunlight and extreme heat.',
] as const;

export const sharedSafety = [
  'Flammable — keep away from open flame and heat sources.',
  'For external use only.',
  'Avoid contact with eyes. If contact occurs, rinse thoroughly with water.',
  'Keep out of reach of children.',
  'Store in a cool, dry place away from direct sunlight.',
] as const;

function flattenNotes(pyramid: NotePyramid): string[] {
  return [...pyramid.top, ...pyramid.heart, ...pyramid.base];
}

function formatPrice(value: number) {
  return `₹${value}`;
}

function enrichRow(row: {
  id: string;
  slug: string;
  name: string;
  description: string;
  character: string;
  categoryName: string;
  priceValue: number;
  badge: string | null;
  notePyramid: NotePyramidJson;
  heroCopy: string;
  story: string;
  available: boolean;
  featured: boolean;
  createdAt: Date;
  thumbnailImageId: string | null;
  images: { id: string; url: string; alt: string; sortOrder: number }[];
}): CatalogProduct {
  const sortedImages = [...row.images].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
  const thumb =
    sortedImages.find((img) => img.id === row.thumbnailImageId) ??
    sortedImages[0];
  const thumbUrl = thumb?.url ?? '/images/product_images/ORIS_PERFUME.png';
  const notesImg =
    sortedImages.find((img) => /note/i.test(img.alt) || /note/i.test(img.url)) ??
    sortedImages[1] ??
    thumb;
  const lifestyle =
    sortedImages.find(
      (img) => /lifestyle|banner|cinematic/i.test(img.alt) || /cinematic/i.test(img.url)
    ) ?? thumb;

  const notePyramid = row.notePyramid as NotePyramid;
  const flatNotes = flattenNotes(notePyramid);
  const volume = '20 ML';
  const concentration = 'EDP';
  const category = row.categoryName as FragranceCategory;

  const gallery = sortedImages.map((img) => ({
    src: img.url,
    alt: img.alt || `${row.name} image`,
  }));
  if (gallery.length === 0) {
    gallery.push({ src: thumbUrl, alt: `${row.name} perfume bottle` });
  }

  const details: ProductDetails = {
    brand: SITE_NAME,
    format: 'Spray',
    volume,
    category,
    fragranceFamily: category,
    character: row.character,
    longevity: 'Moderate to long-lasting',
    occasion: 'Day to evening',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    country: 'India',
  };

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    character: row.character,
    category,
    price: formatPrice(row.priceValue),
    priceValue: row.priceValue,
    badge: row.badge ?? undefined,
    perfumeImage: thumbUrl,
    notesImage: notesImg?.url ?? thumbUrl,
    notes: flatNotes,
    notePyramid,
    heroCopy: row.heroCopy,
    story: row.story,
    available: row.available,
    featured: row.featured,
    createdAt: row.createdAt.toISOString().slice(0, 10),
    shortDescription: row.description,
    family: category,
    volume,
    concentration,
    availability: row.available ? 'In stock' : 'Out of stock',
    previewImage: thumbUrl,
    lifestyleBanner: lifestyle?.url ?? thumbUrl,
    gallery,
    details,
    ingredients: flatNotes,
  };
}

async function loadProducts(opts?: { availableOnly?: boolean }) {
  noStore();
  if (!process.env.DATABASE_URL) return [];

  try {
    const db = getDb();
    const rows = await db.query.products.findMany({
      with: {
        category: true,
        images: true,
      },
      orderBy: [desc(products.featured), desc(products.createdAt)],
    });

    return rows
      .filter((r) => (opts?.availableOnly ? r.available : true))
      .map((r) =>
        enrichRow({
          id: r.id,
          slug: r.slug,
          name: r.name,
          description: r.description,
          character: r.character,
          categoryName: r.category.name,
          priceValue: r.priceValue,
          badge: r.badge,
          notePyramid: r.notePyramid,
          heroCopy: r.heroCopy,
          story: r.story,
          available: r.available,
          featured: r.featured,
          createdAt: r.createdAt,
          thumbnailImageId: r.thumbnailImageId,
          images: r.images,
        })
      );
  } catch {
    return [];
  }
}

export async function getAllProducts(): Promise<CatalogProduct[]> {
  return loadProducts();
}

export async function getAvailableProducts(): Promise<CatalogProduct[]> {
  return loadProducts({ availableOnly: true });
}

export async function getProductBySlug(
  slug: string
): Promise<CatalogProduct | undefined> {
  noStore();
  if (!process.env.DATABASE_URL) return undefined;

  try {
    const db = getDb();
    const row = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { category: true, images: true },
    });
    if (!row) return undefined;
    return enrichRow({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      character: row.character,
      categoryName: row.category.name,
      priceValue: row.priceValue,
      badge: row.badge,
      notePyramid: row.notePyramid,
      heroCopy: row.heroCopy,
      story: row.story,
      available: row.available,
      featured: row.featured,
      createdAt: row.createdAt,
      thumbnailImageId: row.thumbnailImageId,
      images: row.images,
    });
  } catch {
    return undefined;
  }
}

export async function getRelatedProducts(
  slug: string,
  limit = 4
): Promise<CatalogProduct[]> {
  const current = await getProductBySlug(slug);
  const all = await getAvailableProducts();
  if (!current) return all.slice(0, limit);

  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others
    .filter((p) => p.category !== current.category)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getAllCategories(): Promise<string[]> {
  noStore();
  const db = getDb();
  const rows = await db
    .select({ name: categories.name })
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.name));
  return rows.map((r) => r.name);
}

export async function getAllPrices(): Promise<string[]> {
  const productsList = await getAvailableProducts();
  return Array.from(new Set(productsList.map((p) => p.price))).sort(
    (a, b) =>
      Number(a.replace(/[₹,]/g, '')) - Number(b.replace(/[₹,]/g, ''))
  );
}

export async function queryCatalog(options: {
  category?: string;
  price?: string;
  sort?: CatalogSort;
  q?: string;
}): Promise<CatalogProduct[]> {
  let list = await getAvailableProducts();

  if (options.category) {
    list = list.filter((p) => p.category === options.category);
  }
  if (options.price) {
    list = list.filter((p) => p.price === options.price);
  }
  if (options.q) {
    const q = options.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.character.toLowerCase().includes(q) ||
        p.notes.some((n) => n.toLowerCase().includes(q))
    );
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

export async function getAdminStats() {
  noStore();
  const db = getDb();
  const [productCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);
  const [categoryCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categories);
  const [availableCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.available, true));

  return {
    products: productCount?.count ?? 0,
    categories: categoryCount?.count ?? 0,
    available: availableCount?.count ?? 0,
  };
}

export async function listCategoriesAdmin() {
  noStore();
  const db = getDb();
  return db.query.categories.findMany({
    orderBy: [asc(categories.sortOrder), asc(categories.name)],
    with: {
      products: { columns: { id: true } },
    },
  });
}

export async function listProductsAdmin() {
  noStore();
  const db = getDb();
  return db.query.products.findMany({
    orderBy: [desc(products.updatedAt)],
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.sortOrder)],
      },
    },
  });
}

export async function getProductAdmin(id: string) {
  noStore();
  const db = getDb();
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.sortOrder)],
      },
    },
  });
}

export { categories, products, productImages, eq, ne, and, asc, desc };
