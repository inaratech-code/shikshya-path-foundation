import { LogIn } from 'lucide-react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg shadow-blue-500/50">
            S
          </div>
          <h1 className="text-2xl font-black text-white">Admin Secure Access</h1>
          <p className="text-slate-400 mt-2 text-sm">Shikshya Path Portal</p>
        </div>

        <form className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50" 
              placeholder="admin@shikshyapath.edu.np" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-slate-50" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot password?</a>
          </div>
          
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl shadow-blue-600/20 text-lg mt-4"
          >
            Login to Dashboard <LogIn size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
