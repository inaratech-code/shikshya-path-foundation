'use client';

import { motion } from 'framer-motion';
import HeroBannerLayers from '@/components/HeroBannerLayers';
import { heroBannerForSeed } from '@/data/heroBanners';

export default function InnerPageHero({
  title,
  description,
  bannerImage,
}: {
  title: string;
  description: string;
  /** Optional full URL; defaults to a stable image from title */
  bannerImage?: string;
}) {
  const imageSrc = bannerImage ?? heroBannerForSeed(title);

  return (
    <section className="relative pb-14 sm:pb-20 overflow-hidden text-center text-white">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[var(--header-height)] z-0 overflow-hidden"
        aria-hidden
      >
        <HeroBannerLayers imageSrc={imageSrc} overlay="hero" priority />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-[var(--hero-inner-pt)]">
        <motion.h1 
          className="text-center text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-justify text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
