import { Reveal } from './Reveal';

export function Quote() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/4041187/pexels-photo-4041187.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600')" }}
      />
      <div className="absolute inset-0 bg-white/80" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <p className="font-serif text-3xl sm:text-4xl text-stone-900 italic leading-relaxed">
            "A fragrance is the most intense form of memory. It does not simply recall a moment —
            it brings it back, whole and breathing."
          </p>
          <p className="mt-8 text-amber-700 tracking-[0.3em] text-sm">— AURÉLIA MAISON, 1923</p>
        </Reveal>
      </div>
    </section>
  );
}
