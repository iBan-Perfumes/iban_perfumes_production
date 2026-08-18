import type { Metadata } from 'next';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactHero } from '@/components/contact/ContactHero';
import { contactPageSeo } from '@/lib/contact-content';
import { SITE_NAME } from '@/lib/site';
import { getBreadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: contactPageSeo.title,
  description: contactPageSeo.description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    siteName: SITE_NAME,
    title: `${contactPageSeo.title} | ${SITE_NAME}`,
    description: contactPageSeo.description,
    images: [
      {
        url: '/images/iban_contactus_page.png',
        width: 1920,
        height: 1080,
        alt: `${SITE_NAME} — Contact`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contactPageSeo.title} | ${SITE_NAME}`,
    description: contactPageSeo.description,
    images: ['/images/iban_contactus_page.png'],
  },
};

export default function ContactPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main id="main">
        <article>
          <ContactHero />
          <ContactFormSection />
        </article>
      </main>
    </>
  );
}
