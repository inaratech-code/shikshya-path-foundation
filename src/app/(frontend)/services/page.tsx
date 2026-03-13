import InnerPageHero from '@/components/InnerPageHero';

export default function ServicesPage() {
  return (
    <main>
      <InnerPageHero 
        title="Our Services" 
        description="Comprehensive support from university selection to post-arrival assistance." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">End-to-End Guidance</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          Detailed breakdown of Career Counseling, Application Assistance, Visa Guidance, and more coming soon.
        </p>
      </section>
    </main>
  );
}
