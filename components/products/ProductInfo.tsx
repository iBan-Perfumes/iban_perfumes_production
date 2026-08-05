import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog';
import { SITE_NAME } from '@/lib/site';

interface ProductInfoProps {
  product: CatalogProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rows = [
    { label: 'Brand', value: SITE_NAME },
    { label: 'Format', value: 'EDP' },
    { label: 'Volume', value: '20 ml' },
    { label: 'Category', value: product.category },
    { label: 'Character', value: product.character },
    { label: 'Price', value: product.price },
  ];

  return (
    <section
      className="bg-stone-50 py-20"
      aria-labelledby="product-info-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            SPECIFICATIONS
          </p>
          <h2
            id="product-info-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Product Information
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <dl className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 gap-4 px-6 py-4 sm:px-8 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-stone-50/80'
                } ${i < rows.length - 1 ? 'border-b border-stone-100' : ''}`}
              >
                <dt className="text-sm font-medium tracking-wide text-stone-500">
                  {row.label}
                </dt>
                <dd className="text-right text-sm font-medium text-stone-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
