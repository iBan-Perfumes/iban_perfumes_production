import Image from 'next/image';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';

export function RelatedProducts({ products }: { products: CatalogProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="py-20 sm:py-24" aria-labelledby="related-heading">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-amber-700 tracking-[0.4em] text-xs mb-4 text-center">
          CONTINUE EXPLORING
        </p>
        <h2
          id="related-heading"
          className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl text-center mb-12 sm:mb-16"
        >
          You May Also Like
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {products.map((p) => (
            <li key={p.slug}>
              <article className="glass-card group h-full flex flex-col overflow-hidden">
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                    <Image
                      src={p.perfumeImage}
                      alt={`${p.name} perfume bottle`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1 text-center">
                  <h3 className="font-serif text-xl text-stone-900">{p.name}</h3>
                  <p className="font-price text-amber-700 font-medium mt-2">{p.price}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-5 inline-flex items-center justify-center border border-stone-900 px-6 py-2.5 text-[11px] tracking-[0.2em] text-stone-900 uppercase transition-colors duration-300 hover:border-amber-700 hover:text-amber-700"
                  >
                    View
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
