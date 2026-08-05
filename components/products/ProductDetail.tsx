'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { CatalogProduct } from '@/lib/catalog';
import { getWhatsAppBuyUrl, isWhatsAppConfigured } from '@/lib/whatsapp';
import { Reveal } from '@/components/ui/Reveal';

interface ProductDetailProps {
  product: CatalogProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const whatsappUrl = getWhatsAppBuyUrl(product.name);
  const canBuy = isWhatsAppConfigured() && Boolean(whatsappUrl);

  return (
    <section className="bg-stone-50 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/collection"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 transition-colors hover:text-amber-700"
        >
          <ArrowLeft size={14} aria-hidden />
          Back to Collection
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
                <Image
                  src={product.perfumeImage}
                  alt={`${product.name} perfume bottle`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md">
                <Image
                  src={product.notesImage}
                  alt={`${product.name} fragrance notes`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div>
              <p className="mb-3 text-xs tracking-[0.4em] text-amber-700">
                {product.category.toUpperCase()}
              </p>
              <h1 className="mb-3 font-tenor text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mb-2 text-lg text-stone-500">{product.character}</p>
              <p className="mb-8 text-2xl font-medium text-amber-700">
                {product.price}
                <span className="ml-2 text-sm font-normal tracking-wide text-stone-400">
                  · 20 ml EDP
                </span>
              </p>
              <p className="mb-8 max-w-lg leading-relaxed text-stone-600">
                {product.description}
              </p>

              <div className="mb-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Fragrance Notes
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Notes">
                  {product.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-900"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {canBuy ? (
                  <a
                    href={whatsappUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-amber-700 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-amber-600"
                  >
                    Buy Now on WhatsApp
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label="WhatsApp number not configured"
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-stone-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500"
                  >
                    Buy Now on WhatsApp
                  </button>
                )}
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center rounded-full border border-stone-900 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
