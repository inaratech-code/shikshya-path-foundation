import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseEnvConfigured } from '@/lib/supabaseEnv';
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
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function dbListLeads(): Promise<LeadRecord[]> {
  const { data, error } = await serviceClient()
    .from('leads')
    .select('id, full_name, email, phone, destination, message, status, created_at')
    .order('created_at', { ascending: false });

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
