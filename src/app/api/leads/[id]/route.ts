import { NextResponse } from 'next/server';
import { dbDeleteLead, dbUpdateLeadStatus } from '@/lib/leadsDb';
import { supabaseServiceConfigured } from '@/lib/offersDb';
import { offersWriteAuthorized } from '@/lib/offersApiAuth';

const STATUSES = new Set(['received', 'contacted', 'processed', 'onboarded']);

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseServiceConfigured()) {
    return NextResponse.json({ error: 'Supabase service role not configured' }, { status: 503 });
  }
  const { id } = await ctx.params;
  try {
    const body = (await request.json()) as { status?: string };
    const status = typeof body.status === 'string' ? body.status.trim() : '';
    if (!status || !STATUSES.has(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    const updated = await dbUpdateLeadStatus(id, status);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  if (!offersWriteAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabaseServiceConfigured()) {
    return NextResponse.json({ error: 'Supabase service role not configured' }, { status: 503 });
  }
  const { id } = await ctx.params;
  try {
    const ok = await dbDeleteLead(id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
