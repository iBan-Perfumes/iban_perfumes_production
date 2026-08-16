'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { navLinks } from '@/lib/site';

interface SiteTopBarProps {
  activeHref?: string;
}

export function SiteTopBar({ activeHref }: SiteTopBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-5 pt-6 sm:px-8 lg:px-12">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="i-BAN Perfumes home"
        >
          <span className="block w-[5.75rem] sm:w-[6.25rem]">
            <BrandLogo variant="transparent" tone="light" size="compact" priority />
          </span>
        </Link>

        <ul
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-7"
          role="list"
        >
          {navLinks.map((l) => {
            const isActive = activeHref === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-amber-200 ${
                    isActive ? 'text-amber-200' : 'text-white/60'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-white/15 bg-stone-950/40 text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden w-12 shrink-0 lg:block" aria-hidden="true" />

        {open && (
          <nav
            id="site-mobile-nav"
            className="absolute inset-x-0 top-[calc(100%+12px)] z-30 rounded-[18px] border border-white/12 bg-stone-950/92 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
            aria-label="Primary"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[10px] px-3 py-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white/80 transition-colors hover:bg-amber-500/10 hover:text-amber-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
