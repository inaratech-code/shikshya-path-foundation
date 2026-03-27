'use client';

import { useState } from 'react';

type Props = {
  title: string;
  flagImg: string;
  bgImage: string;
  /** Tailwind gradient classes behind the photo */
  fallbackClassName?: string;
};

export default function UniversityCategoryCard({
  title,
  flagImg,
  bgImage,
  fallbackClassName = 'bg-gradient-to-br from-slate-100 via-blue-50/80 to-slate-100',
}: Props) {
  const [flagFailed, setFlagFailed] = useState(false);

  return (
    <div className="relative overflow-hidden border border-slate-200 rounded-2xl p-6 min-h-[132px]">
      <div className="absolute inset-0" aria-hidden="true">
        <div className={`absolute inset-0 ${fallbackClassName}`} />
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>
      <div className="absolute inset-0 bg-white/82" />
      <div className="absolute -top-6 -right-8 w-28 h-28 rounded-full bg-blue-100/40 blur-2xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
          {!flagFailed ? (
            <img
              src={flagImg}
              alt=""
              aria-hidden="true"
              className="w-5 h-3.5 rounded-[3px] border border-slate-200 object-cover shrink-0"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFlagFailed(true)}
            />
          ) : (
            <span className="w-5 h-3.5 rounded-[3px] bg-slate-200 shrink-0" aria-hidden="true" />
          )}
          Country Focus
        </div>
        <div className="text-lg font-black text-slate-900">{title}</div>
      </div>
    </div>
  );
}
