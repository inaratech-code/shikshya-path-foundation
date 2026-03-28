/** Home + /universities tiles and hero URLs — sourced from siteContent */
import { getStudyDestinationHero, normalizeStudySlug, studyDestinations } from '@/data/siteContent';

export const universityCategoryTiles = studyDestinations
  .filter((d) => d.showOnUniversityTiles)
  .map((d) => ({
    slug: d.slug,
    title: d.universityCardTitle,
    flagImg: d.flagImgTile,
    bgImg: d.bgImg,
    bgImgAlt: d.bgImgAlt,
  }));

/** Hero image for /destinations/[country] and accordions */
export function getDestinationHeroImage(rawSlug: string): string {
  return getStudyDestinationHero(normalizeStudySlug(rawSlug));
}
