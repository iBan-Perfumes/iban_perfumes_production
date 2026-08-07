'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const select = (index: number) => {
    if (index === active || images.length === 0) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 180);
  };

  const goPrev = () => {
    select((active - 1 + images.length) % images.length);
  };

  const goNext = () => {
    select((active + 1) % images.length);
  };

  const current = images[active] ?? images[0];
  const showNav = images.length > 1;

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-start lg:gap-4">
      <ul
        className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
        role="list"
        aria-label="Product images"
      >
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0">
            <button
              type="button"
              onClick={() => select(i)}
              aria-label={`View ${img.alt}`}
              aria-current={i === active ? 'true' : undefined}
              className={`relative h-16 w-16 overflow-hidden rounded-xl border transition-colors duration-300 sm:h-[4.5rem] sm:w-[4.5rem] ${
                i === active
                  ? 'border-stone-900'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="group relative aspect-[4/5] w-full flex-1 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
        {current && (
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {showNav && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-stone-900 shadow-sm transition-colors hover:bg-white sm:left-3"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-stone-900 shadow-sm transition-colors hover:bg-white sm:right-3"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
