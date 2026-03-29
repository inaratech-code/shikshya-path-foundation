import Image from 'next/image';
import Link from 'next/link';
import { SITE_LOGO_PATH } from '@/data/siteContent';

type Props = {
  /** Header: compact. Footer: slightly larger on dark background. */
  variant?: 'header' | 'footer';
  className?: string;
};

export default function BrandLogo({ variant = 'header', className = '' }: Props) {
  const isHeader = variant === 'header';
  /** Wide logo asset; display height drives layout */
  const intrinsicW = isHeader ? 480 : 360;
  const intrinsicH = isHeader ? 120 : 96;

  return (
    <Link
      href="/"
      className={`flex items-center shrink-0 min-w-0 ${className}`}
      aria-label="Shikshya Path Foundation — Home"
    >
      <Image
        src={SITE_LOGO_PATH}
        alt="Shikshya Path Foundation"
        width={intrinsicW}
        height={intrinsicH}
        priority
        className={
          isHeader
            ? 'h-14 w-auto min-h-[56px] sm:h-16 sm:min-h-[64px] md:h-[72px] lg:h-[80px] xl:h-[88px] max-w-[min(78vw,280px)] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[460px] object-contain object-left'
            : 'h-16 w-auto sm:h-20 md:h-24 max-w-[min(100%,400px)] object-contain object-left'
        }
        sizes={isHeader ? '(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px' : '(max-width: 640px) 320px, 400px'}
      />
    </Link>
  );
}
