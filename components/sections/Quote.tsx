import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function Quote() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/quote.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-white/80" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <blockquote>
            <p className="font-serif text-3xl sm:text-4xl text-stone-900 italic leading-relaxed">
              &ldquo;A fragrance is the most intense form of memory. It does not simply recall a
              moment — it brings it back, whole and breathing.&rdquo;
            </p>
            <footer className="mt-8 text-amber-700 tracking-[0.3em] text-sm">
              — AURÉLIA MAISON, 1923
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
