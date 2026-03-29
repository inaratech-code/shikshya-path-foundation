import { NextResponse } from 'next/server';
import { dbInsertLeadPublic } from '@/lib/leadsDb';
import { isSupabaseEnvConfigured } from '@/lib/supabaseEnv';

const MAX_LEN = 8000;

function trimStr(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

/**
 * Public POST — saves a lead to Supabase (anon insert per RLS).
 * No auth header; do not put secrets here.
 */
export async function POST(request: Request) {
  if (!isSupabaseEnvConfigured()) {
    return NextResponse.json(
      { error: 'Submissions are temporarily unavailable. Please call or email us instead.' },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';
    if (!emailRaw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    await dbInsertLeadPublic({
      full_name: trimStr(body.full_name, 500),
      email: emailRaw,
      phone: trimStr(body.phone, 80),
      destination: trimStr(body.destination, 500),
      message: trimStr(body.message, MAX_LEN),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/leads/public POST]', e);
    return NextResponse.json(
      { error: 'Could not save your request. Please try again or contact us by phone.' },
      { status: 500 }
    );
  }
}
