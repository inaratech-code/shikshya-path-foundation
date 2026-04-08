'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';
import UniversityMark from '@/components/UniversityMark';
import { universityCategoryTiles } from '@/data/universityCategories';
import { preferredUniversitiesByRegion, studyDestinations } from '@/data/siteContent';

export default function HomePopularUniversitiesSection() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const destinationBySlug = Object.fromEntries(studyDestinations.map((d) => [d.slug, d])) as Record<
    string,
    (typeof studyDestinations)[number]
  >;

  const selectedRegion = selectedSlug
    ? preferredUniversitiesByRegion.find((r) => r.id === selectedSlug)
    : null;

  useEffect(() => {
    if (selectedSlug && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedSlug]);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <SectionHeading
            align="left"
            eyebrow="Universities"
            title="Explore popular categories"
            description="Browse curated lists by country—great starting points for shortlisting."
          />
          <Link
            href="/universities"
            className="inline-flex items-center justify-center sm:justify-end gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all w-full sm:w-auto shrink-0"
          >
            View universities <ArrowRight size={18} aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {universityCategoryTiles.map((u) => {
            const isSelected = selectedSlug === u.slug;
            return (
              <button
                key={u.slug}
                type="button"
                onClick={() => setSelectedSlug(isSelected ? null : u.slug)}
                className={`group block h-full min-h-[148px] sm:min-h-[168px] text-left rounded-xl sm:rounded-2xl transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${
                  isSelected ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 shadow-lg -translate-y-0.5' : 'hover:-translate-y-1'
                }`}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? 'Clear filter for' : 'Show universities for'} ${u.title}`}
              >
                <UniversityCategoryCard
                  title={u.title}
                  flagImg={u.flagImg}
                  bgImage={u.bgImg}
                  bgImageAlt={u.bgImgAlt}
                  className="shadow-sm group-hover:shadow-xl h-full pointer-events-none"
                />
              </button>
            );
          })}
        </div>

        <div ref={resultsRef} className="mt-10 sm:mt-12 scroll-mt-24">
          {selectedRegion && selectedSlug ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 mb-6">
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">{selectedRegion.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Showing partner examples for this country. Tap the same card again to clear.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Link
                    href={`/destinations/${selectedSlug}`}
                    className="inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] transition"
                  >
                    Explore destination
                  </Link>
                  <Link
                    href="/universities"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition"
                  >
                    Full university list
                  </Link>
                </div>
              </div>

              <ul className="grid sm:grid-cols-2 gap-4">
                {selectedRegion.universities.map((uni) => {
                  const media = destinationBySlug[selectedSlug];
                  const flag = media?.flagImgTile ?? media?.flagImgAccordion;
                  return (
                    <li
                      key={uni.name}
                      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="relative h-20 w-full overflow-hidden bg-slate-900">
                        {media?.heroForPage ?? media?.bgImg ? (
                          <Image
                            src={media.heroForPage ?? media.bgImg}
                            alt=""
                            fill
                            className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-slate-950/15" />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md">
                          <UniversityMark name={uni.name} className="h-8 w-auto" />
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                          {flag ? (
                            <Image
                              src={flag}
                              alt=""
                              aria-hidden={true}
                              width={48}
                              height={32}
                              className="mt-0.5 h-6 w-9 rounded-md border border-slate-200 object-cover bg-white shrink-0"
                              sizes="36px"
                            />
                          ) : null}
                          <div className="min-w-0">
                            <div className="font-black text-slate-900 text-sm sm:text-base">{uni.name}</div>
                            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">{uni.blurb}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="text-center text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Select a country card above to see popular universities for that destination.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
