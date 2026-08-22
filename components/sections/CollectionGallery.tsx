import Image from 'next/image';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog-types';

function splitIntoColumns(products: CatalogProduct[], columnCount: number) {
  const columns: CatalogProduct[][] = Array.from({ length: columnCount }, () => []);
  products.forEach((product, index) => {
    columns[index % columnCount].push(product);
  });
  return columns;
}

const COLUMN_META = [
  { direction: 'up' as const, durationClass: 'collection-gallery-track--dur-1' },
  { direction: 'down' as const, durationClass: 'collection-gallery-track--dur-2' },
  { direction: 'up' as const, durationClass: 'collection-gallery-track--dur-3' },
];

export function CollectionGallery({ products }: { products: CatalogProduct[] }) {
  const available = products.filter((p) => p.available);
  const columns = splitIntoColumns(available, 3);

  return (
    <div className="collection-gallery">
      <div className="collection-gallery-columns">
        {columns.map((columnProducts, columnIndex) => {
          const loop = [...columnProducts, ...columnProducts];
          const meta = COLUMN_META[columnIndex];

          return (
            <div key={columnIndex} className="collection-gallery-column">
              <div
                className={`collection-gallery-track collection-gallery-track--${meta.direction} ${meta.durationClass}`}
                style={{ animationDelay: `${columnIndex * -3.5}s` }}
              >
                {loop.map((product, imageIndex) => (
                  <Link
                    key={`${product.slug}-${imageIndex}`}
                    href={`/products/${product.slug}`}
                    className="collection-gallery-item"
                    tabIndex={imageIndex < columnProducts.length ? 0 : -1}
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.perfumeImage}
                      alt={`${product.name} perfume bottle`}
                      width={460}
                      height={600}
                      sizes="(max-width: 768px) 120px, (max-width: 1024px) 180px, 240px"
                      className="collection-gallery-image"
                    />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
