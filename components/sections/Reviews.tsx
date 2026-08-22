'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { reviews } from '@/lib/reviews';

const EDGE = 2;
const GAP = 24;

const btnBase =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border-2 bg-transparent transition-colors disabled:pointer-events-none';

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > EDGE);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - EDGE);

    const card = track.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const step = card.offsetWidth + GAP;
    const index = Math.round(scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(reviews.length - 1, index)));
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
    const amount = card ? card.offsetWidth + GAP : track.clientWidth * 0.7;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const step = card.offsetWidth + GAP;
    track.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  return (
    <section
      id="reviews"
      className="collection-section relative overflow-hidden py-24 sm:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-12 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            WHAT THEY&apos;RE SAYING
          </p>
          <h2
            id="reviews-heading"
            className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl"
          >
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-500">
            Lasting scent, everyday luxury — in the words of those who wear
            i-BAN.
          </p>
        </Reveal>

        <div>
          <div
            ref={trackRef}
            data-lenis-prevent-horizontal
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-none"
          >
            {reviews.map((review, i) => (
              <article
                key={`${review.name}-${i}`}
                data-card
                className="w-[90%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2.05)] lg:w-[calc((100%-3rem)/3.15)]"
              >
                <div className="flex h-full flex-col rounded-xl border border-stone-200 bg-white/80 p-6 shadow-sm">
                  <Quote
                    className="h-8 w-8 text-amber-700/40"
                    aria-hidden="true"
                  />
                  <p className="mt-3 flex-1 text-base leading-relaxed text-stone-700">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s < review.rating
                            ? 'fill-amber-600 text-amber-600'
                            : 'fill-transparent text-stone-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="mt-5 border-t border-stone-200 pt-5">
                    <p className="text-sm font-semibold text-stone-900">
                      {review.name}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
              className={`${btnBase} ${
                canScrollLeft
                  ? 'border-stone-900 text-stone-900 hover:border-amber-700 hover:bg-amber-700 hover:text-white'
                  : 'border-stone-300 text-stone-300'
              }`}
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            <div
              className="flex items-center gap-1.5 px-1 lg:hidden"
              role="tablist"
              aria-label="Review slides"
            >
              {reviews.map((review, i) => (
                <button
                  key={`${review.name}-dot-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to review ${i + 1} of ${reviews.length}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 bg-amber-700'
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next review"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
              className={`${btnBase} ${
                canScrollRight
                  ? 'border-stone-900 text-stone-900 hover:border-amber-700 hover:bg-amber-700 hover:text-white'
                  : 'border-stone-300 text-stone-300'
              }`}
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
