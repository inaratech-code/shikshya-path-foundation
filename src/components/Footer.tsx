'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { FacebookLogo, InstagramLogo, TikTokLogo, WhatsAppLogo } from '@/components/brand/SocialLogos';
import { siteContact, siteSocial, SITE_MOTTO } from '@/data/siteContent';

const SOCIAL_PILL_CLASS =
  'inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 ease-out hover:scale-[1.06] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/90 hover:text-white hover:shadow-[0_0_28px_-4px_rgba(29,78,216,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

const FOOTER_DESTINATION_LINK_CLASS =
  'inline-block rounded-md px-1.5 py-0.5 -mx-1.5 transition-all duration-300 ease-out hover:bg-white/[0.08] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]';

const FOOTER_DESTINATIONS = [
  'Australia',
  'UK',
  'New Zealand',
  'Canada',
  'USA',
  'Europe',
  'Japan',
  'South Korea',
] as const;

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-20 px-4 sm:px-6 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-12 lg:gap-x-8 lg:gap-y-8">
        <div className="col-span-2 lg:col-span-5 lg:pr-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex flex-col items-center justify-center text-white font-bold text-xl">S</div>
            <span className="text-2xl font-bold text-white font-heading">Shikshya Path</span>
          </div>
          <p className="text-white/90 font-semibold text-sm mb-3 italic">&ldquo;{SITE_MOTTO}&rdquo;</p>
          <p className="max-w-sm mb-8 leading-relaxed text-slate-400">
            We are a leading education consultancy in Nepal, dedicated to placing students in top-tier global universities and guiding their career journey.
          </p>
          <div className="flex flex-wrap gap-3">
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
          <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Quick Links</h4>
          <ul className="space-y-3 sm:space-y-4 font-medium text-sm sm:text-base">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition-colors">Study Destination</Link></li>
            <li><Link href="/test-preparation" className="hover:text-white transition-colors">Test Preparation</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2 min-w-0">
          <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Destinations</h4>
          <ul className="space-y-3 sm:space-y-4 font-medium text-sm sm:text-base">
            {FOOTER_DESTINATIONS.map((name) => (
              <li key={name}>
                <Link href="/destinations" className={FOOTER_DESTINATION_LINK_CLASS}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Contact Us</h4>
          <ul className="space-y-4 text-slate-300 font-medium text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <span>
                {siteContact.addressLines[0]}
                <br />
                {siteContact.addressLines[1]}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`mailto:${siteContact.email}`} className="hover:text-white break-all">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Tel: {siteContact.phoneLandline}</span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
              <a href={`tel:${siteContact.mobile.replace(/\s/g, '')}`} className="hover:text-white">
                {siteContact.mobile}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppLogo className="h-5 w-5 shrink-0 text-[var(--color-primary)] mt-0.5" />
              <a
                href={`https://wa.me/${siteContact.whatsappTel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                aria-label={`WhatsApp ${siteContact.whatsappDisplay}`}
              >
                {siteContact.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left">
        <p className="max-w-md sm:max-w-none">
          &copy; {new Date().getFullYear()} Shikshya Path Foundation. All rights reserved. Built by{' '}
          <a
            href="https://www.inaratech.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-primary)] transition-colors"
          >
            Inara Tech
          </a>
          .
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
