import Image from 'next/image';

const logos = {
  transparent: {
    src: '/images/i_ban_transparent_logo.png',
    alt: 'i-BAN Perfumes',
    width: 1672,
    height: 941,
  },
  black: {
    src: '/images/iban_logo_black.png',
    alt: 'i-BAN Perfumes',
    width: 1797,
    height: 875,
  },
} as const;

type BrandLogoVariant = keyof typeof logos;

interface BrandLogoProps {
  variant: BrandLogoVariant;
  /** Text color for taglines — dark on light headers, light on dark/hero/footer */
  tone?: 'dark' | 'light';
  /** compact = sticky nav; default = hero / footer */
  size?: 'compact' | 'default';
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant,
  tone = 'dark',
  size = 'default',
  className = '',
  priority = false,
}: BrandLogoProps) {
  const logo = logos[variant];
  const lineClass = tone === 'light' ? 'text-white' : 'text-stone-900';
  const taglineClass = tone === 'light' ? 'text-white/75' : 'text-stone-700';
  const compact = size === 'compact';

  return (
    <span className={`flex w-full flex-col items-center ${className}`}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        className="h-auto w-full object-contain"
      />
      <span
        className={`-mt-0.5 text-center font-semibold uppercase tracking-[0.2em] ${
          compact ? 'text-[0.52rem] sm:text-[0.55rem]' : 'text-[0.65rem] sm:text-[0.72rem]'
        } ${lineClass}`}
      >
        Perfumes
      </span>
      <span
        className={`mt-0.5 text-center font-medium uppercase tracking-[0.28em] ${
          compact ? 'text-[0.38rem] sm:text-[0.4rem]' : 'text-[0.48rem] sm:text-[0.52rem]'
        } ${taglineClass}`}
      >
        For Every Second
      </span>
    </span>
  );
}
