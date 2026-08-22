import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Featured } from '@/components/sections/Featured';
import { Collection } from '@/components/sections/Collection';
import { FragranceLineup } from '@/components/sections/FragranceLineup';
import { Quote } from '@/components/sections/Quote';
import { HomeCta } from '@/components/sections/HomeCta';
import { SmoothScroller } from '@/components/SmoothScroller';
import { getAvailableProducts } from '@/lib/catalog-db';
import { mapFeatured } from '@/lib/featured-perfumes';
import { homeLineups, productsForLineup } from '@/lib/home-lineups';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getAvailableProducts();
  const featured = mapFeatured(products);
  const unisex = productsForLineup(products, homeLineups.unisex.slugs);
  const masculine = productsForLineup(products, homeLineups.masculine.slugs);

  return (
    <SmoothScroller>
      <main id="main">
        <Hero />
        <About />
        <Featured items={featured} />
        <Collection products={products} />
        <FragranceLineup lineup={homeLineups.unisex} products={unisex} />
        <FragranceLineup lineup={homeLineups.masculine} products={masculine} />
        <Quote />
        <HomeCta />
      </main>
    </SmoothScroller>
  );
}
