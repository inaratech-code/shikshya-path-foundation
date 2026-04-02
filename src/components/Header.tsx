'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useApplyNow } from '@/components/ApplyNowContext';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [testPrepOpen, setTestPrepOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTestPrepOpen, setMobileTestPrepOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const applyNow = useApplyNow();

  const isActive = (path: string) =>
    pathname === path ? 'text-[var(--color-primary)]' : '';

  const DESTINATIONS = [
    { label: 'Australia', slug: 'australia', flag: 'au' },
    { label: 'Canada', slug: 'canada', flag: 'ca' },
    { label: 'UK', slug: 'uk', flag: 'gb' },
    { label: 'USA', slug: 'usa', flag: 'us' },
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

  const keepOpenOnPointerLeave = (e: React.PointerEvent<HTMLElement>, close: () => void) => {
    const next = e.relatedTarget;
    // relatedTarget can be EventTarget but not a Node (e.g. Window); contains() requires a Node.
    if (next instanceof Node && e.currentTarget.contains(next)) return;
    close();
  };

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
        <Link href="/" className="md:hidden min-w-0 text-center leading-tight block" aria-label="Shikshya Path Foundation — Home">
          <div className="font-black tracking-tight text-[13px] truncate">
            <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Shikshya Path Foundation
            </span>
          </div>
          <div className="text-[11px] font-semibold truncate">
            <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
              Your Dream Our Guidance
            </span>
          </div>
        </Link>

        {/* Desktop Nav — centered in middle column */}
        <nav
          className="hidden md:flex min-w-0 items-center justify-center gap-4 lg:gap-5 xl:gap-7 px-1 text-[var(--color-text-main)] font-bold text-sm leading-tight lg:text-base xl:text-lg whitespace-nowrap"
          aria-label="Primary"
        >
          <Link href="/" className={`shrink-0 hover:text-[var(--color-primary)] transition ${isActive('/')}`}>
            Home
          </Link>

          <div
            className="relative"
            onPointerEnter={() => setDestOpen(true)}
            onPointerLeave={(e) => keepOpenOnPointerLeave(e, () => setDestOpen(false))}
          >
            <Link
              href="/destinations"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/destinations') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={destOpen}
            >
              Study Destinations
            </Link>
            <div className="absolute left-0 right-0 top-full h-3" aria-hidden="true" />

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
                        <Image
                          src={`https://flagcdn.com/w40/${d.flag}.png`}
                          alt={`${d.label} flag`}
                          width={22}
                          height={16}
                          className="rounded-sm shadow-sm ring-1 ring-slate-200/70"
                        />
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
            className="relative"
            onPointerEnter={() => {
              setDestOpen(false);
              setServicesOpen(true);
            }}
            onPointerLeave={(e) => keepOpenOnPointerLeave(e, () => setServicesOpen(false))}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/services') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
            >
              Services
            </Link>
            <div className="absolute left-0 right-0 top-full h-3" aria-hidden="true" />

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden"
                  role="menu"
                >
                  <div className="p-2">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
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
                        onClick={() => setServicesOpen(false)}
                      >
                        <span>View all services</span>
                        <span className="text-slate-400">↗</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onPointerEnter={() => {
              setDestOpen(false);
              setTestPrepOpen(true);
            }}
            onPointerLeave={(e) => keepOpenOnPointerLeave(e, () => setTestPrepOpen(false))}
          >
            <Link
              href="/test-preparation"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname?.startsWith('/test-preparation') ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={testPrepOpen}
            >
              Test Preparation
            </Link>
            <div className="absolute left-0 right-0 top-full h-3" aria-hidden="true" />

            <AnimatePresence>
              {testPrepOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden"
                  role="menu"
                >
                  <div className="p-2">
                    {TEST_PREP.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        role="menuitem"
                        onClick={() => setTestPrepOpen(false)}
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
                        onClick={() => setTestPrepOpen(false)}
                      >
                        <span>View all tests</span>
                        <span className="text-slate-400">↗</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onPointerEnter={() => {
              setDestOpen(false);
              setAboutOpen(true);
            }}
            onPointerLeave={(e) => keepOpenOnPointerLeave(e, () => setAboutOpen(false))}
          >
            <Link
              href="/about"
              className={`inline-flex items-center gap-1.5 shrink-0 hover:text-[var(--color-primary)] transition ${pathname === '/about' ? 'text-[var(--color-primary)]' : ''}`}
              aria-haspopup="menu"
              aria-expanded={aboutOpen}
            >
              About
            </Link>
            <div className="absolute left-0 right-0 top-full h-3" aria-hidden="true" />

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-900/10 overflow-hidden"
                  role="menu"
                >
                  <div className="p-2">
                    <Link
                      href="/about"
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                      role="menuitem"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span>About us</span>
                      <span className="text-slate-400">→</span>
                    </Link>
                    <Link
                      href="/about#mission"
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                      role="menuitem"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span>Our mission</span>
                      <span className="text-slate-400">→</span>
                    </Link>
                    <div className="mt-1 border-t border-slate-100 pt-1">
                      <Link
                        href="/contact"
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                        role="menuitem"
                        onClick={() => setAboutOpen(false)}
                      >
                        <span>Contact</span>
                        <span className="text-slate-400">↗</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                <div className="flex w-full min-w-0 items-stretch">
                  <Link
                    href="/services"
                    className={`min-w-0 flex-1 px-3 py-2 hover:bg-slate-50 transition ${
                      pathname?.startsWith('/services') ? 'text-[var(--color-primary)]' : ''
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center border-l border-slate-200/60 px-2.5 text-slate-500 hover:bg-slate-50"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    aria-label="Toggle Services submenu"
                  >
                    <ChevronDown
                      size={18}
                      className={mobileServicesOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                    />
                  </button>
                </div>

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
                <div className="flex w-full min-w-0 items-stretch">
                  <Link
                    href="/destinations"
                    className={`min-w-0 flex-1 px-3 py-2 hover:bg-slate-50 transition ${
                      pathname?.startsWith('/destinations') ? 'text-[var(--color-primary)]' : ''
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Study Destinations
                  </Link>
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center border-l border-slate-200/60 px-2.5 text-slate-500 hover:bg-slate-50"
                    onClick={() => setMobileDestOpen((v) => !v)}
                    aria-expanded={mobileDestOpen}
                    aria-label="Toggle Study Destinations submenu"
                  >
                    <ChevronDown
                      size={18}
                      className={mobileDestOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                    />
                  </button>
                </div>

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
                <div className="flex w-full min-w-0 items-stretch">
                  <Link
                    href="/test-preparation"
                    className={`min-w-0 flex-1 px-3 py-2 hover:bg-slate-50 transition ${
                      pathname?.startsWith('/test-preparation') ? 'text-[var(--color-primary)]' : ''
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Test Preparation
                  </Link>
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center border-l border-slate-200/60 px-2.5 text-slate-500 hover:bg-slate-50"
                    onClick={() => setMobileTestPrepOpen((v) => !v)}
                    aria-expanded={mobileTestPrepOpen}
                    aria-label="Toggle Test Preparation submenu"
                  >
                    <ChevronDown
                      size={18}
                      className={mobileTestPrepOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                    />
                  </button>
                </div>

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
                <div className="flex w-full min-w-0 items-stretch">
                  <Link
                    href="/about"
                    className={`min-w-0 flex-1 px-3 py-2 hover:bg-slate-50 transition ${
                      pathname === '/about' ? 'text-[var(--color-primary)]' : ''
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center border-l border-slate-200/60 px-2.5 text-slate-500 hover:bg-slate-50"
                    onClick={() => setMobileAboutOpen((v) => !v)}
                    aria-expanded={mobileAboutOpen}
                    aria-label="Toggle About submenu"
                  >
                    <ChevronDown
                      size={18}
                      className={mobileAboutOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                    />
                  </button>
                </div>

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

