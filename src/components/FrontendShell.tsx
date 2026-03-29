'use client';

import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ApplyNowProvider } from '@/components/ApplyNowContext';

const FloatingOffersButton = dynamic(() => import('@/components/FloatingOffersButton'), {
  ssr: false,
});
const ApplyNowModal = dynamic(() => import('@/components/ApplyNowModal'), {
  ssr: false,
});

export default function FrontendShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ApplyNowProvider>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <FloatingOffersButton />
        <ApplyNowModal />
      </ApplyNowProvider>
    </SmoothScroll>
  );
}

