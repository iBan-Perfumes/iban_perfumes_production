'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { AboutTopBar } from '@/components/about/AboutTopBar';
import { aboutHero, heroParticles } from '@/lib/about-content';

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 120]
  );

  return (
    <section
      ref={sectionRef}
      data-site-hero
      className="relative flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-stone-900"
      aria-labelledby="about-hero-heading"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y }}
      >
        <Image
          src={aboutHero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/55 to-stone-900/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-stone-900/30"
        aria-hidden="true"
      />

      {!reduceMotion &&
        heroParticles.map((p, i) => (
          <span
            key={i}
            className="about-particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
            aria-hidden="true"
          />
        ))}

      <AboutTopBar />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 sm:pb-28 sm:pt-44">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-xs tracking-[0.4em] text-amber-300">
            {aboutHero.eyebrow}
          </p>
          <h1
            id="about-hero-heading"
            className="mb-6 font-tenor text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {aboutHero.heading}
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
            {aboutHero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={aboutHero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-600"
            >
              {aboutHero.primaryCta.label}
            </a>
            <a
              href={aboutHero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
            >
              {aboutHero.secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
