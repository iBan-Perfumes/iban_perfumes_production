import { useEffect, useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Men', href: '#men' },
  { label: 'Women', href: '#women' },
  { label: 'Gifting', href: '#gifting' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left icons */}
        <div className="flex items-center gap-5 flex-1">
          <button className="lg:hidden text-stone-700" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <button className="hidden lg:flex text-stone-600 hover:text-amber-700 transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        {/* Center logo */}
        <a href="#home" className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-stone-900">
          AURÉLIA
        </a>

        {/* Right icons */}
        <div className="flex items-center gap-5 flex-1 justify-end">
          <button className="hidden lg:flex text-stone-600 hover:text-amber-700 transition-colors" aria-label="Account">
            <User size={20} />
          </button>
          <button className="hidden lg:flex text-stone-600 hover:text-amber-700 transition-colors" aria-label="Wishlist">
            <Heart size={20} />
          </button>
          <button className="text-stone-600 hover:text-amber-700 transition-colors" aria-label="Bag">
            <ShoppingBag size={20} />
          </button>
        </div>
      </nav>

      {/* Desktop nav links */}
      <ul className="hidden lg:flex items-center justify-center gap-8 mt-3 px-6">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-xs tracking-[0.2em] text-stone-600 hover:text-amber-700 transition-colors duration-300"
            >
              {l.label.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-stone-200 mt-3">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-widest text-stone-700 hover:text-amber-700 transition-colors"
                >
                  {l.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
