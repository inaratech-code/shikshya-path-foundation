import InnerPageHero from '@/components/InnerPageHero';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';

export default function UniversitiesPage() {
  const categories = [
    {
      title: 'Popular Universities USA',
      flagImg: 'https://flagcdn.com/w80/us.png',
      bgImg:
        'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Popular Universities UK',
      flagImg: 'https://flagcdn.com/w80/gb.png',
      bgImg:
        'https://images.unsplash.com/photo-1513635269976-596596e8df88?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Popular Universities Canada',
      flagImg: 'https://flagcdn.com/w80/ca.png',
      bgImg:
        'https://images.unsplash.com/photo-1517935706615-2717063c2215?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Popular Universities Australia',
      flagImg: 'https://flagcdn.com/w80/au.png',
      bgImg:
        'https://images.unsplash.com/photo-1523482580672-f109ba8cb886?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Popular Universities New Zealand',
      flagImg: 'https://flagcdn.com/w80/nz.png',
      bgImg:
        'https://images.unsplash.com/photo-1469528849692-9bcd8c38e792?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <main>
      <InnerPageHero 
        title="Partner Universities" 
        description="Discover our extensive network of top-ranked global universities and find the best fit for your academic goals." 
      />
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Institutions Directory</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-3xl">
          Coming Soon: Search and filter through 300+ partnered universities across 20+ countries.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <UniversityCategoryCard
              key={cat.title}
              title={cat.title}
              flagImg={cat.flagImg}
              bgImage={cat.bgImg}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
