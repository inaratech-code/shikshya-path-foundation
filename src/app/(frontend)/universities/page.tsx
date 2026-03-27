import InnerPageHero from '@/components/InnerPageHero';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';
import { universityCategoryTiles } from '@/data/universityCategories';

export default function UniversitiesPage() {
  return (
    <main>
      <InnerPageHero 
        title="Partner Universities" 
        description="Discover our extensive network of top-ranked global universities and find the best fit for your academic goals." 
      />
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900">Institutions Directory</h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-12 max-w-3xl">
          Coming Soon: Search and filter through 300+ partnered universities across 20+ countries.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {universityCategoryTiles.map((cat) => (
            <UniversityCategoryCard
              key={cat.title}
              title={cat.title}
              flagImg={cat.flagImg}
              bgImage={cat.bgImg}
              bgImageAlt={cat.bgImgAlt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
