import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { womenScents } from '@/lib/products';

export function Women() {
  return (
    <section id="women" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="relative rounded-lg shadow-xl w-full aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/women.jpg"
                  alt="Woman with luxury perfume"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
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
                The women&apos;s collection is a study in light and shadow — delicate florals that bloom
                into warm, lingering bases. Each fragrance is a quiet conversation between strength
                and softness.
              </p>
              <div className="space-y-4">
                {womenScents.map((s) => (
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
