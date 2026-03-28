'use client';

import { useApplyNow } from '@/components/ApplyNowContext';
import { ArrowRight } from 'lucide-react';

export default function PTEContent() {
  const applyNow = useApplyNow();

  return (
    <>
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <img
              src="https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="PTE Academic computer-based test preparation"
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">About PTE</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              The Pearson Test of English (PTE) Academic is a globally recognized English proficiency examination that assesses the ability of non-native speakers to succeed in university-level education conducted in English. Developed by Pearson, it was designed to address the need for a precise and dependable way to evaluate English language skills for academic, governmental, and institutional purposes.
            </p>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="font-black text-slate-900">Computer-based & integrated skills</div>
              <p className="text-slate-700 mt-2 text-sm leading-relaxed">
                PTE Academic assesses Reading, Writing, Listening, and Speaking. The test includes integrated tasks that evaluate multiple skills at once — for example listening and reading, or reading and speaking — giving a comprehensive measure of proficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Recommended for</h2>
            <p className="text-slate-600 mt-3 leading-relaxed">
              PTE Academic is ideal for non-native speakers who wish to study abroad and need a computer-delivered English score accepted by their institution or visa pathway.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
            <ul className="space-y-3 text-slate-700">
              {[
                'Students applying to universities that accept PTE Academic',
                'Applicants who prefer flexible test scheduling and fast results',
                'Candidates who want structured preparation and mock tests',
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

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Where & when is PTE accepted?</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="font-black text-slate-900">Global acceptance</div>
            <p className="text-slate-600 mt-2 leading-relaxed text-sm">
              PTE Academic is accepted by many universities around the world, especially in the UK, Australia, the USA, and Canada.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="font-black text-slate-900">Scheduling in Nepal</div>
            <p className="text-slate-600 mt-2 leading-relaxed text-sm">
              Tests run multiple times a week, often Monday–Friday in morning, afternoon, and evening slots. Major centres in Kathmandu include British Professional College and AlphaBeta Institute; outside the valley, Chitwan Medical College (CMC) also hosts sessions.
            </p>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-8">
          Fees vary; we share current pricing and help you book at a convenient centre.
        </p>
      </section>

      <section className="py-16 md:py-20 bg-[var(--color-text-main)] text-white text-center mx-3 sm:mx-6 md:mx-10 rounded-[3rem] mb-10 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-text-main)] opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black">Begin your path to a successful future</h2>
          <p className="text-slate-200 mt-4 mb-8 max-w-xl mx-auto">
            Enroll for PTE preparation and get a plan plus guidance from our team.
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
