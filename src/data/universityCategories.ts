/** Shared tiles for home + /universities — flag + destination photo per country */

export const universityCategoryTiles = [
  {
    slug: 'usa',
    title: 'Popular Universities USA',
    flagImg: 'https://flagcdn.com/w80/us.png',
    bgImg:
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=85',
    bgImgAlt:
      'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    slug: 'uk',
    title: 'Popular Universities UK',
    flagImg: 'https://flagcdn.com/w80/gb.png',
    // Pexels first — reliable first paint; Unsplash as alternate
    bgImg:
      'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bgImgAlt:
      'https://images.unsplash.com/photo-1513635269976-596596e8df88?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'canada',
    title: 'Popular Universities Canada',
    flagImg: 'https://flagcdn.com/w80/ca.png',
    bgImg:
      'https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bgImgAlt:
      'https://images.unsplash.com/photo-1517935706615-2717063c2215?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'australia',
    title: 'Popular Universities Australia',
    flagImg: 'https://flagcdn.com/w80/au.png',
    bgImg:
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bgImgAlt:
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb886?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'new-zealand',
    title: 'Popular Universities New Zealand',
    flagImg: 'https://flagcdn.com/w80/nz.png',
    bgImg:
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bgImgAlt:
      'https://images.unsplash.com/photo-1469528849692-9bcd8c38e792?auto=format&fit=crop&w=1200&q=85',
  },
] as const;

const DEFAULT_DESTINATION_HERO =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80';

/** Resolve hero/background image for a destination slug (used by /destinations/[country] and accordions). */
export function getDestinationHeroImage(rawSlug: string): string {
  const k = normalizeDestinationSlug(rawSlug);
  const found = universityCategoryTiles.find((t) => t.slug === k);
  if (!found) return DEFAULT_DESTINATION_HERO;
  // Cards may use Pexels as primary; heroes prefer Unsplash when that is the alternate
  const primaryUnsplash = found.bgImg.includes('images.unsplash.com');
  if (primaryUnsplash) return found.bgImg;
  return found.bgImgAlt;
}

function normalizeDestinationSlug(raw: string): string {
  const s = raw.toLowerCase().trim();
  const aliases: Record<string, string> = {
    us: 'usa',
    'united-states': 'usa',
    america: 'usa',
    'united-kingdom': 'uk',
    britain: 'uk',
    england: 'uk',
    gb: 'uk',
    nz: 'new-zealand',
  };
  return aliases[s] ?? s;
}
