import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

const footerLinks = ['Privacy', 'Terms', 'Shipping', 'Returns', 'FAQ'] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl tracking-[0.3em] text-amber-50">
              {SITE_NAME.toUpperCase()}
            </p>
            <p className="text-stone-400 text-xs tracking-widest mt-2">
              EAU DE PARFUM · EVERYDAY LUXURY
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-6 text-xs tracking-widest text-stone-400" role="list">
              {footerLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-amber-200 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/about" className="hover:text-amber-200 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-stone-500 text-xs tracking-wider">
          © {year} {SITE_NAME}. Premium fragrances for everyday luxury.
        </div>
      </div>
    </footer>
  );
}
