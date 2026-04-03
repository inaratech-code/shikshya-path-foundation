'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, Trash2, Loader2, Upload } from 'lucide-react';
import { prepareGalleryImageForUpload } from '@/lib/galleryClientCompress';
import { getClientOffersWriteToken } from '@/lib/offersWriteToken';
import type { GalleryItem } from '@/types/gallery';

function authHeadersJson(): HeadersInit {
  return {
    Authorization: `Bearer ${getClientOffersWriteToken()}`,
    'Content-Type': 'application/json',
  };
}

function authHeadersBearerOnly(): HeadersInit {
  return { Authorization: `Bearer ${getClientOffersWriteToken()}` };
}

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/gallery', { headers: authHeadersJson(), cache: 'no-store' });
      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? 'Unauthorized — set NEXT_PUBLIC_OFFERS_WRITE_SECRET to match OFFERS_WRITE_SECRET.'
            : 'Failed to load gallery'
        );
      }
      const data = (await res.json()) as GalleryItem[];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load gallery');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const url = imageUrl.trim();
    if (!url) {
      setError('Paste an image URL or upload a file (PNG, JPEG, WebP, GIF, etc.).');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: authHeadersJson(),
        body: JSON.stringify({
          title: title.trim(),
          imageUrl: url,
          sortOrder,
          active,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Could not add photo');
      }
      setTitle('');
      setImageUrl('');
      setSortOrder(0);
      setActive(true);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(g: GalleryItem) {
    setError(null);
    try {
      const res = await fetch(`/api/gallery/${g.id}`, {
        method: 'PATCH',
        headers: authHeadersJson(),
        body: JSON.stringify({ active: !g.active }),
      });
      if (!res.ok) throw new Error('Update failed');
      await load();
    } catch {
      setError('Could not update photo');
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this photo from the gallery? The image file will be removed if it was uploaded here.')) return;
    setError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: authHeadersJson() });
      if (!res.ok) throw new Error('Delete failed');
      await load();
    } catch {
      setError('Could not delete photo');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const toSend = await prepareGalleryImageForUpload(file);
      const fd = new FormData();
      fd.set('file', toSend);
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: authHeadersBearerOnly(),
        body: fd,
      });
      const j = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) throw new Error(j.error || 'Upload failed');
      if (!j.url) throw new Error('No URL returned');
      setImageUrl(j.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
          <p className="text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Photos you add here show on the website’s <strong className="text-slate-700">Gallery</strong> page. Give each
            photo a short title, then either <strong className="text-slate-700">upload an image</strong> (PNG, JPEG, WebP,
            GIF, and other common formats) or paste a <strong className="text-slate-700">direct image URL</strong>{' '}
            (usually <strong className="text-slate-700">https://</strong>).
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
          Add photo
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Caption / title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="e.g. Counselling session"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Sort order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
            <p className="text-xs text-slate-400 mt-1">Lower numbers appear first.</p>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-semibold text-slate-700 mb-1">Image</span>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Upload image file"
                onChange={handleFileSelected}
                disabled={uploading}
              />
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-60"
                >
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                  {uploading ? 'Uploading…' : 'Upload image'}
                </button>
                {imageUrl.trim() !== '' && (
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => setImageUrl('')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-800 hover:bg-red-100 disabled:opacity-60"
                  >
                    <Trash2 size={16} aria-hidden />
                    Clear image
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0 w-full">
                <label className="block text-xs font-medium text-slate-500 mb-1">Or paste image URL</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  placeholder="https://… or upload above"
                />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Uploaded files are stored on your server or Supabase Storage (see env). Max size applies per upload.
            </p>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="rounded text-[var(--color-primary)]"
              />
              Visible on website
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving || uploading}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-bold text-white hover:opacity-95 disabled:opacity-60 shadow-sm"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          Add to gallery
        </button>
      </form>

      <h2 className="text-lg font-bold text-slate-900 mb-4">All photos</h2>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500 gap-2">
          <Loader2 className="animate-spin" size={22} />
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-6 text-center text-slate-500">
          No photos yet. Add a title and upload an image or paste a URL above.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => (
            <div
              key={g.id}
              className={`rounded-2xl border overflow-hidden flex flex-col ${
                g.active ? 'border-primary/20 bg-white shadow-md' : 'border-slate-200 bg-slate-50 opacity-80'
              }`}
            >
              <div className="aspect-[4/3] bg-slate-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                      g.active
                        ? 'bg-accent-soft text-accent-foreground border border-accent-soft-border'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {g.active ? 'Live' : 'Hidden'}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    <button
                      type="button"
                      onClick={() => toggleActive(g)}
                      disabled={deletingId === g.id}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 disabled:opacity-50"
                    >
                      {g.active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(g.id)}
                      disabled={deletingId === g.id}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === g.id ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : (
                        <Trash2 size={14} aria-hidden />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{g.title}</h3>
                <p className="text-xs text-slate-400 mt-2 break-all line-clamp-2">{g.imageUrl}</p>
                <p className="text-xs text-slate-400 mt-auto pt-2">
                  Order {g.sortOrder} · {new Date(g.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
