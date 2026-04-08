'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { FacebookLogo, InstagramLogo, TikTokLogo, WhatsAppLogo } from '@/components/brand/SocialLogos';
import { siteContact, siteSocial, studyDestinations } from '@/data/siteContent';

const SOCIAL_PILL_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-300 ease-out hover:scale-[1.06] hover:border-[var(--color-primary)]/35 hover:bg-primary-soft hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const FOOTER_LINK_CLASS =
  'text-slate-800 transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm';

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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-slate-900 py-12 sm:py-20 px-4 sm:px-6 mt-auto border-t border-slate-200 [&_p]:text-justify">
      <div className="max-w-7xl mx-auto bg-white px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-10 lg:gap-y-12">
          <div className="col-span-2 lg:col-span-4 min-w-0 text-center">
            <div className="mb-6 flex w-full justify-center">
              <BrandLogo variant="footer" />
            </div>
            <p className="max-w-sm mx-auto mb-8 leading-relaxed text-slate-700">
              We are a leading education consultancy in Nepal, dedicated to placing students in top-tier global universities and guiding their career journey.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
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
            <h4 className="text-slate-900 font-black mb-4 sm:mb-5 text-base sm:text-lg tracking-tight">
              <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
                Quick Links
              </span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-medium text-sm sm:text-base">
              {FOOTER_QUICK_LINKS_FULL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={FOOTER_LINK_CLASS}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2 min-w-0">
            <h4 className="text-slate-900 font-black mb-4 sm:mb-5 text-base sm:text-lg tracking-tight">
              <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
                Destinations
              </span>
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-medium text-sm sm:text-base">
              {FOOTER_DESTINATIONS.map((d) => (
                <li key={d.slug}>
                  <Link href={`/destinations/${d.slug}`} className={FOOTER_LINK_CLASS}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4 min-w-0">
            <h4 className="text-slate-900 font-black mb-4 sm:mb-5 text-base sm:text-lg tracking-tight">
              <span className="brand-color-anim text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-brand-accent)]">
                Contact Us
              </span>
            </h4>
            <ul className="space-y-4 text-slate-800 font-medium text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-1" />
                <span className="inline-flex flex-col gap-0.5 leading-snug text-slate-900">
                  {siteContact.addressLines.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`mailto:${siteContact.email}`}
                  className="hover:text-[var(--color-primary)] break-words transition-colors text-slate-900"
                >
                  {siteContact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-snug text-slate-900">Tel: {siteContact.phoneLandline}</span>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`tel:${siteContact.mobile.replace(/\s/g, '')}`}
                  className="whitespace-nowrap hover:text-[var(--color-primary)] transition-colors text-slate-900"
                >
                  {siteContact.mobile}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppLogo className="h-5 w-5 shrink-0 text-[var(--color-accent-bright)] mt-0.5" />
                <a
                  href={`https://wa.me/${siteContact.whatsappTel}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap hover:text-[var(--color-primary)] transition-colors text-slate-900"
                  aria-label={`WhatsApp ${siteContact.whatsappDisplay}`}
                >
                  {siteContact.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left">
        <p className="max-w-md sm:max-w-none text-slate-600">
          <span className="block">
            &copy; {new Date().getFullYear()} Shikshya Path Foundation. All rights reserved.
          </span>
          <span className="mt-1 block">
            &copy; Built by{' '}
            <a
              href="https://www.inaratech.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-[var(--color-primary)] transition-colors font-medium"
            >
              Inara Tech
            </a>
            .
          </span>
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <Link
            href="/privacy"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-300 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
