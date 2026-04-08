import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_LOGO_PATH, MAIN_SITE_LOGO_PATH, SITE_MOTTO } from '@/data/siteContent';

type Props = {
  /** Header: main PNG. Footer: slightly larger on dark background. */
  variant?: 'header' | 'footer';
  /** Override image (e.g. footer uses `FOOTER_LOGO_PATH`). Defaults by variant when omitted. */
  logoSrc?: string;
  showName?: boolean;
  showMotto?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = 'header',
  logoSrc,
  showName = false,
  showMotto = false,
  className = '',
}: Props) {
  const isHeader = variant === 'header';
  const src =
    logoSrc ?? (variant === 'footer' ? FOOTER_LOGO_PATH : MAIN_SITE_LOGO_PATH);

  return (
    <Link
      href="/"
      className={
        isHeader
          ? `flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0 min-w-0 ${className}`
          : `flex w-full max-w-[min(100%,480px)] shrink-0 flex-col items-center gap-2 text-center lg:max-w-none lg:items-start lg:text-left ${className}`
      }
      aria-label="Shikshya Path Foundation — Home"
    >
      {isHeader ? (
        <Image
          src={src}
          alt="Shikshya Path Foundation Logo"
          width={512}
          height={512}
          priority
          className="h-12 w-auto min-h-[48px] sm:h-16 sm:min-h-[64px] md:h-20 md:min-h-[80px] lg:h-22 lg:min-h-[88px] max-w-[84px] sm:max-w-[96px] md:max-w-[108px] lg:max-w-[118px] object-contain object-left"
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 320px, 340px"
        />
      ) : (
        <div className="relative mx-auto h-28 w-full max-w-[280px] shrink-0 sm:h-32 lg:mx-0 lg:h-36 lg:max-w-[min(100%,360px)] xl:h-40">
          <Image
            src={src}
            alt="Shikshya Path Foundation Logo"
            fill
            priority
            className="object-contain object-center lg:object-left"
            sizes="(max-width: 1024px) 280px, 360px"
          />
        </div>
      )}

      {!isHeader ? (
        <span className="max-w-[min(100%,20rem)] text-slate-900 font-semibold text-sm italic leading-snug lg:max-w-none">
          &ldquo;{SITE_MOTTO}&rdquo;
        </span>
      ) : null}

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
