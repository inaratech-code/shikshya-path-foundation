'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Send } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';
import { applyDestinationSelectOptions, siteContact } from '@/data/siteContent';
import { submitLeadPublic } from '@/lib/submitLeadClient';

const academicLevels = [
  { value: '', label: 'Select academic level' },
  { value: 'see', label: 'SEE / Secondary' },
  { value: '+2', label: '+2 / Higher Secondary' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'phd', label: 'PhD' },
];

function ApplyNowBody({
  intent,
  prefill,
  onDone,
}: {
  intent: 'apply' | 'enroll';
  prefill: { preferredStudyDestination?: string; academicLevel?: string; preferredProgram?: string } | undefined;
  onDone: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initial = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      preferredStudyDestination: prefill?.preferredStudyDestination ?? '',
      academicLevel: prefill?.academicLevel ?? '',
      preferredProgram: prefill?.preferredProgram ?? '',
    }),
    [prefill]
  );

  const [form, setForm] = useState(initial);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-accent-soft border border-accent-soft-border p-6">
        <div className="text-[var(--color-accent-foreground)] font-bold text-lg">Request received</div>
        <div className="text-[var(--color-accent-foreground)]/90 mt-1">We’ll contact you shortly. If it’s urgent, please call our office.</div>

        <div className="mt-5 rounded-xl bg-white/40 border border-white/50 p-4">
          <div className="text-sm font-bold">
            <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Contact details
            </span>
          </div>
          <div className="mt-2 space-y-2 text-[var(--color-accent-foreground)]/90 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-semibold text-[var(--color-accent-foreground)]">Email:</span>
              <a
                className="hover:underline underline-offset-2"
                href={`mailto:${siteContact.email}`}
              >
                {siteContact.email}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-semibold text-[var(--color-accent-foreground)]">Phone:</span>
              <a className="hover:underline underline-offset-2" href={`tel:${siteContact.mobile.replace(/\\s/g, '')}`}>
                {siteContact.mobile}
              </a>
              <span className="hidden sm:inline text-[var(--color-accent-foreground)]/70">({siteContact.phoneLandline})</span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
              <span className="font-semibold text-[var(--color-accent-foreground)] shrink-0">Address:</span>
              <span className="inline-flex flex-col gap-0.5 leading-snug">
                {siteContact.addressLines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(null);
        const destLabel =
          applyDestinationSelectOptions.find((d) => d.value === form.preferredStudyDestination)?.label ??
          form.preferredStudyDestination;
        const message = [
          `Intent: ${intent === 'enroll' ? 'Enroll' : 'Apply'}`,
          form.academicLevel ? `Academic level: ${form.academicLevel}` : null,
          form.preferredProgram ? `Preferred program: ${form.preferredProgram}` : null,
        ]
          .filter(Boolean)
          .join('\n');
        setSubmitting(true);
        const result = await submitLeadPublic({
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          destination: destLabel || null,
          message,
        });
        setSubmitting(false);
        if (!result.ok) {
          setSubmitError(result.error);
          return;
        }
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
            placeholder="+977 98XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Study Destination</label>
          <select
            required
            value={form.preferredStudyDestination}
            onChange={(e) => setForm((p) => ({ ...p, preferredStudyDestination: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
          >
            {applyDestinationSelectOptions.map((d) => (
              <option key={d.label + d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Level</label>
          <select
            required
            value={form.academicLevel}
            onChange={(e) => setForm((p) => ({ ...p, academicLevel: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
          >
            {academicLevels.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Program</label>
          <input
            required
            value={form.preferredProgram}
            onChange={(e) => setForm((p) => ({ ...p, preferredProgram: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
            placeholder="e.g. Business, IT, Nursing"
          />
        </div>
      </div>

      {submitError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{submitError}</div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-black px-8 py-4 rounded-xl transition-all shadow-xl shadow-[var(--color-primary)]/20 text-base sm:text-lg hover:scale-[1.02] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? (
          'Sending…'
        ) : (
          <>
            Submit <Send size={20} />
          </>
        )}
      </button>

      <p className="text-xs text-slate-500">By submitting, you agree to be contacted by Shikshya Path Foundation.</p>
    </form>
  );
}

export default function ApplyNowModal() {
  const { state, close } = useApplyNow();
  useEffect(() => {
    if (!state.open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.open, close]);

  useEffect(() => {
    if (!state.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [state.open]);

  if (!state.open) return null;

  const title = state.intent === 'enroll' ? 'Enroll Now' : 'Apply Now';
  const subtitle =
    state.intent === 'enroll'
      ? 'Share your details and we’ll help you enroll with the right plan.'
      : 'Share your details and we’ll reach out with the next steps.';

  const bodyKey = `${state.intent}:${JSON.stringify(state.prefill ?? {})}`;

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={close}
        aria-label="Close dialog"
      />

      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl max-h-[min(100dvh,720px)] sm:max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-primary-soft via-white to-white border-b border-slate-100 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{title}</h2>
                <p className="text-justify text-slate-600 mt-2">{subtitle}</p>
              </div>
              <button
                type="button"
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition inline-flex items-center justify-center shrink-0"
                onClick={close}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto min-h-0 flex-1">
            <ApplyNowBody key={bodyKey} intent={state.intent} prefill={state.prefill} onDone={close} />
          </div>
        </div>
      </div>
    </div>
  );
}

