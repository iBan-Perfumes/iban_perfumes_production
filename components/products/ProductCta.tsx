'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import type { CatalogProduct } from '@/lib/catalog';
import { getWhatsAppBuyUrl, isWhatsAppConfigured } from '@/lib/whatsapp';

interface ProductCtaProps {
  product: CatalogProduct;
}

export function ProductCta({ product }: ProductCtaProps) {
  const reduceMotion = useReducedMotion();
  const whatsappUrl = getWhatsAppBuyUrl(product.name);
  const canBuy = isWhatsAppConfigured() && Boolean(whatsappUrl);

  return (
    <section
      className="relative overflow-hidden bg-stone-900 py-24"
      aria-labelledby="product-cta-heading"
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
            id="product-cta-heading"
            className="mb-5 font-tenor text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready to Experience Luxury?
          </h2>
          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-stone-400">
            Make {product.name} your signature scent — or continue exploring the
            full i-BAN collection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {canBuy ? (
              <a
                href={whatsappUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-700 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-600"
              >
                Buy Now
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-label="WhatsApp number not configured"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-stone-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300"
              >
                Buy Now
              </button>
            )}
            <Link
              href="/collection"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/45 hover:bg-white/10"
            >
              Explore Collection
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
