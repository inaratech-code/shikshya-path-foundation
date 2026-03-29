'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Gift, MessageSquare, Loader2 } from 'lucide-react';
import { getClientOffersWriteToken } from '@/lib/offersWriteToken';

type AdminStats = {
  leadsTotal: number;
  offersActive: number;
  testimonialsTotal: number;
  leadsConfigured: boolean;
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

      {/* Stats — Leads, Offers, Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin text-slate-400" size={24} /> : stats?.leadsTotal ?? '—'}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Total Leads</div>
            {stats && !stats.leadsConfigured ? (
              <p className="text-[11px] text-amber-700 mt-1 leading-snug">
                Add <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to count leads.
              </p>
            ) : null}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Gift size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin text-slate-400" size={24} /> : stats?.offersActive ?? '—'}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Active Offers</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin text-slate-400" size={24} /> : stats?.testimonialsTotal ?? 0}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Testimonials</div>
            <p className="text-[11px] text-slate-400 mt-1">Coming when testimonials are stored in the app.</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 sm:gap-6">
        <div className="min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Leads</h2>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[400px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Destination</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      <Loader2 className="inline-block animate-spin mr-2" size={20} />
                      Loading…
                    </td>
                  </tr>
                ) : stats && !stats.leadsConfigured ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      Add <code className="text-xs bg-slate-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> to{' '}
                      <code className="text-xs bg-slate-100 px-1 rounded">.env.local</code> to load recent leads here.
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
                    <tr key={row.id} className="border-b border-slate-100 last:border-0">
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
              className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-blue-200 text-sm"
            >
              + Create Offer
            </Link>
            <Link
              href="/admin/testimonials"
              className="block w-full text-left bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-slate-200 text-sm"
            >
              + Add Testimonial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
