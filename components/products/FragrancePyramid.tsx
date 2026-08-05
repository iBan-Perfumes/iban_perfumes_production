import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog';

interface FragrancePyramidProps {
  product: CatalogProduct;
}

export function FragrancePyramid({ product }: FragrancePyramidProps) {
  const layers = [
    { label: 'Top Notes', notes: product.notePyramid.top },
    { label: 'Heart Notes', notes: product.notePyramid.heart },
    { label: 'Base Notes', notes: product.notePyramid.base },
  ];

  return (
    <section
      className="bg-stone-50 py-20"
      aria-labelledby="fragrance-notes-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            THE COMPOSITION
          </p>
          <h2
            id="fragrance-notes-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Fragrance Notes
          </h2>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
              <Image
                src={product.notesImage}
                alt={`${product.name} fragrance notes reference`}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="space-y-8">
              {layers.map((layer) => (
                <div key={layer.label}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                    {layer.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {layer.notes.map((note) => (
                      <li
                        key={note}
                        className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-950"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
