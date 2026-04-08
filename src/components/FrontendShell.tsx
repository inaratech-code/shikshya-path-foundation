'use client';

import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import NavigationProgress from '@/components/NavigationProgress';
import { ApplyNowProvider } from '@/components/ApplyNowContext';

const FloatingOffersButton = dynamic(() => import('@/components/FloatingOffersButton'), {
  ssr: false,
});
const FloatingApplyNowButton = dynamic(() => import('@/components/FloatingApplyNowButton'), {
  ssr: false,
});
const ApplyNowModal = dynamic(() => import('@/components/ApplyNowModal'), {
  ssr: false,
});

export default function FrontendShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ApplyNowProvider>
        <NavigationProgress />
        <Header />
        <div className="flex-grow min-w-0">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
        <div className="pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col-reverse items-end gap-3 sm:bottom-8 sm:right-8">
          <div className="pointer-events-auto">
            <FloatingOffersButton docked />
          </div>
          <div className="pointer-events-auto">
            <FloatingApplyNowButton docked />
          </div>
        </div>
        <ApplyNowModal />
      </ApplyNowProvider>
    </SmoothScroll>
  );
}

