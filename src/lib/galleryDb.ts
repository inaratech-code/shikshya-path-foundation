import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { GalleryItem } from '@/types/gallery';
import {
  getNextPublicSupabaseUrl,
  getSupabaseServiceRoleKey,
  isSupabaseEnvConfigured,
  isSupabaseServiceRoleConfigured,
} from '@/lib/supabaseEnv';

type GalleryRow = {
  id: string;
  title: string;
  image_url: string;
  active: boolean;
  sort_order: number;
  created_at: string;
};

function mapRow(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    imageUrl: row.image_url,
    active: row.active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export function supabaseAnonConfigured(): boolean {
  return isSupabaseEnvConfigured();
}

export function supabaseServiceConfigured(): boolean {
  return isSupabaseServiceRoleConfigured();
}

function anonClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function serviceClient(): SupabaseClient {
  const url = getNextPublicSupabaseUrl()!;
  const key = getSupabaseServiceRoleKey()!;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function dbGetPublicGallery(): Promise<GalleryItem[]> {
  const { data, error } = await anonClient()
    .from('gallery_items')
    .select('id, title, image_url, active, sort_order, created_at')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as GalleryRow[]).map(mapRow);
}

export async function dbGetAllGallery(): Promise<GalleryItem[]> {
  const { data, error } = await serviceClient()
    .from('gallery_items')
    .select('id, title, image_url, active, sort_order, created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as GalleryRow[]).map(mapRow);
}

export async function dbInsertGalleryItem(input: {
  title: string;
  imageUrl: string;
  sortOrder?: number;
  active: boolean;
}): Promise<GalleryItem> {
  const { data, error } = await serviceClient()
    .from('gallery_items')
    .insert({
      title: input.title,
      image_url: input.imageUrl,
      active: input.active,
      sort_order: input.sortOrder ?? 0,
    })
    .select('id, title, image_url, active, sort_order, created_at')
    .single();

  if (error) throw error;
  return mapRow(data as GalleryRow);
}

export async function dbUpdateGalleryActive(id: string, active: boolean): Promise<GalleryItem | null> {
  const { data, error } = await serviceClient()
    .from('gallery_items')
    .update({ active })
    .eq('id', id)
    .select('id, title, image_url, active, sort_order, created_at')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return mapRow(data as GalleryRow);
}

export async function dbGetGalleryItemById(id: string): Promise<GalleryItem | null> {
  const { data, error } = await serviceClient()
    .from('gallery_items')
    .select('id, title, image_url, active, sort_order, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return mapRow(data as GalleryRow);
}

export async function dbDeleteGalleryItem(id: string): Promise<boolean> {
  const { data, error } = await serviceClient().from('gallery_items').delete().eq('id', id).select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
