import InnerPageHero from '@/components/InnerPageHero';

export default function AboutPage() {
  return (
    <main>
      <InnerPageHero 
        title="About Shikshya Path" 
        description="Learn about our mission, vision, and the dedicated team helping Nepalese students achieve global success." 
      />
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Our Mission</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          To provide transparent, ethical, and high-quality educational consultancy services that empower Nepalese students to study in world-class institutions and fulfill their career aspirations globally.
        </p>
      </section>
    </main>
  );
}
