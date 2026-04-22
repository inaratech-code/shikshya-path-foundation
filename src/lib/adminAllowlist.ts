export function parseAdminAllowlist(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(',')
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminEmail(email: string | null | undefined, rawAllowlist: string | undefined): boolean {
  if (!email) return false;
  const allowlist = parseAdminAllowlist(rawAllowlist);
  // If not configured, allow any authenticated user (dev-friendly default).
  if (allowlist.size === 0) return true;
  return allowlist.has(email.toLowerCase());
}

