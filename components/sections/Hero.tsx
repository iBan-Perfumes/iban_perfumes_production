'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cinematicSlides } from '@/lib/cinematic-slides';
import { navLinks } from '@/lib/site';
import '@/app/cinematic-carousel.css';

const AUTO_PLAY_DELAY = 7000;
const SWIPE_THRESHOLD = 60;
const INTERACTIVE = 'button, a, input, textarea, select, [role="button"]';

function padNumber(value: number) {
  return String(value).padStart(2, '0');
}

export function Hero() {
  const slides = cinematicSlides;
  const count = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [liveMessage, setLiveMessage] = useState('');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pointerStartX = useRef<number | null>(null);
  const previewListRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slide = slides[activeIndex];
  const isAutoPlayPaused = !autoPlayEnabled || reduceMotion || count <= 1;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const goTo = useCallback(
    (index: number, forcedDirection?: 'next' | 'previous') => {
      if (!Number.isInteger(index) || index < 0 || index >= count) return;

      setActiveIndex((prev) => {
        if (index === prev) return prev;

        if (forcedDirection) {
          setDirection(forcedDirection);
        } else {
          const forward = (index - prev + count) % count;
          const backward = (prev - index + count) % count;
          setDirection(forward <= backward ? 'next' : 'previous');
        }

        setAnimKey((k) => k + 1);
        return index;
      });
    },
    [count]
  );

  const showNext = useCallback(() => {
    setDirection('next');
    setAnimKey((k) => k + 1);
    setActiveIndex((i) => (i + 1) % count);
  }, [count]);

  const showPrevious = useCallback(() => {
    setDirection('previous');
    setAnimKey((k) => k + 1);
    setActiveIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);

    if (isAutoPlayPaused) return;

    autoPlayTimer.current = setTimeout(() => {
      showNext();
    }, AUTO_PLAY_DELAY);

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [activeIndex, isAutoPlayPaused, showNext, animKey]);

  useEffect(() => {
    setLiveMessage(
      `Slide ${activeIndex + 1} of ${count}: ${slide.title} ${slide.titleAccent}`
    );
  }, [activeIndex, count, slide.title, slide.titleAccent]);

  useEffect(() => {
    const list = previewListRef.current;
    if (!list) return;
    const activeCard = list.querySelector<HTMLElement>(
      `[data-slide-index="${activeIndex}"]`
    );
    if (!activeCard) return;

    requestAnimationFrame(() => {
      const listRect = list.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      let scrollAmount = 0;

      if (cardRect.top < listRect.top) {
        scrollAmount = cardRect.top - listRect.top - 8;
      } else if (cardRect.bottom > listRect.bottom) {
        scrollAmount = cardRect.bottom - listRect.bottom + 8;
      } else {
        return;
      }

      list.scrollBy({
        top: scrollAmount,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    });
  }, [activeIndex, reduceMotion]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0, 'previous');
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(count - 1, 'next');
    } else if (event.key === ' ') {
      event.preventDefault();
      setAutoPlayEnabled((v) => !v);
    }
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE)) {
      pointerStartX.current = null;
      return;
    }
    pointerStartX.current = event.clientX;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    if (pointerStartX.current === null) return;
    const movement = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(movement) < SWIPE_THRESHOLD) return;
    if (movement < 0) showNext();
    else showPrevious();
  };

  const onPointerCancel = (event: ReactPointerEvent) => {
    pointerStartX.current = null;
    const el = event.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  };

  const moveClass = direction === 'previous' ? 'move-previous' : 'move-next';

  return (
    <section
      id="home"
      data-site-hero
      className={`cinematic-carousel theme-${slide.theme}`}
      tabIndex={0}
      role="region"
      aria-label="Featured fragrance stories"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
    >
      <div className="cc-backgrounds" aria-hidden="true">
        <div className="cc-background-list">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`cc-background-slide${
                i === activeIndex ? ` is-active ${moveClass}` : ''
              }`}
            >
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="cc-background-image"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className="cc-background-shade" />
        <div className="cc-ambient-glow" />
        <div className="cc-noise" />
      </div>

      <div className="cc-shell">
        <header className="cc-top-bar">
          <a href="#home" className="cc-brand" aria-label="i-BAN Perfumes home">
            <span className="cc-brand-mark" aria-hidden="true">
              <span>iB</span>
            </span>
            <span className="cc-brand-copy">
              <span className="cc-brand-name">i-BAN Perfumes</span>
              <span className="cc-brand-tagline">Eau de Parfum</span>
            </span>
          </a>

          <ul className="cc-top-nav" role="list" aria-label="Primary">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="cc-top-actions">
            <button
              type="button"
              className={`cc-autoplay-button ${
                autoPlayEnabled ? 'is-playing' : 'is-paused'
              }`}
              aria-label={
                autoPlayEnabled
                  ? 'Pause automatic slide playback'
                  : 'Start automatic slide playback'
              }
              aria-pressed={autoPlayEnabled}
              onClick={() => setAutoPlayEnabled((v) => !v)}
            >
              <span className="cc-autoplay-icon" aria-hidden="true">
                {autoPlayEnabled ? 'Ⅱ' : '▶'}
              </span>
              <span className="cc-autoplay-text">
                {autoPlayEnabled ? 'Playing' : 'Paused'}
              </span>
            </button>

            <button
              type="button"
              className="cc-menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="cc-mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {menuOpen && (
            <nav id="cc-mobile-nav" className="cc-mobile-nav" aria-label="Primary">
              <ul role="list">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        <div
          className="cc-main"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div className="cc-hero-layout">
            <section
              key={`story-${slide.id}-${animKey}`}
              className={`cc-story ${moveClass}`}
              aria-labelledby="cc-story-title"
            >
              <div className="cc-eyebrow-row">
                <span className="cc-eyebrow-line" aria-hidden="true" />
                <p className="cc-story-eyebrow">{slide.eyebrow}</p>
              </div>

              <h1 className="cc-story-title" id="cc-story-title">
                <span className="cc-title-line">{slide.title}</span>
                <span className="cc-title-accent">{slide.titleAccent}</span>
              </h1>

              <ul className="cc-meta-list" aria-label="Fragrance details">
                {slide.meta.map((item, i) => (
                  <li
                    key={item}
                    className={`cc-meta-item${
                      i === slide.meta.length - 1 ? ' is-highlighted' : ''
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="cc-story-description">{slide.description}</p>

              <ul className="cc-genre-list" aria-label="Fragrance notes">
                {slide.genres.map((genre) => (
                  <li key={genre} className="cc-genre-item">
                    {genre}
                  </li>
                ))}
              </ul>

              <div className="cc-story-actions">
                <a href={slide.primaryHref} className="cc-primary-button">
                  <span className="cc-button-icon" aria-hidden="true">
                    ▶
                  </span>
                  <span>{slide.primaryAction}</span>
                </a>
                <a href={slide.secondaryHref} className="cc-secondary-button">
                  <span>{slide.secondaryAction}</span>
                  <span className="cc-button-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </section>

            <aside className="cc-preview-rail" aria-label="All fragrance stories">
              <div className="cc-preview-header">
                <p className="cc-preview-label">All scents</p>
                <p className="cc-preview-count">
                  <strong>{padNumber(activeIndex + 1)}</strong>
                  <span>
                    {' '}
                    / <span>{padNumber(count)}</span>
                  </span>
                </p>
              </div>

              <div className="cc-preview-list" ref={previewListRef} role="list">
                {slides.map((s, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="listitem"
                      data-slide-index={i}
                      className={`cc-preview-button${isActive ? ' is-active' : ''}`}
                      aria-label={`Show ${s.title} ${s.titleAccent}`}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => goTo(i)}
                    >
                      <Image
                        src={s.previewImage}
                        alt=""
                        fill
                        sizes="360px"
                        className="cc-preview-image"
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="cc-preview-overlay" aria-hidden="true" />
                      <span className="cc-preview-index">{padNumber(i + 1)}</span>
                      <span className="cc-preview-content">
                        <span className="cc-preview-eyebrow">
                          {isActive ? 'Now showing' : s.eyebrow}
                        </span>
                        <span className="cc-preview-title">
                          {s.title} {s.titleAccent}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>

        <footer className="cc-bottom-bar">
          <nav className="cc-pagination" aria-label="Choose a slide">
            {slides.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`cc-pagination-button${isActive ? ' is-active' : ''}`}
                  aria-label={`Show slide ${i + 1}: ${s.title} ${s.titleAccent}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span />
                </button>
              );
            })}
          </nav>

          <div className="cc-progress-area">
            <p className="cc-progress-label">
              {isAutoPlayPaused ? 'Paused' : 'Next story'}
            </p>
            <span className="cc-progress-track" aria-hidden="true">
              <span
                key={`progress-${activeIndex}-${animKey}-${autoPlayEnabled}-${reduceMotion}`}
                className={`cc-progress-fill${
                  !isAutoPlayPaused ? ' is-running' : ''
                }${isAutoPlayPaused && autoPlayEnabled === false ? ' is-paused' : ''}`}
              />
            </span>
          </div>

          <nav className="cc-nav" aria-label="Carousel navigation">
            <button
              type="button"
              className="cc-nav-button"
              aria-label="Show previous slide"
              onClick={showPrevious}
            >
              ←
            </button>
            <button
              type="button"
              className="cc-nav-button"
              aria-label="Show next slide"
              onClick={showNext}
            >
              →
            </button>
          </nav>
        </footer>
      </div>

      <span className="cc-live-region" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </span>
    </section>
  );
}
