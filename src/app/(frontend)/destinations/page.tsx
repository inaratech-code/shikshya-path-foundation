import InnerPageHero from '@/components/InnerPageHero';

export default function DestinationsPage() {
  return (
    <main>
      <InnerPageHero 
        title="Study Destinations" 
        description="Explore top global destinations for higher education, including Australia, UK, USA, Canada, and Europe." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Choose Your Path</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          Content coming soon. Detailed guides on cost, living, and top universities per country.
        </p>
      </section>
    </main>
  );
}
