import { getOffersWriteSecret } from '@/lib/offersWriteToken';

/**
 * Shared secret for mutating offers/gallery via API. Defaults to demo token so local setup works.
 * If you set OFFERS_WRITE_SECRET, also set NEXT_PUBLIC_OFFERS_WRITE_SECRET to the same value for the admin UI.
 */
export function offersWriteAuthorized(request: Request): boolean {
  const auth = (request.headers.get('authorization') ?? '').trim();
  const expected = `Bearer ${getOffersWriteSecret()}`;
  return auth === expected;
}
