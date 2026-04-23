'use client';

import { useMemo, useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, Eye, EyeOff, Trash2 } from 'lucide-react';
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNextPassword, setShowNextPassword] = useState(false);
  const [showConfirmNextPassword, setShowConfirmNextPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [purgeError, setPurgeError] = useState<string | null>(null);
  const [purgeSuccess, setPurgeSuccess] = useState<string | null>(null);
  const [purging, setPurging] = useState(false);
  const [purgeTargets, setPurgeTargets] = useState({
    leads: false,
    offers: false,
    galleryItems: false,
    galleryAssets: false,
  });

  const canSubmit =
    !saving &&
    currentPassword.length > 0 &&
    nextPassword.length > 0 &&
    confirmNextPassword.length > 0;

  const canPurge =
    !purging &&
    (purgeTargets.leads || purgeTargets.offers || purgeTargets.galleryItems || purgeTargets.galleryAssets);

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

  async function purgeSelected() {
    setPurgeError(null);
    setPurgeSuccess(null);

    const selected = [
      ...(purgeTargets.leads ? (['leads'] as const) : []),
      ...(purgeTargets.offers ? (['offers'] as const) : []),
      ...(purgeTargets.galleryItems ? (['gallery_items'] as const) : []),
      ...(purgeTargets.galleryAssets ? (['gallery_assets'] as const) : []),
    ];

    if (selected.length === 0) {
      setPurgeError('Select at least one delete option.');
      return;
    }

    const phrase = prompt(
      `This will permanently delete selected data.\n\nType DELETE to confirm.\n\nSelected: ${selected.join(', ')}`
    );
    if (phrase !== 'DELETE') return;

    setPurging(true);
    try {
      const res = await fetch('/api/admin/purge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targets: selected }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; result?: unknown };
      if (!res.ok) throw new Error(j.error || 'Failed to delete data');
      setPurgeSuccess('Deletion completed.');
      setPurgeTargets({ leads: false, offers: false, galleryItems: false, galleryAssets: false });
    } catch (e) {
      setPurgeError(e instanceof Error ? e.message : 'Failed to delete data');
    } finally {
      setPurging(false);
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
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((v) => !v)}
                className="absolute inset-y-0 right-2 inline-flex items-center justify-center w-10 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="nextPassword">
                New password
              </label>
              <div className="relative">
                <input
                  id="nextPassword"
                  type={showNextPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={nextPassword}
                  onChange={(e) => setNextPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNextPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 inline-flex items-center justify-center w-10 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={showNextPassword ? 'Hide new password' : 'Show new password'}
                >
                  {showNextPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">Minimum 8 characters.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="confirmNextPassword">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirmNextPassword"
                  type={showConfirmNextPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmNextPassword}
                  onChange={(e) => setConfirmNextPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-slate-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNextPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 inline-flex items-center justify-center w-10 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={showConfirmNextPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmNextPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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

      <div className="mt-6 bg-white rounded-2xl border border-red-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Trash2 size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Danger zone</h2>
            <p className="text-sm text-slate-600">
              Permanently delete admin data. This cannot be undone.
            </p>
          </div>
        </div>

        {purgeError ? (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <span>{purgeError}</span>
          </div>
        ) : null}

        {purgeSuccess ? (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
            <span>{purgeSuccess}</span>
          </div>
        ) : null}

        <div className="space-y-3">
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={purgeTargets.leads}
              onChange={(e) => setPurgeTargets((p) => ({ ...p, leads: e.target.checked }))}
            />
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Delete all leads</span>
              <span className="block text-sm text-slate-600">Removes all records from the `leads` table.</span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={purgeTargets.offers}
              onChange={(e) => setPurgeTargets((p) => ({ ...p, offers: e.target.checked }))}
            />
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Delete all offers</span>
              <span className="block text-sm text-slate-600">Removes all records from the `offers` table.</span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={purgeTargets.galleryItems}
              onChange={(e) => setPurgeTargets((p) => ({ ...p, galleryItems: e.target.checked }))}
            />
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Delete all gallery items</span>
              <span className="block text-sm text-slate-600">
                Removes all records from `gallery_items` (does not delete uploaded images unless selected below).
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={purgeTargets.galleryAssets}
              onChange={(e) => setPurgeTargets((p) => ({ ...p, galleryAssets: e.target.checked }))}
            />
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Delete uploaded gallery images</span>
              <span className="block text-sm text-slate-600">
                Attempts to remove objects from Supabase Storage for gallery image URLs.
              </span>
            </span>
          </label>
        </div>

        <button
          type="button"
          disabled={!canPurge}
          onClick={purgeSelected}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white font-bold shadow-lg shadow-red-600/20 disabled:opacity-60"
        >
          <Trash2 size={18} aria-hidden />
          {purging ? 'Deleting…' : 'Delete selected'}
        </button>
      </div>
    </div>
  );
}

