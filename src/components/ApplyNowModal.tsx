'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Send } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';
import { applyDestinationSelectOptions } from '@/data/siteContent';
import { submitLeadPublic } from '@/lib/submitLeadClient';

const academicLevels = [
  { value: '', label: 'Select academic level' },
  { value: 'see', label: 'SEE / Secondary' },
  { value: '+2', label: '+2 / Higher Secondary' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'phd', label: 'PhD' },
];

export default function ApplyNowModal() {
  const { state, close } = useApplyNow();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initial = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      preferredStudyDestination: state.prefill?.preferredStudyDestination ?? '',
      academicLevel: state.prefill?.academicLevel ?? '',
      preferredProgram: state.prefill?.preferredProgram ?? '',
    }),
    [state.prefill]
  );

  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (state.open) {
      setSubmitted(false);
      setSubmitError(null);
      setForm(initial);
    }
  }, [state.open, initial]);

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
          <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-white to-white border-b border-slate-100 shrink-0">
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
            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
                <div className="text-emerald-900 font-bold text-lg">Request received</div>
                <div className="text-emerald-800 mt-1">
                  We’ll contact you shortly. If it’s urgent, please call our office.
                </div>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center justify-center bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition"
                  onClick={close}
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitError(null);
                  const destLabel =
                    applyDestinationSelectOptions.find((d) => d.value === form.preferredStudyDestination)?.label ??
                    form.preferredStudyDestination;
                  const message = [
                    `Intent: ${state.intent === 'enroll' ? 'Enroll' : 'Apply'}`,
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
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Study Destination</label>
                    <select
                      required
                      value={form.preferredStudyDestination}
                      onChange={(e) => setForm((p) => ({ ...p, preferredStudyDestination: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
                    >
                      {applyDestinationSelectOptions.map((d) => (
                        <option key={d.label + d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Level</label>
                    <select
                      required
                      value={form.academicLevel}
                      onChange={(e) => setForm((p) => ({ ...p, academicLevel: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all bg-slate-50"
                      placeholder="e.g. Business, IT, Nursing"
                    />
                  </div>
                </div>

                {submitError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-[var(--color-primary)]/20 text-lg disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitting ? 'Sending…' : (
                    <>
                      Submit <Send size={20} />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by Shikshya Path Foundation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

