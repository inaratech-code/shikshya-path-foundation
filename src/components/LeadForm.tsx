'use client';

import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import { applyDestinationSelectOptions, siteContact } from '@/data/siteContent';
import { createClient } from '@/lib/supabase/client';

type LeadFormState = {
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
};

const INITIAL: LeadFormState = {
  full_name: '',
  email: '',
  phone: '',
  destination: applyDestinationSelectOptions[0]?.value ?? '',
  message: '',
};

function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  if (typeof e === 'object' && e && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message;
  }
  return 'Submission failed. Please try again.';
}

function normalizeDestination(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  const fromOptions = applyDestinationSelectOptions.find((d) => d.value === v)?.label;
  return (fromOptions ?? v).trim() || null;
}

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.full_name.trim().length > 0 && form.email.trim().length > 0 && !submitting;
  }, [form.email, form.full_name, submitting]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);
    setSubmitting(true);

    try {
      const supabase = createClient();

      const payload = {
        full_name: form.full_name.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        destination: normalizeDestination(form.destination),
        message: form.message.trim() || null,
      };

      const { data, error: insertError } = await supabase
        .from('leads')
        .insert(payload)
        .select('id, full_name, email, phone, destination, message, status, created_at')
        .single();

      if (insertError) throw insertError;

      // Server-side email dispatch (no credentials in the browser).
      // If the email fails, we still consider the submission successful since the lead is saved.
      const { error: fnError } = await supabase.functions.invoke('send-admin-email', {
        body: {
          full_name: data?.full_name ?? payload.full_name,
          email: data?.email ?? payload.email,
          phone: data?.phone ?? payload.phone,
          destination: data?.destination ?? payload.destination,
          message: data?.message ?? payload.message,
          status: data?.status ?? 'received',
        },
      });
      if (fnError) {
        console.warn('[send-admin-email] failed', fnError);
      }

      setDone(true);
      setForm(INITIAL);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {done ? (
        <div className="rounded-2xl bg-accent-soft border border-accent-soft-border p-6">
          <div className="text-[var(--color-accent-foreground)] font-bold text-lg">Thank you</div>
          <p className="text-[var(--color-accent-foreground)]/90 mt-2">
            We’ve received your message and will get back to you soon.
          </p>
        </div>
      ) : (
        <form id="contact-form" className="space-y-6 scroll-mt-28" onSubmit={handleSubmit}>
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
          ) : null}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={form.full_name}
              onChange={(e) => setForm((s) => ({ ...s, full_name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
              placeholder={siteContact.email}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone / WhatsApp</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
              placeholder={siteContact.mobile}
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Study Destination</label>
            <select
              required
              value={form.destination}
              onChange={(e) => setForm((s) => ({ ...s, destination: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
            >
              {applyDestinationSelectOptions.map((o) => (
                <option key={o.label + o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Message or Questions</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
              placeholder="Tell us about your educational background and goals..."
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-black px-8 py-4 rounded-xl transition-all shadow-xl shadow-[var(--color-primary)]/20 text-base sm:text-lg hover:scale-[1.02] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {submitting ? (
              'Sending…'
            ) : (
              <>
                Submit Request <Send size={20} />
              </>
            )}
          </button>
        </form>
      )}
    </>
  );
}

