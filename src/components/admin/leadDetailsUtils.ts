/** Parses text we store from Apply modal (line-based key: value). */
export type ParsedLeadMessage = {
  intent?: string;
  academicLevel?: string;
  preferredProgram?: string;
};

export function parseApplyFormMessage(raw: string): ParsedLeadMessage {
  const out: ParsedLeadMessage = {};
  if (!raw || raw === '—') return out;
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  for (const line of lines) {
    let m = /^Intent:\s*(.+)$/i.exec(line);
    if (m) {
      out.intent = m[1].trim();
      continue;
    }
    m = /^Academic level:\s*(.+)$/i.exec(line);
    if (m) {
      out.academicLevel = m[1].trim();
      continue;
    }
    m = /^Preferred program:\s*(.+)$/i.exec(line);
    if (m) {
      out.preferredProgram = m[1].trim();
      continue;
    }
  }
  return out;
}

/** Remaining lines that are not the standard Apply keys (e.g. contact free-text). */
export function messageBodyExcludingParsed(raw: string, parsed: ParsedLeadMessage): string {
  if (!raw || raw === '—') return '';
  const lines = raw.split(/\r?\n/);
  const kept: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^Intent:/i.test(t) && parsed.intent) continue;
    if (/^Academic level:/i.test(t) && parsed.academicLevel) continue;
    if (/^Preferred program:/i.test(t) && parsed.preferredProgram) continue;
    kept.push(line);
  }
  return kept.join('\n').trim();
}
