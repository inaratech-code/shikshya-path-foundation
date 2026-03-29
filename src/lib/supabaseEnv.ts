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
