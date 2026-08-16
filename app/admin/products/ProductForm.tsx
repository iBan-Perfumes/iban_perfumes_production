'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  deleteProductImageAction,
  reorderProductImageAction,
  saveProductAction,
  setThumbnailAction,
} from '@/app/admin/actions';
import { slugify } from '@/lib/slugify';

type CategoryOption = { id: string; name: string };
type ImageRow = {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
};

type ProductFormProps = {
  categories: CategoryOption[];
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    character: string;
    categoryId: string;
    priceValue: number;
    badge: string | null;
    heroCopy: string;
    story: string;
    available: boolean;
    featured: boolean;
    notePyramid: { top: string[]; heart: string[]; base: string[] };
    thumbnailImageId: string | null;
    images: ImageRow[];
  };
};

export function ProductForm({ categories, product }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const autoSlug = useMemo(() => slugify(name), [name]);

  return (
    <div className="space-y-8">
    <form
      id="product-form"
      className="space-y-8"
      action={async (fd) => {
        setPending(true);
        setError(null);
        const result = await saveProductAction(fd);
        if (result?.error) {
          setError(result.error);
          setPending(false);
        }
      }}
    >
      {product && <input type="hidden" name="id" value={product.id} />}

      <section className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm md:col-span-2">
          <span className="text-stone-600">Name</span>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <label className="block text-sm">
          <span className="text-stone-600">Slug</span>
          <input
            name="slug"
            required
            value={slug || autoSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <label className="block text-sm">
          <span className="text-stone-600">Category</span>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? ''}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="text-stone-600">Short description</span>
          <textarea
            name="description"
            required
            rows={2}
            defaultValue={product?.description}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <label className="block text-sm">
          <span className="text-stone-600">Character</span>
          <input
            name="character"
            required
            defaultValue={product?.character}
            placeholder="Fresh · Floral · Warm"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <label className="block text-sm">
          <span className="text-stone-600">Price (₹)</span>
          <input
            name="priceValue"
            type="number"
            min={1}
            required
            defaultValue={product?.priceValue ?? 399}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <label className="block text-sm">
          <span className="text-stone-600">Badge (optional)</span>
          <input
            name="badge"
            defaultValue={product?.badge ?? ''}
            placeholder="New"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>

        <div className="flex items-end gap-6 pb-2 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              defaultChecked={product?.available ?? true}
            />
            Available
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured ?? false}
            />
            Featured
          </label>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm">
          <span className="text-stone-600">Top notes (comma-separated)</span>
          <input
            name="notesTop"
            defaultValue={product?.notePyramid.top.join(', ')}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Heart notes</span>
          <input
            name="notesHeart"
            defaultValue={product?.notePyramid.heart.join(', ')}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>
        <label className="block text-sm">
          <span className="text-stone-600">Base notes</span>
          <input
            name="notesBase"
            defaultValue={product?.notePyramid.base.join(', ')}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </label>
      </section>

      <label className="block text-sm">
        <span className="text-stone-600">Hero copy</span>
        <textarea
          name="heroCopy"
          required
          rows={3}
          defaultValue={product?.heroCopy}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
        />
      </label>

      <label className="block text-sm">
        <span className="text-stone-600">Story</span>
        <textarea
          name="story"
          required
          rows={4}
          defaultValue={product?.story}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
        />
      </label>

      <section className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <h2 className="text-sm font-semibold text-stone-900">Product images</h2>
        <p className="mt-1 text-xs text-stone-500">
          Upload multiple images at once. Each file is converted to WebP before
          saving. Choose one thumbnail for cards and SEO.
        </p>

        <label className="mt-4 block text-sm">
          <span className="text-stone-600">Upload images</span>
          <input
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
            className="mt-1 block w-full text-sm"
          />
          {fileCount > 0 && (
            <p className="mt-1 text-xs text-amber-800">
              {fileCount} file{fileCount === 1 ? '' : 's'} selected — will
              convert to WebP on save
            </p>
          )}
        </label>
      </section>
    </form>

    {product && product.images.length > 0 && (
      <section className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <h2 className="text-sm font-semibold text-stone-900">Gallery</h2>
        <p className="mt-1 text-xs text-stone-500">
          Reorder, set the storefront thumbnail, or delete images.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {product.images.map((img) => {
            const isThumb = product.thumbnailImageId === img.id;
            return (
              <div
                key={img.id}
                className={`overflow-hidden rounded-xl border bg-white ${
                  isThumb
                    ? 'border-amber-600 ring-1 ring-amber-600'
                    : 'border-stone-200'
                }`}
              >
                <div className="relative aspect-square bg-stone-100">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-2">
                  <form action={setThumbnailAction}>
                    <input type="hidden" name="productId" value={product.id} />
                    <input type="hidden" name="imageId" value={img.id} />
                    <button
                      type="submit"
                      className="text-xs font-medium text-amber-800 hover:underline"
                    >
                      {isThumb ? 'Thumbnail' : 'Set thumbnail'}
                    </button>
                  </form>
                  <div className="flex items-center gap-2">
                    <form action={reorderProductImageAction}>
                      <input type="hidden" name="imageId" value={img.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button
                        type="submit"
                        className="text-xs text-stone-500 hover:underline"
                      >
                        Up
                      </button>
                    </form>
                    <form action={reorderProductImageAction}>
                      <input type="hidden" name="imageId" value={img.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button
                        type="submit"
                        className="text-xs text-stone-500 hover:underline"
                      >
                        Down
                      </button>
                    </form>
                    <form action={deleteProductImageAction}>
                      <input type="hidden" name="imageId" value={img.id} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    )}

    {error && <p className="text-sm text-red-600">{error}</p>}

    <button
      type="submit"
      form="product-form"
      disabled={pending}
      onClick={() => {
        setPending(true);
        setError(null);
      }}
      className="inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          <span>Saving…</span>
        </>
      ) : product ? (
        'Save changes'
      ) : (
        'Create product'
      )}
    </button>
    </div>
  );
}
