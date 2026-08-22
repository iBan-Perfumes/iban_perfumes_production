'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

export function HomeCta() {
  const reduceMotion = useReducedMotion();
  const motionClass = reduceMotion
    ? 'transition-colors'
    : 'transition-all duration-300 hover:scale-[1.02]';

  return (
    <section
      className="relative overflow-hidden bg-stone-900 py-20 sm:py-24 lg:py-28"
      aria-labelledby="home-cta-heading"
    >
      {!reduceMotion && (
        <div
          className="about-cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,83,9,0.35)_0%,transparent_68%)] blur-2xl"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12 sm:py-16 lg:px-16">
          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-amber-700/70" aria-hidden="true" />
              <p className="text-xs tracking-[0.4em] text-amber-200/90">
                DISCOVER YOUR SIGNATURE SCENT
              </p>
              <span className="h-px w-8 bg-amber-700/70" aria-hidden="true" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="home-cta-heading"
              className="font-tenor text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Find the Fragrance That Defines You.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-stone-400">
              Explore the i-BAN collection and discover a scent crafted to become
              part of your story.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/collection"
                className={`inline-flex w-full items-center justify-center rounded-full bg-amber-700 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-amber-600 sm:w-auto ${motionClass}`}
              >
                Explore Collection
              </Link>
              <Link
                href="/contact"
                className={`inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:border-white/45 hover:bg-white/10 sm:w-auto ${motionClass}`}
              >
                Enquire Now
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
