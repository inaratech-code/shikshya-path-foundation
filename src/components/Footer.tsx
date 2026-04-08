'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { FacebookLogo, InstagramLogo, TikTokLogo, WhatsAppLogo } from '@/components/brand/SocialLogos';
import { siteContact, siteSocial, studyDestinationAccordionHref, studyDestinations } from '@/data/siteContent';

const SOCIAL_PILL_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-300 ease-out hover:scale-[1.06] hover:border-[var(--color-primary)]/35 hover:bg-primary-soft hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const FOOTER_LINK_CLASS =
  'text-slate-800 transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm';

const FOOTER_SECTION_TITLE_CLASS =
  'text-[var(--color-primary)] font-bold text-base sm:text-lg tracking-tight mb-4 sm:mb-5';

/** Equal vertical spacing between every row in Quick Links, Destinations, and Contact. */
const FOOTER_LINK_LIST_CLASS =
  'list-none space-y-3 p-0 m-0 font-medium text-sm sm:text-base';

const FOOTER_DESTINATIONS = studyDestinations.map((d) => ({
  label: d.accordionTitle.replace(/^Study in /, ''),
  slug: d.slug,
}));

const FOOTER_QUICK_LINKS_FULL = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Study Destination', href: '/destinations#study-abroad-destinations' },
  { label: 'Test Preparation', href: '/test-preparation' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Offers', href: '/offers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-slate-900 py-12 sm:py-20 px-4 sm:px-6 mt-auto border-t border-slate-200">
      <div className="max-w-7xl mx-auto bg-white px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-10 xl:gap-x-12 lg:gap-y-0 lg:items-start">
          <div className="col-span-2 text-center lg:min-w-0 lg:text-left lg:col-span-1">
            <div className="mb-6 flex w-full justify-center lg:justify-start">
              <BrandLogo variant="footer" />
            </div>
            <p className="mb-8 max-w-none leading-relaxed text-slate-700 max-lg:mx-auto max-lg:max-w-md lg:text-left">
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

          <div className="min-w-0 text-left">
            <h4 className={FOOTER_SECTION_TITLE_CLASS}>Quick Links</h4>
            <ul className={FOOTER_LINK_LIST_CLASS}>
              {FOOTER_QUICK_LINKS_FULL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={FOOTER_LINK_CLASS}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 text-left">
            <h4 className={FOOTER_SECTION_TITLE_CLASS}>Destinations</h4>
            <ul className={FOOTER_LINK_LIST_CLASS}>
              {FOOTER_DESTINATIONS.map((d) => (
                <li key={d.slug}>
                  <Link href={studyDestinationAccordionHref(d.slug)} className={FOOTER_LINK_CLASS}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 min-w-0 text-left lg:col-span-1">
            <h4 className={FOOTER_SECTION_TITLE_CLASS}>Contact Us</h4>
            <ul className={FOOTER_LINK_LIST_CLASS + ' text-slate-800'}>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--color-accent-bright)] shrink-0 mt-0.5" />
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
