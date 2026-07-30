import { Reveal } from './Reveal';
import { Flower2, Sparkles, Globe2 } from 'lucide-react';

const features = [
  {
    icon: Flower2,
    title: 'Rare Ingredients',
    text: 'Sourced from the finest gardens and distilleries across the world.',
  },
  {
    icon: Sparkles,
    title: 'Master Crafted',
    text: 'Each scent composed by hand in our Grasse atelier over many months.',
  },
  {
    icon: Globe2,
    title: 'Worldwide Delivery',
    text: 'Delivered to your door in signature packaging, anywhere on earth.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">OUR PHILOSOPHY</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-900">A Century of Scent</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/9790391/pexels-photo-9790391.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
                alt="Elegant woman with perfume"
                className="rounded-lg shadow-xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-amber-200 rounded-lg -z-10" />
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div>
              <p className="text-stone-600 leading-relaxed mb-6">
                For over a hundred years, Aurélia has pursued a single belief — that a fragrance
                is more than a scent, it is a memory, a presence, a quiet signature left in a room.
              </p>
              <p className="text-stone-500 leading-relaxed mb-10">
                Our perfumers work slowly, layering notes of bergamot, oud, rose and amber until
                each composition finds its own balance. Nothing is rushed. Nothing is ordinary.
              </p>

              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <f.icon size={20} className="text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-stone-900 font-medium mb-1">{f.title}</h3>
                      <p className="text-stone-500 text-sm">{f.text}</p>
                    </div>
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
