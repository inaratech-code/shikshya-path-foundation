import { NextResponse } from 'next/server';
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/adminAllowlist';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { getNextPublicSupabaseUrl, getSupabaseServiceRoleKey, isSupabaseServiceRoleConfigured } from '@/lib/supabaseEnv';
import { deleteGalleryAssetForUrl } from '@/lib/galleryAssetDelete';

export const runtime = 'nodejs';

type PurgeTarget = 'leads' | 'offers' | 'gallery_items' | 'gallery_assets';

function parseTargets(v: unknown): PurgeTarget[] {
  if (!Array.isArray(v)) return [];
  const allowed: PurgeTarget[] = ['leads', 'offers', 'gallery_items', 'gallery_assets'];
  const set = new Set<PurgeTarget>();
  for (const x of v) {
    if (typeof x === 'string' && (allowed as string[]).includes(x)) set.add(x as PurgeTarget);
  }
  return [...set];
}

function serviceClient() {
  const url = getNextPublicSupabaseUrl();
  const key = getSupabaseServiceRoleKey();
  if (!url || !key) throw new Error('Supabase service role not configured');
  return createServiceClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function ensureAdmin(): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return { ok: false, status: 401, error: 'Unauthorized' };
    const allowlist = process.env.ADMIN_EMAIL_ALLOWLIST;
    if (!isAdminEmail(data.user?.email, allowlist)) return { ok: false, status: 403, error: 'Forbidden' };
    return { ok: true };
  } catch {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }
}

export async function POST(request: Request) {
  const auth = await ensureAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const targets = parseTargets((body as { targets?: unknown })?.targets);
  if (targets.length === 0) {
    return NextResponse.json({ error: 'Select at least one delete option.' }, { status: 400 });
  }

  const client = serviceClient();
  const result: Record<string, { deleted?: number; ok: boolean; note?: string }> = {};

  // If deleting gallery assets, fetch URLs first (before deleting rows).
  let galleryUrls: string[] = [];
  if (targets.includes('gallery_assets') || targets.includes('gallery_items')) {
    const { data, error } = await client.from('gallery_items').select('image_url');
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    galleryUrls = (data ?? []).map((r) => (r as { image_url?: string }).image_url).filter((u): u is string => typeof u === 'string');
  }

  if (targets.includes('gallery_assets')) {
    // Best-effort delete each asset. (Storage deletion may no-op for external URLs.)
    await Promise.allSettled(galleryUrls.map((u) => deleteGalleryAssetForUrl(u)));
    result.gallery_assets = { ok: true, note: `Attempted to delete ${galleryUrls.length} assets.` };
  }

  if (targets.includes('gallery_items')) {
    const { data, error } = await client
      .from('gallery_items')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      .select('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    result.gallery_items = { ok: true, deleted: (data?.length ?? 0) };
  }

  if (targets.includes('offers')) {
    const { data, error } = await client
      .from('offers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      .select('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    result.offers = { ok: true, deleted: (data?.length ?? 0) };
  }

  if (targets.includes('leads')) {
    const { data, error } = await client
      .from('leads')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
      .select('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    result.leads = { ok: true, deleted: (data?.length ?? 0) };
  }

  return NextResponse.json({ ok: true, result });
}

