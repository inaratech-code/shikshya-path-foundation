import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { PublishedOffer } from '@/types/offer';
import { isSupabaseEnvConfigured } from '@/lib/supabaseEnv';

type OfferRow = {
  id: string;
  title: string;
  subtitle: string;
  badge: string | null;
  active: boolean;
  created_at: string;
};

function mapRow(row: OfferRow): PublishedOffer {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    badge: row.badge ?? undefined,
    active: row.active,
    createdAt: row.created_at,
  };
}

export function supabaseAnonConfigured(): boolean {
  return isSupabaseEnvConfigured();
}

/** Service role required for admin writes and listing all rows (including inactive). */
export function supabaseServiceConfigured(): boolean {
  return supabaseAnonConfigured() && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function anonClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function serviceClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function dbGetPublicOffers(): Promise<PublishedOffer[]> {
  const { data, error } = await anonClient()
    .from('offers')
    .select('id, title, subtitle, badge, active, created_at')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as OfferRow[]).map(mapRow);
}

export async function dbGetAllOffers(): Promise<PublishedOffer[]> {
  const { data, error } = await serviceClient()
    .from('offers')
    .select('id, title, subtitle, badge, active, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as OfferRow[]).map(mapRow);
}

export async function dbInsertOffer(input: {
  title: string;
  subtitle: string;
  badge?: string;
  active: boolean;
}): Promise<PublishedOffer> {
  const { data, error } = await serviceClient()
    .from('offers')
    .insert({
      title: input.title,
      subtitle: input.subtitle,
      badge: input.badge ?? null,
      active: input.active,
    })
    .select('id, title, subtitle, badge, active, created_at')
    .single();

  if (error) throw error;
  return mapRow(data as OfferRow);
}

export async function dbUpdateOfferActive(id: string, active: boolean): Promise<PublishedOffer | null> {
  const { data, error } = await serviceClient()
    .from('offers')
    .update({ active })
    .eq('id', id)
    .select('id, title, subtitle, badge, active, created_at')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return mapRow(data as OfferRow);
}

export async function dbDeleteOffer(id: string): Promise<boolean> {
  const { data, error } = await serviceClient().from('offers').delete().eq('id', id).select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
