import { Reveal } from '@/components/ui/Reveal';
import { customerExperience } from '@/lib/about-content';

export function CustomerExperience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-stone-50 py-28"
      aria-labelledby="experience-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(180,83,9,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(180,83,9,0.06), transparent 35%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-xs tracking-[0.4em] text-amber-700">
            {customerExperience.eyebrow}
          </p>
          <h2
            id="experience-heading"
            className="mb-8 font-tenor text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
          >
            {customerExperience.heading}
          </h2>
          <p className="font-serif text-xl italic leading-relaxed text-stone-600 sm:text-2xl">
            “{customerExperience.content}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
