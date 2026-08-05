import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog';

interface ProductStoryProps {
  product: CatalogProduct;
}

export function ProductStory({ product }: ProductStoryProps) {
  return (
    <section
      className="bg-gradient-to-br from-amber-50 via-white to-stone-50 py-24"
      aria-labelledby="product-story-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            THE STORY
          </p>
          <h2
            id="product-story-heading"
            className="mb-8 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            {product.name}
          </h2>
          <p className="font-serif text-xl italic leading-relaxed text-stone-600 sm:text-2xl">
            {product.story}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
