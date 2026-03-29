'use client';

import HeroBannerLayers from '@/components/HeroBannerLayers';
import { useApplyNow } from '@/components/ApplyNowContext';
import { heroBannerForSeed } from '@/data/heroBanners';
import { ArrowRight } from 'lucide-react';

export default function IELTSContent() {
  const applyNow = useApplyNow();

  return (
    <>
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <img
              src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="IELTS preparation and study materials"
              className="w-full h-72 md:h-96 object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">About IELTS</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              IELTS (International English Language Testing System) is one of the most popular English tests in the world. It checks your listening, reading, writing, and speaking skills. Accepted by thousands of universities, employers, and immigration authorities, IELTS helps you study, work, or live abroad. Every year, millions of students take this test, making it a trusted and reliable way to prove your English ability.
            </p>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="font-black text-slate-900">Score basics</div>
              <p className="text-slate-700 mt-2 text-sm leading-relaxed">
                There are two types of IELTS tests: Academic and General Training. Both include the same Listening and Speaking sections. Your IELTS score ranges from 1 to 9, and you can also get half scores like 6.5. Most universities usually ask for a score between 6 and 7, along with minimum scores in each section.
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
              IELTS is accepted by universities and employers in countries like Australia, Canada, Ireland, New Zealand, the UK, and the USA. It is also recognized by immigration offices and professional bodies. Every year, more than 1.4 million people take the IELTS test.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
            <ul className="space-y-3 text-slate-700">
              {[
                'Students targeting Australia, UK, Canada, USA, and Europe',
                'Applicants who need an academic English score for admission or visas',
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
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Where & when can you take IELTS?</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="font-black text-slate-900">Where?</div>
            <p className="text-slate-600 mt-2 leading-relaxed text-sm">
              IELTS exams are conducted through accredited test centres worldwide, with over 500 locations across more than 120 countries.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="font-black text-slate-900">When?</div>
            <p className="text-slate-600 mt-2 leading-relaxed text-sm">
              Register with your nearest test centre, where exams are held regularly — typically on Saturdays. We help you plan around application deadlines.
            </p>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-8">
          Fees vary by country and test format. We provide up-to-date fee and booking guidance for Nepal.
        </p>
      </section>

      <section className="py-16 md:py-20 text-white text-center mx-3 sm:mx-6 md:mx-10 rounded-[3rem] mb-10 overflow-hidden relative shadow-2xl">
        <HeroBannerLayers imageSrc={heroBannerForSeed('ielts-enroll-cta')} overlay="cta" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-5xl font-black">Begin your path to a successful future</h2>
          <p className="text-justify text-slate-200 mt-4 mb-8 max-w-xl mx-auto">
            Enroll for IELTS preparation and get a study plan plus expert guidance from our team.
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
