'use client';

import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

type LeadStatus = 'received' | 'contacted' | 'processed' | 'onboarded';

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  messagePreview: string;
  submittedAt: string;
  status: LeadStatus;
};

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'received', label: 'Received' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'processed', label: 'Processed' },
  { value: 'onboarded', label: 'Onboarded' },
];

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
      className="max-w-[11rem] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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

/** One placeholder row so Status / Actions are visible before the API is wired; delete it for an empty table. */
const INITIAL_PREVIEW_ROW: LeadRow = {
  id: 'preview',
  name: '—',
  email: '—',
  phone: '',
  destination: '—',
  messagePreview: '—',
  submittedAt: '—',
  status: 'received',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([INITIAL_PREVIEW_ROW]);

  function setStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function removeLead(id: string) {
    setLeads((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Leads Management</h1>
        <button
          type="button"
          className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Export as CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">Name</th>
                <th className="pb-4 font-semibold px-4">Contact</th>
                <th className="pb-4 font-semibold px-4">Destination</th>
                <th className="pb-4 font-semibold px-4">Message Preview</th>
                <th className="pb-4 font-semibold px-4">Date Submitted</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-500">
                    No leads yet. Form submissions will appear here when your backend is connected.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                    <td className="py-4 px-4 font-bold text-slate-900">{lead.name}</td>
                    <td className="py-4 px-4 text-slate-500">
                      <div>{lead.email}</div>
                      {lead.phone ? <div className="text-xs text-slate-400">{lead.phone}</div> : null}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {lead.destination === '—' ? (
                        '—'
                      ) : (
                        <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase text-amber-800">
                          {lead.destination}
                        </span>
                      )}
                    </td>
                    <td className="max-w-[220px] truncate py-4 px-4 italic text-slate-500">{lead.messagePreview}</td>
                    <td className="py-4 px-4 text-slate-500">{lead.submittedAt}</td>
                    <td className="py-4 px-4 align-middle">
                      <LeadStatusSelect value={lead.status} onChange={(s) => setStatus(lead.id, s)} />
                    </td>
                    <td className="py-4 px-4 text-right align-middle">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          aria-label="View lead"
                          title="View"
                        >
                          <Eye size={18} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete lead"
                          title="Delete"
                          onClick={() => removeLead(lead.id)}
                        >
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
