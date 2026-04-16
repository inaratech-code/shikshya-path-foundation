'use client';

import InnerPageHero from '@/components/InnerPageHero';
import LeadForm from '@/components/LeadForm';
import { siteContact, SITE_MOTTO } from '@/data/siteContent';

export default function ContactPage() {
  const mapQuery = encodeURIComponent('Ramshah Path Putalisadak Kathmandu Nepal');

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

          <LeadForm />
        </div>

        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-6">Visit & reach us</h2>
          <ul className="text-slate-600 space-y-3 mb-10">
            <li className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:gap-2">
              <span className="font-semibold text-slate-800 shrink-0">Address:</span>
              <span className="inline-flex flex-col gap-0.5 leading-snug">
                {siteContact.addressLines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </span>
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
