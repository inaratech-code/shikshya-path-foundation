import InnerPageHero from '@/components/InnerPageHero';
import DestinationsAccordion from '@/components/DestinationsAccordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Abroad Destinations | Australia, UK, USA, Canada & More | Shikshya Path',
  description:
    'Guides for studying in Australia, UK, New Zealand, Canada, USA, Europe, Japan, and South Korea from Nepal — requirements, costs, intakes, and visas. Shikshya Path Foundation, Kathmandu.',
};

export default function DestinationsPage() {
  return (
    <main>
      <InnerPageHero 
        title="Study Abroad" 
        description="Compare destinations, see requirements and intakes, and apply—without leaving this page." 
      />
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <DestinationsAccordion />
      </section>
    </main>
  );
}
