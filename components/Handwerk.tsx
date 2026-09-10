import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

const PHOTO_IDS = ['handwerk-fleisch', 'handwerk-brot', 'handwerk-grill'] as const;

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
    <section id="handwerk" className="section border-b border-line" aria-labelledby="handwerk-title">
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
                <span className="panel-number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
