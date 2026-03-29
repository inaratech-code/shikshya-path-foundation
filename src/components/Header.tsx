'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useApplyNow } from '@/components/ApplyNowContext';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const applyNow = useApplyNow();

  const isActive = (path: string) =>
    pathname === path ? 'text-[var(--color-primary)]' : '';

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white text-start shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 min-h-[4.5rem] sm:min-h-[5.25rem] md:min-h-[5.75rem] lg:min-h-[6.25rem] py-2 sm:py-2.5 grid grid-cols-[1fr_auto] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6">
        <BrandLogo variant="header" />

        {/* Desktop Nav — centered in middle column; compact gaps so logo can stay large */}
        <nav
          className="hidden md:flex min-w-0 items-center justify-center gap-2 px-1 lg:gap-3 xl:gap-5 text-[var(--color-text-main)] font-medium text-[13px] leading-tight lg:text-sm xl:text-base whitespace-nowrap"
          aria-label="Primary"
        >
          <Link href="/" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/')}`}>
            Home
          </Link>
          <Link href="/services" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/services')}`}>
            Services
          </Link>
          <Link href="/destinations" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/destinations')}`}>
            Study Destination
          </Link>
          <Link href="/test-preparation" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/test-preparation')}`}>
            Test Preparation
          </Link>
          <Link href="/about" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/about')}`}>
            About
          </Link>
        </nav>

        {/* Desktop CTA + mobile menu */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className="hidden md:inline-flex bg-[var(--color-primary)] text-white font-semibold px-3 py-2 lg:px-4 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--color-brand-accent)]/30 transition-all text-xs lg:text-sm whitespace-nowrap"
            onClick={() => applyNow.open({ intent: 'apply', source: 'header' })}
          >
            Apply Now
          </button>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <nav className="flex flex-col gap-1 text-[var(--color-text-main)] text-sm">
              <Link
                href="/"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/')}`}
                onClick={() => setOpen(false)}
              >
                <span>Home</span>
              </Link>
              <Link
                href="/services"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/services')}`}
                onClick={() => setOpen(false)}
              >
                <span>Services</span>
              </Link>
              <Link
                href="/destinations"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/destinations')}`}
                onClick={() => setOpen(false)}
              >
                <span>Study Destination</span>
              </Link>
              <Link
                href="/test-preparation"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/test-preparation')}`}
                onClick={() => setOpen(false)}
              >
                <span>Test Preparation</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/about')}`}
                onClick={() => setOpen(false)}
              >
                <span>About</span>
              </Link>
            </nav>

            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className="w-full bg-[var(--color-primary)] text-white font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition text-sm text-center"
                onClick={() => {
                  setOpen(false);
                  applyNow.open({ intent: 'apply', source: 'header' });
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

