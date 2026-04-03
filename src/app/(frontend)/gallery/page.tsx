import InnerPageHero from '@/components/InnerPageHero';
import { getPublicGallery } from '@/lib/galleryStore';

export default async function GalleryPage() {
  const galleryItems = await getPublicGallery();

  return (
    <main>
      <InnerPageHero
        title="Gallery"
        description="A glimpse of our counselling, preparation, and student success moments."
      />

      {galleryItems.length === 0 ? (
        <section className="py-10 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed px-1">
            Photos will appear here once they are added in the admin gallery.
          </p>
        </section>
      ) : (
        <section className="py-10 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="min-w-0 bg-white border border-slate-200 rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full min-h-0 object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 419px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-5 text-center">
                  <div className="font-black text-slate-900 text-sm sm:text-base leading-snug break-words hyphens-auto">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
