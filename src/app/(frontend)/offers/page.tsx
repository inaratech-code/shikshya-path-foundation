import InnerPageHero from '@/components/InnerPageHero';

export default function OffersPage() {
  return (
    <main>
      <InnerPageHero 
        title="Scholarships & Offers" 
        description="Browse exclusive application fee waivers, high-value merit scholarships, and limited-time discounts." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Current Promotions</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          List of active scholarship opportunities and fee waivers. Connect with us to check eligibility.
        </p>
      </section>
    </main>
  );
}
