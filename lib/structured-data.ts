import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import { featuredPerfumes } from '@/lib/featured-perfumes';
import { aboutPageSeo } from '@/lib/about-content';

export function getOrganizationJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}/images/cinematic/ORIS_BANNER_IMG.png`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  };
}

export function getProductListJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} Signature Collection`,
    itemListElement: featuredPerfumes.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: `${url}${p.perfumeImage}`,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: p.price.replace(/[₹,]/g, ''),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function getAboutPageJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${aboutPageSeo.title} | ${SITE_NAME}`,
    description: aboutPageSeo.description,
    url: `${url}/about`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url,
    },
  };
}
