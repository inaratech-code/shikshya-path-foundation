import InnerPageHero from '@/components/InnerPageHero';
import { SITE_MOTTO } from '@/data/siteContent';
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
      <section className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[var(--color-primary)] font-bold text-lg mb-6 italic">&ldquo;{SITE_MOTTO}&rdquo;</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">Our mission</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          To provide transparent, ethical, and high-quality educational consultancy services that empower Nepalese students to study in world-class institutions and fulfil their career aspirations globally.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Based in Kathmandu, we combine integrity, reliable guidance, and up-to-date knowledge of admissions, tests, and visas — so you can plan your study abroad journey with confidence.
        </p>
      </section>
    </main>
  );
}
