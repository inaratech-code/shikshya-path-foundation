import { unlink } from 'fs/promises';
import path from 'path';
import { deleteGalleryObjectByPublicUrl } from '@/lib/gallerySupabaseStorage';
import { isValidGalleryStoredImageUrl } from '@/lib/galleryImageUpload';

/** Best-effort removal of a file we uploaded (local disk or Supabase Storage). Ignores external URLs. */
export async function deleteGalleryAssetForUrl(imageUrl: string): Promise<void> {
  const u = imageUrl.trim();
  if (!u) return;

  if (u.startsWith('/uploads/gallery/') && isValidGalleryStoredImageUrl(u)) {
    const rel = u.replace(/^\//, '');
    const full = path.join(process.cwd(), 'public', rel);
    try {
      await unlink(full);
    } catch {
      // already gone or not on this machine
    }
    return;
  }

  if (/^https?:\/\//i.test(u)) {
    await deleteGalleryObjectByPublicUrl(u);
  }
}
