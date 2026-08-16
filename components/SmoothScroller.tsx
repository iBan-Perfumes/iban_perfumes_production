'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

function clearLenisClasses() {
  const root = document.documentElement;
  root.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
}

export function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.scrollTo(0, { immediate: true });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      try {
        lenis.scrollTo(0, { immediate: true });
      } catch {
        // Instance may already be tearing down
      }
      lenis.destroy();
      clearLenisClasses();
      window.scrollTo(0, 0);
    };
  }, []);

  return <>{children}</>;
}
