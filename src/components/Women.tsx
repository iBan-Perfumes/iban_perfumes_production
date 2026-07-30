import { Reveal } from './Reveal';

export function Women() {
  return (
    <section id="women" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/28606686/pexels-photo-28606686.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800"
                alt="Woman with luxury perfume"
                className="rounded-lg shadow-xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-amber-200 rounded-lg -z-10" />
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div>
              <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">FOR HER</p>
              <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6">
                Grace in Every Note
              </h2>
              <p className="text-stone-500 leading-relaxed mb-8">
                The women's collection is a study in light and shadow — delicate florals that bloom
                into warm, lingering bases. Each fragrance is a quiet conversation between strength
                and softness.
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Rose Éternelle', note: 'Centifolia Rose · Lychee · Musk' },
                  { name: 'Jardin Secret', note: 'Peony · White Musk · Cedar' },
                  { name: 'Soie Dorée', note: 'Honey · Orange Blossom · Amber' },
                ].map((s) => (
                  <div key={s.name} className="glass-card p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-stone-900 font-medium">{s.name}</h3>
                      <p className="text-stone-400 text-xs tracking-widest">{s.note}</p>
                    </div>
                    <span className="text-amber-700 text-sm">Eau de Parfum</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
