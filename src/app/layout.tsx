import type { Metadata } from 'next';
import { Lexend, Outfit } from 'next/font/google';
import './globals.css';

/** Lexend: readability-first (designed for longer reading — student-friendly). Outfit: energetic display for titles. */
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Shikshya Path Foundation | Study Abroad Consultancy Nepal',
  description:
    'Shikshya Path Foundation — study abroad consultancy in Kathmandu, Nepal. IELTS & PTE training, university guidance, and visa support for Australia, UK, USA, Canada, New Zealand, Europe, Japan & Korea. Your Dream Our Guidance.',
  keywords: [
    'study abroad Nepal',
    'education consultancy Kathmandu',
    'IELTS PTE Nepal',
    'study in Australia UK USA Canada',
    'Shikshya Path Foundation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Shikshya Path Foundation",
              "url": "https://shikshyapath.edu.np",
              "logo": "https://shikshyapath.edu.np/logo.png",
              "description": "Study abroad consultancy in Kathmandu, Nepal — university guidance, IELTS & PTE preparation, documentation and visa support for Nepali students.",
              "slogan": "Your Dream Our Guidance",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ramshah Path, Putalisadak",
                "addressLocality": "Kathmandu",
                "addressRegion": "Bagmati",
                "addressCountry": "NP"
              },
              "email": "shikshyapathofficial@gmail.com",
              "telephone": "+977-01-4528000",
              "sameAs": [
                "https://www.facebook.com/share/1CL399G2iT/",
                "https://www.instagram.com/shikshyapathfoundation",
                "https://www.tiktok.com/@shikshyapathfoundation"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${lexend.variable} ${outfit.variable} font-sans antialiased text-slate-800 bg-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
