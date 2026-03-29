'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_SESSION_STORAGE_KEY } from '@/lib/adminAuth';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === '1';
    if (!ok) {
      router.replace('/login');
      return;
    }
    setAllowed(true);
    setReady(true);
  }, [router]);

  if (!ready || !allowed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm font-medium">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}
