import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  getNextPublicSupabaseUrl,
  getSupabaseServiceRoleKey,
  isSupabaseEnvConfigured,
} from '@/lib/supabaseEnv';
import type { LeadRecord } from '@/types/lead';

export type { LeadRecord };

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

/** Total row count using the service role (efficient; does not fetch rows). */
export async function dbCountLeads(): Promise<number> {
  const { count, error } = await serviceClient()
    .from('leads')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count ?? 0;
}

/** List leads (newest first). Pass `limit` to avoid loading every row (e.g. dashboard preview). */
export async function dbListLeads(limit?: number): Promise<LeadRecord[]> {
  let q = serviceClient()
    .from('leads')
    .select('id, full_name, email, phone, destination, message, status, created_at')
    .order('created_at', { ascending: false });

  if (typeof limit === 'number' && limit > 0) {
    q = q.limit(limit);
  }

  const { data, error } = await q;

  if (error) throw error;
  return (data ?? []) as LeadRecord[];
}

export async function dbUpdateLeadStatus(id: string, status: string): Promise<LeadRecord | null> {
  const { data, error } = await serviceClient()
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select('id, full_name, email, phone, destination, message, status, created_at')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as LeadRecord;
}

export async function dbDeleteLead(id: string): Promise<boolean> {
  const { data, error } = await serviceClient().from('leads').delete().eq('id', id).select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

/** Insert from public forms; uses anon key (RLS allows insert on `leads`). */
export async function dbInsertLeadPublic(input: {
  full_name?: string | null;
  email: string;
  phone?: string | null;
  destination?: string | null;
  message?: string | null;
}): Promise<void> {
  if (!isSupabaseEnvConfigured()) {
    throw new Error('Supabase is not configured');
  }
  const { error } = await anonClient()
    .from('leads')
    .insert({
      full_name: input.full_name?.trim() || null,
      email: input.email.trim(),
      phone: input.phone?.trim() || null,
      destination: input.destination?.trim() || null,
      message: input.message?.trim() || null,
    });

  if (error) throw error;
}
