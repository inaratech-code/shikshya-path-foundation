import { Suspense } from 'react';
import InnerPageHero from '@/components/InnerPageHero';
import DestinationsAccordion from '@/components/DestinationsAccordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Destinations | Australia, UK, USA, Canada & More | Shikshya Path',
  description:
    'Guides for studying in Australia, UK, New Zealand, Canada, USA, Europe, Japan, and South Korea from Nepal — requirements, costs, intakes, and visas. Shikshya Path Foundation, Kathmandu.',
};

function DestinationsAccordionFallback() {
  return (
    <div
      className="min-h-[min(60vh,520px)] rounded-2xl lg:rounded-[2rem] bg-slate-100 animate-pulse"
      aria-hidden
    />
  );
}

export default function DestinationsPage() {
  return (
    <main>
      <InnerPageHero 
        title="Study Abroad" 
        description="Compare destinations, see requirements and intakes, and apply—without leaving this page." 
      />
      <section
        id="study-abroad-destinations"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
      >
        <Suspense fallback={<DestinationsAccordionFallback />}>
          <DestinationsAccordion />
        </Suspense>
      </section>
    </main>
  );
}
