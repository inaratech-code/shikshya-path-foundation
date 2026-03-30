'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { FacebookLogo, InstagramLogo, TikTokLogo, WhatsAppLogo } from '@/components/brand/SocialLogos';
import { siteContact, siteSocial, SITE_MOTTO, studyDestinations } from '@/data/siteContent';

const SOCIAL_PILL_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 ease-out hover:scale-[1.06] hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-white hover:shadow-[0_0_34px_-6px_rgba(16,185,129,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070818]';

const FOOTER_DESTINATION_LINK_CLASS =
  'inline-block rounded-md px-1.5 py-0.5 -mx-1.5 text-slate-300/90 transition-all duration-300 ease-out hover:bg-white/[0.08] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070818]';

const FOOTER_DESTINATIONS = studyDestinations.map((d) => ({
  label: d.accordionTitle.replace(/^Study in /, ''),
  slug: d.slug,
}));

const FOOTER_QUICK_LINKS_FULL = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Study Destination', href: '/destinations' },
  { label: 'Test Preparation', href: '/test-preparation' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Offers', href: '/offers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Offers', href: '/offers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-slate-300 py-12 sm:py-20 px-4 sm:px-6 mt-auto [&_p]:text-justify">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_460px_at_14%_18%,rgba(45,212,191,0.14),transparent_60%),radial-gradient(900px_520px_at_86%_22%,rgba(236,72,153,0.14),transparent_55%),linear-gradient(180deg,#070818_0%,#050615_55%,#03030C_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-12 lg:gap-x-10 lg:gap-y-10">
        <div className="col-span-2 lg:col-span-4 min-w-0 text-center lg:text-left">
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

        <div className="col-span-1 lg:col-span-2 min-w-0">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">Quick Links</h4>
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

        <div className="col-span-1 lg:col-span-3 min-w-0">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">Destinations</h4>
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

        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-white font-black mb-4 sm:mb-6 text-base sm:text-lg tracking-tight">Contact Us</h4>
          <ul className="space-y-4 text-slate-200/85 font-medium text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-emerald-300 shrink-0 mt-1" />
              <span>
                {siteContact.addressLines[0]}
                <br />
                {siteContact.addressLines[1]}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={20} className="text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`mailto:${siteContact.email}`} className="hover:text-white break-all transition-colors">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={20} className="text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span>Tel: {siteContact.phoneLandline}</span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone size={20} className="text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`tel:${siteContact.mobile.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                {siteContact.mobile}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppLogo className="h-5 w-5 shrink-0 text-emerald-300 mt-0.5" />
              <a
                href={`https://wa.me/${siteContact.whatsappTel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
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
          <Link href="/privacy" className="text-slate-300/70 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-slate-300/70 hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
