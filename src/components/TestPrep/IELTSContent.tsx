'use client';

import { useApplyNow } from '@/components/ApplyNowContext';
import { ArrowRight } from 'lucide-react';

export default function IELTSContent() {
  const applyNow = useApplyNow();

  return (
    <>
      {/* ABOUT IELTS */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <img
              src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="IELTS preparation"
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">About IELTS</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              IELTS (International English Language Testing System) measures your English proficiency for study, work,
              and migration. We help you pick the right module, build a preparation plan, and practice with mock tests.
            </p>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="font-black text-slate-900">Recommended duration</div>
              <div className="text-slate-700 mt-2">2–6 weeks depending on your current level and target score.</div>
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
              Students planning to study abroad and applicants who need English proof for admissions or visas.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
            <ul className="space-y-3 text-slate-700">
              {[
                'Students targeting Australia, UK, Canada, USA, and Europe',
                'Applicants who need an academic English score',
                'Students who prefer paper-based or computer-delivered options',
                'Candidates who want a structured prep + mock tests',
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

      {/* TEST INFO */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Test info</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'Where can we take the test?',
              body: 'Authorized test centers in major cities. We help you choose the nearest available center.',
            },
            {
              title: 'When can we take the test?',
              body: 'Multiple dates each month depending on center availability. We assist with booking and deadlines.',
            },
            {
              title: 'Cost of IELTS',
              body: 'Fees vary by country and delivery mode. We provide the latest fee and payment guidance.',
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
            Enroll now and get a study plan plus preparation guidance from our team.
          </p>
          <button
            type="button"
            onClick={() => applyNow.open({ intent: 'enroll', source: 'ielts' })}
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary-dark)] font-black px-8 py-4 rounded-2xl hover:scale-[1.02] transition-transform shadow-2xl shadow-blue-900/50"
          >
            Enroll Now <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}

