export interface Product {
  name: string;
  note: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  {
    name: 'Velvet Oud',
    note: 'Amber · Oud · Saffron',
    price: '₹4,800',
    image: '/images/product-velvet-oud.jpg',
  },
  {
    name: 'Rose Élixir',
    note: 'Damask Rose · Musk',
    price: '₹4,200',
    image: '/images/product-rose-elixir.jpg',
  },
  {
    name: 'Citrus Noir',
    note: 'Bergamot · Cedar · Vetiver',
    price: '₹3,900',
    image: '/images/product-citrus-noir.jpg',
  },
  {
    name: 'Blanc Lumière',
    note: 'Jasmine · White Tea',
    price: '₹4,500',
    image: '/images/product-blanc-lumiere.jpg',
  },
  {
    name: "Nuit d'Or",
    note: 'Vanilla · Patchouli · Incense',
    price: '₹5,200',
    image: '/images/product-nuit-dor.jpg',
  },
  {
    name: 'Fleur Sauvage',
    note: 'Tuberose · Orange Blossom',
    price: '₹4,300',
    image: '/images/product-fleur-sauvage.jpg',
  },
];

export const menScents = [
  { name: 'Cuir Impérial', note: 'Leather · Tobacco · Amber' },
  { name: 'Bois Sauvage', note: 'Sandalwood · Black Pepper' },
  { name: 'Marin Noir', note: 'Sea Salt · Juniper · Smoke' },
] as const;

export const womenScents = [
  { name: 'Rose Éternelle', note: 'Centifolia Rose · Lychee · Musk' },
  { name: 'Jardin Secret', note: 'Peony · White Musk · Cedar' },
  { name: 'Soie Dorée', note: 'Honey · Orange Blossom · Amber' },
] as const;

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero-1.jpg',
    eyebrow: 'NEW ARRIVAL',
    title: 'The Art of',
    titleAccent: 'Fragrance',
    text: 'Discover a curated collection of rare and refined perfumes, crafted by master perfumers to capture emotion in a bottle.',
  },
  {
    image: '/images/hero-2.jpg',
    eyebrow: 'SIGNATURE LINE',
    title: 'Scents That',
    titleAccent: 'Linger',
    text: 'Each composition is layered slowly — bergamot, oud, rose and amber — until it finds its own perfect balance.',
  },
  {
    image: '/images/hero-3.jpg',
    eyebrow: 'MAISON DE PARFUM',
    title: 'A Century of',
    titleAccent: 'Elegance',
    text: 'For over a hundred years, Aurélia has pursued a single belief — that a fragrance is a memory, a presence, a quiet signature.',
  },
];
