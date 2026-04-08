'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import PhotoCover from '@/components/PhotoCover';
import { useApplyNow } from '@/components/ApplyNowContext';
import { normalizeStudySlug, studyDestinations } from '@/data/siteContent';

type Country = {
  key: string;
  flagImg: string;
  title: string;
  heroImg: string;
  heroImgFallback: string;
  seoSummary: string;
  bodyParagraphs: [string, string];
  requirements: string[];
  quickFacts: {
    intake: string;
    postStudyWork: string;
    scholarship: string;
  };
  destinationValue: string;
};

export default function DestinationsAccordion() {
  const applyNow = useApplyNow();
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');

  const items = useMemo<Country[]>(
    () =>
      studyDestinations.map((d) => ({
        key: d.key,
        flagImg: d.flagImgAccordion,
        title: d.accordionTitle,
        heroImg: d.heroForPage,
        heroImgFallback: d.bgImgAlt,
        seoSummary: d.seoSummary,
        bodyParagraphs: d.bodyParagraphs,
        requirements: d.requirements,
        quickFacts: d.quickFacts,
        destinationValue: d.destinationValue,
      })),
    []
  );

  const [openKey, setOpenKey] = useState<string>(items[0]?.key ?? '');

  useEffect(() => {
    if (!countryParam) return;
    const slug = normalizeStudySlug(countryParam);
    const match = studyDestinations.find((d) => d.slug === slug);
    if (!match) return;
    setOpenKey(match.key);
    requestAnimationFrame(() => {
      document.getElementById('study-abroad-destinations')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [countryParam]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-6 lg:gap-8 items-start min-w-0">
      <nav
        className="grid grid-cols-2 lg:grid-cols-1 bg-white border border-slate-200 rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-sm"
        aria-label="Choose a study destination"
      >
        {items.map((c) => {
          const active = openKey === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setOpenKey((prev) => (prev === c.key ? '' : c.key))}
              className={`w-full flex items-center justify-between gap-2 lg:gap-4 px-3 py-4 sm:px-6 sm:py-5 text-left border-b border-slate-100 last:border-0 lg:last:border-b transition ${
                active ? 'bg-primary-soft/60' : 'bg-white hover:bg-slate-50'
              } ${items.length % 2 === 1 && c.key === items[items.length - 1]?.key ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                <Image
                  src={c.flagImg}
                  alt=""
                  aria-hidden={true}
                  width={48}
                  height={32}
                  className="w-8 h-5 sm:w-9 sm:h-6 rounded-md border border-slate-200 object-cover shrink-0 mt-0.5 bg-white"
                  loading={active ? 'eager' : 'lazy'}
                  priority={active}
                  quality={80}
                  sizes="36px"
                />
                <div className="min-w-0">
                  <div className={`text-sm sm:text-base font-black leading-tight ${active ? 'text-slate-900' : 'text-slate-800'}`}>
                    <span className="lg:hidden">{c.title.replace(/^Study in /, '')}</span>
                    <span className="hidden lg:inline">{c.title}</span>
                  </div>
                  <div className="hidden sm:block text-sm text-slate-500 mt-1">Guide • Requirements • Costs</div>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-500 shrink-0 transition-transform hidden lg:block ${active ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          );
        })}
      </nav>

      <article className="bg-white border border-slate-200 rounded-2xl lg:rounded-[2rem] p-5 sm:p-7 lg:p-10 shadow-sm min-h-[280px] sm:min-h-[320px] min-w-0">
        {items
          .filter((x) => x.key === openKey)
          .map((c) => (
            <div key={c.key} className="space-y-8">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 aspect-[21/9] max-h-52 sm:max-h-60 w-full bg-slate-100">
                <PhotoCover
                  key={`${c.key}-banner`}
                  primarySrc={c.heroImg}
                  fallbackSrc={c.heroImgFallback}
                  sizes="(max-width: 1024px) 100vw, min(900px, 70vw)"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none z-[1]" />
              </div>

              <header>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 flex flex-wrap items-center gap-3">
                  <Image
                    src={c.flagImg}
                    alt=""
                    aria-hidden={true}
                    width={56}
                    height={40}
                    className="w-10 h-7 rounded-md border border-slate-200 object-cover bg-white"
                    loading="eager"
                    priority
                    quality={80}
                    sizes="40px"
                  />
                  <span>{c.title}</span>
                </h2>
                <p className="text-slate-600 mt-3 leading-relaxed font-medium">{c.seoSummary}</p>
              </header>

              <div className="max-w-none text-slate-700 leading-relaxed space-y-4 text-[15px] sm:text-base">
                <p>{c.bodyParagraphs[0]}</p>
                <p>{c.bodyParagraphs[1]}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="font-black text-slate-900 mb-4 sm:mb-5 text-lg">Quick Facts</h3>
                <dl className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 border-b border-slate-200/70 pb-3">
                    <dt className="text-slate-500 font-semibold shrink-0">Intake</dt>
                    <dd className="text-slate-900 font-medium sm:text-right">{c.quickFacts.intake}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 border-b border-slate-200/70 pb-3">
                    <dt className="text-slate-500 font-semibold shrink-0">PSW (post-study work)</dt>
                    <dd className="text-slate-900 font-medium sm:text-right">{c.quickFacts.postStudyWork}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="text-slate-500 font-semibold shrink-0">Scholarship</dt>
                    <dd className="text-slate-900 font-medium sm:text-right">{c.quickFacts.scholarship}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-3">Key requirements</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  {c.requirements.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="text-[var(--color-primary)] font-black">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    applyNow.open({
                      intent: 'apply',
                      source: 'study-destination',
                      prefill: { preferredStudyDestination: c.destinationValue },
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition w-full sm:w-auto"
                >
                  Apply Now <ArrowRight size={18} />
                </button>
                <p className="text-sm text-slate-500 flex items-center">
                  Want a faster shortlist? Apply and we’ll call you.
                </p>
              </div>
            </div>
          ))}

        {!openKey && (
          <p className="text-slate-600">Select a country above to view our full guide and apply.</p>
        )}
      </article>
    </div>
  );
}
