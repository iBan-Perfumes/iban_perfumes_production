'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ListFilter, SearchX } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/collection/ProductCard';
import {
  filterAndSortProducts,
  getAllCategories,
  getAllPrices,
  type CatalogSort,
  type FragranceCategory,
} from '@/lib/catalog';

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
  { value: 'name-asc', label: 'Alphabetical A-Z' },
  { value: 'name-desc', label: 'Alphabetical Z-A' },
];

export function CollectionBrowse() {
  const categories = useMemo(() => getAllCategories(), []);
  const prices = useMemo(() => getAllPrices(), []);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<FragranceCategory | 'All'>('All');
  const [price, setPrice] = useState<string | 'All'>('All');
  const [sort, setSort] = useState<CatalogSort>('featured');

  const products = useMemo(
    () => filterAndSortProducts({ category, price, sort }),
    [category, price, sort]
  );

  const clearFilters = () => {
    setCategory('All');
    setPrice('All');
    setSort('featured');
  };

  const chipClass = (active: boolean) =>
    `relative rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
      active
        ? 'border-amber-700/40 bg-amber-50 text-amber-800'
        : 'border-stone-200 bg-white/70 text-stone-600 backdrop-blur-sm hover:border-amber-200 hover:text-amber-700'
    }`;

  return (
    <section id="browse" className="scroll-mt-24 bg-stone-50 pb-24 pt-10">
      <div className="sticky top-[4.5rem] z-30 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <h2 className="font-tenor text-2xl font-normal tracking-tight text-stone-900 sm:text-3xl">
            Browse Collection
          </h2>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="collection-filters"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-900 hover:shadow-md"
          >
            <ListFilter size={16} aria-hidden />
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              id="collection-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-stone-100"
            >
              <div className="mx-auto grid max-w-7xl gap-8 px-6 py-6 md:grid-cols-3">
                <fieldset>
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Category
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    <FilterCheck
                      label="All"
                      checked={category === 'All'}
                      onChange={() => setCategory('All')}
                    />
                    {categories.map((c) => (
                      <FilterCheck
                        key={c}
                        label={c}
                        checked={category === c}
                        onChange={() => setCategory(c)}
                      />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Price
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    <FilterCheck
                      label="All"
                      checked={price === 'All'}
                      onChange={() => setPrice('All')}
                    />
                    {prices.map((p) => (
                      <FilterCheck
                        key={p}
                        label={p}
                        checked={price === p}
                        onChange={() => setPrice(p)}
                      />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Sort By
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map((opt) => (
                      <FilterCheck
                        key={opt.value}
                        label={opt.label}
                        checked={sort === opt.value}
                        onChange={() => setSort(opt.value)}
                      />
                    ))}
                  </div>
                </fieldset>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <LayoutGroup>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Fragrance categories"
          >
            {(['All', ...categories] as const).map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c)}
                  className={chipClass(active)}
                >
                  {c}
                  {active && (
                    <motion.span
                      layoutId="category-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-amber-700"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
              <SearchX size={28} className="text-amber-700" aria-hidden />
            </div>
            <h3 className="mb-2 font-tenor text-2xl text-stone-900">
              No fragrances found.
            </h3>
            <p className="mb-8 max-w-sm text-stone-500">
              Try selecting another category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-amber-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.05, 0.25),
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-700 transition-colors hover:border-amber-200 has-[:checked]:border-amber-300 has-[:checked]:bg-amber-50">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="accent-amber-700"
      />
      <span>{label}</span>
    </label>
  );
}
