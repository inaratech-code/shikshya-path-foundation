/**
 * Default token for offers API (must match login demo password when unset).
 * If you set `OFFERS_WRITE_SECRET` on the server, set `NEXT_PUBLIC_OFFERS_WRITE_SECRET`
 * to the same value so the admin UI can authorize requests.
 */
export const OFFERS_WRITE_DEFAULT = 'shikshya2026';

/** Empty or whitespace-only env values fall back to default (avoids `Bearer ` with no token). */
function resolvedWriteSecret(raw: string | undefined): string {
  const t = raw?.trim() ?? '';
  return t !== '' ? t : OFFERS_WRITE_DEFAULT;
}

export function getClientOffersWriteToken(): string {
  return resolvedWriteSecret(process.env.NEXT_PUBLIC_OFFERS_WRITE_SECRET);
}

/** Server-side secret; must match {@link getClientOffersWriteToken} for admin API calls. */
export function getOffersWriteSecret(): string {
  return resolvedWriteSecret(process.env.OFFERS_WRITE_SECRET);
}
