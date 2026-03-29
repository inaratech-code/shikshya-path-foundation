import { NextResponse } from 'next/server';
import { dbListLeads } from '@/lib/leadsDb';
import { getSupabaseServiceRoleConfigHint } from '@/lib/supabaseEnv';
import { supabaseServiceConfigured } from '@/lib/offersDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

export const runtime = 'nodejs';

/** GET: list leads (admin only; requires service role + Supabase). */
export async function GET(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseServiceConfigured()) {
    return NextResponse.json([], {
      headers: {
        'X-Leads-Requires-Service-Role': '1',
        'X-Leads-Config-Hint': getSupabaseServiceRoleConfigHint(),
      },
    });
  }
  try {
    return NextResponse.json(await dbListLeads());
  } catch (e) {
    console.error('[api/leads GET]', e);
    return NextResponse.json({ error: 'Failed to load leads' }, { status: 500 });
  }
}
