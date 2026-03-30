import InnerPageHero from '@/components/InnerPageHero';
import Link from 'next/link';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';
import UniversityMark from '@/components/UniversityMark';
import { universityCategoryTiles } from '@/data/universityCategories';
import { preferredUniversitiesByRegion, studyDestinations } from '@/data/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Universities & Colleges | Popular Choices for Nepali Students | Shikshya Path',
  description:
    'Explore university and college options popular with Nepalese students in the UK, Australia, New Zealand, USA, Canada, and Europe — curated by Shikshya Path Foundation, Kathmandu.',
};

export default function UniversitiesPage() {
  const destinationBySlug = Object.fromEntries(studyDestinations.map((d) => [d.slug, d])) as Record<
    string,
    (typeof studyDestinations)[number]
  >;

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
          {preferredUniversitiesByRegion.map((region) => {
            const media = destinationBySlug[region.id];
            const banner = media?.heroForPage ?? media?.bgImg;
            const bannerFallback = media?.bgImgAlt ?? media?.bgImg ?? media?.heroForPage;
            const flag = media?.flagImgTile ?? media?.flagImgAccordion;

            return (
              <div key={region.id}>
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 mb-6">
                  {banner ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: bannerFallback
                          ? `url("${banner}"), url("${bannerFallback}")`
                          : `url("${banner}")`,
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />
                  <div className="relative px-6 py-8 sm:px-8 sm:py-10 flex items-start sm:items-center justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-3">
                        {flag ? (
                          <img
                            src={flag}
                            alt=""
                            aria-hidden="true"
                            className="h-6 w-9 rounded-md border border-white/15 object-cover bg-white/10 shrink-0"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span aria-hidden="true">🎓</span>
                        )}
                        <span className="truncate">{region.title}</span>
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-200/90 max-w-3xl">
                        Popular picks in this region — use these as a starting point for shortlisting.
                      </p>
                    </div>
                    <Link
                      href={`/destinations/${region.id}`}
                      className="hidden sm:inline-flex shrink-0 items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white border border-white/15 hover:bg-white/15 transition"
                    >
                      Explore destination
                    </Link>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-2 gap-6">
                  {region.universities.map((u) => (
                    <li
                      key={u.name}
                      className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <div className="relative h-24 w-full overflow-hidden bg-slate-900">
                        {banner ? (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            style={{
                              backgroundImage: bannerFallback
                                ? `url("${banner}"), url("${bannerFallback}")`
                                : `url("${banner}")`,
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-slate-950/15" />

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
                          <UniversityMark name={u.name} className="h-9 w-auto" />
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                          {flag ? (
                            <img
                              src={flag}
                              alt=""
                              aria-hidden="true"
                              className="mt-0.5 h-6 w-9 rounded-md border border-slate-200 object-cover bg-white shrink-0"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="min-w-0">
                            <div className="font-black text-slate-900">{u.name}</div>
                            <p className="text-slate-600 text-sm mt-2 leading-relaxed">{u.blurb}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
