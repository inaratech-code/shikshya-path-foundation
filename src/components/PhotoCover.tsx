'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  primarySrc: string;
  fallbackSrc?: string;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
};

/**
 * Full-bleed remote photo with optional fallback URL (e.g. Pexels → Unsplash).
 * Uses next/image for responsive widths and sharper delivery than unoptimized img tags.
 */
export default function PhotoCover({
  primarySrc,
  fallbackSrc,
  alt = '',
  sizes,
  className = 'object-cover',
  priority = false,
  quality = 85,
}: Props) {
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      quality={quality}
      onError={() => {
        if (fallbackSrc && src !== fallbackSrc) setSrc(fallbackSrc);
      }}
    />
  );
}
