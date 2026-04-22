/**
 * Client-only demo auth for the admin panel. Replace with a real backend session before production.
 */
export const ADMIN_SESSION_STORAGE_KEY = 'spf_admin_auth_v1';

export function saveAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, '1');
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

export function hasAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === '1';
}

export function demoCredentialsMatch(id: string, password: string): boolean {
  return id.trim().length > 0 && password.length > 0;
}
