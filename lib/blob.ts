import { del, put } from '@vercel/blob';
import sharp from 'sharp';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

export async function convertAndUploadWebp(
  file: File,
  pathnamePrefix = 'products'
): Promise<string> {
  if (!ALLOWED.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || 'unknown'}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image must be 8MB or smaller');
  }

  const input = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(input)
    .rotate()
    .resize({
      width: 2000,
      height: 2000,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  const base =
    file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]+/g, '-') ||
    'image';
  const filename = `${pathnamePrefix}/${Date.now()}-${base}.webp`;

  const blob = await put(filename, webp, {
    access: 'public',
    contentType: 'image/webp',
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function deleteBlobUrl(url: string | null | undefined) {
  if (!url) return;
  if (!url.includes('blob.vercel-storage.com') && !url.includes('public.blob.vercel-storage.com')) {
    return;
  }
  try {
    await del(url);
  } catch {
    // Best-effort cleanup
  }
}
