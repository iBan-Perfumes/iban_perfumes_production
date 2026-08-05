import {
  Award,
  Fingerprint,
  Gem,
  Heart,
  Sparkles,
  Timer,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { whyYouLoveIt } from '@/lib/product-page-content';

const icons: Record<(typeof whyYouLoveIt)[number]['icon'], LucideIcon> = {
  Award,
  Timer,
  Sparkles,
  Gem,
  Heart,
  Fingerprint,
};

export function WhyYouLoveIt() {
  return (
    <section
      className="bg-white py-20"
      aria-labelledby="why-love-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            MADE TO IMPRESS
          </p>
          <h2
            id="why-love-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Why You&apos;ll Love It
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyYouLoveIt.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.id} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-stone-200 bg-stone-50/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-amber-50 transition-colors group-hover:bg-amber-100">
                    <Icon size={20} className="text-amber-700" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-medium text-stone-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {item.description}
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
