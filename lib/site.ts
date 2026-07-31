export const SITE_NAME = 'Aurélia';
export const SITE_TAGLINE = 'Maison de Parfum · Paris';
export const SITE_DESCRIPTION =
  'Discover Aurélia — a curated collection of rare and refined perfumes, crafted by master perfumers in Grasse. Signature fragrances, gifting sets, and a century of elegance.';

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'http://localhost:3000'
  );
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Men', href: '#men' },
  { label: 'Women', href: '#women' },
  { label: 'Gifting', href: '#gifting' },
  { label: 'Contact', href: '#contact' },
] as const;

export const contactInfo = {
  address: '12 Rue de la Paix, Paris 75002',
  phone: '+33 1 42 60 00 00',
  email: 'concierge@aurelia-paris.com',
} as const;
