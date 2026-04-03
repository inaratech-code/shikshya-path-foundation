import { promises as fs } from 'fs';
import path from 'path';
import type { GalleryItem } from '@/types/gallery';
import { dbGetPublicGallery, supabaseAnonConfigured } from '@/lib/galleryDb';

const GALLERY_PATH = path.join(process.cwd(), 'src', 'data', 'gallery.json');

function extractSupabaseLikeError(e: unknown): { message: string; code?: string } {
  if (e && typeof e === 'object') {
    const o = e as Record<string, unknown>;
    const message = typeof o.message === 'string' ? o.message : '';
    const code = typeof o.code === 'string' ? o.code : undefined;
    if (message || code) return { message: message || '(no message)', code };
  }
  if (e instanceof Error) return { message: e.message };
  return { message: String(e) };
}

/** Human-readable message for API responses (Supabase errors are not always `instanceof Error`). */
export function galleryErrorMessage(e: unknown): string {
  return extractSupabaseLikeError(e).message;
}

/** PostgREST: `gallery_items` missing / migration not applied — safe to fall back to JSON. */
export function isGallerySupabaseMissingTableError(e: unknown): boolean {
  const { message, code } = extractSupabaseLikeError(e);
  return (
    code === 'PGRST205' ||
    code === '42P01' ||
    /schema cache|could not find the table|does not exist|gallery_items/i.test(message)
  );
}

/** Public site: Supabase when configured, else local JSON file. */
export async function getPublicGallery(): Promise<GalleryItem[]> {
  if (supabaseAnonConfigured()) {
    try {
      return await dbGetPublicGallery();
    } catch (e) {
      if (!isGallerySupabaseMissingTableError(e)) {
        const { message, code } = extractSupabaseLikeError(e);
        console.warn(
          '[gallery] Supabase read failed, using local JSON.',
          code ? `${code}: ${message}` : message
        );
      }
    }
  }
  const all = await readAllGallery();
  return all
    .filter((g) => g.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function readAllGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(GALLERY_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as GalleryItem[];
  } catch {
    return [];
  }
}

export async function writeAllGallery(items: GalleryItem[]): Promise<void> {
  await fs.mkdir(path.dirname(GALLERY_PATH), { recursive: true });
  await fs.writeFile(GALLERY_PATH, JSON.stringify(items, null, 2), 'utf8');
}
