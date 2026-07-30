import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/13068356/pexels-photo-13068356.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
    eyebrow: 'NEW ARRIVAL',
    title: 'The Art of',
    titleAccent: 'Fragrance',
    text: 'Discover a curated collection of rare and refined perfumes, crafted by master perfumers to capture emotion in a bottle.',
  },
  {
    image: 'https://images.pexels.com/photos/12428350/pexels-photo-12428350.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
    eyebrow: 'SIGNATURE LINE',
    title: 'Scents That',
    titleAccent: 'Linger',
    text: 'Each composition is layered slowly — bergamot, oud, rose and amber — until it finds its own perfect balance.',
  },
  {
    image: 'https://images.pexels.com/photos/8450541/pexels-photo-8450541.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
    eyebrow: 'MAISON DE PARFUM',
    title: 'A Century of',
    titleAccent: 'Elegance',
    text: 'For over a hundred years, Aurélia has pursued a single belief — that a fragrance is a memory, a presence, a quiet signature.',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="home" className="relative h-[85vh] min-h-[520px] overflow-hidden bg-white">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: i === current ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-xl">
          <p
            className={`text-amber-700 tracking-[0.4em] text-xs sm:text-sm mb-5 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {slides[current].eyebrow}
          </p>

          <h1
            key={`title-${current}`}
            className={`font-serif text-5xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.05] transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-md'
            }`}
          >
            {slides[current].title}
            <span className="block italic text-amber-700">{slides[current].titleAccent}</span>
          </h1>

          <p
            key={`text-${current}`}
            className={`mt-6 text-stone-600 text-base sm:text-lg leading-relaxed transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {slides[current].text}
          </p>

          <div
            className={`mt-9 flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#collection"
              className="px-8 py-3 bg-stone-900 text-white tracking-widest text-sm hover:bg-amber-700 transition-all duration-300"
            >
              SHOP COLLECTION
            </a>
            <a
              href="#about"
              className="px-8 py-3 border border-stone-300 text-stone-700 tracking-widest text-sm hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
            >
              OUR STORY
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/40 flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/40 flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-stone-900' : 'w-2 bg-stone-400/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
