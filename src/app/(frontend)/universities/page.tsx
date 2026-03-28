import InnerPageHero from '@/components/InnerPageHero';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';
import { universityCategoryTiles } from '@/data/universityCategories';
import { preferredUniversitiesByRegion } from '@/data/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Universities & Colleges | Popular Choices for Nepali Students | Shikshya Path',
  description:
    'Explore university and college options popular with Nepalese students in the UK, Australia, New Zealand, USA, Canada, and Europe — curated by Shikshya Path Foundation, Kathmandu.',
};

export default function UniversitiesPage() {
  return (
    <main>
      <InnerPageHero
        title="Partner Universities"
        description="Discover institutions that match your goals — from popular choices among Nepali students to tailored shortlists from our counselors."
      />
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900">Browse by country focus</h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-12 max-w-3xl">
          Start from a destination to explore themes and costs — then book a consultation for a personalized shortlist.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {universityCategoryTiles.map((cat) => (
            <UniversityCategoryCard
              key={cat.title}
              title={cat.title}
              flagImg={cat.flagImg}
              bgImage={cat.bgImg}
              bgImageAlt={cat.bgImgAlt}
            />
          ))}
        </div>
      </section>

      <section className="pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-100 pt-16 sm:pt-24">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Highly preferred by Nepalese students</h2>
        <p className="text-slate-600 max-w-3xl mb-12 leading-relaxed">
          Examples of institutions often chosen by Nepali students in each region — for guidance only; admission depends on your profile and intake.
        </p>
        <div className="space-y-16">
          {preferredUniversitiesByRegion.map((region) => (
            <div key={region.id}>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <span aria-hidden="true">🎓</span> {region.title}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-6">
                {region.universities.map((u) => (
                  <li
                    key={u.name}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{u.blurb}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
