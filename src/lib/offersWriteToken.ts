/**
 * Default token for offers API (must match login demo password when unset).
 * If you set `OFFERS_WRITE_SECRET` on the server, set `NEXT_PUBLIC_OFFERS_WRITE_SECRET`
 * to the same value so the admin UI can authorize requests.
 */
export const OFFERS_WRITE_DEFAULT = 'shikshya2026';

export function getClientOffersWriteToken(): string {
  return process.env.NEXT_PUBLIC_OFFERS_WRITE_SECRET ?? OFFERS_WRITE_DEFAULT;
}
