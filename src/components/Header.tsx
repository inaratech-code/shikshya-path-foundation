'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex flex-col items-center justify-center text-white font-bold text-xl shadow-md">S</div>
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-brand-accent)] bg-clip-text text-transparent font-heading tracking-tight">
            Shikshya Path
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-[var(--color-text-main)] font-medium text-sm">
          <Link href="/destinations" className={`hover:text-[var(--color-primary)] transition ${pathname === '/destinations' ? 'text-[var(--color-primary)]' : ''}`}>Destinations</Link>
          <Link href="/services" className={`hover:text-[var(--color-primary)] transition ${pathname === '/services' ? 'text-[var(--color-primary)]' : ''}`}>Services</Link>
          <Link href="/universities" className={`hover:text-[var(--color-primary)] transition ${pathname === '/universities' ? 'text-[var(--color-primary)]' : ''}`}>Universities</Link>
          <Link href="/about" className={`hover:text-[var(--color-primary)] transition ${pathname === '/about' ? 'text-[var(--color-primary)]' : ''}`}>About</Link>
          <Link href="/offers" className="hover:text-amber-600 px-3 py-1.5 bg-amber-50 rounded-full text-amber-700 transition font-semibold flex items-center gap-1">
            <Star size={14} fill="currentColor" /> Offers
          </Link>
        </nav>
        
        <div className="flex gap-4 items-center">
          <Link href="/contact" className="hidden sm:block text-[var(--color-primary)] font-semibold border-2 border-[var(--color-primary)] px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm">
            Apply Now
          </Link>
          <Link href="/contact" className="bg-[var(--color-primary)] text-white font-semibold px-5 py-2.5 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-brand-accent)]/30 transition-all text-sm">
            Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
