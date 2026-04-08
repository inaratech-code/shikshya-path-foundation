/** Client + API: block obvious dummy / disposable emails and implausible Nepal mobiles */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'yopmail.com',
  'throwaway.email',
  'trashmail.com',
  'fakeinbox.com',
  'getnada.com',
  'maildrop.cc',
  'sharklasers.com',
  'mailnesia.com',
  'dispostable.com',
  'mailcatch.com',
  'emailondeck.com',
]);

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'invalid.com',
  'email.com',
  'domain.com',
  'localhost',
]);

/** Rejects disposable domains, example/test domains, and obvious dummy local parts */
export function validateLeadEmail(email: string): { ok: true } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  if (!e || !EMAIL_RE.test(e)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  const at = e.lastIndexOf('@');
  if (at < 1) return { ok: false, error: 'Please enter a valid email address.' };
  const local = e.slice(0, at);
  const domain = e.slice(at + 1);
  if (local.length < 2) {
    return { ok: false, error: 'Please use a real email address.' };
  }
  if (/^(.)\1+$/.test(local)) {
    return { ok: false, error: 'Please use a real email address.' };
  }
  if (DISPOSABLE_DOMAINS.has(domain) || BLOCKED_DOMAINS.has(domain)) {
    return {
      ok: false,
      error: 'Please use a permanent email address (not a disposable or test address).',
    };
  }
  if (domain.endsWith('.test') || domain.endsWith('.invalid') || domain.endsWith('.localhost')) {
    return { ok: false, error: 'Please use a real email address.' };
  }
  if (/^(test|admin|fake|dummy|none|asdf|qwerty|12345|aaaa|bbbb|cccc|dddd)/i.test(local)) {
    return { ok: false, error: 'Please use your real email address.' };
  }
  return { ok: true };
}

/** 10-digit Nepal mobile without country code: reject repeats and non-mobile patterns */
export function validateNepalMobileDigits(digits: string): { ok: true } | { ok: false; error: string } {
  if (!/^\d{10}$/.test(digits)) {
    return { ok: false, error: 'Phone number must be exactly 10 digits.' };
  }
  if (/^(\d)\1{9}$/.test(digits)) {
    return { ok: false, error: 'Please enter a valid mobile number.' };
  }
  if (!/^9/.test(digits)) {
    return { ok: false, error: 'Enter a valid Nepal mobile number (10 digits, starting with 9).' };
  }
  return { ok: true };
}
