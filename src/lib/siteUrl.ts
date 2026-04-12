const FALLBACK_SITE_ORIGIN = 'https://shikshyapath.edu.np';

/**
 * Canonical origin for `metadataBase`, JSON-LD, and absolute asset URLs.
 * Empty or invalid `NEXT_PUBLIC_SITE_URL` would make `new URL(...)` throw in the root layout (500 on every page).
 */
export function getSiteUrlOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_ORIGIN;
  try {
    const withScheme = raw.includes('://') ? raw : `https://${raw}`;
    const u = new URL(withScheme);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return FALLBACK_SITE_ORIGIN;
    return u.origin;
  } catch {
    return FALLBACK_SITE_ORIGIN;
  }
}
