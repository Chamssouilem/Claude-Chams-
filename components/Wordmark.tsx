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

/** Das Bildzeichen — dieselbe Form wie public/logo.svg. */
export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M14 22a18 10 0 0 1 36 0v1a1 1 0 0 1-1 1H15a1 1 0 0 1-1-1Z" fill="var(--pb-cream)" />
      <rect x="12" y="27" width="40" height="9" rx="4.5" fill="var(--pb-ember)" />
      <path
        d="M15 40h34a1 1 0 0 1 1 1v2a7 7 0 0 1-7 7H21a7 7 0 0 1-7-7v-2a1 1 0 0 1 1-1Z"
        fill="var(--pb-cream)"
      />
      <circle cx="47" cy="17" r="4.5" fill="var(--pb-berry)" />
    </svg>
  );
}
