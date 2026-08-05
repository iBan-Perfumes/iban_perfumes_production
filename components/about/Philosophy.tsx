import { Gem, Heart, Sparkles, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { philosophyCards } from '@/lib/about-content';

const icons: Record<(typeof philosophyCards)[number]['icon'], LucideIcon> = {
  Sparkles,
  Gem,
  Heart,
};

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="bg-stone-50 py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            WHAT WE BELIEVE
          </p>
          <h2
            id="philosophy-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Our Philosophy
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-500">
            Three principles guide every fragrance we create.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {philosophyCards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.id} delay={i * 120}>
                <article className="glass-card group h-full p-8 text-center transition-transform duration-500 hover:-translate-y-2">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-200 bg-amber-50 transition-colors duration-500 group-hover:bg-amber-100">
                    <Icon size={28} className="text-amber-700" aria-hidden />
                  </div>
                  <h3 className="mb-3 font-serif text-2xl text-stone-900">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {card.description}
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
