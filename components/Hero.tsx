import { Photo } from './Photo';
import { Seal } from './Seal';
import { StatusPill } from './StatusPill';
import { IconArrowRight, IconPin } from './Icons';
import { business } from '@/lib/data';
import { t } from '@/lib/i18n';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

/**
 * Der Einstieg.
 *
 * Drei Entscheidungen, die zusammenhängen:
 *
 * 1. Die Überschrift steht auf ruhigem dunklem Grund, nicht auf dem Foto.
 *    Text über Bild heißt immer, die Lesbarkeit der Helligkeit eines Fotos
 *    auszuliefern, das niemand kontrolliert. Randlos wird es trotzdem — das
 *    Bild läuft rechts aus dem Raster heraus.
 *
 * 2. Von unten kommt der warme Schein der heißen Platte (.glow-griddle). Der
 *    Laden wirbt mit dem Grill; also leuchtet der Grill die Seite aus.
 *
 * 3. Das Logo sitzt als Siegel schräg auf der Ecke des Bildes, wie ein
 *    aufgedrückter Stempel. Damit bekommt der runde Anstecker eine Aufgabe,
 *    statt nur klein oben links zu kleben.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = t(locale);
  const x = c(locale);

  return (
    <section
      className="surface-night glow-griddle relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="shell grid items-center gap-block pb-block pt-10 md:grid-cols-12 md:gap-8 md:pb-0 md:pt-14 lg:pt-20">
        <div className="hero-col md:col-span-6 md:pb-24 lg:pb-28">
          <StatusPill locale={locale} />

          {/*
            Der Umbruch ist gesetzt, nicht dem Zufall überlassen: drei Zeilen,
            drei Behauptungen, die letzte im Akzent. Bewusst OHNE zusätzliche
            Vorlesefassung — die sichtbaren Zeilen ergeben für Screenreader
            ohnehin einen Satz; ein zweiter, versteckter Text würde die
            Überschrift doppelt vorlesen lassen.
          */}
          <h1 id="hero-title" className="hero-title mt-5">
            {x.hero.h1Lines.map((line, i) => (
              <span
                key={line}
                className={`block${i === x.hero.h1Lines.length - 1 ? ' text-ember-text' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="lead mt-6">{x.hero.sub}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bestellen" className="btn btn-primary no-underline">
              {d.common.orderNow}
              <IconArrowRight size={18} />
            </a>
            <a href="#speisekarte" className="btn btn-secondary no-underline">
              {d.common.viewMenu}
            </a>
          </div>

          <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
            <IconPin size={16} className="shrink-0" />
            <span>
              {business.address.street}, {business.address.postalCode} {business.address.city}
            </span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <a
              href={`tel:${business.contact.phoneE164}`}
              className="tnum font-medium text-cream-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-ember-bright"
            >
              {business.contact.phoneDisplay}
            </a>
          </p>
        </div>

        {/* Läuft rechts über den Rand hinaus — randlos ohne Textkontrast zu opfern. */}
        <div className="relative md:col-span-6 md:-mr-[max(var(--gutter),calc((100vw-var(--max-w))/2+var(--gutter)))]">
          <Photo
            id="hero-burger"
            locale={locale}
            priority
            sizes="(min-width: 900px) 55vw, 100vw"
            className="w-full"
          />

          {/*
            Das Siegel sitzt auf halber Höhe an der linken Bildkante — dort, wo
            Textspalte und Foto aneinanderstoßen. Die Drehung bleibt am Bild
            selbst; die Positionierung übernimmt dieser Wrapper, weil Tailwinds
            transform-Hilfsklassen die Drehung sonst überschreiben würden.
          */}
          <div className="absolute -left-5 top-1/2 z-10 -translate-y-1/2 sm:-left-8 md:-left-12">
            <Seal
              locale={locale}
              priority
              size={256}
              className="h-[92px] w-[92px] sm:h-[124px] sm:w-[124px] md:h-[148px] md:w-[148px]"
            />
          </div>
        </div>
      </div>

      <hr className="rule-brass" />
    </section>
  );
}
