'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useApplyNow } from '@/components/ApplyNowContext';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTestPrepOpen, setMobileTestPrepOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const applyNow = useApplyNow();

  const isActive = (path: string) =>
    pathname === path ? 'text-[var(--color-primary)]' : '';

  const DESTINATIONS = [
    { label: 'Australia', slug: 'australia' },
    { label: 'Canada', slug: 'canada' },
    { label: 'UK', slug: 'uk' },
    { label: 'USA', slug: 'usa' },
  ] as const;

  const SERVICES = [
    { label: 'Abroad Studies', href: '/services#abroad-studies' },
    { label: 'Test Preparation', href: '/services#test-preparation' },
    { label: 'Documentation Guide', href: '/services#documentation-guide' },
    { label: 'University / College Guide', href: '/services#university-college-guide' },
  ] as const;

  const TEST_PREP = [
    { label: 'IELTS', href: '/test-preparation/ielts' },
    { label: 'PTE', href: '/test-preparation/pte' },
  ] as const;

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md text-start shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 min-h-[3.75rem] sm:min-h-[4.75rem] md:min-h-[5.75rem] lg:min-h-[6.25rem] py-1.5 sm:py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6">
        {/* Mobile: logo only (left) */}
        <div className="md:hidden">
          <BrandLogo variant="header" />
        </div>

        {/* Desktop: logo + full name + tagline (left) */}
        <div className="hidden md:block">
          <BrandLogo variant="header" showName showMotto />
        </div>

        {/* Mobile centered brand text (only) */}
        <div className="md:hidden min-w-0 text-center leading-tight">
          <div className="font-black tracking-tight text-[13px] truncate">
            <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
              Shikshya Path Foundation
            </span>
          </div>
          <div className="text-[11px] font-semibold truncate">
            <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
              Your Dream Our Guidance
            </span>
          </div>
        </div>

        {/* Desktop Nav — centered in middle column */}
        <nav
          className="hidden md:flex min-w-0 items-center justify-center gap-4 lg:gap-5 xl:gap-7 px-1 text-[var(--color-text-main)] font-bold text-[13px] leading-tight lg:text-sm xl:text-base whitespace-nowrap"
          aria-label="Primary"
        >
          <Link href="/" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/')}`}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/destinations') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={destOpen}
              onClick={() => setDestOpen((v) => !v)}
            >
              Study Destinations
            </button>

            <AnimatePresence>
              {destOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden"
                  role="menu"
                >
                  <div className="p-2">
                    {DESTINATIONS.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/destinations/${d.slug}`}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        role="menuitem"
                        onClick={() => setDestOpen(false)}
                      >
                        <span>{d.label}</span>
                        <span className="text-slate-400">→</span>
                      </Link>
                    ))}
                    <div className="mt-1 border-t border-slate-100 pt-1">
                      <Link
                        href="/destinations"
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        role="menuitem"
                        onClick={() => setDestOpen(false)}
                      >
                        <span>View all destinations</span>
                        <span className="text-slate-400">↗</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setDestOpen(false)}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/services') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={false}
            >
              Services
            </button>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 0, y: 10, scale: 0.98 }}
              className="pointer-events-none"
            />
            <div className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden opacity-0 translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out">
              <div className="p-2" role="menu">
                {SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    role="menuitem"
                  >
                    <span>{s.label}</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                ))}
                <div className="mt-1 border-t border-slate-100 pt-1">
                  <Link
                    href="/services"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    role="menuitem"
                  >
                    <span>View all services</span>
                    <span className="text-slate-400">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group" onMouseEnter={() => setDestOpen(false)}>
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/test-preparation') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={false}
            >
              Test Preparation
            </button>
            <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden opacity-0 translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out">
              <div className="p-2" role="menu">
                {TEST_PREP.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    role="menuitem"
                  >
                    <span>{t.label}</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                ))}
                <div className="mt-1 border-t border-slate-100 pt-1">
                  <Link
                    href="/test-preparation"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    role="menuitem"
                  >
                    <span>View all tests</span>
                    <span className="text-slate-400">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group" onMouseEnter={() => setDestOpen(false)}>
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname === '/about' ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={false}
            >
              About
            </button>
            <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden opacity-0 translate-y-2 scale-[0.98] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out">
              <div className="p-2" role="menu">
                <Link
                  href="/about"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                  role="menuitem"
                >
                  <span>About us</span>
                  <span className="text-slate-400">→</span>
                </Link>
                <Link
                  href="/about#mission"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                  role="menuitem"
                >
                  <span>Our mission</span>
                  <span className="text-slate-400">→</span>
                </Link>
                <div className="mt-1 border-t border-slate-100 pt-1">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    role="menuitem"
                  >
                    <span>Contact</span>
                    <span className="text-slate-400">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
        <div className="md:hidden border-t border-slate-200/50 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <nav className="flex flex-col gap-2 text-[var(--color-text-main)] text-sm font-bold">
              <Link
                href="/"
                className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 ${isActive('/')}`}
                onClick={() => setOpen(false)}
              >
                <span>Home</span>
              </Link>

              <div className="rounded-lg border border-slate-200/60 bg-white/60 overflow-hidden">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition ${
                    pathname?.startsWith('/services') ? 'text-[var(--color-primary)]' : ''
                  }`}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Services</span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="border-t border-slate-200/60 bg-white"
                    >
                      <div className="py-1">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                            onClick={() => {
                              setOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            {s.label}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileServicesOpen(false);
                          }}
                        >
                          View all services
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-lg border border-slate-200/60 bg-white/60 overflow-hidden">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition ${
                    pathname?.startsWith('/destinations') ? 'text-[var(--color-primary)]' : ''
                  }`}
                  onClick={() => setMobileDestOpen((v) => !v)}
                  aria-expanded={mobileDestOpen}
                >
                  <span>Study Destinations</span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileDestOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="border-t border-slate-200/60 bg-white"
                    >
                      <div className="py-1">
                        {DESTINATIONS.map((d) => (
                          <Link
                            key={d.slug}
                            href={`/destinations/${d.slug}`}
                            className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                            onClick={() => {
                              setOpen(false);
                              setMobileDestOpen(false);
                            }}
                          >
                            {d.label}
                          </Link>
                        ))}
                        <Link
                          href="/destinations"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileDestOpen(false);
                          }}
                        >
                          View all destinations
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-lg border border-slate-200/60 bg-white/60 overflow-hidden">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition ${
                    pathname?.startsWith('/test-preparation') ? 'text-[var(--color-primary)]' : ''
                  }`}
                  onClick={() => setMobileTestPrepOpen((v) => !v)}
                  aria-expanded={mobileTestPrepOpen}
                >
                  <span>Test Preparation</span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileTestPrepOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="border-t border-slate-200/60 bg-white"
                    >
                      <div className="py-1">
                        {TEST_PREP.map((t) => (
                          <Link
                            key={t.href}
                            href={t.href}
                            className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                            onClick={() => {
                              setOpen(false);
                              setMobileTestPrepOpen(false);
                            }}
                          >
                            {t.label}
                          </Link>
                        ))}
                        <Link
                          href="/test-preparation"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileTestPrepOpen(false);
                          }}
                        >
                          View all tests
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-lg border border-slate-200/60 bg-white/60 overflow-hidden">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition ${
                    pathname === '/about' ? 'text-[var(--color-primary)]' : ''
                  }`}
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  aria-expanded={mobileAboutOpen}
                >
                  <span>About</span>
                </button>

                <AnimatePresence initial={false}>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="border-t border-slate-200/60 bg-white"
                    >
                      <div className="py-1">
                        <Link
                          href="/about"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          About us
                        </Link>
                        <Link
                          href="/about#mission"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          Our mission
                        </Link>
                        <Link
                          href="/contact"
                          className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          Contact
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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

