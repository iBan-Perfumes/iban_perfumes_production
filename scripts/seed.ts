import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { getDb } from '../lib/db';
import { categories, productCategories, productImages, products } from '../lib/db/schema';
import { seedProducts } from '../lib/db/seed-data';
import { slugify } from '../lib/slugify';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to seed');
  }

  const db = getDb();
  const categoryNames = Array.from(
    new Set(seedProducts.map((p) => p.category))
  ).sort();

  console.log('Seeding categories…');
  const categoryIdByName = new Map<string, string>();

  for (let i = 0; i < categoryNames.length; i++) {
    const name = categoryNames[i];
    const slug = slugify(name);
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });
    if (existing) {
      categoryIdByName.set(name, existing.id);
      continue;
    }
    const [row] = await db
      .insert(categories)
      .values({ name, slug, sortOrder: i })
      .returning();
    categoryIdByName.set(name, row.id);
  }

  console.log('Seeding products…');
  for (const item of seedProducts) {
    const categoryId = categoryIdByName.get(item.category);
    if (!categoryId) {
      throw new Error(`Missing category ${item.category}`);
    }

    const existing = await db.query.products.findFirst({
      where: eq(products.slug, item.slug),
      with: { images: true },
    });

    if (existing) {
      console.log(`  skip existing: ${item.slug}`);
      continue;
    }

    const [product] = await db
      .insert(products)
      .values({
        slug: item.slug,
        name: item.name,
        description: item.description,
        character: item.character,
        categoryId,
        priceValue: item.priceValue,
        badge: item.badge ?? null,
        notePyramid: item.notePyramid,
        heroCopy: item.heroCopy,
        story: item.story,
        available: item.available,
        featured: item.featured,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.createdAt),
      })
      .returning();

    const imageRows = [
      {
        url: item.perfumeImage,
        alt: `${item.name} perfume bottle`,
        sortOrder: 0,
      },
      {
        url: item.notesImage,
        alt: `${item.name} fragrance notes`,
        sortOrder: 1,
      },
    ];
    if (item.lifestyleImage) {
      imageRows.push({
        url: item.lifestyleImage,
        alt: `${item.name} lifestyle`,
        sortOrder: 2,
      });
    }

    const insertedImages = await db
      .insert(productImages)
      .values(
        imageRows.map((img) => ({
          productId: product.id,
          url: img.url,
          alt: img.alt,
          sortOrder: img.sortOrder,
        }))
      )
      .returning();

    const thumb = insertedImages[0];
    if (thumb) {
      await db
        .update(products)
        .set({ thumbnailImageId: thumb.id })
        .where(eq(products.id, product.id));
    }

    await db.insert(productCategories).values({
      productId: product.id,
      categoryId,
    });

    console.log(`  seeded: ${item.slug}`);
  }

  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
