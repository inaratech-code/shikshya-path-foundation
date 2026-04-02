'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { getClientOffersWriteToken } from '@/lib/offersWriteToken';
import type { PublishedOffer } from '@/types/offer';

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getClientOffersWriteToken()}`,
    'Content-Type': 'application/json',
  };
}

export default function OffersManagementPage() {
  const [offers, setOffers] = useState<PublishedOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [active, setActive] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/offers', { headers: authHeaders(), cache: 'no-store' });
      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? 'Unauthorized — set NEXT_PUBLIC_OFFERS_WRITE_SECRET to match OFFERS_WRITE_SECRET (or remove OFFERS_WRITE_SECRET to use the demo token).'
            : 'Failed to load'
        );
      }
      const data = (await res.json()) as PublishedOffer[];
      setOffers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load offers');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          badge: badge.trim() || undefined,
          active,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Could not publish');
      }
      setTitle('');
      setSubtitle('');
      setBadge('');
      setActive(true);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to publish');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(o: PublishedOffer) {
    setError(null);
    try {
      const res = await fetch(`/api/offers/${o.id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ active: !o.active }),
      });
      if (!res.ok) throw new Error('Update failed');
      await load();
    } catch {
      setError('Could not update offer');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this offer permanently?')) return;
    setError(null);
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      await load();
    } catch {
      setError('Could not delete offer');
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Exclusive Offers</h1>
          <p className="text-slate-500 mt-1">
            Published offers appear on the public <strong className="text-slate-700">/offers</strong> page and in the
            floating offers button on the main site.
          </p>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Using Supabase? Add <code className="text-slate-600">SUPABASE_SERVICE_ROLE_KEY</code> to{' '}
            <code className="text-slate-600">.env.local</code> so this panel can create, hide, and delete offers in the
            database (the key never ships to the browser).
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      <form
        onSubmit={handleCreate}
        className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Plus size={20} className="text-[var(--color-primary)]" />
          Publish new offer
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="e.g. 100% application fee waiver"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subtitle / description</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="Short details for students (shown on website)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Badge (optional)</label>
            <input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="e.g. Limited time"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="rounded text-[var(--color-primary)]" />
              Live on website (active)
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-bold text-white hover:opacity-95 disabled:opacity-60 shadow-sm"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          Publish offer
        </button>
      </form>

      <h2 className="text-lg font-bold text-slate-900 mb-4">All offers</h2>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
          <Loader2 className="animate-spin" size={22} />
          Loading…
        </div>
      ) : offers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-6 text-center text-slate-500">
          No offers yet. Use the form above to publish — they will show on the public site immediately (local / Node
          server).
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {offers.map((o) => (
            <div
              key={o.id}
              className={`rounded-2xl border p-5 flex flex-col ${
                o.active ? 'border-primary/20 bg-white shadow-md' : 'border-slate-200 bg-slate-50 opacity-80'
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <span
                  className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                    o.active ? 'bg-accent-soft text-accent-foreground border border-accent-soft-border' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {o.active ? 'Live' : 'Hidden'}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => toggleActive(o)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700"
                  >
                    {o.active ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(o.id)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {o.badge && (
                <span className="inline-block text-xs font-bold text-primary-dark bg-primary-soft px-2 py-0.5 rounded-full mb-2 w-fit">
                  {o.badge}
                </span>
              )}
              <h3 className="font-black text-slate-900 text-lg leading-snug">{o.title}</h3>
              <p className="text-slate-600 text-sm mt-2 flex-1">{o.subtitle}</p>
              <p className="text-xs text-slate-400 mt-3">
                {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
