import { Users, Gift, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-w-0 max-w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Dashboard Overview</h1>

      {/* Stats — Leads, Offers, Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900">0</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Total Leads</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Gift size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900">0</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Active Offers</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900">0</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 break-words">Testimonials</div>
          </div>
        </div>
      </div>

      {/* Recent Activity — stack so table and Quick Actions always fit */}
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
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No leads yet. New submissions will appear here when connected.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 min-w-0 lg:w-56 xl:w-64 shrink-0">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button
              type="button"
              className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-blue-200 text-sm"
            >
              + Create Offer
            </button>
            <button
              type="button"
              className="w-full text-left bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-slate-200 text-sm"
            >
              + Add Testimonial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
