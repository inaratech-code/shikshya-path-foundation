'use client';

import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ApplyNowProvider } from '@/components/ApplyNowContext';
import ApplyNowModal from '@/components/ApplyNowModal';

export default function FrontendShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ApplyNowProvider>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <ApplyNowModal />
      </ApplyNowProvider>
    </SmoothScroll>
  );
}

