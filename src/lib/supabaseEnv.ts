/**
 * True when NEXT_PUBLIC_SUPABASE_* look like a real project (not copy-paste placeholders).
 * Accepts hosted `*.supabase.co`, local Supabase CLI (`127.0.0.1` / `localhost`), and custom domains.
 */
export function isSupabaseEnvConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return false;
  const u = url.toLowerCase();
  if (u.includes('your_project_ref')) return false;
  if (u.includes('xxxxxxxx')) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  } catch {
    return false;
  }
  // Supabase anon / publishable keys are JWTs
  if (!key.startsWith('eyJ')) return false;
  return true;
}

/**
 * Use bracket notation so Next.js does not inline `undefined` at build time for server secrets
 * (see https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).
 */
export function getNextPublicSupabaseUrl(): string | undefined {
  return process.env['NEXT_PUBLIC_SUPABASE_URL']?.trim();
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return process.env['SUPABASE_SERVICE_ROLE_KEY']?.trim();
}

export type SupabaseServiceRoleConfigHint =
  | 'ok'
  | 'missing-url'
  | 'missing-service-key'
  | 'invalid-url'
  | 'placeholder-url';

export function getSupabaseServiceRoleConfigHint(): SupabaseServiceRoleConfigHint {
  const url = getNextPublicSupabaseUrl();
  const k = getSupabaseServiceRoleKey();
  if (!url) return 'missing-url';
  if (!url.startsWith('http')) return 'invalid-url';
  const u = url.toLowerCase();
  if (u.includes('your_project_ref') || u.includes('xxxxxxxx')) return 'placeholder-url';
  if (!k) return 'missing-service-key';
  return 'ok';
}

/**
 * Server-only: `SUPABASE_SERVICE_ROLE_KEY` + project URL are enough for the service client.
 * Intentionally does not require `isSupabaseEnvConfigured()` (anon + `.supabase.co` checks), so custom
 * Supabase URLs or stricter anon validation cannot block admin reads when the service key is set.
 */
export function isSupabaseServiceRoleConfigured(): boolean {
  return getSupabaseServiceRoleConfigHint() === 'ok';
}
