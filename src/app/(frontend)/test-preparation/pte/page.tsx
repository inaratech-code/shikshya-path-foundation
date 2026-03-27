import InnerPageHero from '@/components/InnerPageHero';
import PTEContent from '@/components/TestPrep/PTEContent';

export default function PTEPage() {
  return (
    <main>
      <InnerPageHero
        title="PTE Preparation"
        description="Understand PTE, where it’s accepted, key test info, and enroll to start preparing."
      />
      <PTEContent />
    </main>
  );
}

