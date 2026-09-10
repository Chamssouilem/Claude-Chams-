/**
 * Alle Symbole als Inline-SVG. Keine Icon-Bibliothek, kein zusätzlicher
 * JavaScript-Ballast, keine Netzwerkanfrage.
 *
 * Bewusst KEINE Markenlogos für Zahlarten (VISA, Mastercard, PayPal …): deren
 * Verwendung ist markenrechtlich an Vorgaben gebunden. Wir zeigen die Namen als
 * Text plus ein neutrales Kartensymbol — rechtlich unbedenklich und für
 * Screenreader ohnehin verständlicher.
 */
import type { ComponentType } from 'react';

export type IconProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
  focusable: 'false' as const,
});

export function IconBag({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 8V6a3 3 0 1 1 6 0v2" />
    </svg>
  );
}

export function IconScooter({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="6" cy="17.5" r="2.5" />
      <circle cx="18" cy="17.5" r="2.5" />
      <path d="M8.5 17.5h7M18 15V8h-3M15 5h2.5" />
      <path d="M6 15c0-3 2-5 5-5h4" />
    </svg>
  );
}

export function IconTray({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 15h18M4.5 15a7.5 7.5 0 0 1 15 0" />
      <path d="M12 7.5V5.5M5 18.5h14" />
    </svg>
  );
}

export function IconSparkle({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18.1l-1.8-5.5L4.7 10.8 10.2 9 12 3.5Z" />
      <path d="M18.5 16.5 19.3 19l2.5.8-2.5.8-.8 2.5" />
    </svg>
  );
}

export function IconSun({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

export function IconSnowflake({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8" />
      <path d="M9.5 4.5 12 6.8l2.5-2.3M9.5 19.5 12 17.2l2.5 2.3" />
    </svg>
  );
}

export function IconAccessible({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="4.6" r="1.9" />
      <path d="M12 8v5h4.2l2.3 5M12 13H8.4l-1.6 6" />
      <path d="M6.2 12.4A6.4 6.4 0 1 0 15 20.6" />
    </svg>
  );
}

export function IconPaw({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <ellipse cx="7.4" cy="9.2" rx="1.9" ry="2.4" />
      <ellipse cx="12" cy="7.4" rx="1.9" ry="2.5" />
      <ellipse cx="16.6" cy="9.2" rx="1.9" ry="2.4" />
      <path d="M12 12.4c-2.6 0-4.8 2-4.8 4.2 0 1.6 1.3 2.6 2.9 2.4 1.3-.2 2.5-.2 3.8 0 1.6.2 2.9-.8 2.9-2.4 0-2.2-2.2-4.2-4.8-4.2Z" />
    </svg>
  );
}

export function IconSmoke({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="13.5" width="14" height="4" rx="1" />
      <path d="M17 13.5h4v4h-4M14 4.5c1.8.9 1.8 2.6 0 3.5s-1.8 2.6 0 3.5" />
    </svg>
  );
}

export function IconCar({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 16v2.5M20 16v2.5" />
      <path d="M3.5 15.5v-3l1.9-4.4A2 2 0 0 1 7.2 6.8h9.6a2 2 0 0 1 1.8 1.3l1.9 4.4v3a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1Z" />
      <path d="M4 12.5h16M7 15.5h.01M17 15.5h.01" />
    </svg>
  );
}

export function IconPhone({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.2 3.5h3l1.5 3.8-2 1.4a12 12 0 0 0 6.6 6.6l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function IconMail({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
      <path d="m3.4 6.6 8.6 6 8.6-6" />
    </svg>
  );
}

export function IconPin({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21.2s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </svg>
  );
}

export function IconCheck({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconPlus({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconClose({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconSearch({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function IconChevron({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m8.5 5 7 7-7 7" />
    </svg>
  );
}

export function IconArrowRight({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconMenuBars({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconCart({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 4.5h2.2l2.3 10.6a1.6 1.6 0 0 0 1.6 1.3h7.8a1.6 1.6 0 0 0 1.6-1.2l1.7-6.6H6" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </svg>
  );
}

export function IconCard({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.6" y="5.5" width="18.8" height="13" rx="2" />
      <path d="M2.6 10h18.8M6 14.6h3.5" />
    </svg>
  );
}

export function IconExternal({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" />
    </svg>
  );
}

export function IconWhatsApp({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 18.02h-.01c-1.45 0-2.88-.39-4.13-1.13l-.3-.18-3.07.8.82-3-.19-.31a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.14 8.14 0 0 1 5.79 2.4 8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.18-8.26 8.18Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42l-.47-.01c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.19 1.1.16 1.51.1.46-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}

export function IconInstagram({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.02H7.9v-2.92h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.92h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

/** Ordnet die Ausstattungs-IDs aus business.json den Symbolen zu. */
export const AMENITY_ICONS: Record<string, ComponentType<IconProps>> = {
  bag: IconBag,
  scooter: IconScooter,
  tray: IconTray,
  sparkle: IconSparkle,
  sun: IconSun,
  snowflake: IconSnowflake,
  accessible: IconAccessible,
  paw: IconPaw,
  smoke: IconSmoke,
  car: IconCar,
};
