'use client';

import type { CatalogProduct } from '@/lib/catalog';
import { sharedHowToUse, sharedSafety } from '@/lib/catalog';
import {
  FragranceNotesContent,
  ProductDetailsContent,
  StepsContent,
} from '@/components/pdp/AccordionContent';
import { ProductAccordion } from '@/components/pdp/ProductAccordion';

export function ProductInfoSections({ product }: { product: CatalogProduct }) {
  const leftItems = [
    {
      id: 'notes',
      title: 'Fragrance Notes',
      content: <FragranceNotesContent product={product} />,
    },
    {
      id: 'details',
      title: 'Product Details',
      content: <ProductDetailsContent product={product} />,
    },
  ];

  const rightItems = [
    {
      id: 'how-to-use',
      title: 'How To Use',
      content: <StepsContent steps={sharedHowToUse} />,
    },
    {
      id: 'safety',
      title: 'Safety Information',
      content: <StepsContent steps={sharedSafety} />,
    },
  ];

  return <ProductAccordion leftItems={leftItems} rightItems={rightItems} />;
}
