import { Photo } from './Photo';
import { Stamp } from './Seal';
import { Reveal } from './Reveal';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

const PHOTO_IDS = ['handwerk-fleisch', 'handwerk-brot', 'handwerk-grill'] as const;

/**
 * Die Stempel zu den drei Panels. Sie tragen genau die Behauptungen, die den
 * Preis rechtfertigen — dorthin gesetzt, wo im Metzgerhandwerk der Prüfstempel
 * sitzt. Der Text steht hier und nicht in der Übersetzungsdatei, weil er Teil
 * der Grafik ist und in beiden Sprachen gleich funktioniert.
 */
const STAMPS = [
  { top: '· TÄGLICH GEWOLFT ·', center: '01', bottom: '· GANZE CUTS ·', tilt: -9 },
  { top: '· JEDEN MORGEN ·', center: '02', bottom: '· VOM BÄCKER ·', tilt: 7 },
  { top: '· OHNE AUSNAHME ·', center: '03', bottom: '· 100 % HELAL ·', tilt: -5 },
] as const;

/**
 * „Unser Handwerk“ — der Abschnitt, der den Preis trägt.
 *
 * Die schwächste Bewertung des Ladens ist das Preis-Leistungs-Empfinden. Das
 * ist kein Preisproblem, sondern ein Sichtbarkeitsproblem: Niemand sieht den
 * Fleischwolf. Also zeigen wir ihn — groß, mit Bild und mit dem Satz, der
 * erklärt, was der Unterschied zu vorgewolfter Ware ist.
 *
 * Das Raster ist bewusst versetzt: die mittlere Spalte sitzt tiefer, damit die
 * Reihe nicht wie eine Produktkachelwand wirkt.
 */
export function Handwerk({ locale }: { locale: Locale }) {
  const x = c(locale);

  return (
    <section id="handwerk" className="surface-night section border-b border-line" aria-labelledby="handwerk-title">
      <div className="shell">
        <Reveal>
          <p className="kicker">{x.handwerk.kicker}</p>
          <h2 id="handwerk-title" className="mt-4 max-w-[20ch]">
            {x.handwerk.h2}
          </h2>
          <p className="lead mt-6">{x.handwerk.intro}</p>
        </Reveal>

        <div className="mt-block grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8">
          {x.handwerk.panels.map((panel, i) => (
            <Reveal
              key={panel.title}
              delay={i * 90}
              as="article"
              // Versatz: die mittlere Spalte sitzt tiefer.
              className={i === 1 ? 'md:mt-14' : i === 2 ? 'md:mt-7' : ''}
            >
              <Photo
                id={PHOTO_IDS[i]}
                locale={locale}
                sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full"
              />
              <div className="mt-5 flex items-start gap-4">
                <Stamp
                  arcTop={STAMPS[i].top}
                  center={STAMPS[i].center}
                  arcBottom={STAMPS[i].bottom}
                  tilt={STAMPS[i].tilt}
                  size={104}
                  className="-mt-2 shrink-0 text-brass"
                />
                <div>
                  <h3 className="text-h3">{panel.title}</h3>
                  <p className="mt-3 font-medium text-cream">{panel.lead}</p>
                  <p className="mt-3 text-small leading-relaxed text-cream-dim">{panel.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
