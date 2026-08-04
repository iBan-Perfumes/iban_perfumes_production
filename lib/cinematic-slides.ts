export type CinematicTheme =
  | 'ice'
  | 'silver'
  | 'amber'
  | 'ocean'
  | 'violet'
  | 'forest';

export interface CinematicSlide {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  meta: string[];
  genres: string[];
  primaryAction: string;
  secondaryAction: string;
  primaryHref: string;
  secondaryHref: string;
  image: string;
  previewImage: string;
  theme: CinematicTheme;
}

export const cinematicSlides: CinematicSlide[] = [
  {
    id: 'oris',
    eyebrow: 'i-BAN Perfumes · Signature',
    title: 'ORIS',
    titleAccent: 'Eau de Parfum',
    description:
      'Citrusy. Floral. Warm. A sophisticated blend that opens with fresh citrus and sweet nuances, blooms into delicate florals, and settles into a warm, sensual base.',
    meta: ['20 ML', 'MRP ₹399', 'EDP', 'NEW'],
    genres: ['Bergamot', 'Pineapple', 'Jasmine', 'Sandalwood', 'Musk'],
    primaryAction: 'Shop ORIS',
    secondaryAction: 'Our Story',
    primaryHref: '#collection',
    secondaryHref: '#about',
    image: '/images/cinematic/ORIS_BANNER_IMG.png',
    previewImage: '/images/cinematic/oris.png',
    theme: 'amber',
  },
  {
    id: 'royal-berry',
    eyebrow: 'i-BAN Perfumes · Fruity Floral',
    title: 'Royal',
    titleAccent: 'Berry',
    description:
      'Fruity. Sweet. Enchanting. A delightful fusion of vibrant berries and zesty citrus, blossoming florals, and a warm, sensual base that lingers beautifully.',
    meta: ['20 ML', 'MRP ₹399', 'EDP', 'BESTSELLER'],
    genres: ['Strawberry', 'Raspberry', 'Violet', 'Vanilla', 'Amber'],
    primaryAction: 'Shop Royal Berry',
    secondaryAction: 'View Collection',
    primaryHref: '#collection',
    secondaryHref: '#women',
    image: '/images/cinematic/ROYAL_BERRY_BANNER_IMG.png',
    previewImage: '/images/cinematic/royal-berry.png',
    theme: 'violet',
  },
  {
    id: 'from-heavens',
    eyebrow: 'i-BAN Perfumes · Fresh Floral',
    title: 'From',
    titleAccent: 'Heavens',
    description:
      'Fresh. Floral. Heavenly. A divine blend that opens with juicy citrus and soft fruits, blooms into a heart of delicate florals, and settles into a warm, rich base that lingers like a dream.',
    meta: ['20 ML', 'MRP ₹349', 'EDP', 'LIMITED'],
    genres: ['Orange', 'Lavender', 'Rose', 'Vanilla', 'Oud'],
    primaryAction: 'Shop From Heavens',
    secondaryAction: 'Discover More',
    primaryHref: '#collection',
    secondaryHref: '#about',
    image: '/images/cinematic/FROM_HEAVEN_BANNER_IMG.png',
    previewImage: '/images/cinematic/from-heavens.png',
    theme: 'forest',
  },
  {
    id: 'marj',
    eyebrow: 'i-BAN Perfumes · Oud & Spice',
    title: 'MARJ',
    titleAccent: 'Eau de Parfum',
    description:
      'Warm. Spicy. Enigmatic. A powerful fusion of rich oud and exotic spices, softened by florals and woods, resting on a deep, sensual base that leaves an unforgettable trail.',
    meta: ['20 ML', 'MRP ₹399', 'EDP', 'SIGNATURE'],
    genres: ['Oud', 'Honey', 'Saffron', 'Leather', 'Musk'],
    primaryAction: 'Shop MARJ',
    secondaryAction: 'Our Story',
    primaryHref: '#collection',
    secondaryHref: '#about',
    image: '/images/cinematic/MIRAJ_BANNER_IMAGE.png',
    previewImage: '/images/cinematic/marj.png',
    theme: 'amber',
  },
  {
    id: 'hala-paris',
    eyebrow: 'i-BAN Perfumes · Fruity Floral',
    title: 'Hala',
    titleAccent: 'Paris',
    description:
      'Fruity. Floral. Sweet. A delightful harmony of juicy fruits and delicate florals, wrapped in a sweet, soft base that lingers gracefully. Charming, feminine & irresistibly elegant.',
    meta: ['20 ML', 'MRP ₹349', 'EDP', 'NEW'],
    genres: ['Litchi', 'Grapefruit', 'Jasmine', 'Rose', 'Vanilla'],
    primaryAction: 'Shop Hala Paris',
    secondaryAction: 'View Collection',
    primaryHref: '#collection',
    secondaryHref: '#women',
    image: '/images/cinematic/HALA_PARIS_BANNER-IMG.png',
    previewImage: '/images/cinematic/hala-paris.png',
    theme: 'violet',
  },
];
