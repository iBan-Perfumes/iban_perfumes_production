import { Reveal } from '@/components/ui/Reveal';

export function Quote() {
  return (
    <section className="collection-section relative overflow-hidden py-28">
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <blockquote>
            <p className="font-serif text-3xl italic leading-relaxed text-stone-900 sm:text-4xl">
              &ldquo;A fragrance is the most intense form of memory. It does not simply recall a
              moment — it brings it back, whole and breathing.&rdquo;
            </p>
            <footer className="mt-8 text-sm tracking-[0.3em] text-amber-700">
              — AURÉLIA MAISON, 1923
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
