export default function LeadsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Leads Management</h1>
        <button className="bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
          Export as CSV
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider">
                <th className="pb-4 font-semibold px-4">Name</th>
                <th className="pb-4 font-semibold px-4">Contact</th>
                <th className="pb-4 font-semibold px-4">Destination</th>
                <th className="pb-4 font-semibold px-4">Message Preview</th>
                <th className="pb-4 font-semibold px-4">Date Submited</th>
                <th className="pb-4 font-semibold px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
               {/* Placeholder Data */}
              {[1,2,3,4,5,6].map(lead => (
                <tr key={lead} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">Jane Smith {lead}</td>
                  <td className="py-4 px-4 text-slate-500">
                    <div>jane.sm12@mail.com</div>
                    <div className="text-xs">+977 9812345678</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase">Canada</span>
                  </td>
                  <td className="py-4 px-4 truncate max-w-[200px] text-slate-500 italic">
                    I want to study nursing and need help with SOP...
                  </td>
                  <td className="py-4 px-4 text-slate-500">Mar 12, 2026</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 font-semibold hover:underline mr-3">View</button>
                    <button className="text-red-600 font-semibold hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
