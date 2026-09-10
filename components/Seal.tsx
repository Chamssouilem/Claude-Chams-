import type { Locale } from '@/lib/types';

/**
 * Das Siegel — das echte Logo von Patties & Berries.
 *
 * Das vorhandene Logo ist ein runder Anstecker. In einer Umgebung, die nach
 * Metzgerei und Handarbeit aussehen soll, liest sich eine solche Form von
 * selbst als STEMPEL: der Abdruck auf dem Packpapier, das Prüfsiegel am
 * Fleisch. Genau daraus macht diese Gestaltung ihren Hauptmotiv — leicht
 * gedreht aufgesetzt, nicht brav zentriert.
 *
 * Die Datei ist das Original des Ladens, nur freigestellt und in moderne
 * Formate gebracht. Am Logo selbst wurde nichts geändert: Wiedererkennung
 * ist mehr wert als jede Verbesserung, die niemand bestellt hat.
 */
export function Seal({
  /** Wählt die geladene Dateigröße. Die tatsächliche Anzeigegröße kommt aus className. */
  size = 160,
  locale,
  className = '',
  priority = false,
}: {
  size?: number;
  locale: Locale;
  className?: string;
  priority?: boolean;
}) {
  // Drei Auflösungen liegen bereit; geladen wird die kleinste, die reicht.
  const variant = size <= 96 ? '-96' : size <= 256 ? '-256' : '';
  const intrinsic = size <= 96 ? 96 : size <= 256 ? 256 : 640;

  return (
    <picture>
      <source srcSet={`/img/logo-siegel${variant}.webp`} type="image/webp" />
      <img
        src={`/img/logo-siegel${variant}.png`}
        alt={
          locale === 'de'
            ? 'Logo von Patties & Berries: ein runder roter Anstecker mit goldenem Rand und einem gezeichneten Doppel-Cheeseburger.'
            : 'Patties & Berries logo: a round red badge with a gold rim and an illustrated double cheeseburger.'
        }
        width={intrinsic}
        height={intrinsic}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        /* Größe ausschließlich über Klassen — so lassen sich Bruchpunkte setzen,
           was ein style-Attribut verhindern würde. */
        className={`seal ${className}`}
      />
    </picture>
  );
}

/**
 * Der Textstempel — dieselbe Kreisform, aber leer und nur mit Schrift.
 *
 * Trägt die Behauptungen, die den Preis rechtfertigen, dorthin, wo im
 * Metzgerhandwerk der Prüfstempel sitzt. Rein typografisch aufgebaut, damit
 * er in jeder Größe scharf bleibt und der Text vorgelesen werden kann.
 */
export function Stamp({
  arcTop,
  center,
  arcBottom,
  size = 132,
  className = '',
  tilt = -8,
}: {
  arcTop: string;
  center: string;
  arcBottom?: string;
  size?: number;
  className?: string;
  /** Drehung in Grad — ein Stempel sitzt nie ganz gerade. */
  tilt?: number;
}) {
  // Stabile, kollisionsfreie Kennung aus dem Text ableiten.
  const slug = arcTop.replace(/[^a-z0-9]+/gi, '').toLowerCase().slice(0, 18);
  const topId = `arc-t-${slug}`;
  const bottomId = `arc-b-${slug}`;

  const R = 100;
  const rText = 82;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${tilt}deg)` }}
      role="img"
      aria-label={`${arcTop}. ${center}.${arcBottom ? ' ' + arcBottom + '.' : ''}`}
    >
      <defs>
        {/* Im Uhrzeigersinn — Text läuft oben mit der Rundung mit */}
        <path
          id={topId}
          fill="none"
          d={`M100,100 m-${rText},0 a${rText},${rText} 0 1,1 ${rText * 2},0 a${rText},${rText} 0 1,1 -${rText * 2},0`}
        />
        {/* Gegen den Uhrzeigersinn — sonst stünde die untere Zeile auf dem Kopf */}
        <path
          id={bottomId}
          fill="none"
          d={`M100,100 m-${rText},0 a${rText},${rText} 0 0,0 ${rText * 2},0 a${rText},${rText} 0 0,0 -${rText * 2},0`}
        />
      </defs>

      <circle cx="100" cy="100" r={R - 3} fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
      <circle cx="100" cy="100" r={R - 12} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />

      <text
        fill="currentColor"
        fontSize="13.5"
        fontWeight="600"
        letterSpacing="2.4"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <textPath href={`#${topId}`} startOffset="25%" textAnchor="middle">
          {arcTop}
        </textPath>
      </text>

      {arcBottom && (
        <text
          fill="currentColor"
          fontSize="11"
          fontWeight="500"
          letterSpacing="2"
          opacity="0.75"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <textPath href={`#${bottomId}`} startOffset="25%" textAnchor="middle">
            {arcBottom}
          </textPath>
        </text>
      )}

      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="currentColor"
        fontSize="40"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
      >
        {center}
      </text>

      {/* Zwei kurze Striche links und rechts, wie bei einem echten Prägestempel */}
      <path d="M14 100h9M177 100h9" stroke="currentColor" strokeWidth="2" opacity="0.65" />
    </svg>
  );
}
