import { Plus, Edit, Trash2, Check, X } from 'lucide-react';

export default function TestimonialsManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage success stories from placed students.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Add Success Story
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
          <input type="text" placeholder="Search by student name or university..." className="w-full max-w-sm px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
               {/* Placeholder Data */}
               {[
                 { name: "Aarushi M.", uni: "University of Sydney", country: "Australia", desc: "The visa process was incredibly smooth. Shikshya Path guided me at every step from SOP drafting to interview prep.", active: true },
                 { name: "Roshan P.", uni: "Toronto Met University", country: "Canada", desc: "I was confused about my options, but the counseling team helped me select a course that fits my career goals perfectly.", active: true },
                 { name: "Sneha K.", uni: "Aston University", country: "UK", desc: "Got an unconditional offer and a 20% scholarship thanks to their application assistance! Highly recommended.", active: false },
               ].map((test, idx) => (
                 <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                   <td className="py-4 px-6">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                         {test.name.charAt(0)}
                       </div>
                       <div className="font-bold text-slate-900">{test.name}</div>
                     </div>
                   </td>
                   <td className="py-4 px-6">
                     <div className="font-semibold text-slate-700">{test.uni}</div>
                     <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{test.country}</div>
                   </td>
                   <td className="py-4 px-6">
                     <p className="text-slate-500 italic max-w-sm line-clamp-2">"{test.desc}"</p>
                   </td>
                   <td className="py-4 px-6">
                     {test.active ? (
                       <span className="flex w-fit items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                         <Check size={14} /> Yes
                       </span>
                     ) : (
                       <span className="flex w-fit items-center gap-1 text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                         <X size={14} /> Hidden
                       </span>
                     )}
                   </td>
                   <td className="py-4 px-6 text-right">
                     <div className="flex items-center justify-end gap-3 text-slate-400">
                       <button className="hover:text-amber-600 transition-colors"><Edit size={18} /></button>
                       <button className="hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                     </div>
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
