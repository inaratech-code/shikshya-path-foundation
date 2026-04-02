'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { FacebookLogo, InstagramLogo, TikTokLogo, WhatsAppLogo } from '@/components/brand/SocialLogos';
import { siteContact, siteSocial, SITE_MOTTO, studyDestinations } from '@/data/siteContent';

const SOCIAL_PILL_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 ease-out hover:scale-[1.06] hover:border-[var(--color-brand-accent)]/40 hover:bg-[var(--color-brand-accent)]/15 hover:text-white hover:shadow-[0_0_34px_-6px_rgba(37,126,67,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070818]';

const FOOTER_DESTINATION_LINK_CLASS =
  'inline-flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-slate-300/90 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/[0.10] hover:text-white hover:shadow-[0_0_26px_-12px_rgba(37,126,67,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070818]';

const FOOTER_DESTINATIONS = studyDestinations.map((d) => ({
  label: d.accordionTitle.replace(/^Study in /, ''),
  slug: d.slug,
}));

const FOOTER_QUICK_LINKS_FULL = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Study Destination', href: '/destinations' },
  { label: 'Test Preparation', href: '/test-preparation' },
  // { label: 'Gallery', href: '/gallery' },
  { label: 'Offers', href: '/offers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Offers', href: '/offers' },
  // { label: 'Gallery', href: '/gallery' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-slate-300 py-12 sm:py-20 px-4 sm:px-6 mt-auto [&_p]:text-justify bg-[#070818]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_460px_at_14%_18%,rgba(1,82,144,0.28),transparent_60%),radial-gradient(900px_520px_at_86%_22%,rgba(37,126,67,0.22),transparent_55%),linear-gradient(180deg,#070818_0%,#050615_55%,#03030C_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      {/* Brand banner highlight */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 h-24 w-[90%] bg-gradient-to-r from-[var(--color-primary)]/25 via-transparent to-[var(--color-brand-accent)]/20 blur-[0.5px]" />
      <div className="absolute -top-28 left-1/3 -z-10 h-[20rem] w-[28rem] bg-[radial-gradient(circle_at_center,rgba(1,82,144,0.30),transparent_60%)] blur-2xl" />
      <div className="absolute -top-24 right-1/4 -z-10 h-[22rem] w-[26rem] bg-[radial-gradient(circle_at_center,rgba(37,126,67,0.26),transparent_60%)] blur-2xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-12 lg:gap-x-10 lg:gap-y-10">
        <div className="col-span-2 lg:col-span-4 min-w-0 text-center lg:text-left rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-4 flex justify-center lg:justify-start">
            <BrandLogo variant="footer" className="justify-center lg:justify-start" />
          </div>
          <p className="text-white/90 font-semibold text-sm mb-3 italic">&ldquo;{SITE_MOTTO}&rdquo;</p>
          <p className="max-w-sm mx-auto lg:mx-0 mb-8 leading-relaxed text-slate-300/80">
            We are a leading education consultancy in Nepal, dedicated to placing students in top-tier global universities and guiding their career journey.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href={siteSocial.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteSocial.facebook.name} on Facebook`}
              title="Facebook"
              className={SOCIAL_PILL_CLASS}
            >
              <FacebookLogo className="h-5 w-5 shrink-0" />
            </a>
            <a
              href={siteSocial.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteSocial.instagram.name} on Instagram`}
              title="Instagram"
              className={SOCIAL_PILL_CLASS}
            >
              <InstagramLogo className="h-5 w-5 shrink-0" />
            </a>
            <a
              href={siteSocial.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteSocial.tiktok.name} on TikTok`}
              title="TikTok"
              className={SOCIAL_PILL_CLASS}
            >
              <TikTokLogo className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">
            <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Quick Links
            </span>
          </h4>
          <ul className="space-y-3 sm:space-y-4 font-medium text-sm sm:text-base">
            {FOOTER_QUICK_LINKS_FULL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={FOOTER_DESTINATION_LINK_CLASS}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2 min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">
            <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Destinations
            </span>
          </h4>
          <ul className="space-y-3 sm:space-y-4 font-medium text-sm sm:text-base">
            {FOOTER_DESTINATIONS.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className={FOOTER_DESTINATION_LINK_CLASS}>
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">
            <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
              Contact Us
            </span>
          </h4>
          <ul className="space-y-3 text-slate-200/85 font-medium text-sm sm:text-base">
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/25">
              <MapPin size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-1" />
              <span className="leading-snug">{siteContact.addressSingle}</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/25">
              <Mail size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href={`mailto:${siteContact.email}`}
                className="hover:text-white break-words transition-colors"
              >
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/25">
              <Phone size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-snug">Tel: {siteContact.phoneLandline}</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/25">
              <Smartphone size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
              <a
                href={`tel:${siteContact.mobile.replace(/\s/g, '')}`}
                className="whitespace-nowrap hover:text-white transition-colors"
              >
                {siteContact.mobile}
              </a>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/25">
              <WhatsAppLogo className="h-5 w-5 shrink-0 text-[var(--color-accent-bright)] mt-0.5" />
              <a
                href={`https://wa.me/${siteContact.whatsappTel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap hover:text-white transition-colors"
                aria-label={`WhatsApp ${siteContact.whatsappDisplay}`}
              >
                {siteContact.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left">
        <p className="max-w-md sm:max-w-none text-slate-300/70">
          &copy; {new Date().getFullYear()} Shikshya Path Foundation. All rights reserved. Built by{' '}
          <a
            href="https://www.inaratech.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300/70 hover:text-white transition-colors"
          >
            Inara Tech
          </a>
          .
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <Link
            href="/privacy"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300/80 hover:text-white hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/30 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-slate-300/80 hover:text-white hover:bg-white/[0.06] hover:border-[var(--color-brand-accent)]/30 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
