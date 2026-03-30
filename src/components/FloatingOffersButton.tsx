'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import type { PublishedOffer } from '@/types/offer';

export default function FloatingOffersButton() {
  const pathname = usePathname();
  const [offers, setOffers] = useState<PublishedOffer[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const hideOnAdmin =
    pathname?.startsWith('/admin') || pathname === '/login' || pathname?.startsWith('/admin/');

  useEffect(() => {
    if (hideOnAdmin) return;
    let cancelled = false;

    const load = () => {
      void (async () => {
        try {
          const res = await fetch('/api/offers', { cache: 'no-store' });
          if (!res.ok) return;
          const data = (await res.json()) as PublishedOffer[];
          if (!cancelled) setOffers(Array.isArray(data) ? data : []);
        } catch {
          /* ignore */
        } finally {
          if (!cancelled) setLoaded(true);
        }
      })();
    };

    let idleHandle: number | undefined;
    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      idleHandle = window.setTimeout(load, 400) as unknown as number;
    }

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === 'function' && idleHandle !== undefined) {
        window.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
    };
  }, [hideOnAdmin]);

  useEffect(() => {
    if (hideOnAdmin || !loaded) return;
    const tick = () => {
      if (document.visibilityState !== 'visible') return;
      void (async () => {
        try {
          const res = await fetch('/api/offers', { cache: 'no-store' });
          if (!res.ok) return;
          const data = (await res.json()) as PublishedOffer[];
          setOffers(Array.isArray(data) ? data : []);
        } catch {
          /* ignore */
        }
      })();
    };
    const id = window.setInterval(tick, 120_000);
    return () => clearInterval(id);
  }, [hideOnAdmin, loaded]);

  if (hideOnAdmin) return null;

  const count = offers.length;

  // Only show the floating button when at least one offer exists.
  // Stay hidden while loading to avoid UI flicker.
  if (!loaded || count === 0) return null;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-[min(100vw-2rem,22rem)] max-h-[min(70vh,420px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
                <div className="flex items-center gap-2 font-bold">
                  <Gift size={18} className="shrink-0" />
                  Current offers
                </div>
                <button
                  type="button"
                  className="rounded-lg p-1.5 hover:bg-white/15 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[min(60vh,360px)] overflow-y-auto p-3">
                <ul className="space-y-2">
                  {offers.map((o) => (
                    <li
                      key={o.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-left"
                    >
                      {o.badge ? (
                        <span className="mb-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800">
                          {o.badge}
                        </span>
                      ) : null}
                      <div className="font-bold text-slate-900 text-sm leading-snug">{o.title}</div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{o.subtitle}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/offers"
                  className="mt-3 block rounded-xl bg-slate-900 py-2.5 text-center text-sm font-bold text-white hover:bg-slate-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  View all on Offers page
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/35 transition-transform hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          aria-expanded={open}
          aria-label={open ? 'Close offers' : 'Open current offers'}
        >
          <Gift size={26} strokeWidth={2} className="drop-shadow-sm" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-slate-900 ring-2 ring-white">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] bg-slate-900/25 backdrop-blur-[2px] sm:hidden"
            aria-label="Close overlay"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
