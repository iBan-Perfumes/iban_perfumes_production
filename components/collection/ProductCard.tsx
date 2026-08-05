'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import { getWhatsAppBuyUrl, isWhatsAppConfigured } from '@/lib/whatsapp';

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = getWhatsAppBuyUrl(product.name);
  const canBuy = isWhatsAppConfigured() && Boolean(whatsappUrl);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Image
          src={product.perfumeImage}
          alt={`${product.name} perfume bottle`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
        />
        <Image
          src={product.notesImage}
          alt={`${product.name} fragrance notes`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-700">
          {product.category}
        </p>
        <h3 className="font-serif text-xl text-stone-900">{product.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{product.character}</p>
        <p className="mt-3 text-sm font-medium text-amber-700">{product.price}</p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-stone-900 bg-transparent px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
          >
            View
          </Link>
          {canBuy ? (
            <a
              href={whatsappUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-amber-600"
            >
              Buy Now
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-label="WhatsApp number not configured"
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-stone-300 px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-500"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
