'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Users, Award, Settings, Images } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { duration, easeOutExpo } from '@/lib/motion';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import { NAVBAR_LOGO_PATH } from '@/data/siteContent';

const STORAGE_KEY = 'admin-sidebar-collapsed';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/offers', label: 'Offers', icon: Award },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
] as const;

function NavLink({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active =
    href === '/admin'
      ? pathname === '/admin'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 font-medium transition-all duration-200 active:scale-[0.98] ${
        active
          ? 'bg-[var(--color-primary)]/15 text-[var(--color-accent-bright)] shadow-md shadow-black/10 ring-1 ring-white/10'
          : 'text-slate-400 hover:bg-slate-800/90 hover:text-white hover:shadow-sm'
      }`}
    >
      <Icon size={20} className="relative z-[1] shrink-0" aria-hidden />
      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: duration.fast, ease: easeOutExpo }}
            className="relative z-[1] truncate"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Link>
  );
}

export default function AdminAppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1') {
        setCollapsed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((c) => {
      const next = !c;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-4 flex min-w-0">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 88 : 256 }}
        transition={{ duration: duration.base, ease: easeOutExpo }}
        className="hidden md:flex shrink-0 bg-slate-900 text-white flex-col fixed left-0 top-0 bottom-0 shadow-2xl z-50 border-r border-slate-800/80 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 min-h-[5.25rem]">
          <Link href="/admin" className="flex items-center gap-3 group min-w-0 flex-1 overflow-hidden">
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
            <AnimatePresence initial={false}>
              {!collapsed ? (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0 flex-1"
                >
                  <div className="font-bold text-[15px] leading-snug text-white tracking-tight truncate">
                    Shikshya Path Foundation
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Admin Panel
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Link>
        </div>

        <nav className="flex-grow py-6 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {nav.map((item) => (
            <NavLink key={item.href} {...item} collapsed={collapsed} />
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <button
            type="button"
            onClick={toggle}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed ? <span className="text-sm font-medium">Collapse</span> : null}
          </button>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings size={18} />
            {!collapsed ? <span className="text-sm font-medium">Settings</span> : null}
          </Link>
          <div className={collapsed ? 'flex justify-center' : ''}>
            <AdminLogoutButton collapsed={collapsed} />
          </div>
        </div>
      </motion.aside>

      {/* Mobile: static full-width strip (unchanged behavior) */}
      <aside className="md:hidden w-full shrink-0 bg-slate-900 text-white flex flex-col shadow-2xl z-40 rounded-b-2xl mx-3 border border-slate-800/80 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Admin Panel</span>
            </div>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-2 p-3">
          {nav.map((item) => (
            <NavLink key={item.href} {...item} collapsed={false} />
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800 flex flex-wrap gap-2">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white text-sm"
          >
            <Settings size={18} /> Settings
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <main
        className={`flex-1 min-w-0 min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden max-md:mt-2 motion-safe:md:transition-[margin] motion-safe:duration-300 motion-safe:ease-out ${
          collapsed ? 'md:ml-[88px]' : 'md:ml-64'
        }`}
      >
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-end px-4 sm:px-6 lg:px-8 sticky top-0 z-40 shrink-0 shadow-sm shadow-slate-900/[0.03]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Administrator</span>
            <div className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-100 shadow-sm bg-indigo-100">
              <Image
                src="/images/admin-avatar.svg"
                alt="Administrator profile"
                width={36}
                height={36}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 min-w-0 max-w-full overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
