'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Verzögerung in Millisekunden, für gestaffelte Reihen. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Sanftes Einblenden beim Hereinscrollen: Deckkraft plus 12 px Versatz.
 *
 * Wer im System „Bewegung reduzieren“ eingestellt hat, sieht den Inhalt sofort
 * und ohne jede Animation — das erledigt die Medienabfrage in globals.css,
 * zusätzlich prüfen wir es hier, damit gar kein Observer angelegt wird.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setShown(true), delay);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} data-shown={shown ? 'true' : 'false'}>
      {children}
    </Tag>
  );
}
