import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import {
  getNextPublicSupabaseUrl,
  getSupabaseServiceRoleKey,
  isSupabaseServiceRoleConfigured,
} from '@/lib/supabaseEnv';

/**
 * Upload bytes to Supabase Storage (public bucket). Returns public URL.
 * Bucket must exist and allow public reads (create in Dashboard → Storage).
 */
export async function uploadGalleryBufferToSupabase(
  buffer: Buffer,
  contentType: string,
  extWithDot: string
): Promise<string> {
  if (!isSupabaseServiceRoleConfigured()) {
    throw new Error('Supabase service role not configured');
  }
  const url = getNextPublicSupabaseUrl()!;
  const key = getSupabaseServiceRoleKey()!;
  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const bucket = process.env.SUPABASE_GALLERY_BUCKET?.trim() || 'gallery-uploads';
  const objectPath = `${Date.now()}-${randomUUID()}${extWithDot.startsWith('.') ? extWithDot : `.${extWithDot}`}`;

  const { error } = await client.storage.from(bucket).upload(objectPath, buffer, {
    contentType: contentType.split(';')[0].trim(),
    upsert: false,
    cacheControl: '31536000',
  });
  if (error) throw error;

  const { data } = client.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl;
}

/** Remove an object whose public URL was returned from {@link uploadGalleryBufferToSupabase}. No-op if URL does not match storage pattern. */
export async function deleteGalleryObjectByPublicUrl(publicUrl: string): Promise<void> {
  if (!isSupabaseServiceRoleConfigured()) return;
  const clean = publicUrl.split('?')[0];
  const match = clean.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
  if (!match) return;
  const bucket = match[1];
  const objectPath = decodeURIComponent(match[2]);
  const url = getNextPublicSupabaseUrl()!;
  const key = getSupabaseServiceRoleKey()!;
  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await client.storage.from(bucket).remove([objectPath]);
  if (error) console.warn('[gallery storage] delete failed:', error.message);
}
