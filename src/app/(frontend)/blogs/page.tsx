import InnerPageHero from '@/components/InnerPageHero';

export default function BlogsPage() {
  return (
    <main>
      <InnerPageHero 
        title="News & Insights" 
        description="Stay updated with the latest visa regulations, university news, and expert tips for studying abroad." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Latest Articles</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          A dynamic grid of blog posts and news updates.
        </p>
      </section>
    </main>
  );
}
