'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredPerfumes } from '@/lib/featured-perfumes';

const EDGE = 2;

export function Featured() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > EDGE);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - EDGE);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(track);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.7;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const btnBase =
    'inline-flex h-14 w-14 items-center justify-center rounded-full border bg-transparent transition-colors disabled:pointer-events-none';

  return (
    <section id="featured" className="bg-white pt-10 pb-10 sm:pt-12 sm:pb-14">
      <div className="mb-10 flex items-center justify-between gap-6 px-5 sm:px-8">
        <h2 className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
          Our Featured Items
        </h2>
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button
            type="button"
            aria-label="Previous fragrances"
            disabled={!canScrollLeft}
            onClick={() => scrollByCard(-1)}
            className={`${btnBase} ${
              canScrollLeft
                ? 'border-stone-900 text-stone-900'
                : 'border-stone-300 text-stone-300'
            }`}
          >
            <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
          </button>
          <button
            type="button"
            aria-label="Next fragrances"
            disabled={!canScrollRight}
            onClick={() => scrollByCard(1)}
            className={`${btnBase} ${
              canScrollRight
                ? 'border-stone-900 text-stone-900'
                : 'border-stone-300 text-stone-300'
            }`}
          >
            <ChevronRight className="h-6 w-6 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-lenis-prevent-horizontal
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pl-5 scrollbar-none scroll-pl-5 sm:pl-8 sm:scroll-pl-8"
      >
        {featuredPerfumes.map((perfume) => (
          <article
            key={perfume.id}
            data-card
            tabIndex={0}
            className="group w-[80%] shrink-0 snap-start outline-none sm:w-[46%] lg:w-[30.5%]"
          >
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <Image
                  src={perfume.perfumeImage}
                  alt={`${perfume.name} perfume bottle`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 30.5vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0 group-focus-within:scale-105 group-focus-within:opacity-0"
                />
                <Image
                  src={perfume.notesImage}
                  alt={`${perfume.name} fragrance notes`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 30.5vw"
                  className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-focus-within:scale-105 group-focus-within:opacity-100"
                />
                {perfume.badge && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                    {perfume.badge}
                  </span>
                )}
              </div>
              <div className="bg-white px-4 py-4 sm:px-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold uppercase text-stone-900">
                    {perfume.name}
                  </h3>
                  <span className="shrink-0 text-sm font-medium text-amber-700">
                    {perfume.price}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
                  {perfume.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
