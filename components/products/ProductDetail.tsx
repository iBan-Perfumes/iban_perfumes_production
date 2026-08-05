'use client';

import { FragrancePyramid } from '@/components/products/FragrancePyramid';
import { ProductCta } from '@/components/products/ProductCta';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductStory } from '@/components/products/ProductStory';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { WhyYouLoveIt } from '@/components/products/WhyYouLoveIt';
import type { CatalogProduct } from '@/lib/catalog';

interface ProductDetailProps {
  product: CatalogProduct;
  related: CatalogProduct[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  return (
    <article>
      <ProductHero product={product} />
      <FragrancePyramid product={product} />
      <ProductStory product={product} />
      <WhyYouLoveIt />
      <ProductInfo product={product} />
      <RelatedProducts products={related} />
      <ProductCta product={product} />
    </article>
  );
}
