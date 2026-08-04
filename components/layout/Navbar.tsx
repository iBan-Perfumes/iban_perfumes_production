'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, SITE_NAME } from '@/lib/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Primary">
        <div className="flex items-center flex-1">
          <button
            className="lg:hidden text-stone-700"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <a
          href="#home"
          className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-stone-900"
        >
          {SITE_NAME.toUpperCase()}
        </a>

        <div className="flex-1" aria-hidden="true" />
      </nav>

      <ul className="hidden lg:flex items-center justify-center gap-8 mt-3 px-6" role="list">
        {navLinks.map((l) => (
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

      {open && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-stone-200 mt-3">
          <ul className="flex flex-col py-4 px-6 gap-4" role="list">
            {navLinks.map((l) => (
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
