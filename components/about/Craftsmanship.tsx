'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { craftsmanshipSteps } from '@/lib/about-content';

export function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 40%'],
  });
  const progress = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="bg-white py-24"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            HOW WE CREATE
          </p>
          <h2
            id="craftsmanship-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            Our Craftsmanship
          </h2>
          <p className="mx-auto mt-4 max-w-md text-stone-500">
            From carefully chosen notes to the bottle in your hand—four steps of
            refined craft.
          </p>
        </Reveal>

        <div className="relative">
          <div
            className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-stone-200 sm:left-1/2 sm:-translate-x-px"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[1.15rem] top-3 w-px origin-top bg-amber-600 sm:left-1/2 sm:-translate-x-px"
            style={{
              height: 'calc(100% - 1.5rem)',
              scaleY: progress,
            }}
            aria-hidden="true"
          />

          <ol className="relative space-y-12">
            {craftsmanshipSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <li key={step.id} className="relative">
                  <Reveal delay={i * 100}>
                    <div
                      className={`flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-center sm:gap-10 ${
                        isEven ? '' : 'sm:[&>*:first-child]:order-2'
                      }`}
                    >
                      <div
                        className={`${
                          isEven ? 'sm:text-right sm:pr-10' : 'sm:pl-10'
                        } pl-12 sm:pl-0`}
                      >
                        <p className="mb-2 text-xs tracking-[0.3em] text-amber-700">
                          STEP {step.step}
                        </p>
                        <h3 className="mb-2 font-serif text-2xl text-stone-900">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-stone-500">
                          {step.description}
                        </p>
                      </div>
                      <div className="hidden sm:block" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-200 bg-white text-xs font-semibold text-amber-700 sm:left-1/2 sm:-translate-x-1/2"
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
