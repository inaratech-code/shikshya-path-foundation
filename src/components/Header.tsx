'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path ? 'text-[var(--color-primary)]' : '';

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--color-primary)] rounded-lg flex flex-col items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
            S
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-brand-accent)] bg-clip-text text-transparent font-heading tracking-tight">
            Shikshya Path
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-[var(--color-text-main)] font-medium text-sm lg:text-base">
          <Link href="/destinations" className={`hover:text-[var(--color-primary)] transition ${isActive('/destinations')}`}>Destinations</Link>
          <Link href="/services" className={`hover:text-[var(--color-primary)] transition ${isActive('/services')}`}>Services</Link>
          <Link href="/universities" className={`hover:text-[var(--color-primary)] transition ${isActive('/universities')}`}>Universities</Link>
          <Link href="/about" className={`hover:text-[var(--color-primary)] transition ${isActive('/about')}`}>About</Link>
          <Link href="/offers" className="hover:text-amber-600 px-3 py-1.5 bg-amber-50 rounded-full text-amber-700 transition font-semibold flex items-center gap-1">
            <Star size={14} fill="currentColor" /> Offers
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex gap-3 items-center">
          <Link
            href="/contact"
            className="hidden md:block text-[var(--color-primary)] font-semibold border border-[var(--color-primary)] px-4 py-2 rounded-xl hover:bg-blue-50 transition text-sm"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="bg-[var(--color-primary)] text-white font-semibold px-4 py-2 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-brand-accent)]/30 transition-all text-sm"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <nav className="flex flex-col gap-1 text-[var(--color-text-main)] text-sm">
              <Link
                href="/destinations"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/destinations')}`}
                onClick={() => setOpen(false)}
              >
                <span>Destinations</span>
              </Link>
              <Link
                href="/services"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/services')}`}
                onClick={() => setOpen(false)}
              >
                <span>Services</span>
              </Link>
              <Link
                href="/universities"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/universities')}`}
                onClick={() => setOpen(false)}
              >
                <span>Universities</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/about')}`}
                onClick={() => setOpen(false)}
              >
                <span>About</span>
              </Link>
              <Link
                href="/offers"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-50 text-amber-700 font-semibold"
                onClick={() => setOpen(false)}
              >
                <span>Offers</span>
                <Star size={14} fill="currentColor" />
              </Link>
            </nav>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/contact"
                className="w-full text-[var(--color-primary)] font-semibold border border-[var(--color-primary)] px-4 py-2 rounded-xl hover:bg-blue-50 transition text-sm text-center"
                onClick={() => setOpen(false)}
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="w-full bg-[var(--color-primary)] text-white font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition text-sm text-center"
                onClick={() => setOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

