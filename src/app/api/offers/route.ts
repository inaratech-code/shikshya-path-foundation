import { NextResponse } from 'next/server';
import { readAllOffers, writeAllOffers } from '@/lib/offersStore';
import {
  dbGetAllOffers,
  dbGetPublicOffers,
  dbInsertOffer,
  supabaseAnonConfigured,
  supabaseServiceConfigured,
} from '@/lib/offersDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';
import type { PublishedOffer } from '@/types/offer';

/** GET: active offers for the public site. With valid Authorization Bearer, returns all offers (admin). */
export async function GET(request: Request) {
  try {
    if (offersWriteAuthorized(request)) {
      if (supabaseServiceConfigured()) {
        return NextResponse.json(await dbGetAllOffers());
      }
      // Anon-only: RLS allows select for active rows — show those instead of empty local JSON
      if (supabaseAnonConfigured()) {
        try {
          return NextResponse.json(await dbGetPublicOffers());
        } catch (e) {
          console.error('[api/offers GET admin]', e);
        }
      }
      return NextResponse.json(await readAllOffers());
    }

    // Public read: prefer service role when available (server-side),
    // so the website can show offers even if anon RLS blocks select.
    if (supabaseServiceConfigured()) {
      const all = await dbGetAllOffers();
      const active = all
        .filter((o) => o.active)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return NextResponse.json(active);
    }

    if (supabaseAnonConfigured()) {
      try {
        return NextResponse.json(await dbGetPublicOffers());
      } catch (e) {
        console.error('[api/offers GET]', e);
      }
    }
    const all = await readAllOffers();
    const active = all
      .filter((o) => o.active)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(active);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to read offers' }, { status: 500 });
  }
}

/** POST: create offer (admin only). */
export async function POST(request: Request) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Partial<PublishedOffer>;
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const subtitle = typeof body.subtitle === 'string' ? body.subtitle.trim() : '';
    if (!title || !subtitle) {
      return NextResponse.json({ error: 'Title and subtitle are required' }, { status: 400 });
    }
    const badge = typeof body.badge === 'string' ? body.badge.trim() || undefined : undefined;
    const active = body.active !== false;

    if (supabaseServiceConfigured()) {
      const offer = await dbInsertOffer({ title, subtitle, badge, active });
      return NextResponse.json(offer);
    }

    const offers = await readAllOffers();
    const offer: PublishedOffer = {
      id: crypto.randomUUID(),
      title,
      subtitle,
      badge,
      active,
      createdAt: new Date().toISOString(),
    };
    offers.unshift(offer);
    await writeAllOffers(offers);
    return NextResponse.json(offer);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : 'Failed to save offer. Add SUPABASE_SERVICE_ROLE_KEY to .env.local to use the database.',
      },
      { status: 500 }
    );
  }
}
