'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Slim top bar during route changes — gives instant feedback without blocking the UI.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const boot = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (boot.current) {
      boot.current = false;
      prev.current = pathname;
      return;
    }
    if (prev.current === pathname) return;
    prev.current = pathname;
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 480);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[200] h-[3px] overflow-hidden"
      aria-hidden
    >
      <div
        className={`h-full origin-left bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)] transition-transform duration-500 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  );
}
