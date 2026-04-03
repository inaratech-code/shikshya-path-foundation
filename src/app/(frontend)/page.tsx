'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Globe2,
  ShieldCheck,
  Files,
  Sparkles,
} from 'lucide-react';
import GalleryHomePreview from '@/components/GalleryHomePreview';
import HeroBannerLayers from '@/components/HeroBannerLayers';
import SectionHeading from '@/components/SectionHeading';
import UniversityCategoryCard from '@/components/UniversityCategoryCard';
import { heroBannerForSeed } from '@/data/heroBanners';
import { universityCategoryTiles } from '@/data/universityCategories';
import { servicesCopy } from '@/data/siteContent';
import { useApplyNow } from '@/components/ApplyNowContext';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

const countries = [
  {
    name: 'Australia',
    slug: 'australia',
    flagImg: 'https://flagcdn.com/w640/au.png',
  },
  { name: 'USA', slug: 'usa', flagImg: 'https://flagcdn.com/w640/us.png' },
  { name: 'Canada', slug: 'canada', flagImg: 'https://flagcdn.com/w640/ca.png' },
  { name: 'UK', slug: 'uk', flagImg: 'https://flagcdn.com/w640/gb.png' },
  {
    name: 'New Zealand',
    slug: 'new-zealand',
    flagImg: 'https://flagcdn.com/w640/nz.png',
  },
];

const services = [
  {
    title: servicesCopy.abroadStudies.title,
    description: servicesCopy.abroadStudies.body,
    image:
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=srgb&w=1920',
  },
  {
    title: servicesCopy.testPreparation.title,
    description: servicesCopy.testPreparation.body,
    image:
      'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=srgb&w=1920',
  },
  {
    title: servicesCopy.documentationGuide.title,
    description: servicesCopy.documentationGuide.body,
    image:
      'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=srgb&w=1920',
  },
  {
    title: servicesCopy.universityCollegeGuide.title,
    description: servicesCopy.universityCollegeGuide.body,
    image:
      'https://images.pexels.com/photos/7972526/pexels-photo-7972526.jpeg?auto=compress&cs=srgb&w=1920',
  },
];

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 text-center bg-[var(--color-primary)] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-[var(--color-primary)]/20 text-base sm:text-lg w-full sm:w-auto"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-slate-50 transition-colors text-base sm:text-lg w-full sm:w-auto"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const applyNow = useApplyNow();

  return (
    <main className="pt-[var(--header-height)]">
      {/* HERO — starts below fixed header; border reinforces header vs content */}
      <section className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-br from-primary-softer/80 via-white to-white pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20">
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-[40rem] h-[40rem] rounded-full bg-primary/15 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-accent/12 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10 min-w-0">
          <motion.div
            className="flex flex-col items-start gap-5 min-w-0 w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-soft border border-primary/15 text-[var(--color-primary-dark)] rounded-full text-sm font-semibold shadow-sm">
              <Globe2 size={16} className="text-[var(--color-primary)]" />
              Your pathway to studying abroad
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-slate-900 tracking-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-brand-accent)]">
                Shikshya Path Foundation
              </span>
            </h1>

            <p className="text-justify text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              A modern study abroad consultancy helping students choose the right destination, prepare documents, and
              succeed with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <PrimaryButton onClick={() => applyNow.open({ intent: 'apply', source: 'home-hero' })}>
                Apply Now <ArrowRight size={18} />
              </PrimaryButton>
              <SecondaryButton href="/contact">Free Consultation</SecondaryButton>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
              <div className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                1000+ students guided
              </div>
              <div className="hidden sm:block text-slate-400">•</div>
              <div className="hidden sm:block">Fast, transparent process</div>
            </div>
          </motion.div>

          <motion.div
            className="relative w-full min-w-0 aspect-[4/3] rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden sm:overflow-visible"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-white">
              <Image
                src="https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=srgb&w=1920"
                alt="Students planning study abroad"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={88}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 glass px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[calc(100%-2rem)]">
              <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-[var(--color-brand-accent)]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-none">Trusted Guidance</div>
                <div className="text-xs font-medium text-slate-500 mt-1">From counseling to visa</div>
              </div>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 glass px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 max-w-[min(100%-2rem,16rem)] sm:max-w-none">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-soft flex items-center justify-center text-[var(--color-primary)] shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight sm:leading-none sm:whitespace-nowrap">Free Assessment</div>
                <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-0.5 sm:mt-1">Available today</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STUDY ABROAD */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <SectionHeading
              align="left"
              eyebrow="Study Abroad"
              title="Choose your destination"
              description="Tap a country to explore requirements, costs, intakes, and how we help you apply—right from one page."
            />
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center sm:justify-end gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all shrink-0 w-full sm:w-auto"
            >
              View all destinations <ArrowRight size={18} />
            </Link>
          </div>

          {/* Single row: compact square tiles; scroll when needed, centered on wide screens */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="region"
              aria-label="Study destinations"
              className="flex w-max max-w-none mx-auto flex-nowrap gap-4 sm:gap-5 lg:gap-6 snap-x snap-mandatory scroll-smooth"
            >
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/destinations?country=${encodeURIComponent(c.slug)}#study-abroad-destinations`}
                  className="group relative shrink-0 snap-start aspect-square w-[min(44vw,200px)] sm:w-[188px] md:w-[208px] lg:w-[228px] xl:w-[248px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-[0_20px_50px_-12px_rgba(1,82,144,0.25)] flex flex-col justify-end"
                >
                  <Image
                    src={c.flagImg}
                    alt=""
                    aria-hidden={true}
                    fill
                    className="pointer-events-none object-cover select-none"
                    sizes="(max-width: 640px) 44vw, 248px"
                    loading="eager"
                    quality={90}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-white/80 to-white/20" />
                  <div className="absolute inset-0 pointer-events-none bg-white/15" />

                  <div className="relative p-3.5 sm:p-4 lg:p-5 flex flex-col justify-end min-h-0">
                    <div className="font-black text-slate-900 text-base sm:text-lg lg:text-xl leading-tight line-clamp-2">
                      {c.name}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-snug line-clamp-2">
                      Requirements, costs & intakes
                    </p>
                    <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-sm sm:text-base">
                      Explore{' '}
                      <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEST PREPARATION */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Test Preparation"
            title="IELTS & PTE support"
            description="Choose a test to see details, who it’s for, and how to prepare effectively."
          />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2">
            {[
              {
                title: 'IELTS',
                desc: 'Strategies, mock tests, and score planning.',
                href: '/test-preparation/ielts',
                icon: <BookOpen size={20} />,
              },
              {
                title: 'PTE',
                desc: 'Smart practice and test-day readiness.',
                href: '/test-preparation/pte',
                icon: <Sparkles size={20} />,
              },
            ].map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group bg-white rounded-2xl sm:rounded-[2rem] border border-slate-200 p-4 sm:p-7 hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-soft text-[var(--color-primary)] flex items-center justify-center mb-3 sm:mb-5 border border-primary/15 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0">
                  {t.icon}
                </div>
                <div className="text-lg sm:text-2xl font-black text-slate-900">{t.title}</div>
                <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base flex-1">{t.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[var(--color-primary)] font-bold">
                  Learn More <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES (STACKED ALTERNATING) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything you need, in one place"
            description="Clean, step-by-step support designed to keep your application moving fast."
          />

          <div className="mt-12 space-y-8">
            {services.map((s, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <div
                  key={s.title}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden`}
                >
                  <div className={`${reverse ? 'lg:order-2' : ''} relative h-64 sm:h-72 min-h-[16rem] lg:h-full lg:min-h-[22rem]`}>
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      priority={idx === 0}
                      quality={85}
                    />
                  </div>
                  <div className={`${reverse ? 'lg:order-1' : ''} p-7 sm:p-10`}>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{s.title}</h3>
                    <p className="text-slate-600 mt-3 leading-relaxed">{s.description}</p>
                    <div className="mt-6">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-white font-bold bg-[var(--color-primary)] px-5 py-3 rounded-xl hover:opacity-90 transition"
                      >
                        Learn More <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / FEATURES */}
      <section className="py-16 md:py-20 text-white relative overflow-hidden">
        <HeroBannerLayers
          imageSrc={heroBannerForSeed('why-choose-us-home')}
          overlay="section"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            tone="dark"
            eyebrow="Why Choose Us"
            title="Free support that saves time"
            description="Clear process, fewer mistakes, and fast turnaround—built for conversion."
          />

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Free Counselling', icon: <Globe2 size={18} /> },
              { title: 'Free Documentation', icon: <Files size={18} /> },
              { title: 'Free Processing', icon: <ShieldCheck size={18} /> },
              { title: 'Test Preparation', icon: <BookOpen size={18} /> },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col"
              >
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <div className="font-black text-lg">{f.title}</div>
                <div className="text-slate-300 text-sm mt-2">
                  Practical guidance designed to remove friction.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITIES SECTION */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <SectionHeading
              align="left"
              eyebrow="Universities"
              title="Explore popular categories"
              description="Browse curated lists by country—great starting points for shortlisting."
            />
            <Link
              href="/universities"
              className="inline-flex items-center justify-center sm:justify-end gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all w-full sm:w-auto shrink-0"
            >
              View universities <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {universityCategoryTiles.map((u) => (
              <Link
                key={u.title}
                href="/universities"
                className="group block h-full min-h-[148px] sm:min-h-[168px] hover:-translate-y-1 transition-transform"
              >
                <UniversityCategoryCard
                  title={u.title}
                  flagImg={u.flagImg}
                  bgImage={u.bgImg}
                  bgImageAlt={u.bgImgAlt}
                  className="shadow-sm group-hover:shadow-xl"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GalleryHomePreview />

      {/* FINAL CTA */}
      <section className="py-12 sm:py-16 md:py-20 overflow-hidden relative text-white text-center rounded-3xl sm:rounded-[3rem] mx-2 sm:mx-4 md:mx-10 mb-6 sm:mb-10 shadow-2xl">
        <HeroBannerLayers imageSrc={heroBannerForSeed('home-final-cta')} overlay="cta" />

        <motion.div className="max-w-3xl mx-auto px-6 relative z-10" {...fadeUp}>
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap size={30} className="text-white" />
          </div>
          <h2 className="text-center text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Begin your path to a successful future
          </h2>
          <p className="text-justify text-slate-200 text-base md:text-lg mb-8 max-w-xl mx-auto font-medium">
            Tell us your destination and program preference—our team will guide you with the next best step.
          </p>
          <div className="flex justify-center">
            <PrimaryButton onClick={() => applyNow.open({ intent: 'enroll', source: 'home-final-cta' })}>
              Enroll Now <ArrowRight size={18} />
            </PrimaryButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
