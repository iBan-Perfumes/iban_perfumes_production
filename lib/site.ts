import { getWhatsAppChatUrl } from '@/lib/whatsapp';

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

/** Crawl only when ALLOW_INDEXING is exactly "true" (case-insensitive). Empty/false = no index. */
export function isIndexingAllowed(): boolean {
  return process.env.ALLOW_INDEXING?.trim().toLowerCase() === 'true';
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const contactInfo: {
  address: string;
  phone: string;
  email: string;
} = {
  address:
    'i-BAN Perfumes, Near Famous bakery, Kambalkkad, Wayanad, Kerala, Pin: 673122',
  phone: (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '').trim(),
  email: 'ibanhub950@gmail.com',
};

export type SocialLink = {
  label: 'WhatsApp' | 'Instagram' | 'Facebook';
  href: string | null;
};

function envUrl(value: string | undefined): string {
  return (value ?? '').trim();
}

/** Always returns WhatsApp, Instagram, and Facebook. `href` is null when unset. */
export function getSocialLinks(): SocialLink[] {
  return [
    { label: 'WhatsApp', href: getWhatsAppChatUrl() },
    { label: 'Instagram', href: envUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) || null },
    { label: 'Facebook', href: envUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL) || null },
  ];
}
