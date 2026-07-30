import { Navbar } from '@/components/Navbar';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Collection } from '@/components/Collection';
import { Men } from '@/components/Men';
import { Women } from '@/components/Women';
import { Quote } from '@/components/Quote';
import { Gifting } from '@/components/Gifting';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="bg-white text-stone-700 overflow-x-hidden">
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
    </div>
  );
}

export default App;
