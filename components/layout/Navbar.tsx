'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/site';

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero =
      document.querySelector('[data-site-hero]') ??
      document.getElementById('home');

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    // Routes without a hero banner: show after a short scroll.
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
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

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/home"
          className="inline-flex items-center gap-3"
          aria-label="i-BAN Perfumes home"
        >
          <span
            className="grid h-10 w-10 place-items-center overflow-hidden rounded-[12px] border border-stone-200 bg-stone-900 text-[0.68rem] font-bold tracking-wide text-white"
            aria-hidden="true"
          >
            iB
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-bold tracking-wide text-stone-900">
              i-BAN Perfumes
            </span>
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-stone-400">
              Eau de Parfum
            </span>
          </span>
        </Link>

        <ul
          className="hidden flex-1 items-center justify-center gap-7 lg:flex"
          role="list"
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-stone-600 transition-colors duration-300 hover:text-amber-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:border-stone-400 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="sticky-mobile-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden w-10 lg:block" aria-hidden="true" />
      </nav>

      {open && (
        <div
          id="sticky-mobile-menu"
          className="border-t border-stone-200 bg-white lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-4" role="list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.14em] text-stone-700 transition-colors hover:bg-stone-50 hover:text-amber-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
