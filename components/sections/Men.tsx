import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { menScents } from '@/lib/products';

export function Men() {
  return (
    <section id="men" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left" className="order-2 md:order-1">
            <div>
              <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">FOR HIM</p>
              <h2 className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                Strength in Silence
              </h2>
              <p className="text-stone-500 leading-relaxed mb-8">
                Our men&apos;s collection balances bold woods with refined spice — scents that speak
                with confidence yet never raise their voice. Built for the man who lets presence
                do the talking.
              </p>
              <div className="space-y-4">
                {menScents.map((s) => (
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

          <Reveal direction="right" delay={150} className="order-1 md:order-2">
            <div className="relative">
              <div className="relative rounded-lg shadow-xl w-full aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/men.jpg"
                  alt="Man applying cologne"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border border-amber-200 rounded-lg -z-10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
