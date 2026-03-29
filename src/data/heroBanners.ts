/**
 * Full-width hero / dark-band backgrounds (student & study-abroad themed).
 * Curated Unsplash photos — stable direct URLs.
 */
export const HERO_BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=82',
  'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2400&q=82',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=82',
  'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2400&q=82',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2400&q=82',
] as const;

/** Deterministic pick so each page title maps to a stable banner without per-page props. */
export function heroBannerForSeed(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return HERO_BANNER_IMAGES[h % HERO_BANNER_IMAGES.length];
}
