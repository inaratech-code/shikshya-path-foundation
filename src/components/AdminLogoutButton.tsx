'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { clearAdminSession } from '@/lib/adminAuth';

export default function AdminLogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors w-full text-left mt-2"
      onClick={() => {
        clearAdminSession();
        router.push('/login');
        router.refresh();
      }}
    >
      <LogOut size={18} /> Logout
    </button>
  );
}
