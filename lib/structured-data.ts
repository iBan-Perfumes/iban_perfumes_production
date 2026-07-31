import { contactInfo, getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import { products } from '@/lib/products';

export function getOrganizationJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'PerfumeStore',
    name: `${SITE_NAME} Maison de Parfum`,
    description: SITE_DESCRIPTION,
    url,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Rue de la Paix',
      addressLocality: 'Paris',
      postalCode: '75002',
      addressCountry: 'FR',
    },
    image: `${url}/images/hero-1.jpg`,
    priceRange: '₹₹₹',
  };
}

export function getProductListJsonLd() {
  const url = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} Signature Collection`,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.note,
        image: `${url}${p.image}`,
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
