import type { CatalogProduct } from '@/lib/catalog';

function NoteGroup({ title, notes }: { title: string; notes: string[] }) {
  if (!notes.length) return null;
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.3em] text-amber-700 uppercase mb-4">
        {title}
      </h3>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        role="list"
      >
        {notes.map((note) => (
          <li
            key={note}
            className="border border-stone-200 px-4 py-5 text-center transition-colors duration-300 hover:border-stone-400"
          >
            <span className="font-serif text-base text-stone-900">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FragranceNotesContent({ product }: { product: CatalogProduct }) {
  return (
    <div className="space-y-8">
      <NoteGroup title="Top Notes" notes={product.notePyramid.top} />
      <NoteGroup title="Heart Notes" notes={product.notePyramid.heart} />
      <NoteGroup title="Base Notes" notes={product.notePyramid.base} />
    </div>
  );
}

export function ProductDetailsContent({ product }: { product: CatalogProduct }) {
  const rows: [string, string][] = [
    ['Brand', product.details.brand],
    ['Format', product.details.format],
    ['Volume', product.details.volume],
    ['Category', product.details.category],
    ['Fragrance Family', product.details.fragranceFamily],
    ['Character', product.details.character],
    ['Longevity', product.details.longevity],
    ['Occasion', product.details.occasion],
    ['Gender', product.details.gender],
    ['Concentration', product.details.concentration],
    ['Country', product.details.country],
  ];

  return (
    <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
      {rows.map(([label, value]) => (
        <div key={label} className="border-b border-stone-100 pb-3">
          <dt className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">{label}</dt>
          <dd className="mt-1.5 text-stone-800">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StoryContent({ product }: { product: CatalogProduct }) {
  return (
    <p className="font-serif text-lg sm:text-xl leading-relaxed text-stone-700 max-w-2xl">
      {product.story}
    </p>
  );
}

export function IngredientsContent({ product }: { product: CatalogProduct }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3" role="list">
      {product.ingredients.map((ing) => (
        <li
          key={ing}
          className="text-sm tracking-wide text-stone-700 before:content-['·'] before:mr-2 before:text-amber-700"
        >
          {ing}
        </li>
      ))}
    </ul>
  );
}

export function StepsContent({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="space-y-4" role="list">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="font-tenor text-sm text-amber-700 shrink-0 w-6">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-stone-700">{step}</span>
        </li>
      ))}
    </ol>
  );
}
