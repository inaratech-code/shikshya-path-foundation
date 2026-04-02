import InnerPageHero from '@/components/InnerPageHero';
import Image from 'next/image';
import { MAIN_SITE_LOGO_PATH, SITE_MOTTO } from '@/data/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Shikshya Path Foundation | Study Abroad Consultancy Nepal',
  description:
    'Learn about Shikshya Path Foundation — ethical study abroad counseling for Nepali students. Your Dream Our Guidance.',
};

export default function AboutPage() {
  return (
    <main>
      <InnerPageHero
        title="About Shikshya Path"
        description={`${SITE_MOTTO} — we help Nepalese students access quality international education with transparent counseling and end-to-end support.`}
      />
      <section id="mission" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 items-center min-w-0">
          <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-primary-soft via-white to-white p-8 sm:p-10 overflow-hidden">
            <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-[var(--color-primary)] border border-slate-200 shadow-sm">
                Shikshya Path Foundation
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Image
                  src={MAIN_SITE_LOGO_PATH}
                  alt="Shikshya Path Foundation"
                  width={640}
                  height={640}
                  className="h-40 w-auto sm:h-52 md:h-56 object-contain"
                  priority
                />
              </div>
              <p className="mt-6 text-center text-slate-600 font-semibold italic">&ldquo;{SITE_MOTTO}&rdquo;</p>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[var(--color-primary)] font-bold text-sm mb-2 tracking-wide uppercase">About us</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-5">Our mission</h2>
            <p className="text-justify text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              To provide transparent, ethical, and high-quality educational consultancy services that empower Nepalese students to study in world-class institutions and fulfil their career aspirations globally.
            </p>
            <p className="text-justify text-slate-600 leading-relaxed">
              Based in Kathmandu, we combine integrity, reliable guidance, and up-to-date knowledge of admissions, tests, and visas — so you can plan your study abroad journey with confidence.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
