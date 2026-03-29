import { promises as fs } from 'fs';
import path from 'path';
import type { PublishedOffer } from '@/types/offer';
import { dbGetPublicOffers, supabaseAnonConfigured } from '@/lib/offersDb';

const OFFERS_PATH = path.join(process.cwd(), 'src', 'data', 'offers.json');

/** Public site: Supabase when configured, else local JSON file. */
export async function getPublicOffers(): Promise<PublishedOffer[]> {
  if (supabaseAnonConfigured()) {
    try {
      return await dbGetPublicOffers();
    } catch (e) {
      console.error('[offers] Supabase read failed, falling back to file:', e);
    }
  }
  const all = await readAllOffers();
  return all
    .filter((o) => o.active)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function readAllOffers(): Promise<PublishedOffer[]> {
  try {
    const raw = await fs.readFile(OFFERS_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as PublishedOffer[];
  } catch {
    return [];
  }
}

export async function writeAllOffers(offers: PublishedOffer[]): Promise<void> {
  await fs.mkdir(path.dirname(OFFERS_PATH), { recursive: true });
  await fs.writeFile(OFFERS_PATH, JSON.stringify(offers, null, 2), 'utf8');
}
