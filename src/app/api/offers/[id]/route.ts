import { NextResponse } from 'next/server';
import { readAllOffers, writeAllOffers } from '@/lib/offersStore';
import { dbDeleteOffer, dbUpdateOfferActive, supabaseServiceConfigured } from '@/lib/offersDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    const body = (await request.json()) as { active?: boolean };
    if (typeof body.active !== 'boolean') {
      return NextResponse.json({ error: 'active boolean required' }, { status: 400 });
    }

    if (supabaseServiceConfigured()) {
      const updated = await dbUpdateOfferActive(id, body.active);
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(updated);
    }

    const offers = await readAllOffers();
    const idx = offers.findIndex((o) => o.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    offers[idx].active = body.active;
    await writeAllOffers(offers);
    return NextResponse.json(offers[idx]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await ctx.params;
  try {
    if (supabaseServiceConfigured()) {
      const ok = await dbDeleteOffer(id);
      if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    const offers = await readAllOffers();
    const next = offers.filter((o) => o.id !== id);
    if (next.length === offers.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await writeAllOffers(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
