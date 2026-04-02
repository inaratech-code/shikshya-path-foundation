import { Plus } from 'lucide-react';

export default function TestimonialsManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage success stories from placed students.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-95 transition-colors shadow-sm"
        >
          <Plus size={18} /> Add Success Story
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
          <input
            type="text"
            placeholder="Search by student name or university..."
            className="w-full max-w-sm px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6 font-semibold">Student Info</th>
                <th className="py-4 px-6 font-semibold">University & Route</th>
                <th className="py-4 px-6 font-semibold">Testimonial Detail</th>
                <th className="py-4 px-6 font-semibold">Visible</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              <tr>
                <td colSpan={5} className="py-16 px-6 text-center text-slate-500">
                  No testimonials yet. Add entries when your content is ready.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
