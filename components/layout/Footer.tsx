import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { SITE_NAME } from '@/lib/site';

const footerLinks = ['Privacy', 'Terms', 'Shipping', 'Returns', 'FAQ'] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-flex"
              aria-label={`${SITE_NAME} home`}
            >
              <span className="mx-auto block w-[9rem] md:mx-0 md:w-[10rem]">
                <BrandLogo variant="transparent" tone="light" />
              </span>
            </Link>
          </div>

          <nav aria-label="Footer">
            <ul
              className="flex flex-wrap justify-center gap-6 text-xs tracking-widest text-stone-400"
              role="list"
            >
              {footerLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-amber-200">
                    {l}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/about" className="transition-colors hover:text-amber-200">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs tracking-wider text-stone-500">
          © {year} {SITE_NAME}. Premium fragrances for everyday luxury.
        </div>
      </div>
    </footer>
  );
}
