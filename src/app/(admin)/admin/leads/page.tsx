'use client';

import { useCallback, useEffect, useState } from 'react';
import { Eye, Trash2, Loader2, X, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { serviceRoleHintText } from '@/lib/adminServiceRoleHints';
import { getClientOffersWriteToken } from '@/lib/offersWriteToken';
import type { SupabaseServiceRoleConfigHint } from '@/lib/supabaseEnv';
import type { LeadRecord } from '@/types/lead';
import { parseApplyFormMessage } from '@/components/admin/leadDetailsUtils';

type LeadStatus = 'received' | 'contacted' | 'processed' | 'onboarded';

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  submittedAt: string;
  status: LeadStatus;
};

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'received', label: 'Received' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'processed', label: 'Processed' },
  { value: 'onboarded', label: 'Onboarded' },
];

function parseStatus(s: string): LeadStatus {
  if (s === 'received' || s === 'contacted' || s === 'processed' || s === 'onboarded') return s;
  return 'received';
}

function fromRecord(r: LeadRecord): LeadRow {
  return {
    id: r.id,
    name: r.full_name?.trim() || '—',
    email: r.email || '—',
    phone: r.phone?.trim() ?? '',
    destination: r.destination?.trim() || '—',
    message: (r.message ?? '').trim() || '',
    submittedAt: new Date(r.created_at).toLocaleString(),
    status: parseStatus(r.status),
  };
}

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getClientOffersWriteToken()}`,
    'Content-Type': 'application/json',
  };
}

function LeadStatusSelect({
  value,
  onChange,
}: {
  value: LeadStatus;
  onChange: (next: LeadStatus) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className="max-w-[11rem] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      aria-label="Lead status"
    >
      {STATUS_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function LeadFormDetails({ message }: { message: string }) {
  const parsed = parseApplyFormMessage(message);
  const hasParsed = !!(parsed.intent || parsed.academicLevel || parsed.preferredProgram);
  const hasMessage = message.length > 0;

  if (!hasMessage && !hasParsed) {
    return <p className="text-sm text-slate-400 italic">No additional details submitted.</p>;
  }

  return (
    <div className="space-y-3">
      {hasParsed ? (
        <div className="flex flex-wrap gap-2">
          {parsed.intent ? (
            <span className="inline-flex items-center rounded-lg bg-primary-soft border border-primary/15 px-3 py-1.5 text-sm">
              <span className="font-semibold text-primary-dark mr-1.5">Intent</span>
              <span className="text-primary">{parsed.intent}</span>
            </span>
          ) : null}
          {parsed.academicLevel ? (
            <span className="inline-flex items-center rounded-lg bg-accent-soft border border-accent-soft-border px-3 py-1.5 text-sm">
              <span className="font-semibold text-accent-foreground mr-1.5">Academic level</span>
              <span className="text-[var(--color-brand-accent)] capitalize">{parsed.academicLevel}</span>
            </span>
          ) : null}
          {parsed.preferredProgram ? (
            <span className="inline-flex items-center rounded-lg bg-primary-softer border border-primary/20 px-3 py-1.5 text-sm max-w-full">
              <span className="font-semibold text-primary-dark mr-1.5 shrink-0">Program</span>
              <span className="text-primary-dark/90 break-words">{parsed.preferredProgram}</span>
            </span>
          ) : null}
        </div>
      ) : null}

      {hasMessage ? (
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            <FileText size={14} aria-hidden />
            Full submission text
          </div>
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-[min(70vh,28rem)] overflow-y-auto">
            {message}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function LeadDetailModal({
  lead,
  onClose,
}: {
  lead: LeadRow;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-2xl max-h-[min(92vh,40rem)] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-detail-title"
      >
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4 z-10">
          <h2 id="lead-detail-title" className="text-lg font-black text-slate-900 truncate pr-2">
            {lead.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 inline-flex items-center justify-center"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3 min-w-0">
              <Mail className="text-[var(--color-primary)] shrink-0 mt-0.5" size={18} />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</div>
                {lead.email !== '—' ? (
                  <a href={`mailto:${lead.email}`} className="text-primary-dark font-medium hover:underline break-all">
                    {lead.email}
                  </a>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 min-w-0">
              <Phone className="text-[var(--color-primary)] shrink-0 mt-0.5" size={18} />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</div>
                {lead.phone ? (
                  <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="text-slate-800 font-medium hover:underline">
                    {lead.phone}
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 sm:col-span-2 min-w-0">
              <MapPin className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Preferred destination</div>
                {lead.destination !== '—' ? (
                  <span className="inline-flex mt-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-900">
                    {lead.destination}
                  </span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <Calendar className="text-slate-400 shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Submitted</div>
                <div className="text-slate-800 font-medium">{lead.submittedAt}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Form details</div>
            <LeadFormDetails message={lead.message} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsServiceRole, setNeedsServiceRole] = useState(false);
  const [serviceRoleHint, setServiceRoleHint] = useState<SupabaseServiceRoleConfigHint | null>(null);
  const [detailLead, setDetailLead] = useState<LeadRow | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/leads', { headers: authHeaders(), cache: 'no-store' });
      const needsSr = res.headers.get('X-Leads-Requires-Service-Role') === '1';
      setNeedsServiceRole(needsSr);
      const hintRaw = res.headers.get('X-Leads-Config-Hint');
      setServiceRoleHint(
        needsSr
          ? ((hintRaw as SupabaseServiceRoleConfigHint | null) ?? 'missing-service-key')
          : null
      );
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || (res.status === 401 ? 'Unauthorized — check NEXT_PUBLIC_OFFERS_WRITE_SECRET matches OFFERS_WRITE_SECRET' : 'Failed to load'));
      }
      const data = (await res.json()) as unknown;
      if (!Array.isArray(data)) throw new Error('Invalid response');
      setLeads((data as LeadRecord[]).map(fromRecord));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatusChange(id: string, status: LeadStatus) {
    setError(null);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Update failed');
      }
      setLeads((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update status');
      await load();
    }
  }

  async function removeLead(id: string) {
    if (!window.confirm('Delete this lead permanently?')) return;
    setError(null);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Delete failed');
      }
      setDetailLead((d) => (d?.id === id ? null : d));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete');
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Each card shows the full apply/contact submission. Open the detail view for a larger read of the same
            information.
          </p>
        </div>
        <button
          type="button"
          className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors opacity-60 cursor-not-allowed"
          disabled
          title="Coming soon"
        >
          Export as CSV
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {needsServiceRole && serviceRoleHint ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p>{serviceRoleHintText(serviceRoleHint)}</p>
          <p className="mt-2 text-xs text-amber-900/90">
            The admin list needs the service role because anon cannot read <code className="font-mono">leads</code> by
            design.
          </p>
        </div>
      ) : null}

      <div className="space-y-5">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center text-slate-500">
            <Loader2 className="inline-block animate-spin mr-2" size={22} />
            Loading leads…
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-6 text-center text-slate-500">
            {needsServiceRole
              ? 'No rows loaded — add the service role key above, then refresh.'
              : 'No leads yet. Submissions from your site forms will appear here once inserts are wired to Supabase.'}
          </div>
        ) : (
          leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80">
                <div className="min-w-0">
                  <h2 className="text-xl font-black text-slate-900 truncate">{lead.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    <time dateTime={lead.submittedAt}>{lead.submittedAt}</time>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end shrink-0">
                  <LeadStatusSelect value={lead.status} onChange={(s) => handleStatusChange(lead.id, s)} />
                  <button
                    type="button"
                    onClick={() => setDetailLead(lead)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-primary-soft hover:text-primary-dark hover:border-primary/25"
                    aria-label="Open full details"
                    title="Full screen details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLead(lead.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-600 hover:bg-red-50"
                    aria-label="Delete lead"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Email</div>
                    {lead.email !== '—' ? (
                      <a href={`mailto:${lead.email}`} className="text-primary-dark font-semibold hover:underline break-all">
                        {lead.email}
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Phone</div>
                    {lead.phone ? (
                      <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="text-slate-800 font-medium hover:underline">
                        {lead.phone}
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Destination</div>
                    {lead.destination !== '—' ? (
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-900">
                        {lead.destination}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </div>
                </div>

                <div className="min-w-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-6 lg:ml-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Apply / contact details</div>
                  <LeadFormDetails message={lead.message} />
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {detailLead ? <LeadDetailModal lead={detailLead} onClose={() => setDetailLead(null)} /> : null}
    </div>
  );
}
