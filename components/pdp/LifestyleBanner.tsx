import Image from 'next/image';

export function LifestyleBanner({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      aria-label="Lifestyle imagery"
    >
      <div className="relative h-[50vh] min-h-[320px] max-h-[720px] w-full overflow-hidden bg-stone-900">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
