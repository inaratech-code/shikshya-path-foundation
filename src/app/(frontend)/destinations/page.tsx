import InnerPageHero from '@/components/InnerPageHero';
import DestinationsAccordion from '@/components/DestinationsAccordion';

export default function DestinationsPage() {
  return (
    <main>
      <InnerPageHero 
        title="Study Abroad" 
        description="Compare destinations, see requirements and intakes, and apply—without leaving this page." 
      />
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <DestinationsAccordion />
      </section>
    </main>
  );
}
