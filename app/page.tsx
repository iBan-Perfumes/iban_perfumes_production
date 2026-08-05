import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Featured } from '@/components/sections/Featured';
import { Collection } from '@/components/sections/Collection';
import { Men } from '@/components/sections/Men';
import { Women } from '@/components/sections/Women';
import { Quote } from '@/components/sections/Quote';
import { Gifting } from '@/components/sections/Gifting';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Featured />
        <Collection />
        <Men />
        <Women />
        <Quote />
        <Gifting />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
