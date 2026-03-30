'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Send } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';

export default function FloatingApplyNowButton() {
  const pathname = usePathname();
  const applyNow = useApplyNow();

  const onClick = useCallback(() => {
    if (pathname === '/contact') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    applyNow.open({ intent: 'apply', source: 'unknown' });
  }, [applyNow, pathname]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-24 right-5 z-[91] inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-black text-white shadow-xl shadow-[var(--color-primary)]/25 transition-all hover:scale-[1.03] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:bottom-8 sm:right-8 sm:px-5"
      aria-label="Apply now"
    >
      <Send size={18} className="shrink-0" aria-hidden="true" />
      <span className="leading-none">Apply Now</span>
    </button>
  );
}

