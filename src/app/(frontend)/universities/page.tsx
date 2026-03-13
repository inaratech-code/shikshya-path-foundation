import InnerPageHero from '@/components/InnerPageHero';

export default function UniversitiesPage() {
  return (
    <main>
      <InnerPageHero 
        title="Partner Universities" 
        description="Discover our extensive network of top-ranked global universities and find the best fit for your academic goals." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Institutions Directory</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          Coming Soon: Search and filter through 300+ partnered universities across 20+ countries.
        </p>
      </section>
    </main>
  );
}
