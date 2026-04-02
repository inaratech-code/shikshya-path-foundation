'use client';

import { useState } from 'react';
import InnerPageHero from '@/components/InnerPageHero';
import { Send } from 'lucide-react';
import { siteContact, applyDestinationSelectOptions, SITE_MOTTO } from '@/data/siteContent';
import { submitLeadPublic } from '@/lib/submitLeadClient';

export default function ContactPage() {
  const mapQuery = encodeURIComponent('Ramshah Path Putalisadak Kathmandu Nepal');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const full = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
    const destLabel =
      applyDestinationSelectOptions.find((d) => d.value === destination)?.label ?? destination.trim();
    setSubmitting(true);
    const result = await submitLeadPublic({
      full_name: full || null,
      email: email.trim(),
      phone: phone.trim() || null,
      destination: destLabel || null,
      message: message.trim() || null,
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setDone(true);
  }

  return (
    <main>
      <InnerPageHero
        title="Contact Us"
        description="Ready to take the first step towards your international education? Reach out to Shikshya Path Foundation in Kathmandu — we’re here to help."
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-[var(--color-primary)] font-bold text-sm mb-2">&ldquo;{SITE_MOTTO}&rdquo;</p>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Book Your Free Consultation</h2>
          <p className="text-slate-600 mb-10">
            Fill out the form below with your details and study preferences. Our counselors will get back to you as soon as possible.
          </p>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
                  placeholder={siteContact.email}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
                  placeholder={siteContact.mobile}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Study Destination</label>
                <select
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 transition-all outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent invalid:border-red-300 invalid:ring-2 invalid:ring-red-200"
                  placeholder="Tell us about your educational background and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-black px-8 py-4 rounded-xl transition-all shadow-xl shadow-[var(--color-primary)]/20 text-base sm:text-lg hover:scale-[1.02] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? 'Sending…' : (
                  <>
                    Submit Request <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Visit & reach us</h2>
          <ul className="text-slate-600 space-y-3 mb-10">
            <li>
              <span className="font-semibold text-slate-800">Address: </span>
              {siteContact.addressSingle}
            </li>
            <li>
              <span className="font-semibold text-slate-800">Email: </span>
              <a href={`mailto:${siteContact.email}`} className="text-[var(--color-primary)] font-medium hover:underline">
                {siteContact.email}
              </a>
            </li>
            <li>
              <span className="font-semibold text-slate-800">Telephone: </span>
              {siteContact.phoneLandline}
            </li>
            <li>
              <span className="font-semibold text-slate-800">Mobile: </span>
              <a href={`tel:${siteContact.mobile.replace(/\s/g, '')}`} className="text-[var(--color-primary)] font-medium hover:underline">
                {siteContact.mobile}
              </a>
            </li>
            <li>
              <span className="font-semibold text-slate-800">WhatsApp: </span>
              <a
                href={`https://wa.me/${siteContact.whatsappTel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                {siteContact.whatsappDisplay}
              </a>
            </li>
          </ul>

          <div className="w-full h-[min(52vh,320px)] sm:h-[460px] md:h-[520px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <iframe
              title="Shikshya Path Foundation location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.316259508544!2d85.2849329769389!3d27.70895594440051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1709848123412!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all"
          >
            Open full map <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
