import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'], 
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'Shikshya Path Foundation | Study Abroad Consultancy',
  description: 'Your Trusted Partner for Studying Abroad. We guide Nepalese students to global success.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Shikshya Path Foundation",
              "url": "https://shikshyapath.edu.np",
              "logo": "https://shikshyapath.edu.np/logo.png",
              "description": "Premium study abroad consultancy in Nepal guiding students to top universities globally.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Putalisadak",
                "addressLocality": "Kathmandu",
                "addressRegion": "Bagmati",
                "postalCode": "44600",
                "addressCountry": "NP"
              },
              "telephone": "+977-1-4XXXXXX",
              "sameAs": [
                "https://www.facebook.com/shikshyapath",
                "https://www.instagram.com/shikshyapath"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased text-slate-800 bg-white flex flex-col min-h-screen`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
