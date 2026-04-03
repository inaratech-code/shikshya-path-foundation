import { NextResponse } from 'next/server';
import {
  extensionForGalleryMime,
  GALLERY_UPLOAD_MAX_BYTES,
  isAllowedGalleryMime,
  looksLikeImageBuffer,
  saveGalleryImageLocal,
} from '@/lib/galleryImageUpload';
import { uploadGalleryBufferToSupabase } from '@/lib/gallerySupabaseStorage';
import { isSupabaseServiceRoleConfigured } from '@/lib/supabaseEnv';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

export const runtime = 'nodejs';

/**
 * Multipart upload for admin gallery. Tries Supabase Storage when service role is set, else saves under /public/uploads/gallery.
 */
export async function POST(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Choose an image file' }, { status: 400 });
  }

  if (file.size > GALLERY_UPLOAD_MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (max ${Math.round(GALLERY_UPLOAD_MAX_BYTES / (1024 * 1024))} MB)` },
      { status: 413 }
    );
  }

  const mime = file.type || 'application/octet-stream';
  if (!isAllowedGalleryMime(mime)) {
    return NextResponse.json({ error: 'Unsupported file type. Use a common image format (PNG, JPEG, GIF, WebP, etc.).' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!looksLikeImageBuffer(buffer, mime)) {
    return NextResponse.json({ error: 'File does not look like a valid image' }, { status: 400 });
  }

  let ext = extensionForGalleryMime(mime);
  if (!ext) {
    const name = typeof file.name === 'string' ? file.name : '';
    const dot = name.lastIndexOf('.');
    ext = dot >= 0 ? name.slice(dot) : '.bin';
    if (!/^\.(png|jpe?g|gif|webp|avif|svg|bmp|ico|heic|heif)$/i.test(ext)) {
      ext = '.jpg';
    }
  }

  try {
    if (isSupabaseServiceRoleConfigured()) {
      try {
        const publicUrl = await uploadGalleryBufferToSupabase(buffer, mime, ext);
        return NextResponse.json({ url: publicUrl });
      } catch (e) {
        console.warn('[api/gallery/upload] Supabase Storage failed, trying local disk:', e);
      }
    }

    const url = await saveGalleryImageLocal(buffer, ext);
    return NextResponse.json({ url });
  } catch (e) {
    console.error('[api/gallery/upload]', e);
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : 'Could not save file. On serverless hosting, configure Supabase Storage and SUPABASE_GALLERY_BUCKET.',
      },
      { status: 500 }
    );
  }
}
