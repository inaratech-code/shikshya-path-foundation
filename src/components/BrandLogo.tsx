import Image from 'next/image';
import Link from 'next/link';
import { MAIN_SITE_LOGO_PATH } from '@/data/siteContent';

type Props = {
  /** Header: main PNG. Footer: slightly larger on dark background. */
  variant?: 'header' | 'footer';
  className?: string;
};

export default function BrandLogo({ variant = 'header', className = '' }: Props) {
  const isHeader = variant === 'header';

  return (
    <Link
      href="/"
      className={`flex items-center shrink-0 min-w-0 ${className}`}
      aria-label="Shikshya Path Foundation — Home"
    >
      <Image
        src={MAIN_SITE_LOGO_PATH}
        alt="Shikshya Path Foundation Logo"
        width={512}
        height={512}
        priority
        className={
          isHeader
            ? 'h-12 w-auto min-h-[48px] sm:h-16 sm:min-h-[64px] md:h-20 md:min-h-[80px] lg:h-22 lg:min-h-[88px] max-w-[min(88vw,240px)] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px] object-contain object-left'
            : 'h-20 w-auto sm:h-24 md:h-28 lg:h-32 max-w-[min(100%,400px)] object-contain object-left'
        }
        sizes={
          isHeader
            ? '(max-width: 640px) 75vw, (max-width: 1024px) 320px, 340px'
            : '(max-width: 640px) 85vw, 400px'
        }
      />
    </Link>
  );
}
