import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog-types';

function splitIntoColumns(products: CatalogProduct[], columnCount: number) {
  const columns: CatalogProduct[][] = Array.from({ length: columnCount }, () => []);
  products.forEach((product, index) => {
    columns[index % columnCount].push(product);
  });
  return columns;
}

const COLUMN_META = [
  { direction: 'up' as const, durationClass: 'collection-gallery-track--dur-1' },
  { direction: 'down' as const, durationClass: 'collection-gallery-track--dur-2' },
  { direction: 'up' as const, durationClass: 'collection-gallery-track--dur-3' },
];

export function Collection({ products }: { products: CatalogProduct[] }) {
  const available = products.filter((p) => p.available);
  const columns = splitIntoColumns(available, 3);
  const fragranceCount = String(available.length).padStart(2, '0');

  return (
    <section id="collection" className="collection-section relative overflow-hidden py-28 lg:py-32">
      <div className="collection-section-glow" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-6">
          <Reveal direction="left">
            <div className="relative z-10 max-w-lg">
              <span
                className="pointer-events-none absolute -left-4 top-8 select-none font-tenor text-[7rem] leading-none text-stone-900/[0.04] sm:text-[9rem] lg:-left-8 lg:text-[11rem]"
                aria-hidden="true"
              >
                i-BAN
              </span>

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-amber-700/70" aria-hidden="true" />
                  <p className="text-xs tracking-[0.4em] text-amber-700">SIGNATURE LINE</p>
                </div>

                <h2 className="mb-6 font-tenor text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl">
                  The Collection
                </h2>

                <p className="mb-4 leading-relaxed text-stone-600">
                  Discover the i-BAN signature collection — distinctive fragrances crafted to
                  express different moods, personalities, and moments.
                </p>
                <p className="mb-8 leading-relaxed text-stone-500">
                  From fresh and floral compositions to rich, woody and sensual blends, find a
                  fragrance that feels uniquely yours.
                </p>

                <Link
                  href="/collection"
                  className="group inline-flex items-center gap-2 text-sm font-medium tracking-[0.12em] text-amber-800 transition-colors hover:text-amber-950"
                >
                  Explore the Collection
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <div className="mt-12 flex gap-10 border-t border-stone-900/10 pt-8">
                  <div>
                    <p className="font-tenor text-3xl text-stone-900">{fragranceCount}</p>
                    <p className="mt-1 text-[11px] tracking-[0.22em] text-stone-500 uppercase">
                      Signature Fragrances
                    </p>
                  </div>
                  <div>
                    <p className="font-tenor text-3xl text-stone-900">01</p>
                    <p className="mt-1 text-[11px] tracking-[0.22em] text-stone-500 uppercase">
                      Unique Expression
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="collection-gallery">
              <div className="collection-gallery-columns">
                {columns.map((columnProducts, columnIndex) => {
                  const loop = [...columnProducts, ...columnProducts];
                  const meta = COLUMN_META[columnIndex];

                  return (
                    <div key={columnIndex} className="collection-gallery-column">
                      <div
                        className={`collection-gallery-track collection-gallery-track--${meta.direction} ${meta.durationClass}`}
                        style={{ animationDelay: `${columnIndex * -3.5}s` }}
                      >
                        {loop.map((product, imageIndex) => (
                          <Link
                            key={`${product.slug}-${imageIndex}`}
                            href={`/products/${product.slug}`}
                            className="collection-gallery-item"
                            tabIndex={imageIndex < columnProducts.length ? 0 : -1}
                            aria-label={`View ${product.name}`}
                          >
                            <Image
                              src={product.perfumeImage}
                              alt={`${product.name} perfume bottle`}
                              width={460}
                              height={600}
                              sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 240px"
                              className="collection-gallery-image"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
