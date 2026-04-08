'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';
import { applyDestinationSelectOptions, siteContact } from '@/data/siteContent';
import { validateLeadEmail, validateNepalMobileDigits } from '@/lib/applyNowValidation';
import { submitLeadPublic } from '@/lib/submitLeadClient';
import { duration, easeOutExpo } from '@/lib/motion';

const academicLevels = [
  { value: '', label: 'Select academic level' },
  { value: 'see', label: 'SEE / Secondary' },
  { value: '+2', label: '+2 / Higher Secondary' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'phd', label: 'PhD' },
];

const preferredProgramOptions = [
  { value: '', label: 'Select preferred program' },
  { value: 'business', label: 'Business & Management' },
  { value: 'it', label: 'IT & Computer Science' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'nursing', label: 'Nursing & Health Sciences' },
  { value: 'medicine', label: 'Medicine & Allied Health' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'education', label: 'Education' },
  { value: 'arts', label: 'Arts, Media & Design' },
  { value: 'law', label: 'Law' },
  { value: 'science', label: 'Science & Research' },
  { value: 'other', label: 'Other (mention in comments)' },
] as const;

function normalizePrefillProgram(raw: string | undefined): string {
  if (!raw?.trim()) return '';
  const t = raw.trim();
  const byValue = preferredProgramOptions.find((o) => o.value === t);
  if (byValue) return byValue.value;
  const byLabel = preferredProgramOptions.find((o) => o.label === t);
  if (byLabel) return byLabel.value;
  return '';
}

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
      preferredProgram: normalizePrefillProgram(prefill?.preferredProgram),
      comment: '',
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
        const email = form.email.trim();
        const emailCheck = validateLeadEmail(email);
        if (!emailCheck.ok) {
          setSubmitError(emailCheck.error);
          return;
        }
        const phoneDigits = form.phone.replace(/\D/g, '');
        const phoneCheck = validateNepalMobileDigits(phoneDigits);
        if (!phoneCheck.ok) {
          setSubmitError(phoneCheck.error);
          return;
        }
        const destLabel =
          applyDestinationSelectOptions.find((d) => d.value === form.preferredStudyDestination)?.label ??
          form.preferredStudyDestination;
        const programLabel =
          preferredProgramOptions.find((o) => o.value === form.preferredProgram)?.label ?? form.preferredProgram;
        const message = [
          `Intent: ${intent === 'enroll' ? 'Enroll' : 'Apply'}`,
          form.academicLevel ? `Academic level: ${form.academicLevel}` : null,
          form.preferredProgram ? `Preferred program: ${programLabel}` : null,
          form.comment.trim() ? `Comments:\n${form.comment.trim()}` : null,
        ]
          .filter(Boolean)
          .join('\n');
        setSubmitting(true);
        const result = await submitLeadPublic({
          full_name: form.fullName.trim(),
          email,
          phone: `+977 ${phoneDigits}`,
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
            name="email"
            autoComplete="email"
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
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent">
            <span className="flex items-center px-3 text-sm font-medium text-slate-500 border-r border-slate-200 bg-slate-100/80 shrink-0">
              +977
            </span>
            <input
              required
              type="text"
              inputMode="numeric"
              autoComplete="tel-national"
              value={form.phone}
              onChange={(e) => {
                let digits = e.target.value.replace(/\D/g, '');
                if (digits.length > 10) {
                  digits = digits.startsWith('977') ? digits.slice(3, 13) : digits.slice(-10);
                }
                digits = digits.slice(0, 10);
                setForm((p) => ({ ...p, phone: digits }));
              }}
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter exactly 10 digits"
              className="min-w-0 flex-1 px-4 py-3 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
              placeholder="98XXXXXXXX"
            />
          </div>
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
          <select
            required
            value={form.preferredProgram}
            onChange={(e) => setForm((p) => ({ ...p, preferredProgram: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
          >
            {preferredProgramOptions.map((d) => (
              <option key={d.value || 'placeholder'} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Comments</label>
        <textarea
          value={form.comment}
          onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
          rows={3}
          className="w-full min-h-[4.75rem] px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y text-slate-900 placeholder:text-slate-400"
          placeholder="Anything else we should know? Questions, timeline, or goals…"
          maxLength={2000}
          aria-describedby="apply-comment-hint"
        />
        <p id="apply-comment-hint" className="mt-1.5 text-xs text-slate-500">
          Optional — helps us prepare before we call you back.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitError ? (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: duration.fast, ease: easeOutExpo }}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {submitError}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        className="interactive-btn w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-black px-8 py-4 rounded-xl shadow-xl shadow-[var(--color-primary)]/20 text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:hover:scale-100"
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
  const reduceMotion = useReducedMotion();

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
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [state.open]);

  const title = state.intent === 'enroll' ? 'Enroll Now' : 'Apply Now';
  const subtitle =
    state.intent === 'enroll'
      ? 'Share your details and we’ll help you enroll with the right plan.'
      : 'Share your details and we’ll reach out with the next steps.';

  const bodyKey = `${state.intent}:${JSON.stringify(state.prefill ?? {})}`;

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.98 },
        transition: { duration: duration.slow, ease: easeOutExpo },
      };

  return (
    <AnimatePresence>
      {state.open ? (
        <motion.div
          key="apply-modal"
          className="fixed inset-0 z-[999]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[3px] motion-safe:transition-opacity"
            onClick={close}
            aria-label="Close dialog"
          />

          {/* Outer layer ignores pointer events so the backdrop receives outside clicks; the card uses pointer-events-auto for wheel/scroll and interaction. */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end sm:items-center justify-center p-3 sm:p-6">
            <motion.div
              className="pointer-events-auto relative flex max-h-[min(100dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/15 sm:max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-now-dialog-title"
              {...panelMotion}
            >
              <div className="p-6 sm:p-8 bg-gradient-to-br from-primary-soft via-white to-white border-b border-slate-100 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="apply-now-dialog-title" className="text-2xl sm:text-3xl font-black text-slate-900">
                      {title}
                    </h2>
                    <p className="text-justify text-slate-600 mt-2">{subtitle}</p>
                  </div>
                  <button
                    type="button"
                    className="interactive-press w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center justify-center shrink-0"
                    onClick={close}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div
                className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-y-contain p-6 sm:p-8 [-webkit-overflow-scrolling:touch]"
                tabIndex={-1}
              >
                <ApplyNowBody key={bodyKey} intent={state.intent} prefill={state.prefill} onDone={close} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

