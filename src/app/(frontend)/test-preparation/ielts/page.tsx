import InnerPageHero from '@/components/InnerPageHero';
import IELTSContent from '@/components/TestPrep/IELTSContent';

export default function IELTSPage() {
  return (
    <main>
      <InnerPageHero
        title="IELTS Preparation"
        description="Understand IELTS, who it’s for, key test info, and enroll to start preparing."
      />
      <IELTSContent />
    </main>
  );
}

