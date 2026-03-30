'use client';

import { useEffect, useState } from 'react';

export default function UniversityLogoBadge({
  name,
  logo,
  className = '',
}: {
  name: string;
  logo: string;
  className?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'failed'>('idle');

  useEffect(() => {
    if (!logo) {
      setStatus('failed');
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.onload = () => {
      if (!cancelled) setStatus('ok');
    };
    img.onerror = () => {
      if (!cancelled) setStatus('failed');
    };
    img.src = logo;
    return () => {
      cancelled = true;
    };
  }, [logo]);

  if (status !== 'ok') {
    return (
      <span
        className={`block max-w-[14rem] text-white font-black text-sm leading-tight ${className}`}
        aria-label={name}
      >
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={`${name} logo`}
      className={`h-9 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

