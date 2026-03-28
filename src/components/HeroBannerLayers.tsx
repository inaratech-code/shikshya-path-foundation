import Image from 'next/image';

export type HeroBannerOverlay = 'hero' | 'section' | 'cta';

const OVERLAY: Record<HeroBannerOverlay, string> = {
  hero: 'bg-gradient-to-br from-slate-950/92 via-[var(--color-primary-dark)]/78 to-slate-950/90',
  section:
    'bg-gradient-to-br from-slate-950/88 via-slate-900/72 to-slate-950/86',
  cta: 'bg-gradient-to-br from-slate-950/91 via-[var(--color-primary-dark)]/68 to-[var(--color-text-main)]/90',
};

type Props = {
  imageSrc: string;
  overlay?: HeroBannerOverlay;
  /** Preload for LCP (inner page heroes, first home hero band). */
  priority?: boolean;
};

/**
 * Photo background + dark blue overlay + soft light orbs. Parent must be `relative overflow-hidden`.
 */
export default function HeroBannerLayers({
  imageSrc,
  overlay = 'hero',
  priority = false,
}: Props) {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      <div className={`absolute inset-0 z-[1] ${OVERLAY[overlay]}`} />
      <div
        className="absolute top-0 right-[-10%] w-96 h-96 bg-[var(--color-primary)]/22 blur-[100px] rounded-full z-[2] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-[-25%] left-[-12%] w-96 h-96 bg-indigo-500/18 blur-[100px] rounded-full z-[2] pointer-events-none"
        aria-hidden
      />
    </>
  );
}
