'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  flagImg: string;
  bgImage: string;
  /** Second URL if primary fails (e.g. Unsplash → Pexels) */
  bgImageAlt?: string;
  /** Tailwind gradient classes behind the photo */
  fallbackClassName?: string;
  className?: string;
};

export default function UniversityCategoryCard({
  title,
  flagImg,
  bgImage,
  bgImageAlt,
  fallbackClassName = 'bg-gradient-to-br from-slate-100 via-primary-soft/80 to-slate-100',
  className = '',
}: Props) {
  const [flagFailed, setFlagFailed] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);
  const [bgSrc, setBgSrc] = useState(bgImage);

  useEffect(() => {
    setBgSrc(bgImage);
    setBgFailed(false);
  }, [bgImage]);

  return (
    <div
      className={`relative overflow-hidden border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 min-h-[148px] sm:min-h-[168px] flex flex-col h-full ${className}`}
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className={`absolute inset-0 ${fallbackClassName}`} />
        {!bgFailed && (
          <Image
            key={bgSrc}
            src={bgSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            quality={85}
            priority
            onError={() => {
              if (bgImageAlt && bgSrc === bgImage) {
                setBgSrc(bgImageAlt);
              } else {
                setBgFailed(true);
              }
            }}
          />
        )}
      </div>
      {/* Light wash so text stays readable; photos stay visible (not flat gray) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white/95 via-white/55 to-white/15"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-6 -right-8 z-[1] h-28 w-28 rounded-full bg-primary/12 blur-2xl" aria-hidden="true" />
      {/* Light doodle — sits under text, adds interest if photo is soft */}
      <svg
        className="pointer-events-none absolute bottom-1 right-1 z-[2] h-16 w-16 text-[var(--color-primary)] opacity-[0.14]"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M60 18L18 38v44c0 22 18 40 42 40s42-18 42-40V38L60 18z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M38 58h44M60 58v32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="46" r="8" fill="currentColor" opacity="0.35" />
      </svg>
      <div className="relative z-[2] flex flex-col flex-1 justify-end min-h-0">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] sm:text-xs font-semibold text-slate-700 mb-2 sm:mb-3 max-w-full">
          {!flagFailed ? (
            <Image
              src={flagImg}
              alt=""
              aria-hidden={true}
              width={40}
              height={28}
              className="w-4 h-2.5 sm:w-5 sm:h-3.5 rounded-[3px] border border-slate-200 object-cover shrink-0"
              loading="eager"
              quality={90}
              sizes="40px"
              referrerPolicy="no-referrer"
              onError={() => setFlagFailed(true)}
            />
          ) : (
            <span className="w-4 h-2.5 sm:w-5 sm:h-3.5 rounded-[3px] bg-slate-200 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate sm:whitespace-normal">Country Focus</span>
        </div>
        <div className="text-xs sm:text-lg font-black text-slate-900 leading-snug">{title}</div>
        <p className="text-[10px] sm:text-xs text-slate-600 mt-1 font-medium">Curated shortlist</p>
      </div>
    </div>
  );
}
