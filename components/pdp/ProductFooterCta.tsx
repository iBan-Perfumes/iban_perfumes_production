'use client';

import Link from 'next/link';
import {
  getWhatsAppOrderUrl,
  isWhatsAppConfigured,
} from '@/lib/whatsapp';

export function ProductFooterCta({
  productName,
  quantity = 1,
}: {
  productName: string;
  quantity?: number;
}) {
  const waUrl = getWhatsAppOrderUrl(productName, quantity);
  const canBuy = isWhatsAppConfigured() && Boolean(waUrl);

  const buyClassName =
    'inline-flex items-center justify-center bg-stone-900 px-10 py-3.5 text-xs tracking-[0.25em] text-white uppercase transition-colors duration-300 hover:bg-amber-700 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-900';

  return (
    <section className="bg-stone-50 py-20 sm:py-24 border-t border-stone-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">i-BAN PERFUMES</p>
        <h2 className="font-tenor text-3xl sm:text-4xl tracking-tight text-stone-900">
          Ready To Experience Luxury?
        </h2>
        <p className="mt-4 text-stone-500 max-w-md mx-auto">
          Order {productName} directly via WhatsApp, or continue browsing the collection.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
            className="inline-flex items-center justify-center border border-stone-900 px-10 py-3.5 text-xs tracking-[0.25em] text-stone-900 uppercase transition-colors duration-300 hover:border-amber-700 hover:text-amber-700 w-full sm:w-auto"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
