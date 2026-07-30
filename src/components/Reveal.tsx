import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  threshold?: number;
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', threshold }: RevealProps) {
  const { ref, isVisible } = useScrollAnimation(threshold);

  const base = 'transition-all duration-700 ease-out';
  const hidden =
    direction === 'up' ? 'opacity-0 translate-y-10'
    : direction === 'left' ? 'opacity-0 -translate-x-10'
    : direction === 'right' ? 'opacity-0 translate-x-10'
    : 'opacity-0';
  const visible = 'opacity-100 translate-y-0 translate-x-0';

  return (
    <div
      ref={ref}
      className={`${base} ${isVisible ? visible : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
