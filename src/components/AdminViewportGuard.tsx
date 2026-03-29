'use client';

import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AdminViewportGuard({ children }: Props) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      // md breakpoint — avoids blocking common laptop split windows / tablets (was 1024 + UA)
      setIsAllowed(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Avoid a blank screen while measuring viewport (was confusing as "nothing loads")
  if (isAllowed === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm font-medium gap-2">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        Preparing admin…
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 text-3xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold mb-3">Wider screen needed</h1>
          <p className="text-slate-300 mb-4">
            The admin layout needs enough horizontal space. Use a larger window or rotate to landscape.
          </p>
          <p className="text-slate-400 text-sm">
            Widen the window to at least 768px (or rotate your device) to use the admin panel comfortably.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

