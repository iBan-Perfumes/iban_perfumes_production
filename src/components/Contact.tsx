import { useState } from 'react';
import { Reveal } from './Reveal';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal direction="left">
            <div>
              <p className="text-amber-700 tracking-[0.4em] text-xs mb-4">GET IN TOUCH</p>
              <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6">
                Join the Maison
              </h2>
              <p className="text-stone-500 leading-relaxed mb-10">
                Subscribe for early access to new releases, private events, and the stories behind
                each composition. Or reach us directly — we would love to hear from you.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-stone-600">
                  <MapPin size={20} className="text-amber-700" />
                  <span>12 Rue de la Paix, Paris 75002</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Phone size={20} className="text-amber-700" />
                  <span>+33 1 42 60 00 00</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <Mail size={20} className="text-amber-700" />
                  <span>concierge@aurelia-paris.com</span>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div>
                <label className="block text-stone-700 text-sm mb-2 tracking-wider">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-stone-700 text-sm mb-2 tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-stone-700 text-sm mb-2 tracking-wider">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white/60 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="How may we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-stone-900 text-white tracking-widest text-sm hover:bg-amber-700 transition-all duration-300"
              >
                {sent ? 'MESSAGE SENT — MERCI' : 'SEND MESSAGE'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
