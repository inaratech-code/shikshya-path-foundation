'use client';

import { useMemo, useState } from 'react';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function isStrongEnough(pw: string): boolean {
  // Keep it simple for demo auth: at least 8 chars.
  return pw.trim().length >= 8;
}

export default function AdminSettingsPage() {
  const supabase = useMemo(() => createClient(), []);

  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [confirmNextPassword, setConfirmNextPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const canSubmit =
    !saving &&
    currentPassword.length > 0 &&
    nextPassword.length > 0 &&
    confirmNextPassword.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!userData.user?.email) throw new Error('Not signed in.');

      // Re-auth to verify the current password (Supabase requires current credentials).
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: currentPassword,
      });
      if (signInError) {
        setError('Current password is incorrect.');
        return;
      }

      if (nextPassword !== confirmNextPassword) {
        setError('New password and confirmation do not match.');
        return;
      }
      if (!isStrongEnough(nextPassword)) {
        setError('New password must be at least 8 characters long.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: nextPassword,
      });
      if (updateError) throw updateError;

      setCurrentPassword('');
      setNextPassword('');
      setConfirmNextPassword('');
      setSuccess('Password updated successfully.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-w-0 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600 mt-1">Manage admin access and security.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-primary-soft text-[var(--color-primary)] flex items-center justify-center shrink-0">
            <Lock size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Change password</h2>
            <p className="text-sm text-slate-600">
              This project currently uses demo local password storage. In production, use Supabase Auth or another
              server-backed solution.
            </p>
          </div>
        </div>

        {error ? (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <span>{error}</span>
          </div>
        ) : null}

        {success ? (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
            <span>{success}</span>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="currentPassword">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="nextPassword">
                New password
              </label>
              <input
                id="nextPassword"
                type="password"
                autoComplete="new-password"
                value={nextPassword}
                onChange={(e) => setNextPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                required
              />
              <p className="mt-1 text-xs text-slate-500">Minimum 8 characters.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="confirmNextPassword">
                Confirm new password
              </label>
              <input
                id="confirmNextPassword"
                type="password"
                autoComplete="new-password"
                value={confirmNextPassword}
                onChange={(e) => setConfirmNextPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-3 text-white font-bold shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}

