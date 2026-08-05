export const SITE_NAME = 'i-BAN Perfumes';
export const SITE_TAGLINE = 'Eau de Parfum';
export const SITE_DESCRIPTION =
  'Discover i-BAN Perfumes — premium Eau de Parfum crafted for everyday luxury. ORIS, Royal Berry, From Heavens, MARJ, and Hala Paris in elegant 20 ml bottles.';

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'http://localhost:3000'
  );
}

export const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Collection', href: '/#collection' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const contactInfo: {
  address: string;
  phone: string;
  email: string;
} = {
  address: '',
  phone: '',
  email: '',
};
