'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogoutButton({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={`flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-left mt-2 rounded-xl hover:bg-slate-800/50 active:scale-[0.98] ${
        collapsed ? 'justify-center w-full' : 'w-full'
      }`}
      title={collapsed ? 'Logout' : undefined}
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
      }}
    >
      <LogOut size={18} aria-hidden />
      {!collapsed ? <span>Logout</span> : null}
    </button>
  );
}
