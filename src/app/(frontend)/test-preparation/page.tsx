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

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/test-preparation/ielts"
            className="group bg-white rounded-[2rem] border border-slate-200 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
              <BookOpen size={22} />
            </div>
            <div className="text-2xl font-black text-slate-900">IELTS</div>
            <p className="text-slate-600 mt-2">
              Learn what IELTS is, who it’s recommended for, where/when to take it, and cost details.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[var(--color-primary)] font-bold">
              View IELTS <ArrowRight size={16} />
            </div>
          </Link>

          <Link
            href="/test-preparation/pte"
            className="group bg-white rounded-[2rem] border border-slate-200 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
              <Sparkles size={22} />
            </div>
            <div className="text-2xl font-black text-slate-900">PTE</div>
            <p className="text-slate-600 mt-2">
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

