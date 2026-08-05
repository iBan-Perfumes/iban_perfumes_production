export interface FeaturedPerfume {
  id: string;
  name: string;
  description: string;
  perfumeImage: string;
  notesImage: string;
  price: string;
  badge?: string;
}

export const featuredPerfumes: FeaturedPerfume[] = [
  {
    id: 'oris',
    name: 'ORIS',
    description:
      'A refined fusion of citrus, florals & warm woods — bergamot, jasmine, sandalwood.',
    perfumeImage: '/images/product_images/ORIS_PERFUME.png',
    notesImage: '/images/product_images/ORIS_NOTES.png',
    price: '₹399',
    badge: 'New',
  },
  {
    id: 'royal-berry',
    name: 'Royal Berry',
    description:
      'A luscious blend of juicy berries & sweet delight — playful, elegant & charming.',
    perfumeImage: '/images/product_images/ROYAL_BERRY_PERFUME.png',
    notesImage: '/images/product_images/ROYALBERRY_NOTES.png',
    price: '₹399',
    badge: "Guest Favourite",
  },
  {
    id: 'from-heavens',
    name: 'From Heavens',
    description:
      'A heavenly blend of freshness, florals & deep elegance — orange, lavender, oud.',
    perfumeImage: '/images/product_images/FROM_HEAVENS_PERFUME.png',
    notesImage: '/images/product_images/FROM_HEAVENS_NOTE.png',
    price: '₹349',
  },
  {
    id: 'marj',
    name: 'MARJ',
    description:
      'A majestic blend of oud, spices & rich elegance — warm, spicy, enigmatic.',
    perfumeImage: '/images/product_images/MIRAJ_PERFUME.png',
    notesImage: '/images/product_images/MIRAJ_NOTES.png',
    price: '₹399',
    badge: 'Signature',
  },
  {
    id: 'hala-paris',
    name: 'Hala Paris',
    description:
      'A radiant blend of fruits, florals & sweet elegance — charming & feminine.',
    perfumeImage: '/images/product_images/HALA_PARIS_PERFUME.png',
    notesImage: '/images/product_images/HALA_PARIS_NOTES.png',
    price: '₹349',
  },
];
