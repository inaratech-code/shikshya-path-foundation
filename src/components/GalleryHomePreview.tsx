'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import type { GalleryItem } from '@/types/gallery';

/** Loads public gallery from /api/gallery; renders nothing when empty. */
export default function GalleryHomePreview() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setItems(data.slice(0, 6));
        else if (!cancelled) setItems([]);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items === null || items.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <SectionHeading
            align="left"
            eyebrow="Gallery"
            title="Moments from our journey"
            description="Counselling, preparation, and success stories from our community."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center sm:justify-end gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all w-full sm:w-auto shrink-0 min-h-[44px] sm:min-h-0 rounded-lg sm:rounded-none active:opacity-90"
          >
            View full gallery <ArrowRight size={18} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group min-w-0 bg-white rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.99]"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full min-h-0 object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 419px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </div>
              <div className="p-3 sm:p-4 text-center">
                <div className="font-black text-slate-900 text-sm sm:text-base leading-snug line-clamp-3 sm:line-clamp-2 break-words hyphens-auto group-hover:text-[var(--color-primary)] transition-colors">
                  {item.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
