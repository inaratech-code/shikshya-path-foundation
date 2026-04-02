import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

/** Only for `next dev` when Supabase public env is missing — never used in production builds. */
export async function appendDevLeadFallback(payload: Record<string, unknown>): Promise<void> {
  const dir = path.join(process.cwd(), 'tmp');
  await mkdir(dir, { recursive: true });
  const line =
    JSON.stringify({ ...payload, _receivedAt: new Date().toISOString(), _source: 'dev-fallback' }) + '\n';
  await appendFile(path.join(dir, 'leads-dev.ndjson'), line, 'utf8');
}
