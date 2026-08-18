import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog-types';
import type { HomeLineup } from '@/lib/home-lineups';

export function FragranceLineup({
  lineup,
  products,
}: {
  lineup: HomeLineup;
  products: CatalogProduct[];
}) {
  const image = (
    <Reveal
      direction={lineup.imageOnLeft ? 'left' : 'right'}
      delay={lineup.imageOnLeft ? 0 : 150}
      className={lineup.imageOnLeft ? undefined : 'order-1 md:order-2'}
    >
      <div className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-xl">
          <Image
            src={lineup.image}
            alt={lineup.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div
          className={
            lineup.imageOnLeft
              ? 'absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-lg border border-amber-200'
              : 'absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-lg border border-amber-200'
          }
        />
      </div>
    </Reveal>
  );

  const copy = (
    <Reveal
      direction={lineup.imageOnLeft ? 'right' : 'left'}
      delay={lineup.imageOnLeft ? 150 : 0}
      className={lineup.imageOnLeft ? undefined : 'order-2 md:order-1'}
    >
      <div>
        <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
          {lineup.eyebrow}
        </p>
        <h2 className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
          {lineup.heading}
        </h2>
        <p className="mb-8 leading-relaxed text-stone-500">{lineup.description}</p>
        <div className={lineup.productGridClass}>
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="glass-card flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <h3 className="font-medium text-stone-900">{product.name}</h3>
                <p className="truncate text-xs tracking-widest text-stone-400">
                  {product.character}
                </p>
              </div>
              <span className="shrink-0 text-sm text-amber-700">Eau de Parfum</span>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );

  return (
    <section id={lineup.id} className={`py-24 ${lineup.backgroundClass}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {lineup.imageOnLeft ? (
            <>
              {image}
              {copy}
            </>
          ) : (
            <>
              {copy}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
