import { business } from '@/lib/data';
import { count, rating } from '@/lib/format';
import { fill } from '@/lib/i18n';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

/**
 * Schmales Band direkt unter dem Einstieg.
 *
 * Absichtlich zurückhaltend: eine Zeile, keine Abzeichen, keine goldenen
 * Sterngrafiken. Wer fünf Auszeichnungen zeigt, wirkt bedürftig; wer eine
 * Zahl nennt und weitergeht, wirkt sicher.
 */
export function TrustStrip({ locale }: { locale: Locale }) {
  const x = c(locale);
  const g = business.ratings.google;

  const facts = [
    <>
      <span className="font-semibold text-cream" aria-hidden="true">
        {rating(g.value, locale)} ★
      </span>
      <span className="sr-only">
        {rating(g.value, locale)} {locale === 'de' ? 'von 5 Sternen' : 'out of 5 stars'}
      </span>
    </>,
    <>{fill(x.trust.googleReviews, { count: count(g.count, locale) })}</>,
    <>{x.trust.halal}</>,
    <>{x.trust.ground}</>,
    <>{x.trust.local}</>,
  ];

  return (
    <section aria-label={x.trust.label} className="border-b border-line bg-ink-2">
      <div className="shell">
        <ul className="no-scrollbar flex items-center gap-x-3 gap-y-1 overflow-x-auto py-3.5 text-small text-cream-dim md:flex-wrap md:justify-center md:overflow-visible">
          {facts.map((fact, i) => (
            <li key={i} className="flex shrink-0 items-center gap-3 whitespace-nowrap md:shrink">
              {fact}
              {i < facts.length - 1 && (
                <span aria-hidden="true" className="text-line-strong">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
