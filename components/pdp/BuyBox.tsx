'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import {
  getWhatsAppOrderUrl,
  isWhatsAppConfigured,
} from '@/lib/whatsapp';

export function BuyBox({ product }: { product: CatalogProduct }) {
  const [qty, setQty] = useState(1);
  const waUrl = getWhatsAppOrderUrl(product.name, qty);
  const canBuy = isWhatsAppConfigured() && Boolean(waUrl);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(20, q + 1));

  const buyClassName =
    'inline-flex flex-1 items-center justify-center bg-stone-900 px-8 py-3.5 text-xs tracking-[0.25em] text-white uppercase transition-colors duration-300 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-900';

  return (
    <div className="flex flex-col">
      <p className="text-xs tracking-[0.35em] text-amber-700 uppercase mb-3">
        {product.family}
      </p>
      <h1 className="font-tenor text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
        {product.name}
      </h1>
      <p className="mt-4 text-stone-500 leading-relaxed max-w-md">
        {product.shortDescription}
      </p>

      <p className="mt-8 font-serif text-2xl text-amber-700">{product.price}</p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-b border-stone-200 py-6">
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">Volume</dt>
          <dd className="mt-1 text-stone-800">{product.volume}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Fragrance Family
          </dt>
          <dd className="mt-1 text-stone-800">{product.family}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">Character</dt>
          <dd className="mt-1 text-stone-800">{product.character}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Availability
          </dt>
          <dd className="mt-1 text-stone-800">{product.availability}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="inline-flex items-center border border-stone-300"
          role="group"
          aria-label="Quantity"
        >
          <button
            type="button"
            onClick={dec}
            aria-label="Decrease quantity"
            className="h-12 w-12 text-stone-700 hover:bg-stone-50 transition-colors"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-sm tracking-widest" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={inc}
            aria-label="Increase quantity"
            className="h-12 w-12 text-stone-700 hover:bg-stone-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {canBuy && waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buyClassName}
          >
            Buy Now
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-label="WhatsApp number not configured"
            className={buyClassName}
          >
            Buy Now
          </button>
        )}
        <Link
          href="/collection"
          className="inline-flex flex-1 items-center justify-center border border-stone-900 px-8 py-3.5 text-xs tracking-[0.25em] text-stone-900 uppercase transition-colors duration-300 hover:border-amber-700 hover:text-amber-700"
        >
          Explore Collection
        </Link>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-stone-500 border-t border-stone-100 pt-6">
        {product.story}
      </p>
    </div>
  );
}
