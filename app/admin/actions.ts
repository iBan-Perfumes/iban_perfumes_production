'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { asc, eq, sql } from 'drizzle-orm';
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  validateAdminCredentials,
} from '@/lib/auth';
import { convertAndUploadWebp, deleteBlobUrl } from '@/lib/blob';
import { getDb } from '@/lib/db';
import { categories, productImages, products } from '@/lib/db/schema';
import { slugify } from '@/lib/slugify';

function requireAdmin() {
  return isAdminAuthenticated().then((ok) => {
    if (!ok) throw new Error('Unauthorized');
  });
}

function revalidateStorefront(slug?: string) {
  revalidatePath('/');
  revalidatePath('/collection');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/admin');

  if (!validateAdminCredentials(email, password)) {
    return { error: 'Invalid email or password' };
  }

  await createAdminSession(email);
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createCategoryAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  if (!name) return;

  const db = getDb();
  const slug = slugify(name);
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${categories.sortOrder}), -1)` })
    .from(categories);

  try {
    await db.insert(categories).values({
      name,
      slug,
      sortOrder: (max ?? -1) + 1,
    });
  } catch {
    return;
  }

  revalidateStorefront();
  revalidatePath('/admin/categories');
}

export async function updateCategoryAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  if (!id || !name) return;

  const db = getDb();
  try {
    await db
      .update(categories)
      .set({ name, slug: slugify(name), updatedAt: new Date() })
      .where(eq(categories.id, id));
  } catch {
    return;
  }

  revalidateStorefront();
  revalidatePath('/admin/categories');
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const db = getDb();
  const linked = await db.query.products.findFirst({
    where: eq(products.categoryId, id),
    columns: { id: true },
  });
  if (linked) return;

  await db.delete(categories).where(eq(categories.id, id));
  revalidateStorefront();
  revalidatePath('/admin/categories');
}

function parseNotes(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const db = getDb();

  const id = String(formData.get('id') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  let slug = String(formData.get('slug') ?? '').trim() || slugify(name);
  slug = slugify(slug);
  const description = String(formData.get('description') ?? '').trim();
  const character = String(formData.get('character') ?? '').trim();
  const categoryId = String(formData.get('categoryId') ?? '');
  const priceValue = Number(formData.get('priceValue') ?? 0);
  const badge = String(formData.get('badge') ?? '').trim() || null;
  const heroCopy = String(formData.get('heroCopy') ?? '').trim();
  const story = String(formData.get('story') ?? '').trim();
  const available = formData.get('available') === 'on';
  const featured = formData.get('featured') === 'on';
  const notePyramid = {
    top: parseNotes(String(formData.get('notesTop') ?? '')),
    heart: parseNotes(String(formData.get('notesHeart') ?? '')),
    base: parseNotes(String(formData.get('notesBase') ?? '')),
  };

  if (!name || !description || !character || !categoryId || !heroCopy || !story) {
    return { error: 'Please fill all required fields' };
  }
  if (!Number.isFinite(priceValue) || priceValue <= 0) {
    return { error: 'Price must be a positive number' };
  }

  const values = {
    name,
    slug,
    description,
    character,
    categoryId,
    priceValue,
    badge,
    notePyramid,
    heroCopy,
    story,
    available,
    featured,
    updatedAt: new Date(),
  };

  let productId = id;

  try {
    if (id) {
      await db.update(products).set(values).where(eq(products.id, id));
    } else {
      const [created] = await db.insert(products).values(values).returning();
      productId = created.id;
    }
  } catch {
    return { error: 'Could not save product (slug may already exist)' };
  }

  const files = formData
    .getAll('images')
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > 0) {
    const existing = await db.query.productImages.findMany({
      where: eq(productImages.productId, productId),
      orderBy: [asc(productImages.sortOrder)],
    });
    let sortOrder = existing.length
      ? Math.max(...existing.map((i) => i.sortOrder)) + 1
      : 0;

    const uploadedIds: string[] = [];
    for (const file of files) {
      try {
        const url = await convertAndUploadWebp(file);
        const [img] = await db
          .insert(productImages)
          .values({
            productId,
            url,
            alt: `${name} image`,
            sortOrder: sortOrder++,
          })
          .returning();
        uploadedIds.push(img.id);
      } catch (err) {
        return {
          error:
            err instanceof Error
              ? err.message
              : 'Failed to upload one or more images',
        };
      }
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });
    if (product && !product.thumbnailImageId && uploadedIds[0]) {
      await db
        .update(products)
        .set({ thumbnailImageId: uploadedIds[0] })
        .where(eq(products.id, productId));
    }
  }

  revalidateStorefront(slug);
  revalidatePath('/admin/products');
  redirect(`/admin/products/${productId}`);
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const db = getDb();
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: { images: true },
  });
  if (!product) return;

  for (const img of product.images) {
    await deleteBlobUrl(img.url);
  }

  await db.delete(products).where(eq(products.id, id));
  revalidateStorefront(product.slug);
  revalidatePath('/admin/products');
}

export async function setThumbnailAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const productId = String(formData.get('productId') ?? '');
  const imageId = String(formData.get('imageId') ?? '');
  if (!productId || !imageId) return;

  const db = getDb();
  const image = await db.query.productImages.findFirst({
    where: eq(productImages.id, imageId),
  });
  if (!image || image.productId !== productId) return;

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });
  if (!product) return;

  await db
    .update(products)
    .set({ thumbnailImageId: imageId, updatedAt: new Date() })
    .where(eq(products.id, productId));

  revalidateStorefront(product.slug);
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductImageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const imageId = String(formData.get('imageId') ?? '');
  if (!imageId) return;

  const db = getDb();
  const image = await db.query.productImages.findFirst({
    where: eq(productImages.id, imageId),
  });
  if (!image) return;

  const product = await db.query.products.findFirst({
    where: eq(products.id, image.productId),
  });

  await deleteBlobUrl(image.url);
  await db.delete(productImages).where(eq(productImages.id, imageId));

  if (product?.thumbnailImageId === imageId) {
    const next = await db.query.productImages.findFirst({
      where: eq(productImages.productId, image.productId),
      orderBy: [asc(productImages.sortOrder)],
    });
    await db
      .update(products)
      .set({
        thumbnailImageId: next?.id ?? null,
        updatedAt: new Date(),
      })
      .where(eq(products.id, image.productId));
  }

  if (product) revalidateStorefront(product.slug);
  revalidatePath(`/admin/products/${image.productId}`);
}

export async function reorderProductImageAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const imageId = String(formData.get('imageId') ?? '');
  const direction = String(formData.get('direction') ?? '');
  if (!imageId || (direction !== 'up' && direction !== 'down')) return;

  const db = getDb();
  const image = await db.query.productImages.findFirst({
    where: eq(productImages.id, imageId),
  });
  if (!image) return;

  const siblings = await db.query.productImages.findMany({
    where: eq(productImages.productId, image.productId),
    orderBy: [asc(productImages.sortOrder)],
  });
  const index = siblings.findIndex((s) => s.id === imageId);
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= siblings.length) return;

  const other = siblings[swapWith];
  await db
    .update(productImages)
    .set({ sortOrder: other.sortOrder })
    .where(eq(productImages.id, image.id));
  await db
    .update(productImages)
    .set({ sortOrder: image.sortOrder })
    .where(eq(productImages.id, other.id));

  const product = await db.query.products.findFirst({
    where: eq(products.id, image.productId),
  });
  if (product) revalidateStorefront(product.slug);
  revalidatePath(`/admin/products/${image.productId}`);
}

export async function toggleProductFlagAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const field = String(formData.get('field') ?? '');
  if (!id || (field !== 'available' && field !== 'featured')) return;

  const db = getDb();
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  if (!product) return;

  await db
    .update(products)
    .set({
      [field]: !product[field],
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  revalidateStorefront(product.slug);
  revalidatePath('/admin/products');
}
