'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Gift, Images } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';
import { serviceRoleHintText } from '@/lib/adminServiceRoleHints';
import { getClientOffersWriteToken } from '@/lib/offersWriteToken';
import type { SupabaseServiceRoleConfigHint } from '@/lib/supabaseEnv';

type AdminStats = {
  leadsTotal: number;
  offersActive: number;
  galleryActive: number;
  leadsConfigured: boolean;
  leadsConfigHint: SupabaseServiceRoleConfigHint;
  recentLeads: {
    id: string;
    name: string;
    email: string;
    destination: string;
    date: string;
  }[];
};

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getClientOffersWriteToken()}`,
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/admin/stats', { headers: authHeaders(), cache: 'no-store' });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || (res.status === 401 ? 'Unauthorized' : 'Failed to load stats'));
      }
      setStats((await res.json()) as AdminStats);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setStats(null);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loading = stats === null && !error;

  return (
    <div className="min-w-0 max-w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Dashboard Overview</h1>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {/* Stats — Leads, Offers, Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-soft text-[var(--color-primary)] rounded-xl flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2 min-h-[2rem]">
              {loading ? <Skeleton className="h-8 w-16" rounded="lg" /> : stats?.leadsTotal ?? '—'}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Total Leads</div>
            {stats && !stats.leadsConfigured ? (
              <p className="text-[11px] text-amber-700 mt-1 leading-snug">
                {serviceRoleHintText(stats.leadsConfigHint)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-soft text-[var(--color-brand-accent)] rounded-xl flex items-center justify-center shrink-0">
            <Gift size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2 min-h-[2rem]">
              {loading ? <Skeleton className="h-8 w-12" rounded="lg" /> : stats?.offersActive ?? '—'}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Active Offers</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-softer text-[var(--color-primary-dark)] rounded-xl flex items-center justify-center shrink-0">
            <Images size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2 min-h-[2rem]">
              {loading ? <Skeleton className="h-8 w-12" rounded="lg" /> : stats?.galleryActive ?? '—'}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Gallery photos (live)</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 sm:gap-6">
        <div className="min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Leads</h2>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[400px] text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_0_rgb(226_232_240)]">
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Destination</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-3 pr-2">
                        <Skeleton className="h-4 w-28" rounded="md" />
                      </td>
                      <td className="py-3 pr-2">
                        <Skeleton className="h-4 w-40 max-w-full" rounded="md" />
                      </td>
                      <td className="py-3 pr-2">
                        <Skeleton className="h-4 w-24" rounded="md" />
                      </td>
                      <td className="py-3">
                        <Skeleton className="h-4 w-24" rounded="md" />
                      </td>
                    </tr>
                  ))
                ) : stats && !stats.leadsConfigured ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 text-sm">
                      {serviceRoleHintText(stats.leadsConfigHint)}
                    </td>
                  </tr>
                ) : stats && stats.recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      No leads yet. New submissions from the site will appear here.
                    </td>
                  </tr>
                ) : (
                  stats?.recentLeads.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/90"
                    >
                      <td className="py-3 pr-2 font-semibold text-slate-900">{row.name}</td>
                      <td className="py-3 pr-2 text-slate-600 break-all">{row.email}</td>
                      <td className="py-3 pr-2 text-slate-600">{row.destination}</td>
                      <td className="py-3 text-slate-500 whitespace-nowrap">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 min-w-0 lg:w-56 xl:w-64 shrink-0">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/offers"
              className="interactive-btn block w-full text-left bg-primary-soft hover:bg-primary/10 text-primary-dark font-semibold py-3 px-4 rounded-xl border border-primary/20 text-sm"
            >
              + Create Offer
            </Link>
            <Link
              href="/admin/gallery"
              className="interactive-btn block w-full text-left bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 text-sm"
            >
              + Manage Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
