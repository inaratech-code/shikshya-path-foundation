/**
 * True when NEXT_PUBLIC_SUPABASE_* look like a real project (not copy-paste placeholders).
 */
export function isSupabaseEnvConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return false;
  const u = url.toLowerCase();
  if (u.includes('your_project_ref')) return false;
  if (u.includes('xxxxxxxx')) return false;
  if (!u.includes('.supabase.co')) return false;
  return true;
}

/**
 * Server-only: `SUPABASE_SERVICE_ROLE_KEY` + project URL are enough for the service client.
 * Intentionally does not require `isSupabaseEnvConfigured()` (anon + `.supabase.co` checks), so custom
 * Supabase URLs or stricter anon validation cannot block admin reads when the service key is set.
 */
export function isSupabaseServiceRoleConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !k) return false;
  if (!url.startsWith('http')) return false;
  const u = url.toLowerCase();
  if (u.includes('your_project_ref') || u.includes('xxxxxxxx')) return false;
  return true;
}
