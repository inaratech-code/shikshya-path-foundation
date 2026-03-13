'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-6 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-8">
        <div className="md:col-span-5 pr-8">
           <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex flex-col items-center justify-center text-white font-bold text-xl">S</div>
            <span className="text-2xl font-bold text-white font-heading">Shikshya Path</span>
          </div>
          <p className="max-w-sm mb-8 leading-relaxed text-slate-400">
            We are a leading education consultancy in Nepal, dedicated to placing students in top-tier global universities and guiding their career journey.
          </p>
          <div className="flex gap-4">
            {[1,2,3,4].map(social => (
              <a key={social} href="#" className="w-10 h-10 bg-white/5 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors">
                <span className="w-4 h-4 bg-white/50 block rounded-sm mask-icon" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 font-medium">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/universities" className="hover:text-white transition-colors">Universities</Link></li>
            <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs & News</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-white font-bold mb-6 text-lg">Destinations</h4>
          <ul className="space-y-4 font-medium">
            <li><Link href="/destinations/australia" className="hover:text-white transition-colors">Australia</Link></li>
            <li><Link href="/destinations/canada" className="hover:text-white transition-colors">Canada</Link></li>
            <li><Link href="/destinations/uk" className="hover:text-white transition-colors">United Kingdom</Link></li>
            <li><Link href="/destinations/usa" className="hover:text-white transition-colors">USA</Link></li>
            <li><Link href="/destinations/europe" className="hover:text-white transition-colors">Europe</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
          <ul className="space-y-4 text-slate-300 font-medium">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <span>Putalisadak, Kathmandu<br />Bagmati Province, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-[var(--color-primary)]">✉</div>
              <span>info@shikshyapath.edu.np</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-[var(--color-primary)]">☎</div>
              <span>+977 1 4XXXXXX</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Shikshya Path Foundation. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
