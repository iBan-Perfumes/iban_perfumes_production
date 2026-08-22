import { Reveal } from '@/components/ui/Reveal';
import { Featured } from '@/components/sections/Featured';
import type { FeaturedPerfume } from '@/lib/featured-perfumes';

export function FragranceCategories({
  items,
}: {
  items: FeaturedPerfume[];
}) {
  return (
    <section
      id="fragrance-categories"
      className="bg-stone-50 py-24"
      aria-labelledby="fragrance-categories-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 text-center sm:mb-12">
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
      </div>

      <Featured items={items} showHeading={false} embedded />
    </section>
  );
}
