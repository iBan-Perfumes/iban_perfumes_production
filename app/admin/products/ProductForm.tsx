'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Loader2,
  Star,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  deleteProductImageAction,
  reorderProductImageAction,
  saveProductAction,
  setThumbnailAction,
} from '@/app/admin/actions';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { AdminCard, primaryButtonClassName } from '@/components/admin/ui';
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
    categoryIds: string[];
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

const REQUIRED_FIELDS = [
  'name',
  'slug',
  'categoryIds',
  'character',
  'description',
  'heroCopy',
  'story',
  'priceValue',
] as const;

type RequiredField = (typeof REQUIRED_FIELDS)[number];

const baseFieldClass =
  'mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors';

function fieldClass(invalid: boolean) {
  return invalid
    ? `${baseFieldClass} border-red-500 ring-1 ring-red-200 focus:border-red-500`
    : `${baseFieldClass} border-stone-200 focus:border-amber-700`;
}

function RequiredMark() {
  return (
    <span className="text-red-600" aria-hidden>
      {' '}
      *
    </span>
  );
}

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest?: unknown }).digest === 'string' &&
    (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${primaryButtonClassName('min-w-[10rem]')} !bg-stone-900 hover:!bg-stone-800`}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          <span>Saving…</span>
        </>
      ) : isEdit ? (
        'Save changes'
      ) : (
        'Create product'
      )}
    </button>
  );
}

function FieldError({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="mt-1 text-xs text-red-600">This field is required</p>;
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    () => product?.categoryIds ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<Set<RequiredField>>(
    () => new Set()
  );
  const [fileCount, setFileCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [imagePending, startImageTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const autoSlug = useMemo(() => slugify(name), [name]);

  const isInvalid = (field: RequiredField) => invalidFields.has(field);

  const clearInvalid = (field: RequiredField) => {
    setInvalidFields((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      if (next.length > 0) clearInvalid('categoryIds');
      return next;
    });
  };

  const applyFiles = (files: FileList | File[] | null) => {
    if (!files || !fileRef.current) return;
    const list = Array.from(files);
    const dt = new DataTransfer();
    list.forEach((f) => dt.items.add(f));
    fileRef.current.files = dt.files;
    setFileCount(dt.files.length);
  };

  const runImageAction = (
    action: (fd: FormData) => Promise<void>,
    fields: Record<string, string>
  ) => {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.set(k, v));
    startImageTransition(async () => {
      await action(fd);
      setDeleteImageId(null);
    });
  };

  const validateForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const next = new Set<RequiredField>();
    for (const field of REQUIRED_FIELDS) {
      if (field === 'categoryIds') continue;
      const raw = String(fd.get(field) ?? '').trim();
      if (!raw) next.add(field);
      if (field === 'priceValue') {
        const n = Number(raw);
        if (!Number.isFinite(n) || n <= 0) next.add(field);
      }
    }
    const slugValue = (slug || autoSlug).trim();
    if (!slugValue) next.add('slug');
    else next.delete('slug');
    if (!name.trim()) next.add('name');
    else next.delete('name');
    if (selectedCategoryIds.length === 0) next.add('categoryIds');
    else next.delete('categoryIds');

    setInvalidFields(next);
    return next.size === 0;
  };

  return (
    <div className="space-y-6">
      <form
        id="product-form"
        className="space-y-6"
        noValidate
        onSubmit={(e) => {
          const form = e.currentTarget;
          if (!validateForm(form)) {
            e.preventDefault();
            setError('Please fill all required fields');
            const first = form.querySelector(
              '[aria-invalid="true"]'
            ) as HTMLElement | null;
            first?.focus();
            return;
          }
          setError(null);
        }}
        action={async (fd) => {
          setError(null);
          // Ensure controlled slug is submitted
          if (!String(fd.get('slug') ?? '').trim()) {
            fd.set('slug', slug || autoSlug);
          }
          try {
            const result = await saveProductAction(fd);
            if (result?.error) setError(result.error);
          } catch (err) {
            if (isRedirectError(err)) throw err;
            setError('Could not save product. Please try again.');
          }
        }}
      >
        {product && <input type="hidden" name="id" value={product.id} />}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <AdminCard
              title="Basic Information"
              description="Core product identity used across the storefront."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-2">
                  <span className="font-medium text-stone-700">
                    Product Name
                    <RequiredMark />
                  </span>
                  <input
                    name="name"
                    required
                    aria-required
                    aria-invalid={isInvalid('name')}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slugTouched) setSlug(slugify(e.target.value));
                      if (e.target.value.trim()) clearInvalid('name');
                    }}
                    className={fieldClass(isInvalid('name'))}
                  />
                  <FieldError show={isInvalid('name')} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Slug
                    <RequiredMark />
                  </span>
                  <input
                    name="slug"
                    required
                    aria-required
                    aria-invalid={isInvalid('slug')}
                    value={slug || autoSlug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setSlug(e.target.value);
                      if (e.target.value.trim()) clearInvalid('slug');
                    }}
                    className={fieldClass(isInvalid('slug'))}
                  />
                  <FieldError show={isInvalid('slug')} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Character
                    <RequiredMark />
                  </span>
                  <input
                    name="character"
                    required
                    aria-required
                    aria-invalid={isInvalid('character')}
                    defaultValue={product?.character}
                    placeholder="Fresh · Floral · Warm"
                    onChange={(e) => {
                      if (e.target.value.trim()) clearInvalid('character');
                    }}
                    className={fieldClass(isInvalid('character'))}
                  />
                  <FieldError show={isInvalid('character')} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Badge (optional)
                  </span>
                  <input
                    name="badge"
                    defaultValue={product?.badge ?? ''}
                    placeholder="New"
                    className={fieldClass(false)}
                  />
                </label>
              </div>
            </AdminCard>

            <AdminCard
              title="Categories"
              description="Select one or more fragrance families for this product."
            >
              <p className="mb-3 text-sm font-medium text-stone-700">
                Available categories
                <RequiredMark />
              </p>
              {categories.length === 0 ? (
                <p className="text-sm text-stone-500">
                  No categories yet. Create categories first.
                </p>
              ) : (
                <div
                  role="group"
                  aria-label="Product categories"
                  aria-invalid={isInvalid('categoryIds')}
                  className={`grid gap-2 rounded-xl border p-3 sm:grid-cols-2 ${
                    isInvalid('categoryIds')
                      ? 'border-red-500 bg-red-50/40 ring-1 ring-red-200'
                      : 'border-stone-200 bg-stone-50/50'
                  }`}
                >
                  {categories.map((c) => {
                    const checked = selectedCategoryIds.includes(c.id);
                    return (
                      <label
                        key={c.id}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent bg-white px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-amber-200"
                      >
                        <input
                          type="checkbox"
                          name="categoryIds"
                          value={c.id}
                          checked={checked}
                          onChange={() => toggleCategory(c.id)}
                          className="h-4 w-4 rounded border-stone-300 text-amber-800 focus:ring-amber-700"
                        />
                        <span className="font-medium">{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
              <FieldError show={isInvalid('categoryIds')} />
            </AdminCard>

            <AdminCard
              title="Product Description"
              description="Copy shown on product and listing pages."
            >
              <div className="space-y-4">
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Short description
                    <RequiredMark />
                  </span>
                  <textarea
                    name="description"
                    required
                    aria-required
                    aria-invalid={isInvalid('description')}
                    rows={2}
                    defaultValue={product?.description}
                    onChange={(e) => {
                      if (e.target.value.trim()) clearInvalid('description');
                    }}
                    className={fieldClass(isInvalid('description'))}
                  />
                  <FieldError show={isInvalid('description')} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Hero copy
                    <RequiredMark />
                  </span>
                  <textarea
                    name="heroCopy"
                    required
                    aria-required
                    aria-invalid={isInvalid('heroCopy')}
                    rows={3}
                    defaultValue={product?.heroCopy}
                    onChange={(e) => {
                      if (e.target.value.trim()) clearInvalid('heroCopy');
                    }}
                    className={fieldClass(isInvalid('heroCopy'))}
                  />
                  <FieldError show={isInvalid('heroCopy')} />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">
                    Story
                    <RequiredMark />
                  </span>
                  <textarea
                    name="story"
                    required
                    aria-required
                    aria-invalid={isInvalid('story')}
                    rows={4}
                    defaultValue={product?.story}
                    onChange={(e) => {
                      if (e.target.value.trim()) clearInvalid('story');
                    }}
                    className={fieldClass(isInvalid('story'))}
                  />
                  <FieldError show={isInvalid('story')} />
                </label>
              </div>
            </AdminCard>

            <AdminCard title="Fragrance Notes">
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">Top notes</span>
                  <input
                    name="notesTop"
                    defaultValue={product?.notePyramid.top.join(', ')}
                    placeholder="Comma-separated"
                    className={fieldClass(false)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">Heart notes</span>
                  <input
                    name="notesHeart"
                    defaultValue={product?.notePyramid.heart.join(', ')}
                    className={fieldClass(false)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-stone-700">Base notes</span>
                  <input
                    name="notesBase"
                    defaultValue={product?.notePyramid.base.join(', ')}
                    className={fieldClass(false)}
                  />
                </label>
              </div>
            </AdminCard>

            <AdminCard
              title="Product Images"
              description="Upload multiple images at once. Each file is converted to WebP before saving."
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  applyFiles(e.dataTransfer.files);
                }}
                className={`rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                  dragging
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 bg-stone-50'
                }`}
              >
                <Upload className="mx-auto h-8 w-8 text-stone-400" aria-hidden />
                <p className="mt-3 text-sm font-medium text-stone-800">
                  Drag & drop product images
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  or click to browse · JPG / PNG / WebP / AVIF
                </p>
                <button
                  type="button"
                  className={`${primaryButtonClassName()} mt-4`}
                  onClick={() => fileRef.current?.click()}
                >
                  <ImagePlus className="h-4 w-4" aria-hidden />
                  Upload Images
                </button>
                <input
                  ref={fileRef}
                  name="images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
                />
                {fileCount > 0 && (
                  <p className="mt-3 text-xs font-medium text-amber-800">
                    {fileCount} file{fileCount === 1 ? '' : 's'} selected — will
                    convert to WebP on save
                  </p>
                )}
              </div>
            </AdminCard>
          </div>

          <div className="space-y-6 xl:sticky xl:top-20 xl:self-start">
            <AdminCard title="Pricing">
              <label className="block text-sm">
                <span className="font-medium text-stone-700">
                  Price (₹)
                  <RequiredMark />
                </span>
                <input
                  name="priceValue"
                  type="number"
                  min={1}
                  required
                  aria-required
                  aria-invalid={isInvalid('priceValue')}
                  defaultValue={product?.priceValue ?? 399}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (e.target.value.trim() && Number.isFinite(n) && n > 0) {
                      clearInvalid('priceValue');
                    }
                  }}
                  className={fieldClass(isInvalid('priceValue'))}
                />
                <FieldError show={isInvalid('priceValue')} />
              </label>
            </AdminCard>

            <AdminCard
              title="Publishing"
              description="Control storefront visibility and featured placement."
            >
              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 px-3 py-3">
                  <span>
                    <span className="block font-medium text-stone-800">
                      Available
                    </span>
                    <span className="text-xs text-stone-500">
                      Published on the storefront
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    name="available"
                    defaultChecked={product?.available ?? true}
                    className="h-4 w-4 rounded border-stone-300 text-amber-800 focus:ring-amber-700"
                  />
                </label>
                <label className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 px-3 py-3">
                  <span>
                    <span className="block font-medium text-stone-800">
                      Featured
                    </span>
                    <span className="text-xs text-stone-500">
                      Highlight in featured sections
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={product?.featured ?? false}
                    className="h-4 w-4 rounded border-stone-300 text-amber-800 focus:ring-amber-700"
                  />
                </label>
              </div>
            </AdminCard>
          </div>
        </div>

        {product && product.images.length > 0 && (
          <AdminCard
            title="Gallery"
            description="Reorder images, set the storefront thumbnail, or remove images."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                        alt={img.alt || product.name}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                      {isThumb && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                          <Star className="h-3 w-3 fill-white" aria-hidden />
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5">
                      <button
                        type="button"
                        disabled={imagePending || isThumb}
                        className="text-xs font-medium text-amber-800 hover:underline disabled:opacity-50"
                        onClick={() =>
                          runImageAction(setThumbnailAction, {
                            productId: product.id,
                            imageId: img.id,
                          })
                        }
                      >
                        {isThumb ? 'Thumbnail' : 'Set thumbnail'}
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Move image up"
                          disabled={imagePending}
                          className="rounded p-1.5 text-stone-500 hover:bg-stone-100 disabled:opacity-50"
                          onClick={() =>
                            runImageAction(reorderProductImageAction, {
                              imageId: img.id,
                              direction: 'up',
                            })
                          }
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Move image down"
                          disabled={imagePending}
                          className="rounded p-1.5 text-stone-500 hover:bg-stone-100 disabled:opacity-50"
                          onClick={() =>
                            runImageAction(reorderProductImageAction, {
                              imageId: img.id,
                              direction: 'down',
                            })
                          }
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete image"
                          disabled={imagePending}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          onClick={() => setDeleteImageId(img.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AdminCard>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <SubmitButton isEdit={Boolean(product)} />
      </form>

      <ConfirmDialog
        open={Boolean(deleteImageId)}
        title="Delete image?"
        description="This removes the image from the gallery. Blob cleanup is best-effort."
        confirmLabel="Delete"
        pending={imagePending}
        onCancel={() => setDeleteImageId(null)}
        onConfirm={() => {
          if (!deleteImageId) return;
          runImageAction(deleteProductImageAction, { imageId: deleteImageId });
        }}
      />
    </div>
  );
}
