import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { catalogProducts } from '@/lib/catalog';

export function Collection() {
  const products = catalogProducts.filter((p) => p.available);

  return (
    <section id="collection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">SIGNATURE LINE</p>
          <h2 className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            The Collection
          </h2>
          <p className="text-stone-500 mt-4 max-w-lg mx-auto">
            Each composition a world of its own. Find the one that tells your story.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <article className="glass-card group h-full">
                <Link href={`/products/${p.slug}`} className="block h-full">
                  <div className="relative overflow-hidden rounded-t-2xl aspect-[4/5]">
                    <Image
                      src={p.perfumeImage}
                      alt={`${p.name} perfume bottle`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl text-stone-900 mb-1">{p.name}</h3>
                    <p className="text-stone-400 text-xs tracking-widest mb-3">{p.character}</p>
                    <p className="text-amber-700 font-medium">{p.price}</p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
