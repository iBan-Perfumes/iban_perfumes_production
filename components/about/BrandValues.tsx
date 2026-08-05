import {
  Award,
  Crown,
  Fingerprint,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { brandValues } from '@/lib/about-content';

const icons: Record<(typeof brandValues)[number]['icon'], LucideIcon> = {
  Crown,
  Award,
  Shield,
  Fingerprint,
};

export function BrandValues() {
  return (
    <section
      id="brand-values"
      className="bg-stone-50 py-24"
      aria-labelledby="brand-values-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            WHAT WE STAND FOR
          </p>
          <h2
            id="brand-values-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Brand Values
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brandValues.map((value, i) => {
            const Icon = icons[value.icon];
            return (
              <Reveal key={value.id} delay={i * 100}>
                <article className="glass-card group h-full p-7 text-center transition-transform duration-500 hover:-translate-y-2">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50 transition-colors duration-500 group-hover:bg-amber-100">
                    <Icon size={24} className="text-amber-700" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-serif text-xl text-stone-900">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
