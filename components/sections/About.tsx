import Image from 'next/image';
import Link from 'next/link';
import { Flower2, Sparkles, Gift } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const features = [
  {
    icon: Flower2,
    title: 'Signature Scents',
    text: 'A curated line of eau de parfums — from bright citrus and florals to deep oud — each with its own distinct character.',
  },
  {
    icon: Sparkles,
    title: 'Quality Craft',
    text: 'Every fragrance is carefully balanced across top, heart, and base notes for a scent that opens fresh and lingers beautifully.',
  },
  {
    icon: Gift,
    title: 'Ready to Gift',
    text: 'Compact 20 ml bottles made for everyday wear and thoughtful gifting — luxury that fits in your pocket.',
  },
];

export function About() {
  return (
    <section id="about" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal direction="left">
            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="relative w-full overflow-hidden rounded-lg bg-stone-900 shadow-xl">
                <Image
                  src="/ORIS_PERFUME_LOGO.png"
                  alt="i-BAN Perfumes ORIS logo"
                  width={1269}
                  height={1240}
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="block h-auto w-full object-contain object-center"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-lg border border-amber-200" />
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div>
              <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">ABOUT i-BAN</p>
              <h2 className="mb-6 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                The Art of Everyday Luxury
              </h2>
              <p className="mb-6 leading-relaxed text-stone-600">
                i-BAN Perfumes creates wearable eau de parfums for the moments that matter —
                scents that feel refined, modern, and true to you. From citrus and florals to oud
                and berries, each bottle is designed for daily presence.
              </p>
              <p className="mb-6 leading-relaxed text-stone-500">
                We believe luxury should be accessible. Our signature collection — ORIS, Royal
                Berry, From Heavens, MARJ, and Hala Paris — brings carefully composed fragrances
                to you in a compact 20 ml format, ready to wear or gift.
              </p>

              <Link
                href="/about"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-amber-700 transition-colors hover:text-amber-800"
              >
                Read our story
                <span aria-hidden="true">→</span>
              </Link>

              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                      <f.icon size={20} className="text-amber-700" aria-hidden />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-stone-900">{f.title}</h3>
                      <p className="text-sm text-stone-500">{f.text}</p>
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
