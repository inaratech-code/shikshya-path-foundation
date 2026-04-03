import { NextResponse } from 'next/server';
import { appendDevLeadFallback } from '@/lib/devLeadsFallback';
import { dbInsertLeadPublic, dbInsertLeadWithServiceRole } from '@/lib/leadsDb';
import { isSupabaseEnvConfigured, isSupabaseServiceRoleConfigured } from '@/lib/supabaseEnv';

const MAX_LEN = 8000;

function trimStr(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

/**
 * Public POST — saves a lead to Supabase: anon insert when configured, else service-role insert
 * (server-only; same table). Dev fallback writes to tmp when neither is available.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';
    if (!emailRaw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const row = {
      full_name: trimStr(body.full_name, 500),
      email: emailRaw,
      phone: trimStr(body.phone, 80),
      destination: trimStr(body.destination, 500),
      message: trimStr(body.message, MAX_LEN),
    };

    if (isSupabaseEnvConfigured()) {
      await dbInsertLeadPublic(row);
      return NextResponse.json({ ok: true });
    }

    if (isSupabaseServiceRoleConfigured()) {
      await dbInsertLeadWithServiceRole(row);
      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV === 'development') {
      try {
        await appendDevLeadFallback(row);
        return NextResponse.json({ ok: true, dev: true });
      } catch (e) {
        console.error('[api/leads/public] dev fallback write failed', e);
      }
    }

    return NextResponse.json(
      { error: 'Submissions are temporarily unavailable. Please call or email us instead.' },
      { status: 503 }
    );
  } catch (e) {
    console.error('[api/leads/public POST]', e);
    return NextResponse.json(
      { error: 'Could not save your request. Please try again or contact us by phone.' },
      { status: 500 }
    );
  }
}
