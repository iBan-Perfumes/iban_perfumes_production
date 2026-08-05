'use client';

import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { collectionCta } from '@/lib/collection-content';
import { scrollToId } from '@/lib/scroll';

export function CollectionCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-stone-900 py-24"
      aria-labelledby="collection-cta-heading"
    >
      {!reduceMotion && (
        <div
          className="about-cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,83,9,0.35)_0%,transparent_68%)] blur-2xl"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2
            id="collection-cta-heading"
            className="mb-5 font-tenor text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {collectionCta.heading}
          </h2>
          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-stone-400">
            {collectionCta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={collectionCta.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-600"
            >
              {collectionCta.primaryCta.label}
            </a>
            <button
              type="button"
              onClick={() => scrollToId('browse')}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/45 hover:bg-white/10"
            >
              {collectionCta.secondaryCta.label}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
