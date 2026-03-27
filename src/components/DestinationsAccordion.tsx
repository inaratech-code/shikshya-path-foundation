'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';

type Country = {
  key: string;
  flagImg: string;
  title: string;
  overview: string;
  requirements: string[];
  intakeInfo: string;
  cost: string;
  destinationValue: string;
};

export default function DestinationsAccordion() {
  const applyNow = useApplyNow();
  const items = useMemo<Country[]>(
    () => [
      {
        key: 'australia',
        flagImg: 'https://flagcdn.com/w320/au.png',
        title: 'Study in Australia',
        destinationValue: 'australia',
        overview:
          'Australia offers globally recognized degrees, strong student support, and post‑study work pathways depending on your program and location.',
        requirements: ['Valid passport', 'Academic transcripts', 'English proficiency (IELTS/PTE)', 'Financial documents'],
        intakeInfo: 'Common intakes: Feb (main), Jul (major), Nov (select institutions).',
        cost: 'Tuition varies by course; we help shortlist budget-friendly options and scholarships.',
      },
      {
        key: 'new-zealand',
        flagImg: 'https://flagcdn.com/w320/nz.png',
        title: 'Study in New Zealand',
        destinationValue: 'new-zealand',
        overview:
          'New Zealand is known for safe campuses, high quality education, and a balanced lifestyle with strong student welfare.',
        requirements: ['Valid passport', 'Academic transcripts', 'English proficiency', 'Genuine student documentation'],
        intakeInfo: 'Common intakes: Feb and Jul; limited Nov intakes depending on program.',
        cost: 'Costs depend on city and course; we guide you with realistic budget planning.',
      },
      {
        key: 'uk',
        flagImg: 'https://flagcdn.com/w320/gb.png',
        title: 'Study in UK',
        destinationValue: 'uk',
        overview:
          'The UK offers fast degree completion options and world-class universities, with a well-defined student visa process.',
        requirements: ['Valid passport', 'Academic transcripts', 'English proficiency', 'CAS & financial proof'],
        intakeInfo: 'Common intakes: Sep (main), Jan, May (select programs).',
        cost: 'We help you compare tuition + living costs and identify scholarship opportunities.',
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string>(items[0]?.key ?? '');

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
      {/* Left list */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        {items.map((c) => {
          const active = openKey === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setOpenKey((prev) => (prev === c.key ? '' : c.key))}
              className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left border-b border-slate-100 last:border-0 transition ${
                active ? 'bg-blue-50/60' : 'bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <img
                  src={c.flagImg}
                  alt=""
                  aria-hidden="true"
                  className="w-9 h-6 rounded-md border border-slate-200 object-cover shrink-0 mt-0.5 bg-white"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className={`font-black ${active ? 'text-slate-900' : 'text-slate-800'}`}>{c.title}</div>
                  <div className="text-sm text-slate-500 mt-1">Overview • Requirements • Cost</div>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-500 transition-transform ${active ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          );
        })}
      </div>

      {/* Right detail */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-7 sm:p-10 shadow-sm min-h-[320px]">
        {items
          .filter((x) => x.key === openKey)
          .map((c) => (
            <div key={c.key} className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
                  <img
                    src={c.flagImg}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-7 rounded-md border border-slate-200 object-cover bg-white"
                    loading="lazy"
                  />
                  <span>{c.title}</span>
                </h2>
                <p className="text-slate-600 mt-3 leading-relaxed">{c.overview}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="font-black text-slate-900 mb-3">Requirements</div>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    {c.requirements.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-[var(--color-primary)] font-black">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="font-black text-slate-900 mb-3">Intake Info</div>
                  <p className="text-slate-700 text-sm leading-relaxed">{c.intakeInfo}</p>
                  <div className="mt-5 font-black text-slate-900">Cost</div>
                  <p className="text-slate-700 text-sm mt-2 leading-relaxed">{c.cost}</p>
                </div>
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
                <div className="text-sm text-slate-500 flex items-center">
                  Want a faster shortlist? Apply and we’ll call you.
                </div>
              </div>
            </div>
          ))}

        {!openKey && (
          <div className="text-slate-600">
            Select a country on the left to view details and apply.
          </div>
        )}
      </div>
    </div>
  );
}

