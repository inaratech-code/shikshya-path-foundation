import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Home, Users, Award, Settings, Images } from 'lucide-react';
import AdminViewportGuard from '@/components/AdminViewportGuard';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import { NAVBAR_LOGO_PATH } from '@/data/siteContent';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
    <AdminViewportGuard>
      <div className="bg-slate-50 min-h-screen pt-4 flex min-w-0">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 bg-slate-900 text-white flex flex-col md:fixed md:left-0 md:top-0 md:bottom-0 shadow-2xl z-50">
          <div className="p-6 border-b border-slate-800">
            <Link href="/admin" className="flex items-center gap-3 group min-w-0">
              <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden bg-white ring-1 ring-white/15 shadow-sm flex items-center justify-center p-1">
                <Image
                  src={NAVBAR_LOGO_PATH}
                  alt="Shikshya Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[15px] leading-snug text-white tracking-tight truncate">
                  Shikshya Path Foundation
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>
          
          <nav className="flex-grow py-6 px-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-accent-bright)] hover:bg-[var(--color-primary)]/20 transition-colors font-medium">
              <Home size={20} /> Dashboard
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <Users size={20} /> Leads
            </Link>
            <Link href="/admin/offers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <Award size={20} /> Offers
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
              <Images size={20} /> Gallery
            </Link>
            {/* Testimonials: route /admin/testimonials exists but UI is disabled (see testimonials/page.tsx). */}
          </nav>
          
          <div className="p-4 border-t border-slate-800 mt-auto">
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              <Settings size={18} /> Settings
            </Link>
            <AdminLogoutButton />
          </div>
        </aside>

        {/* Main Content Area — ml-64 on desktop so content starts to the right of fixed sidebar */}
        <main className="flex-1 min-w-0 min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden md:ml-64">
          {/* Simple Topbar for Admin */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-4 sm:px-6 lg:px-8 sticky top-0 z-40 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Administrator</span>
              <div className="w-9 h-9 bg-slate-200 rounded-full shrink-0" aria-hidden />
            </div>
          </header>

          {/* Dynamic Page Content — constrained to viewport so nothing is cut off */}
          <div className="p-4 sm:p-6 lg:p-8 min-w-0 max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </AdminViewportGuard>
    </AdminAuthGuard>
  );
}
