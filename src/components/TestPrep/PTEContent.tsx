'use client';

import { useApplyNow } from '@/components/ApplyNowContext';
import { ArrowRight } from 'lucide-react';

export default function PTEContent() {
  const applyNow = useApplyNow();

  return (
    <>
      {/* ABOUT PTE */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <img
              src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="PTE preparation"
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">About PTE</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              PTE (Pearson Test of English) is a computer-based English test accepted by many universities and visa
              authorities. We help you understand the format and prepare efficiently with practice and mock tests.
            </p>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="font-black text-slate-900">Good for fast results</div>
              <div className="text-slate-700 mt-2">
                Many candidates prefer PTE for quicker scheduling and score delivery.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Recommended for</h2>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Students and applicants who prefer a fully computer-delivered exam with a consistent scoring approach.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
            <ul className="space-y-3 text-slate-700">
              {[
                'Students applying to universities that accept PTE',
                'Applicants who want flexible test dates',
                'Candidates who prefer computer-based speaking tasks',
                'Students who want structured prep + mock practice',
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PTE DETAILS */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">PTE details</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'What countries accept PTE?',
              body: 'Commonly accepted in Australia, UK, New Zealand, and by many institutions in North America.',
            },
            {
              title: 'When to take the test',
              body: 'Take it as early as possible to meet university/visa deadlines. We help you plan around intakes.',
            },
            {
              title: 'Cost of PTE',
              body: 'Fees vary; we provide up-to-date pricing and booking guidance for your nearest test center.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="font-black text-slate-900">{card.title}</div>
              <p className="text-slate-600 mt-2 leading-relaxed text-sm">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--color-text-main)] text-white text-center mx-3 sm:mx-6 md:mx-10 rounded-[3rem] mb-10 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-text-main)] opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black">Begin your path to a successful future</h2>
          <p className="text-slate-200 mt-4 mb-8 max-w-xl mx-auto">
            Enroll now and get a preparation plan plus guidance from our team.
          </p>
          <button
            type="button"
            onClick={() => applyNow.open({ intent: 'enroll', source: 'pte' })}
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary-dark)] font-black px-8 py-4 rounded-2xl hover:scale-[1.02] transition-transform shadow-2xl shadow-blue-900/50"
          >
            Enroll Now <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}

