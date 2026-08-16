'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import {
  getWhatsAppOrderUrl,
  isWhatsAppConfigured,
} from '@/lib/whatsapp';

function formatRupee(value: number) {
  return `₹${value}`;
}

function effectivePrice(mrp: number, offerPrice: number | null | undefined) {
  return offerPrice != null && offerPrice > 0 ? offerPrice : mrp;
}

export function BuyBox({ product }: { product: CatalogProduct }) {
  const hasVariants = product.variants.length > 0;
  const [selectedId, setSelectedId] = useState(
    () => product.variants[0]?.id ?? ''
  );
  const [qty, setQty] = useState(1);

  const selected = useMemo(() => {
    if (!hasVariants) return null;
    return (
      product.variants.find((v) => v.id === selectedId) ?? product.variants[0]
    );
  }, [hasVariants, product.variants, selectedId]);

  const unitPrice = selected
    ? effectivePrice(selected.mrp, selected.offerPrice)
    : product.priceValue;
  const total = unitPrice * qty;
  const showOffer =
    selected != null &&
    selected.offerPrice != null &&
    selected.offerPrice > 0 &&
    selected.offerPrice < selected.mrp;

  const waUrl = getWhatsAppOrderUrl(
    product.name,
    qty,
    selected
      ? {
          variantName: selected.name,
          unitPrice,
          total,
          mrp: selected.mrp,
          offerPrice: selected.offerPrice,
        }
      : undefined
  );
  const canBuy = isWhatsAppConfigured() && Boolean(waUrl);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(20, q + 1));

  const buyClassName =
    'inline-flex flex-1 items-center justify-center bg-stone-900 px-8 py-3.5 text-xs tracking-[0.25em] text-white uppercase transition-colors duration-300 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-900';

  const volumeLabel = selected?.name ?? product.volume;

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

      {hasVariants && (
        <div className="mt-8">
          <p className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Size
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Select size"
          >
            {product.variants.map((v) => {
              const active = (selected?.id ?? '') === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedId(v.id)}
                  aria-pressed={active}
                  className={`min-w-[4.5rem] border px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? 'border-amber-700 text-amber-800 bg-amber-50'
                      : 'border-stone-300 text-stone-700 hover:border-stone-500'
                  }`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        {hasVariants && selected ? (
          <div className="flex flex-wrap items-baseline gap-3">
            {showOffer ? (
              <>
                <span className="font-price text-2xl font-light tracking-tight text-amber-700 sm:text-3xl">
                  {formatRupee(selected.offerPrice!)}
                </span>
                <span className="font-price text-sm font-light text-black line-through sm:text-base">
                  {formatRupee(selected.mrp)}
                </span>
              </>
            ) : (
              <span className="font-price text-2xl font-light tracking-tight text-amber-700 sm:text-3xl">
                {formatRupee(selected.mrp)}
              </span>
            )}
          </div>
        ) : (
          <p className="font-price text-2xl font-light tracking-tight text-amber-700 sm:text-3xl">
            {product.price}
          </p>
        )}
        {qty > 1 && (
          <p className="font-price mt-2 text-sm text-stone-500">
            Total {formatRupee(total)}
          </p>
        )}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-b border-stone-200 py-6">
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Volume
          </dt>
          <dd className="mt-1 text-stone-800">{volumeLabel}</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Fragrance Family
          </dt>
          <dd className="mt-1 text-stone-800">
            {(product.categories?.length
              ? product.categories
              : [product.family]
            ).join(', ')}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">
            Character
          </dt>
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
          <span
            className="min-w-[3rem] text-center text-sm tracking-widest"
            aria-live="polite"
          >
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
