import Link from 'next/link';
import InnerPageHero from '@/components/InnerPageHero';
import { getPublicOffers } from '@/lib/offersStore';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const offers = await getPublicOffers();

  return (
    <main>
      <InnerPageHero
        title="Scholarships & Offers"
        description="Browse exclusive application fee waivers, high-value merit scholarships, and limited-time discounts."
      />
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Current promotions</h2>
          <p className="text-justify max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Active offers published by our team. You can also open the floating offers button on any page for a quick
            view.
          </p>
        </div>

        {offers.length === 0 ? (
          <p className="text-center text-slate-500 py-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            No promotions are live at the moment. Check back soon or{' '}
            <Link href="/contact" className="font-semibold text-[var(--color-primary)] hover:underline">
              contact us
            </Link>{' '}
            for the latest scholarships and waivers.
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => (
              <article
                key={o.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                {o.badge ? (
                  <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800 border border-blue-100 mb-3">
                    {o.badge}
                  </span>
                ) : null}
                <h3 className="text-xl font-black text-slate-900 leading-snug">{o.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{o.subtitle}</p>
                <p className="mt-4 text-xs text-slate-400">
                  Posted {new Date(o.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
