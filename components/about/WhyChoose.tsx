import {
  BadgeIndianRupee,
  Clock,
  Droplets,
  Leaf,
  Package,
  Sparkle,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { whyChoose } from '@/lib/about-content';

const icons: Record<(typeof whyChoose.features)[number]['icon'], LucideIcon> = {
  Droplets,
  Clock,
  Leaf,
  Package,
  BadgeIndianRupee,
  Sparkle,
};

export function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="bg-white py-24"
      aria-labelledby="why-choose-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
                {whyChoose.eyebrow}
              </p>
              <h2
                id="why-choose-heading"
                className="mb-5 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
              >
                {whyChoose.heading}
              </h2>
              <p className="max-w-md leading-relaxed text-stone-500">
                {whyChoose.description}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {whyChoose.features.map((feature, i) => {
              const Icon = icons[feature.icon];
              return (
                <Reveal key={feature.id} delay={i * 80}>
                  <article className="group rounded-2xl border border-stone-200 bg-stone-50/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-amber-50 transition-colors duration-500 group-hover:bg-amber-100">
                      <Icon size={20} className="text-amber-700" aria-hidden />
                    </div>
                    <h3 className="mb-2 font-medium text-stone-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-500">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
