import Link from 'next/link';
import { Home, Users, BookOpen, Award, Settings, MessageSquare, LogOut } from 'lucide-react';
import AdminViewportGuard from '@/components/AdminViewportGuard';

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminViewportGuard>
      <div className="bg-slate-50 min-h-screen pt-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col md:fixed md:left-0 md:top-0 md:bottom-0 shadow-2xl z-50">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold">S</div>
              <span className="font-bold text-lg tracking-wide">Admin Panel</span>
            </div>
          </div>
          
          <nav className="flex-grow py-6 px-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors font-medium">
              <Home size={20} /> Dashboard
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <Users size={20} /> Leads
            </Link>
            <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <BookOpen size={20} /> Blogs/News
            </Link>
            <Link href="/admin/offers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <Award size={20} /> Offers
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <MessageSquare size={20} /> Testimonials
            </Link>
          </nav>
          
          <div className="p-4 border-t border-slate-800 mt-auto">
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              <Settings size={18} /> Settings
            </Link>
            <button className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors w-full text-left mt-2">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full md:ml-64 min-h-screen bg-slate-50 text-slate-900">
          {/* Simple Topbar for Admin */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-slate-600">Admin User</div>
              <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminViewportGuard>
  );
}
