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

/** Server-only: `SUPABASE_SERVICE_ROLE_KEY` is required to read/count `leads`, full `offers`, etc. (bypasses RLS). */
export function isSupabaseServiceRoleConfigured(): boolean {
  if (!isSupabaseEnvConfigured()) return false;
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return !!k && k.length > 0;
}
