import { Gift, Package, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const gifts = [
  {
    icon: Gift,
    title: 'Discovery Set',
    text: 'Six 2ml samples to explore the full collection before choosing your signature scent.',
    price: 'From ₹900',
  },
  {
    icon: Package,
    title: 'Duo Collection',
    text: 'Two full-size fragrances presented in a lacquered keepsake box with ribbon.',
    price: 'From ₹7,600',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Engraving',
    text: 'Personalize any bottle with a name, date, or message engraved in gold leaf.',
    price: 'Complimentary',
  },
];

export function Gifting() {
  return (
    <section id="gifting" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">THE ART OF GIVING</p>
          <h2 className="font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">Gifting & Sets</h2>
          <p className="text-stone-500 mt-4 max-w-lg mx-auto">
            Present a moment of luxury. Each set is wrapped by hand in our signature boxes.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {gifts.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="glass-card p-8 h-full text-center group hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors duration-500">
                  <g.icon size={28} className="text-amber-700" aria-hidden />
                </div>
                <h3 className="font-serif text-2xl text-stone-900 mb-3">{g.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{g.text}</p>
                <p className="text-amber-700 tracking-widest text-sm">{g.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
