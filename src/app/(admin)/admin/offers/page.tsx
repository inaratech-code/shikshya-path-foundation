import { Plus } from 'lucide-react';

export default function OffersManagementPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Exclusive Offers</h1>
          <p className="text-slate-500 mt-1">Manage time-limited scholarships and fee waivers.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} /> Create New Offer
        </button>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-20 px-6 text-center">
        <p className="text-slate-500 font-medium">No offers yet. Create an offer when you have promotions to publish.</p>
      </div>
    </div>
  );
}
