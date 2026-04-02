import Image from 'next/image';
import Link from 'next/link';
import { MAIN_SITE_LOGO_PATH } from '@/data/siteContent';

type Props = {
  /** Header: main PNG. Footer: slightly larger on dark background. */
  variant?: 'header' | 'footer';
  showName?: boolean;
  showMotto?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = 'header',
  showName = false,
  showMotto = false,
  className = '',
}: Props) {
  const isHeader = variant === 'header';

  return (
    <Link
      href="/"
      className={`flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0 min-w-0 ${className}`}
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
            ? 'h-12 w-auto min-h-[48px] sm:h-16 sm:min-h-[64px] md:h-20 md:min-h-[80px] lg:h-22 lg:min-h-[88px] max-w-[84px] sm:max-w-[96px] md:max-w-[108px] lg:max-w-[118px] object-contain object-left'
            : 'h-20 w-auto sm:h-24 md:h-28 lg:h-32 max-w-[min(100%,400px)] object-contain object-left'
        }
        sizes={
          isHeader
            ? '(max-width: 640px) 75vw, (max-width: 1024px) 320px, 340px'
            : '(max-width: 640px) 85vw, 400px'
        }
      />

      {showName ? (
        <span className="min-w-0 block max-w-[min(62vw,22rem)] sm:max-w-none text-center sm:text-left">
          <span className="block font-black leading-tight text-[13px] sm:text-sm md:text-base lg:text-lg tracking-tight truncate">
            <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Shikshya Path Foundation
            </span>
          </span>
          {showMotto ? (
            <span className="block text-[11px] sm:text-xs md:text-sm font-semibold truncate">
              <span className="brand-color-anim inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
                Your Dream Our Guidance
              </span>
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
