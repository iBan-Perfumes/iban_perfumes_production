import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { fragranceCategories } from '@/lib/about-content';

export function FragranceCategories() {
  return (
    <section
      id="fragrance-categories"
      className="bg-stone-50 py-24"
      aria-labelledby="fragrance-categories-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            SIGNATURE LINE
          </p>
          <h2
            id="fragrance-categories-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Our Fragrance Collection
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-500">
            Four fragrance families, five signature scents—crafted for every
            mood and every occasion.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {fragranceCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 120}>
              <a
                href={cat.href}
                className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
              >
                <div
                  className={`relative bg-stone-100 ${
                    cat.images.length > 1 ? 'grid grid-cols-2' : ''
                  }`}
                >
                  {cat.images.map((src, imgIndex) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`${cat.products[imgIndex] ?? cat.products[0]} perfume bottle`}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <div className="p-6 sm:p-8">
                  <p className="mb-2 text-xs tracking-[0.3em] text-amber-700">
                    {cat.category.toUpperCase()}
                  </p>
                  <h3 className="mb-3 font-serif text-2xl text-stone-900">
                    {cat.products.join(' · ')}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {cat.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
