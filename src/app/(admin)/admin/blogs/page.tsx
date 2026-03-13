import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function BlogsManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blogs & News</h1>
          <p className="text-slate-500 mt-1">Manage articles, updates, and news to be displayed on the platform.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Add New Post
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
           <input type="text" placeholder="Search blogs..." className="px-4 py-2 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
           <select className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
             <option>All Statuses</option>
             <option>Published</option>
             <option>Draft</option>
           </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6 font-semibold">Article Title</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Publish Date</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
               {/* Placeholder Data */}
              {[
                { title: "Changes to Australia Student Visa Rules in 2026", cat: "Visa Updates", status: "Published", date: "Mar 10, 2026" },
                { title: "How to write a winning SOP for Canadian Universities", cat: "Guides", status: "Published", date: "Mar 5, 2026" },
                { title: "Top 10 Affordable Universities in the UK", cat: "University Guides", status: "Draft", date: "-" }
              ].map((blog, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 max-w-sm truncate">{blog.title}</td>
                  <td className="py-4 px-6 text-slate-500">{blog.cat}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{blog.date}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button className="hover:text-blue-600 transition-colors"><Eye size={18} /></button>
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
