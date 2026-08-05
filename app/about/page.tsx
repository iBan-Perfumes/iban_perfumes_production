import type { Metadata } from 'next';
import { AboutCta } from '@/components/about/AboutCta';
import { AboutHero } from '@/components/about/AboutHero';
import { BrandValues } from '@/components/about/BrandValues';
import { Craftsmanship } from '@/components/about/Craftsmanship';
import { CustomerExperience } from '@/components/about/CustomerExperience';
import { FragranceCategories } from '@/components/about/FragranceCategories';
import { OurStory } from '@/components/about/OurStory';
import { Philosophy } from '@/components/about/Philosophy';
import { WhyChoose } from '@/components/about/WhyChoose';
import { aboutPageSeo } from '@/lib/about-content';
import { SITE_NAME } from '@/lib/site';
import {
  getAboutPageJsonLd,
  getBreadcrumbJsonLd,
} from '@/lib/structured-data';

export const metadata: Metadata = {
  title: aboutPageSeo.title,
  description: aboutPageSeo.description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: SITE_NAME,
    title: `${aboutPageSeo.title} | ${SITE_NAME}`,
    description: aboutPageSeo.description,
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
    title: `${aboutPageSeo.title} | ${SITE_NAME}`,
    description: aboutPageSeo.description,
    images: ['/images/cinematic/ORIS_BANNER_IMG.png'],
  },
};

export default function AboutPage() {
  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
  ]);
  const aboutLd = getAboutPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <main id="main">
        <article>
          <AboutHero />
          <OurStory />
          <Philosophy />
          <WhyChoose />
          <FragranceCategories />
          <Craftsmanship />
          <BrandValues />
          <CustomerExperience />
          <AboutCta />
        </article>
      </main>
    </>
  );
}
