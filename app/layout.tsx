import type { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond, Jost, Tenor_Sans } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getSiteUrl, isIndexingAllowed, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import {
  getOrganizationJsonLd,
  getProductListJsonLd,
} from '@/lib/structured-data';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tenor-sans',
  display: 'swap',
});

const siteUrl = getSiteUrl();
const allowIndexing = isIndexingAllowed();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Luxury Eau de Parfum`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'i-BAN Perfumes',
    'perfume',
    'fragrance',
    'luxury perfume',
    'eau de parfum',
    'ORIS',
    'Royal Berry',
    'From Heavens',
    'MARJ',
    'Hala Paris',
    'oud perfume',
    'affordable luxury perfume',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Luxury Eau de Parfum`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/cinematic/ORIS_BANNER_IMG.png',
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME} — Crafting Fragrances That Become Memories`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Luxury Eau de Parfum`,
    description: SITE_DESCRIPTION,
    images: ['/images/cinematic/ORIS_BANNER_IMG.png'],
  },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = getOrganizationJsonLd();
  const productsLd = getProductListJsonLd();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${tenorSans.variable}`}
    >
      <body className="bg-white text-stone-700 overflow-x-hidden antialiased">
        <Link href="/" className="skip-link">
          Skip to content
        </Link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd) }}
        />
        <Navbar />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
