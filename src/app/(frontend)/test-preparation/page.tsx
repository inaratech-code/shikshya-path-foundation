import InnerPageHero from '@/components/InnerPageHero';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function TestPreparationPage() {
  return (
    <main>
      <InnerPageHero
        title="Test Preparation"
        description="Explore IELTS and PTE preparation with guidance on eligibility, schedules, and costs."
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2">
          <Link
            href="/test-preparation/ielts"
            className="group bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200 p-4 sm:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary-soft text-[var(--color-primary)] flex items-center justify-center mb-4 sm:mb-6 border border-primary/15 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0">
              <BookOpen className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900">IELTS</div>
            <p className="text-slate-600 mt-1 sm:mt-2 text-xs sm:text-base flex-1">
              Learn what IELTS is, who it’s recommended for, where/when to take it, and cost details.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[var(--color-primary)] font-bold">
              View IELTS <ArrowRight size={16} />
            </div>
          </Link>

          <Link
            href="/test-preparation/pte"
            className="group bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200 p-4 sm:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary-soft text-[var(--color-primary)] flex items-center justify-center mb-4 sm:mb-6 border border-primary/15 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0">
              <Sparkles className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900">PTE</div>
            <p className="text-slate-600 mt-1 sm:mt-2 text-xs sm:text-base flex-1">
              Learn what PTE is, where it’s accepted, best time to take it, and typical cost breakdown.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[var(--color-primary)] font-bold">
              View PTE <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

