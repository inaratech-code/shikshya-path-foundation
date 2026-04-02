import InnerPageHero from '@/components/InnerPageHero';
import { getDestinationHeroImage } from '@/data/universityCategories';

export default async function CountryDestinationPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const resolvedParams = await params;
  const countryName = resolvedParams.country;
  
  // Format string properly (e.g., 'united-states' -> 'United States')
  const formattedCountry = countryName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const heroImage = getDestinationHeroImage(countryName);

  return (
    <main>
      <InnerPageHero 
        title={`Study in ${formattedCountry}`} 
        description={`Discover world-class universities, top-tier living standards, and excellent post-study opportunities in ${formattedCountry}.`} 
      />
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
          <img
            src={heroImage}
            alt={`${formattedCountry} skyline`}
            className="w-full h-64 md:h-80 object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
          <div className="absolute -bottom-12 -right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/85 text-slate-800 text-sm font-semibold border border-slate-200">
            Country Overview
          </div>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black text-slate-900 mb-6 w-full">Why Study in {formattedCountry}?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {formattedCountry} is one of the world's most popular study destinations for international students. With an unparalleled education system, high standard of living, and welcoming multicultural environment, it is the perfect choice for ambitious Nepalese students.
          </p>
          
          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Top Universities & Programs</h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We partner with the leading institutions across {formattedCountry} to provide you with hundreds of high-quality courses spanning IT, Engineering, Business, Healthcare, and more.
          </p>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Facts</h3>
          <ul className="space-y-4 text-slate-700 font-medium">
             <li className="flex justify-between border-b border-slate-200 pb-2">
               <span className="text-slate-500">Intakes</span>
               <span>Feb, July, Nov</span>
             </li>
             <li className="flex justify-between border-b border-slate-200 pb-2">
               <span className="text-slate-500">Post-Study Work</span>
               <span>Up to 4 Years</span>
             </li>
             <li className="flex justify-between pb-2">
               <span className="text-slate-500">Scholorships</span>
               <span>Available</span>
             </li>
          </ul>
          
          <button className="w-full bg-[var(--color-primary)] text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform mt-8 shadow-lg shadow-[var(--color-primary)]/20">
            Apply Now
          </button>
        </div>
      </section>
    </main>
  );
}
