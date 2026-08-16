/**
 * Seed data extracted from the former static catalog.
 * Used only by scripts/seed.ts — not imported by the storefront.
 */
export type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  character: string;
  category: string;
  priceValue: number;
  badge?: string;
  perfumeImage: string;
  notesImage: string;
  lifestyleImage?: string;
  notePyramid: { top: string[]; heart: string[]; base: string[] };
  heroCopy: string;
  story: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: 'oris',
    name: 'ORIS',
    description:
      'A refined fusion of citrus, florals & warm woods — bergamot, jasmine, sandalwood.',
    character: 'Citrusy · Floral · Warm',
    category: 'Fresh Fruity Musky',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/ORIS_PERFUME.png',
    notesImage: '/images/product_images/ORIS_NOTES.png',
    lifestyleImage: '/images/cinematic/ORIS_BANNER_IMG.png',
    notePyramid: {
      top: ['Bergamot', 'Pineapple'],
      heart: ['Jasmine'],
      base: ['Sandalwood', 'Musk'],
    },
    heroCopy:
      'Citrusy. Floral. Warm. A sophisticated blend that opens with fresh citrus and sweet nuances, blooms into delicate florals, and settles into a warm, sensual base.',
    story:
      'A refreshing fusion of citrus freshness, tropical sweetness, elegant jasmine and smooth sandalwood finished with soft musk. ORIS is crafted for everyday presence—bright at the open, refined through the heart, and quietly lasting on the skin.',
    available: true,
    featured: true,
    createdAt: '2025-11-01',
  },
  {
    slug: 'royal-berry',
    name: 'Royal Berry',
    description:
      'A luscious blend of juicy berries & sweet delight — playful, elegant & charming.',
    character: 'Fruity · Sweet · Enchanting',
    category: 'Fruity Floral',
    priceValue: 399,
    badge: 'Guest Favourite',
    perfumeImage: '/images/product_images/ROYAL_BERRY_PERFUME.png',
    notesImage: '/images/product_images/ROYALBERRY_NOTES.png',
    notePyramid: {
      top: ['Strawberry', 'Raspberry'],
      heart: ['Violet'],
      base: ['Vanilla', 'Amber'],
    },
    heroCopy:
      'Fruity. Sweet. Enchanting. A delightful fusion of vibrant berries and zesty citrus, blossoming florals, and a warm, sensual base that lingers beautifully.',
    story:
      'Royal Berry captures playful elegance—juicy berries and soft florals wrapped in a warm vanilla–amber trail. Designed for moments that feel light, charming, and memorable from morning to evening.',
    available: true,
    featured: true,
    createdAt: '2025-09-15',
  },
  {
    slug: 'from-heavens',
    name: 'From Heavens',
    description:
      'A heavenly blend of freshness, florals & deep elegance — orange, lavender, oud.',
    character: 'Fresh · Floral · Heavenly',
    category: 'Fresh Floral',
    priceValue: 349,
    badge: 'Limited',
    perfumeImage: '/images/product_images/FROM_HEAVENS_PERFUME.png',
    notesImage: '/images/product_images/FROM_HEAVENS_NOTE.png',
    notePyramid: {
      top: ['Orange'],
      heart: ['Lavender', 'Rose'],
      base: ['Vanilla', 'Oud'],
    },
    heroCopy:
      'Fresh. Floral. Heavenly. A divine blend that opens with juicy citrus and soft fruits, blooms into a heart of delicate florals, and settles into a warm, rich base that lingers like a dream.',
    story:
      'From Heavens balances calm and radiance—fresh citrus and lavender rise into romantic rose, then rest on warm vanilla and deep oud. A fragrance for quiet confidence and elevated everyday wear.',
    available: true,
    featured: false,
    createdAt: '2025-08-01',
  },
  {
    slug: 'marj',
    name: 'MARJ',
    description:
      'A majestic blend of oud, spices & rich elegance — warm, spicy, enigmatic.',
    character: 'Warm · Spicy · Enigmatic',
    category: 'Oud Leathery',
    priceValue: 399,
    badge: 'Signature',
    perfumeImage: '/images/product_images/MIRAJ_PERFUME.png',
    notesImage: '/images/product_images/MIRAJ_NOTES.png',
    notePyramid: {
      top: ['Honey', 'Saffron'],
      heart: ['Oud'],
      base: ['Leather', 'Musk'],
    },
    heroCopy:
      'Warm. Spicy. Enigmatic. A powerful fusion of rich oud and exotic spices, softened by florals and woods, resting on a deep, sensual base that leaves an unforgettable trail.',
    story:
      'MARJ is a bold signature scent—honey and saffron open into rich oud, finishing on luxurious leather and soft musk. Crafted for presence that feels deep, warm, and unmistakably memorable.',
    available: true,
    featured: true,
    createdAt: '2025-10-01',
  },
  {
    slug: 'hala-paris',
    name: 'Hala Paris',
    description:
      'A radiant blend of fruits, florals & sweet elegance — charming & feminine.',
    character: 'Fruity · Floral · Sweet',
    category: 'Fruity Floral',
    priceValue: 349,
    badge: 'New',
    perfumeImage: '/images/product_images/HALA_PARIS_PERFUME.png',
    notesImage: '/images/product_images/HALA_PARIS_NOTES.png',
    notePyramid: {
      top: ['Litchi', 'Grapefruit'],
      heart: ['Jasmine', 'Rose'],
      base: ['Vanilla'],
    },
    heroCopy:
      'Fruity. Floral. Sweet. A delightful harmony of juicy fruits and delicate florals, wrapped in a sweet, soft base that lingers gracefully. Charming, feminine & irresistibly elegant.',
    story:
      'Hala Paris is radiant and graceful—litchi and grapefruit sparkle over jasmine and rose, settling into soft vanilla. A feminine everyday fragrance that feels charming from first spray to last impression.',
    available: true,
    featured: false,
    createdAt: '2025-12-01',
  },
  {
    slug: 'cr7',
    name: 'CR7',
    description:
      'A vibrant fresh fruity musky blend — pineapple, apple, jasmine, and soft woods.',
    character: 'Fresh · Fruity · Musky',
    category: 'Fresh Fruity Musky',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/CR_7_PERFUMES.png',
    notesImage: '/images/product_images/CR_7_NOTES.jpeg',
    notePyramid: {
      top: ['Pineapple', 'Apple', 'Pear', 'Bergamot', 'Blackcurrant'],
      heart: ['Jasmine', 'Freesia', 'Rose', 'Lily of the Valley'],
      base: ['White Musk', 'Sandalwood', 'Cedarwood', 'Amber', 'Vanilla'],
    },
    heroCopy:
      'Fresh. Fruity. Musky. A dynamic blend that opens with juicy pineapple, apple, and pear, blooms into soft florals, and settles into white musk, woods, amber, and vanilla.',
    story:
      'CR7 is bright and confident—tropical and crisp fruits sparkle over jasmine and rose, finishing on white musk, sandalwood, and warm amber–vanilla. Crafted for everyday energy with a polished, lasting trail.',
    available: true,
    featured: true,
    createdAt: '2026-03-01',
  },
  {
    slug: 'jordan',
    name: 'Jordan',
    description:
      'A woody aromatic composition — citrus, herbs, cypress, and deep woods.',
    character: 'Woody · Aromatic · Fresh',
    category: 'Woody Aromatic',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/JORDAN_PERFUMES.png',
    notesImage: '/images/product_images/JORDAN_NOTES.jpeg',
    notePyramid: {
      top: ['Bergamot', 'Grapefruit', 'Lavender', 'Rosemary'],
      heart: ['Clary Sage', 'Geranium', 'Cypress', 'Juniper Berry'],
      base: ['Cedarwood', 'Sandalwood', 'Vetiver', 'Oakmoss', 'Patchouli', 'Musk'],
    },
    heroCopy:
      'Woody. Aromatic. Fresh. Opens with bergamot, grapefruit, lavender, and rosemary, moves into sage, geranium, and cypress, and rests on cedar, sandalwood, vetiver, and musk.',
    story:
      'Jordan brings crisp aromatic lift and grounded woods—citrus and herbs open into green cypress and juniper, then settle into cedar, sandalwood, and soft musk. A modern woody aromatic for confident daily wear.',
    available: true,
    featured: true,
    createdAt: '2026-03-02',
  },
  {
    slug: 'kl12',
    name: 'KL12',
    description:
      'An oriental woody floral — spice, rose, oud, amber, and sweet warmth.',
    character: 'Oriental · Woody · Floral',
    category: 'Oriental Woody Floral',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/KL_12_PERFUMES.png',
    notesImage: '/images/product_images/KL_12_NOTES.jpeg',
    notePyramid: {
      top: ['Bergamot', 'Pink Pepper', 'Saffron'],
      heart: ['Rose', 'Jasmine', 'Cinnamon', 'Nutmeg'],
      base: [
        'Vanilla',
        'Tonka Bean',
        'Oud',
        'Sandalwood',
        'Amber',
        'Patchouli',
        'White Musk',
        'Caramel',
        'Benzoin',
      ],
    },
    heroCopy:
      'Oriental. Woody. Floral. Spiced bergamot and saffron open into rose, jasmine, and warm spice, settling into oud, amber, vanilla, caramel, and soft musk.',
    story:
      'KL12 is rich and expressive—pink pepper and saffron sparkle over rose and cinnamon, then deepen into oud, sandalwood, amber, and caramel warmth. A signature oriental woody floral with lasting presence.',
    available: true,
    featured: true,
    createdAt: '2026-03-03',
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    description:
      'An oriental woody sweet blend — citrus spice, white florals, oud, and amber.',
    character: 'Oriental · Woody · Sweet',
    category: 'Oriental Woody Sweet',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/LIVERPOOL_PERFUMES.png',
    notesImage: '/images/product_images/LIVERPOOL_NOTES.jpeg',
    notePyramid: {
      top: ['Bergamot', 'Mandarin Orange', 'Pink Pepper'],
      heart: ['Rose', 'Jasmine Sambac', 'Orange Blossom', 'Tuberose'],
      base: ['Oud', 'Sandalwood', 'Patchouli', 'Amber', 'Vanilla', 'Musk', 'Benzoin'],
    },
    heroCopy:
      'Oriental. Woody. Sweet. Bright bergamot, mandarin, and pink pepper open into rose and white florals, finishing on oud, sandalwood, amber, vanilla, and musk.',
    story:
      'Liverpool balances radiance and depth—citrus spice lifts into romantic florals, then settles into oud, amber, and soft vanilla–musk sweetness. Crafted for evenings and everyday elegance alike.',
    available: true,
    featured: true,
    createdAt: '2026-03-04',
  },
  {
    slug: 'pure-white',
    name: 'Pure White',
    description:
      'A woody yellow floral — bright citrus, ylang-ylang, and creamy woods.',
    character: 'Woody · Yellow Floral · Soft',
    category: 'Woody Yellow Floral',
    priceValue: 399,
    badge: 'New',
    perfumeImage: '/images/product_images/PURE_WHITE_PERFUMES.png',
    notesImage: '/images/product_images/PURE_WHITE_NOTE.jpeg',
    notePyramid: {
      top: ['Bergamot', 'Lemon', 'Mandarin Orange'],
      heart: ['Ylang-Ylang', 'Jasmine Sambac', 'Mimosa', 'Champaca'],
      base: ['Sandalwood', 'Cedarwood', 'Vetiver', 'White Musk', 'Amber'],
    },
    heroCopy:
      'Woody. Yellow Floral. Soft. Opens with bergamot, lemon, and mandarin, blooms into ylang-ylang, jasmine, and mimosa, and rests on sandalwood, cedar, white musk, and amber.',
    story:
      'Pure White is luminous and refined—crisp citrus rises into golden yellow florals, then settles into creamy woods and soft musk. A graceful woody floral for polished everyday wear.',
    available: true,
    featured: true,
    createdAt: '2026-03-05',
  },
];
