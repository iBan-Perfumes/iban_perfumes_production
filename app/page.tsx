import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Collection } from '@/components/sections/Collection';
import { Men } from '@/components/sections/Men';
import { Women } from '@/components/sections/Women';
import { Quote } from '@/components/sections/Quote';
import { Gifting } from '@/components/sections/Gifting';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <About />
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
