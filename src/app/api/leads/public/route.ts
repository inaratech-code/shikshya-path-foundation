import { NextResponse } from 'next/server';
import { validateLeadEmail, validateNepalMobileDigits } from '@/lib/applyNowValidation';
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
    const emailCheck = validateLeadEmail(emailRaw);
    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }

    const phoneRaw = typeof body.phone === 'string' ? body.phone.trim() : '';
    if (phoneRaw) {
      let d = phoneRaw.replace(/\D/g, '');
      if (d.startsWith('977') && d.length >= 13) d = d.slice(3, 13);
      else if (d.length > 10) d = d.slice(-10);
      const phoneCheck = validateNepalMobileDigits(d);
      if (!phoneCheck.ok) {
        return NextResponse.json({ error: phoneCheck.error }, { status: 400 });
      }
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
      return new NextResponse(null, { status: 204 });
    }

    if (isSupabaseServiceRoleConfigured()) {
      await dbInsertLeadWithServiceRole(row);
      return new NextResponse(null, { status: 204 });
    }

    if (process.env.NODE_ENV === 'development') {
      try {
        await appendDevLeadFallback(row);
        return new NextResponse(null, { status: 204 });
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
