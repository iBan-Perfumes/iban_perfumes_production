import { Reveal } from './Reveal';

interface Product {
  name: string;
  note: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    name: 'Velvet Oud',
    note: 'Amber · Oud · Saffron',
    price: '₹4,800',
    image: 'https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
  {
    name: 'Rose Élixir',
    note: 'Damask Rose · Musk',
    price: '₹4,200',
    image: 'https://images.pexels.com/photos/21308575/pexels-photo-21308575.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
  {
    name: 'Citrus Noir',
    note: 'Bergamot · Cedar · Vetiver',
    price: '₹3,900',
    image: 'https://images.pexels.com/photos/21008941/pexels-photo-21008941.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
  {
    name: 'Blanc Lumière',
    note: 'Jasmine · White Tea',
    price: '₹4,500',
    image: 'https://images.pexels.com/photos/12402366/pexels-photo-12402366.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
  {
    name: "Nuit d'Or",
    note: 'Vanilla · Patchouli · Incense',
    price: '₹5,200',
    image: 'https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
  {
    name: 'Fleur Sauvage',
    note: 'Tuberose · Orange Blossom',
    price: '₹4,300',
    image: 'https://images.pexels.com/photos/13875783/pexels-photo-13875783.jpeg?auto=compress&cs=tinysrgb&h=700&w=500',
  },
];

export function Collection() {
  return (
    <section id="collection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">SIGNATURE LINE</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-900">The Collection</h2>
          <p className="text-stone-500 mt-4 max-w-lg mx-auto">
            Six compositions, each a world of its own. Find the one that tells your story.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <article className="glass-card group h-full">
                <div className="relative overflow-hidden rounded-t-2xl aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl text-stone-900 mb-1">{p.name}</h3>
                  <p className="text-stone-400 text-xs tracking-widest mb-3">{p.note}</p>
                  <p className="text-amber-700 font-medium">{p.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
