import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Featured } from '@/components/sections/Featured';
import { Collection } from '@/components/sections/Collection';
import { Men } from '@/components/sections/Men';
import { Women } from '@/components/sections/Women';
import { Quote } from '@/components/sections/Quote';
import { Gifting } from '@/components/sections/Gifting';
import { SmoothScroller } from '@/components/SmoothScroller';
import { getAvailableProducts } from '@/lib/catalog-db';
import { mapFeatured } from '@/lib/featured-perfumes';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getAvailableProducts();
  const featured = mapFeatured(products);

  return (
    <SmoothScroller>
      <main id="main">
        <Hero />
        <About />
        <Featured items={featured} />
        <Collection products={products} />
        <Men />
        <Women />
        <Quote />
        <Gifting />
      </main>
    </SmoothScroller>
  );
}
