import { NextResponse } from 'next/server';
import { readAllGallery } from '@/lib/galleryStore';
import { readAllOffers } from '@/lib/offersStore';
import { dbGetAllGallery, dbGetPublicGallery, supabaseAnonConfigured as galleryAnonOk } from '@/lib/galleryDb';
import {
  dbGetAllOffers,
  dbGetPublicOffers,
  supabaseAnonConfigured,
  supabaseServiceConfigured,
} from '@/lib/offersDb';
import { dbCountLeads, dbListLeads } from '@/lib/leadsDb';
import { getSupabaseServiceRoleConfigHint } from '@/lib/supabaseEnv';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

export const runtime = 'nodejs';

/** Aggregated counts for the admin dashboard (Bearer auth). */
export async function GET(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = {
    leadsTotal: 0,
    offersActive: 0,
    galleryActive: 0,
    leadsConfigured: supabaseServiceConfigured(),
    /** Why the server thinks the service role is missing (no secrets). */
    leadsConfigHint: getSupabaseServiceRoleConfigHint(),
    recentLeads: [] as {
      id: string;
      name: string;
      email: string;
      destination: string;
      date: string;
    }[],
  };

  try {
    if (supabaseServiceConfigured()) {
      const [total, recent] = await Promise.all([dbCountLeads(), dbListLeads(5)]);
      payload.leadsTotal = total;
      payload.recentLeads = recent.map((r) => ({
        id: r.id,
        name: r.full_name?.trim() || '—',
        email: r.email || '—',
        destination: r.destination?.trim() || '—',
        date: new Date(r.created_at).toLocaleString(),
      }));
    }
  } catch (e) {
    console.error('[admin/stats] leads', e);
  }

  try {
    if (supabaseServiceConfigured()) {
      const all = await dbGetAllOffers();
      payload.offersActive = all.filter((o) => o.active).length;
    } else if (supabaseAnonConfigured()) {
      const pub = await dbGetPublicOffers();
      payload.offersActive = pub.length;
    } else {
      const all = await readAllOffers();
      payload.offersActive = all.filter((o) => o.active).length;
    }
  } catch (e) {
    console.error('[admin/stats] offers', e);
  }

  try {
    if (supabaseServiceConfigured()) {
      const all = await dbGetAllGallery();
      payload.galleryActive = all.filter((g) => g.active).length;
    } else if (galleryAnonOk()) {
      const pub = await dbGetPublicGallery();
      payload.galleryActive = pub.length;
    } else {
      const all = await readAllGallery();
      payload.galleryActive = all.filter((g) => g.active).length;
    }
  } catch (e) {
    console.error('[admin/stats] gallery', e);
  }

  return NextResponse.json(payload);
}
