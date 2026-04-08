'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Send } from 'lucide-react';
import { useApplyNow } from '@/components/ApplyNowContext';

type Props = {
  /** When true, render without fixed positioning (use inside a docked FAB stack). */
  docked?: boolean;
};

export default function FloatingApplyNowButton({ docked = false }: Props) {
  const pathname = usePathname();
  const applyNow = useApplyNow();

  const onClick = useCallback(() => {
    if (pathname === '/contact') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    applyNow.open({ intent: 'apply', source: 'unknown' });
  }, [applyNow, pathname]);

  const positionClass = docked
    ? 'relative z-[1] inline-flex'
    : 'fixed bottom-24 right-5 z-[91] inline-flex sm:bottom-8 sm:right-8';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${positionClass} items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-black text-white shadow-xl shadow-[var(--color-primary)]/25 transition-all hover:scale-[1.03] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-5`}
      aria-label="Apply now"
    >
      <Send size={18} className="shrink-0" aria-hidden="true" />
      <span className="leading-none">Apply Now</span>
    </button>
  );
}

