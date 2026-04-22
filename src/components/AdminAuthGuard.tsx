'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        const ok = Boolean(data.user);
        if (!ok) {
          router.replace('/login');
          return;
        }
        if (!cancelled) {
          setAllowed(true);
          setReady(true);
        }
      } catch {
        router.replace('/login');
      }
    })();
    return () => {
      cancelled = true;
    };
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
