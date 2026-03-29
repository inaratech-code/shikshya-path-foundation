import { NextResponse } from 'next/server';
import { readAllOffers } from '@/lib/offersStore';
import {
  dbGetAllOffers,
  dbGetPublicOffers,
  supabaseAnonConfigured,
  supabaseServiceConfigured,
} from '@/lib/offersDb';
import { dbListLeads } from '@/lib/leadsDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

/** Aggregated counts for the admin dashboard (Bearer auth). */
export async function GET(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = {
    leadsTotal: 0,
    offersActive: 0,
    testimonialsTotal: 0,
    leadsConfigured: supabaseServiceConfigured(),
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
      const leads = await dbListLeads();
      payload.leadsTotal = leads.length;
      payload.recentLeads = leads.slice(0, 5).map((r) => ({
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

  return NextResponse.json(payload);
}
