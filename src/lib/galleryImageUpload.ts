import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

/** Max upload size (bytes). */
export const GALLERY_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;

/** Allowed image MIME types for gallery uploads. */
export const GALLERY_ALLOWED_MIME = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'image/bmp',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/heic',
  'image/heif',
]);

const MIME_TO_EXT: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
  'image/bmp': '.bmp',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
  'image/heic': '.heic',
  'image/heif': '.heif',
};

export function extensionForGalleryMime(mime: string): string | null {
  const m = mime.split(';')[0].trim().toLowerCase();
  return MIME_TO_EXT[m] ?? null;
}

export function isAllowedGalleryMime(mime: string): boolean {
  const m = mime.split(';')[0].trim().toLowerCase();
  if (GALLERY_ALLOWED_MIME.has(m)) return true;
  if (m.startsWith('image/')) return true;
  return false;
}

/** Light magic-byte check for common formats; HEIC/SVG and some clients get a pass on declared MIME. */
export function looksLikeImageBuffer(buf: Buffer, mime: string): boolean {
  const m = mime.split(';')[0].trim().toLowerCase();
  if (buf.length < 4) return false;
  if (m === 'image/svg+xml') return true;
  if (m === 'image/heic' || m === 'image/heif') return buf.length > 16;
  if (buf.length >= 12) {
    if (m === 'image/png' && buf[0] === 0x89 && buf[1] === 0x50) return true;
    if ((m === 'image/jpeg' || m === 'image/jpg') && buf[0] === 0xff && buf[1] === 0xd8) return true;
    const g = buf.toString('ascii', 0, 6);
    if (m === 'image/gif' && (g === 'GIF87a' || g === 'GIF89a')) return true;
    if (m === 'image/webp' && buf.length >= 12 && buf.toString('ascii', 8, 12) === 'WEBP') return true;
  }
  if (m.startsWith('image/')) return true;
  return false;
}

const PUBLIC_REL = path.join('public', 'uploads', 'gallery');

/** Save under `public/uploads/gallery/` and return site path e.g. `/uploads/gallery/uuid.png`. */
export async function saveGalleryImageLocal(buffer: Buffer, ext: string): Promise<string> {
  const dir = path.join(process.cwd(), PUBLIC_REL);
  await mkdir(dir, { recursive: true });
  const safeExt = ext.startsWith('.') ? ext : `.${ext}`;
  const name = `${randomUUID()}${safeExt}`;
  const full = path.join(dir, name);
  await writeFile(full, buffer);
  return `/uploads/gallery/${name}`;
}

/** Accepts absolute https URLs or local paths from {@link saveGalleryImageLocal}. */
export function isValidGalleryStoredImageUrl(url: string): boolean {
  if (url.length > 2000) return false;
  if (/^https?:\/\//i.test(url)) return true;
  if (!url.startsWith('/uploads/gallery/')) return false;
  if (url.includes('..') || url.includes('\\')) return false;
  const rest = url.slice('/uploads/gallery/'.length);
  return /^[a-f0-9-]{36}\.[a-z0-9]{1,12}$/i.test(rest);
}
