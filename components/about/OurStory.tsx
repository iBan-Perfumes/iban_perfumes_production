'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ourStory } from '@/lib/about-content';

export function OurStory() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'center center'],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
      : ['inset(12% 12% 12% 12%)', 'inset(0% 0% 0% 0%)']
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.08, 1]
  );

  return (
    <section
      id="our-story"
      className="bg-white py-24"
      aria-labelledby="our-story-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={imageRef} className="relative mx-auto w-full max-w-md">
            <motion.div
              style={{ clipPath, scale }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 shadow-xl will-change-transform"
            >
              <Image
                src={ourStory.image}
                alt={ourStory.imageAlt}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-lg border border-amber-200"
              aria-hidden="true"
            />
            <div
              className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full border border-stone-200"
              aria-hidden="true"
            />
          </div>

          <Reveal direction="right" delay={100}>
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
                {ourStory.eyebrow}
              </p>
              <h2
                id="our-story-heading"
                className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
              >
                {ourStory.heading}
              </h2>
              <div className="space-y-5">
                {ourStory.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="leading-relaxed text-stone-500">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
