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
