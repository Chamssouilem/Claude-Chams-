import type { Locale } from '@/lib/types';

/**
 * Die Wortmarke. Bewusst rein typografisch gesetzt statt als Bilddatei:
 * scharf auf jedem Display, in jeder Größe, für Screenreader lesbar und ohne
 * eine einzige zusätzliche Netzwerkanfrage.
 */
export function Wordmark({
  stacked = false,
  className = '',
}: {
  stacked?: boolean;
  className?: string;
  locale?: Locale;
}) {
  if (stacked) {
    return (
      <span className={`inline-block font-display uppercase leading-[0.86] ${className}`}>
        <span className="block tracking-[-0.02em]">Patties</span>
        <span className="block tracking-[-0.02em]">
          <span className="text-berry-text">&amp;</span> Berries
        </span>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-baseline gap-[0.3em] font-display uppercase tracking-[-0.015em] ${className}`}
    >
      <span>Patties</span>
      <span className="text-berry-text">&amp;</span>
      <span>Berries</span>
    </span>
  );
}

/**
 * Das Bildzeichen im Seitenkopf — das echte Logo, klein.
 *
 * Ohne Bildbeschreibung, weil direkt daneben „Patties & Berries" als Text
 * steht: Ein Screenreader würde den Namen sonst zweimal vorlesen.
 */
export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <picture>
      <source srcSet="/img/logo-siegel-96.webp" type="image/webp" />
      <img
        src="/img/logo-siegel-96.png"
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        decoding="async"
        className={className}
        style={{ width: size, height: size }}
      />
    </picture>
  );
}
