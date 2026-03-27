import InnerPageHero from '@/components/InnerPageHero';

const galleryItems = [
  {
    title: 'Counselling Session',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Student Success',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Document Review',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Test Preparation',
    image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'University Shortlisting',
    image: 'https://images.pexels.com/photos/5905705/pexels-photo-5905705.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Application Support',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export default function GalleryPage() {
  return (
    <main>
      <InnerPageHero
        title="Gallery"
        description="A glimpse of our counselling, preparation, and student success moments."
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="font-black text-slate-900">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

