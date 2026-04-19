import type { SupabaseServiceRoleConfigHint } from '@/lib/supabaseEnv';

/** User-facing copy when the server reports why the service role is not active (no secrets). */
export function serviceRoleHintText(h: SupabaseServiceRoleConfigHint): string {
  switch (h) {
    case 'missing-url':
      return 'Set NEXT_PUBLIC_SUPABASE_URL in env (project root .env.local or your host dashboard).';
    case 'missing-service-key':
      return 'Server does not see SUPABASE_SERVICE_ROLE_KEY: stop the dev server (Ctrl+C), start npm run dev again. In production, add the variable and redeploy.';
    case 'invalid-url':
      return 'NEXT_PUBLIC_SUPABASE_URL must start with https://';
    case 'placeholder-url':
      return 'Replace placeholder Supabase URL in env with your real project URL.';
    default:
      return 'Check env and restart dev / redeploy.';
  }
}
