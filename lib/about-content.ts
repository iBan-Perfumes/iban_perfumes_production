export const aboutHero = {
  eyebrow: 'ABOUT i-BAN PERFUMES',
  heading: 'Crafting Fragrances That Become Memories.',
  description:
    "At i-BAN Perfumes, we believe fragrance is more than a scent—it's an expression of personality, confidence, and unforgettable moments. Every bottle is thoughtfully created to bring luxury, elegance, and long-lasting freshness into everyday life.",
  primaryCta: { label: 'Explore Collection', href: '/#collection' },
  secondaryCta: { label: 'Contact Us', href: '/#contact' },
  image: '/images/cinematic/ORIS_BANNER_IMG.png',
} as const;

/** Deterministic particle positions — never use Math.random() (hydration-safe). */
export const heroParticles = [
  { top: '12%', left: '8%', size: 3, delay: '0s', duration: '7s' },
  { top: '22%', left: '78%', size: 2, delay: '1.2s', duration: '9s' },
  { top: '38%', left: '18%', size: 4, delay: '0.5s', duration: '8s' },
  { top: '48%', left: '88%', size: 2, delay: '2.1s', duration: '6.5s' },
  { top: '62%', left: '12%', size: 3, delay: '1.8s', duration: '10s' },
  { top: '70%', left: '62%', size: 2, delay: '0.8s', duration: '7.5s' },
  { top: '18%', left: '48%', size: 2, delay: '2.5s', duration: '8.5s' },
  { top: '82%', left: '32%', size: 3, delay: '1.4s', duration: '9.5s' },
  { top: '55%', left: '42%', size: 2, delay: '3s', duration: '7s' },
  { top: '30%', left: '92%', size: 3, delay: '0.3s', duration: '11s' },
] as const;

export const ourStory = {
  eyebrow: 'OUR JOURNEY',
  heading: 'Our Story',
  paragraphs: [
    'i-BAN Perfumes was born with a simple vision—to make premium fragrances accessible without compromising quality.',
    'Inspired by timeless perfumery traditions and modern lifestyles, each fragrance is carefully crafted using premium ingredients to deliver exceptional performance, elegant compositions, and memorable experiences.',
    "Whether you're stepping into an important meeting, celebrating life's milestones, or simply expressing yourself every day, i-BAN Perfumes is designed to complement every personality and every occasion.",
  ],
  image: '/images/about.jpg',
  imageAlt: 'i-BAN Perfumes luxury fragrance lifestyle',
} as const;

export const philosophyCards = [
  {
    id: 'luxury-quality',
    title: 'Luxury Quality',
    description:
      'Use carefully selected fragrance ingredients to create premium Eau de Parfum that lasts beautifully throughout the day.',
    icon: 'Sparkles' as const,
  },
  {
    id: 'affordable-luxury',
    title: 'Affordable Luxury',
    description:
      "Exceptional fragrances shouldn't come with an extraordinary price. We believe everyone deserves luxury.",
    icon: 'Gem' as const,
  },
  {
    id: 'every-personality',
    title: 'Designed For Every Personality',
    description:
      'Fresh, fruity, floral, musky, woody, and oud-based fragrances crafted for every mood and every occasion.',
    icon: 'Heart' as const,
  },
] as const;

export const whyChoose = {
  eyebrow: 'THE i-BAN DIFFERENCE',
  heading: 'Why Thousands Choose i-BAN',
  description:
    'Every fragrance is thoughtfully blended to provide exceptional quality, impressive longevity, and luxurious character.',
  features: [
    {
      id: 'edp',
      title: 'Premium Eau de Parfum',
      description: 'Concentrated compositions designed for refined, lasting presence.',
      icon: 'Droplets' as const,
    },
    {
      id: 'longevity',
      title: 'Long Lasting Performance',
      description: 'Scents that open beautifully and linger through your day.',
      icon: 'Clock' as const,
    },
    {
      id: 'ingredients',
      title: 'Carefully Selected Ingredients',
      description: 'Premium notes chosen for balance, elegance, and character.',
      icon: 'Leaf' as const,
    },
    {
      id: 'bottle',
      title: 'Elegant Bottle Design',
      description: 'Minimal, stylish packaging that feels as premium as the scent.',
      icon: 'Package' as const,
    },
    {
      id: 'affordable',
      title: 'Affordable Luxury',
      description: 'High-end fragrance experience at an accessible everyday price.',
      icon: 'BadgeIndianRupee' as const,
    },
    {
      id: 'everyday',
      title: 'Perfect Everyday Companion',
      description: 'Compact 20 ml bottles made for daily wear and thoughtful gifting.',
      icon: 'Sparkle' as const,
    },
  ],
} as const;

export const fragranceCategories = [
  {
    id: 'fresh-fruity-musky',
    category: 'Fresh Fruity Musky',
    products: ['ORIS'],
    description:
      'A refreshing combination of citrus freshness, tropical fruits, elegant florals, smooth sandalwood, and soft musk.',
    images: ['/images/product_images/ORIS_PERFUME.png'],
    href: '/#featured',
  },
  {
    id: 'fresh-floral',
    category: 'Fresh Floral',
    products: ['From Heavens'],
    description:
      'Fresh citrus opening blended with calming lavender, romantic rose, warm vanilla, and deep oud for a heavenly experience.',
    images: ['/images/product_images/FROM_HEAVENS_PERFUME.png'],
    href: '/#featured',
  },
  {
    id: 'fruity-floral',
    category: 'Fruity Floral',
    products: ['Royal Berry', 'Hala Paris'],
    description:
      'Bright fruits meet elegant florals with soft sweet accords, creating playful yet sophisticated everyday fragrances.',
    images: [
      '/images/product_images/ROYAL_BERRY_PERFUME.png',
      '/images/product_images/HALA_PARIS_PERFUME.png',
    ],
    href: '/#featured',
  },
  {
    id: 'oud-leathery',
    category: 'Oud Leathery',
    products: ['MARJ'],
    description:
      'Rich oud layered with honey, saffron, luxurious leather, and soft musk for a bold and unforgettable signature scent.',
    images: ['/images/product_images/MIRAJ_PERFUME.png'],
    href: '/#featured',
  },
] as const;

export const craftsmanshipSteps = [
  {
    id: 'ingredients',
    step: '01',
    title: 'Premium Ingredients',
    description: 'Only carefully selected fragrance notes.',
  },
  {
    id: 'blending',
    step: '02',
    title: 'Expert Blending',
    description: 'Balanced compositions crafted with precision.',
  },
  {
    id: 'bottling',
    step: '03',
    title: 'Elegant Bottling',
    description: 'Minimal, stylish, premium packaging.',
  },
  {
    id: 'signature',
    step: '04',
    title: 'Your Signature Fragrance',
    description: 'A fragrance that becomes part of your identity.',
  },
] as const;

export const brandValues = [
  {
    id: 'elegance',
    title: 'Elegance',
    description: 'Refined compositions and quiet luxury in every detail.',
    icon: 'Crown' as const,
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Premium ingredients and careful craftsmanship, always.',
    icon: 'Award' as const,
  },
  {
    id: 'confidence',
    title: 'Confidence',
    description: 'Fragrances that help you show up as your best self.',
    icon: 'Shield' as const,
  },
  {
    id: 'authenticity',
    title: 'Authenticity',
    description: 'Honest luxury—beautiful scents without the markup.',
    icon: 'Fingerprint' as const,
  },
] as const;

export const customerExperience = {
  eyebrow: 'THE EXPERIENCE',
  heading: 'Made To Leave A Lasting Impression',
  content:
    'Every fragrance we create is designed to inspire confidence, celebrate individuality, and leave memorable impressions wherever you go.',
} as const;

export const aboutCta = {
  heading: 'Find Your Signature Fragrance',
  description:
    'Explore the i-BAN collection and discover premium fragrances crafted to suit every personality and every occasion.',
  primaryCta: { label: 'Shop Collection', href: '/#featured' },
  secondaryCta: { label: 'Contact Us', href: '/#contact' },
} as const;

export const aboutPageSeo = {
  title: 'About Us',
  description:
    'Discover the story of i-BAN Perfumes — premium Eau de Parfum crafted for everyday luxury. Learn our philosophy, fragrance categories, and why thousands choose i-BAN.',
} as const;
