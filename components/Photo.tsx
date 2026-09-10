import { getPhoto } from '@/lib/photos';
import type { Locale } from '@/lib/types';

interface PhotoProps {
  /** ID aus data/photos.json */
  id: string;
  locale: Locale;
  className?: string;
  /** Überschreibt die Priorität aus dem Manifest (erstes Bild im Viewport). */
  priority?: boolean;
  /** sizes-Attribut für responsive Auslieferung. */
  sizes?: string;
}

/**
 * Ein Bildplatz.
 *
 * Solange in data/photos.json kein 'src' hinterlegt ist, erscheint ein
 * sichtbar beschrifteter Platzhalter mit den exakten Maßen und der Beschreibung
 * der benötigten Aufnahme. Das ist Absicht: Für einen Laden, der mit Frische
 * wirbt, sind Stock- oder KI-Bilder der schnellste Weg, Vertrauen zu verlieren.
 * Lieber eine ehrliche Lücke als ein falsches Versprechen.
 *
 * Sobald ein Foto vorliegt: Datei nach public/img/ legen und 'src' auf den
 * Pfad OHNE Endung setzen. Dann werden .avif, .webp und .jpg in dieser
 * Reihenfolge angeboten.
 */
export function Photo({ id, locale, className = '', priority, sizes }: PhotoProps) {
  const photo = getPhoto(id);

  if (!photo) {
    // Tippfehler in der ID sollen auffallen, nicht still verschwinden.
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Photo "${id}" fehlt in data/photos.json`);
    }
    return null;
  }

  const ratio = `${photo.width} / ${photo.height}`;
  const isPriority = priority ?? photo.priority;

  if (!photo.src) {
    return (
      <figure
        /* Feste Farben statt Token: Der Platzhalter erscheint sowohl auf
           dunklem Grund als auch auf Metzgerpapier und muss in beiden Fällen
           lesbar bleiben. Ein echtes Foto ist hier später ohnehin dunkel. */
        className={`relative overflow-hidden border border-dashed ${className}`}
        style={{
          aspectRatio: ratio,
          backgroundColor: '#1d1714',
          borderColor: '#4c3f36',
        }}
      >
        {/* Schraffur — rein dekorativ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, var(--pb-line-strong) 0 1px, transparent 1px 11px)',
          }}
        />
        <figcaption className="absolute inset-0 flex flex-col justify-between gap-3 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className="inline-flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#ee7357' }}
            >
              <CameraGlyph />
              {locale === 'de' ? 'Foto fehlt noch' : 'Photo pending'}
            </span>
            <span
              className="tnum shrink-0 rounded-sm border px-2 py-1 text-micro"
              style={{ borderColor: '#4c3f36', backgroundColor: '#14100e', color: '#d6cbb4' }}
            >
              {photo.width} × {photo.height}
            </span>
          </div>
          <p className="max-w-[46ch] text-micro leading-relaxed" style={{ color: '#ac9f8a' }}>
            <span className="font-semibold" style={{ color: '#d6cbb4' }}>
              {photo.id}
            </span>{' '}
            — {photo.shot[locale]}
          </p>
        </figcaption>
      </figure>
    );
  }

  return (
    <picture>
      <source srcSet={`${photo.src}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`${photo.src}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${photo.src}.jpg`}
        alt={photo.alt[locale]}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={isPriority ? 'eager' : 'lazy'}
        decoding={isPriority ? 'sync' : 'async'}
        // @ts-expect-error fetchPriority ist in React 19 gültig, aber noch nicht typisiert
        fetchpriority={isPriority ? 'high' : undefined}
        className={`h-full w-full object-cover ${className}`}
        style={{ aspectRatio: ratio }}
      />
    </picture>
  );
}

function CameraGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7a1 1 0 0 0 .84-.46l.92-1.42A1 1 0 0 1 9.8 3.7h4.4a1 1 0 0 1 .84.42l.92 1.42a1 1 0 0 0 .84.46h1.7A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
