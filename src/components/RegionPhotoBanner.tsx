'use client';

import PhotoCover from '@/components/PhotoCover';

type Props = {
  primarySrc?: string;
  fallbackSrc?: string;
  variant?: 'hero' | 'strip';
  /** Applied to the underlying next/image (e.g. hover scale). */
  imageClassName?: string;
};

export default function RegionPhotoBanner({
  primarySrc,
  fallbackSrc,
  variant = 'hero',
  imageClassName,
}: Props) {
  if (!primarySrc) return null;
  const sizes =
    variant === 'hero'
      ? '(max-width: 1280px) 100vw, 1280px'
      : '(max-width: 640px) 100vw, 50vw';
  return (
    <div className="absolute inset-0" aria-hidden>
      <PhotoCover
        primarySrc={primarySrc}
        fallbackSrc={fallbackSrc}
        alt=""
        sizes={sizes}
        className={imageClassName ?? 'object-cover'}
        quality={85}
      />
    </div>
  );
}
