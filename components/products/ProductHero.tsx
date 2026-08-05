'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog';
import { getWhatsAppBuyUrl, isWhatsAppConfigured } from '@/lib/whatsapp';
import { Reveal } from '@/components/ui/Reveal';

interface ProductHeroProps {
  product: CatalogProduct;
}

export function ProductHero({ product }: ProductHeroProps) {
  const reduceMotion = useReducedMotion();
  const images = [
    { src: product.perfumeImage, alt: `${product.name} perfume bottle` },
    { src: product.notesImage, alt: `${product.name} fragrance notes` },
  ];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const whatsappUrl = getWhatsAppBuyUrl(product.name);
  const canBuy = isWhatsAppConfigured() && Boolean(whatsappUrl);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <section className="bg-stone-50 pb-16 pt-28 sm:pt-32" aria-labelledby="product-title">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/collection"
          className="mb-8 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 transition-colors hover:text-amber-700"
        >
          ← Back to Collection
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div>
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg"
                aria-label="Open image lightbox"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={images[active].src}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[active].src}
                      alt={images[active].alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
                {product.badge && active === 0 && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                    {product.badge}
                  </span>
                )}
              </button>

              <div className="mt-4 flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${img.alt}`}
                    aria-current={active === i}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      active === i
                        ? 'border-amber-700 shadow-md'
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div>
              {product.badge && (
                <span className="mb-4 inline-block rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                  {product.badge}
                </span>
              )}
              <p className="mb-3 text-xs tracking-[0.4em] text-amber-700">
                {product.category.toUpperCase()}
              </p>
              <h1
                id="product-title"
                className="mb-4 font-tenor text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl"
              >
                {product.name}
              </h1>
              <p className="mb-4 text-2xl font-medium text-amber-700">
                {product.price}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
                  20 ml
                </span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
                  EDP
                </span>
              </div>
              <p className="mb-4 text-lg text-stone-500">{product.character}</p>
              <p className="mb-10 max-w-lg leading-relaxed text-stone-600">
                {product.heroCopy}
              </p>
              <div className="flex flex-wrap gap-3">
                {canBuy ? (
                  <a
                    href={whatsappUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-amber-700 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-600"
                  >
                    Buy Now
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label="WhatsApp number not configured"
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-stone-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500"
                  >
                    Buy Now
                  </button>
                )}
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center rounded-full border border-stone-900 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 p-6"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Product image"
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            <div
              className="relative h-[min(80vh,720px)] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
