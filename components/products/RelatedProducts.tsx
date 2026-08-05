import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog';

interface RelatedProductsProps {
  products: CatalogProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section
      className="bg-white py-20"
      aria-labelledby="related-products-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            CONTINUE EXPLORING
          </p>
          <h2
            id="related-products-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            You May Also Like
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image
                    src={product.perfumeImage}
                    alt={`${product.name} perfume bottle`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-stone-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-amber-700">
                    {product.price}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-stone-900 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  >
                    View
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
