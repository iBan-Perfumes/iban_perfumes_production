import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.18em] text-stone-400 uppercase">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-stone-300">/</span>}
              {isLast || !item.href ? (
                <span className="text-stone-600" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-amber-700 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
