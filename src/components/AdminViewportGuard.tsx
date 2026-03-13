'use client';

import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AdminViewportGuard({ children }: Props) {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      const ua = window.navigator.userAgent || '';
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

      // Only allow reasonably large, non-mobile viewports (desktop/laptop)
      if (width >= 1024 && !isMobileUA) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // While we haven't checked yet, render nothing to avoid flicker
  if (isAllowed === null) {
    return null;
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 text-3xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold mb-3">Desktop Only Access</h1>
          <p className="text-slate-300 mb-4">
            The Shikshya Path admin panel is only available on desktop or laptop devices for security and usability reasons.
          </p>
          <p className="text-slate-400 text-sm">
            Please switch to a Windows or desktop computer with a larger screen to manage the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

