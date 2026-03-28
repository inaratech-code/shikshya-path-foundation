import InnerPageHero from '@/components/InnerPageHero';
import { servicesCopy, SITE_MOTTO } from '@/data/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Study Abroad, IELTS PTE & Documentation | Shikshya Path Foundation',
  description:
    'Abroad studies counseling, IELTS & PTE classroom training, documentation guidance, and university shortlisting for Nepali students — Shikshya Path Foundation, Kathmandu.',
};

const blocks = [
  servicesCopy.abroadStudies,
  servicesCopy.testPreparation,
  servicesCopy.documentationGuide,
  servicesCopy.universityCollegeGuide,
];

export default function ServicesPage() {
  return (
    <main>
      <InnerPageHero
        title="Our Services"
        description={`${SITE_MOTTO} — comprehensive support from test preparation and documentation to university selection and applications.`}
      />
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-center text-slate-500 font-semibold mb-10 italic">&ldquo;{SITE_MOTTO}&rdquo;</p>
        <div className="space-y-14">
          {blocks.map((b) => (
            <article key={b.title} className="border-b border-slate-100 last:border-0 pb-14 last:pb-0">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{b.title}</h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{b.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
