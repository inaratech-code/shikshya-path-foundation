import { Users, FileText, Gift, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">124</div>
            <div className="text-sm font-medium text-slate-500">Total Leads</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <FileText size={28} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">45</div>
            <div className="text-sm font-medium text-slate-500">Published Blogs</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Gift size={28} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">12</div>
            <div className="text-sm font-medium text-slate-500">Active Offers</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare size={28} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">89</div>
            <div className="text-sm font-medium text-slate-500">Testimonials</div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Leads</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Destination</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {[1,2,3,4,5].map(lead => (
                  <tr key={lead} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium">John Doe {lead}</td>
                    <td className="py-4 text-slate-500">john.doe{lead}@example.com</td>
                    <td className="py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">Australia</span></td>
                    <td className="py-4 text-slate-400">Mar 13, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
             <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-xl transition-colors border border-blue-200">
               + Add New Blog
             </button>
             <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl transition-colors border border-slate-200">
               + Create Offer
             </button>
             <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl transition-colors border border-slate-200">
               + Add Testimonial
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
