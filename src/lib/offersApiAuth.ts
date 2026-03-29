import { OFFERS_WRITE_DEFAULT } from '@/lib/offersWriteToken';

/**
 * Shared secret for mutating offers via API. Defaults to demo token so local setup works.
 * If you set OFFERS_WRITE_SECRET, also set NEXT_PUBLIC_OFFERS_WRITE_SECRET to the same value for the admin UI.
 */
export function getOffersWriteSecret(): string {
  return process.env.OFFERS_WRITE_SECRET ?? OFFERS_WRITE_DEFAULT;
}

export function offersWriteAuthorized(request: Request): boolean {
  const auth = request.headers.get('authorization');
  const expected = `Bearer ${getOffersWriteSecret()}`;
  return auth === expected;
}
