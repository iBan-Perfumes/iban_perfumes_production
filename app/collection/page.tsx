import type { Metadata } from 'next';
import { CollectionBrowse } from '@/components/collection/CollectionBrowse';
import { CollectionCta } from '@/components/collection/CollectionCta';
import { CollectionHero } from '@/components/collection/CollectionHero';
import { collectionPageSeo } from '@/lib/collection-content';
import { SITE_NAME } from '@/lib/site';
import {
  getBreadcrumbJsonLd,
  getCollectionPageJsonLd,
} from '@/lib/structured-data';

export const metadata: Metadata = {
  title: collectionPageSeo.title,
  description: collectionPageSeo.description,
  alternates: {
    canonical: '/collection',
  },
  openGraph: {
    type: 'website',
    url: '/collection',
    siteName: SITE_NAME,
    title: `${collectionPageSeo.title} | ${SITE_NAME}`,
    description: collectionPageSeo.description,
    images: [
      {
        url: '/images/cinematic/ORIS_BANNER_IMG.png',
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME} — Find Your Signature Fragrance`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${collectionPageSeo.title} | ${SITE_NAME}`,
    description: collectionPageSeo.description,
    images: ['/images/cinematic/ORIS_BANNER_IMG.png'],
  },
};

export default function CollectionPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', path: '/home' },
    { name: 'Collection', path: '/collection' },
  ]);
  const collectionLd = getCollectionPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <main id="main">
        <article>
          <CollectionHero />
          <CollectionBrowse />
          <CollectionCta />
        </article>
      </main>
    </>
  );
}
