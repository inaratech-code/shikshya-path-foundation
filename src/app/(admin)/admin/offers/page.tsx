import { Plus, Edit, Trash2, Power } from 'lucide-react';

export default function OffersManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Exclusive Offers</h1>
          <p className="text-slate-500 mt-1">Manage time-limited scholarships and fee waivers.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Create New Offer
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "100% Application Fee Waiver", subtitle: "UK Universities", badge: "Expiring Soon", color: "red", active: true },
          { title: "$10,000 Merit Scholarship", subtitle: "USA IT Programs", badge: "High Value", color: "green", active: true },
          { title: "Free IELTS Preparation", subtitle: "All Branches", badge: "Exclusive", color: "blue", active: true },
          { title: "50% Off Processing Fee", subtitle: "Australia Intakes", badge: "Expired", color: "slate", active: false }
        ].map((offer, idx) => (
          <div key={idx} className={`bg-white border ${offer.active ? 'border-blue-100 shadow-xl shadow-blue-50/50' : 'border-slate-200 opacity-60 grayscale shadow-sm'} rounded-[2rem] p-6 relative group overflow-hidden`}>
             <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-slate-50 shadow-sm border border-slate-100 text-slate-500 flex items-center justify-center hover:text-amber-500 transition-colors">
                  <Edit size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-50 shadow-sm border border-slate-100 text-slate-500 flex items-center justify-center hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
             </div>
             
             <span className={`inline-block px-3 py-1 bg-${offer.color}-100 text-${offer.color}-700 border border-${offer.color}-200 text-xs font-bold rounded-full mb-4 mt-2 uppercase`}>
               {offer.badge}
             </span>
             <p className="text-slate-500 font-semibold mb-2">{offer.subtitle}</p>
             <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight max-w-[80%]">{offer.title}</h3>
             
             <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
                <span className={`flex items-center gap-2 text-sm font-semibold ${offer.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                   {offer.active ? '🟢 Currently Active' : '⚪ Inactive'}
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <Power size={18} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
