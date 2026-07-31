import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} Maison de Parfum | Luxury Fragrances`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'perfume',
    'fragrance',
    'luxury perfume',
    'Aurélia',
    'eau de parfum',
    'Grasse',
    'Paris',
    'oud',
    'rose perfume',
  ],
  authors: [{ name: `${SITE_NAME} Maison de Parfum` }],
  creator: SITE_NAME,
  publisher: `${SITE_NAME} Maison de Parfum`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: `${SITE_NAME} Maison de Parfum`,
    title: `${SITE_NAME} Maison de Parfum | Luxury Fragrances`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1800,
        height: 1200,
        alt: `${SITE_NAME} — The Art of Fragrance`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} Maison de Parfum | Luxury Fragrances`,
    description: SITE_DESCRIPTION,
    images: ['/images/hero-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-white text-stone-700 overflow-x-hidden antialiased">
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd) }}
        />
        {children}
      </body>
    </html>
  );
}
