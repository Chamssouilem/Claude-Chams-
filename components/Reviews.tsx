'use client';

import { useState } from 'react';
import { business, reviews } from '@/lib/data';
import { count, rating } from '@/lib/format';
import { fill, t } from '@/lib/i18n';
import { Reveal } from './Reveal';
import { IconChevron, IconExternal } from './Icons';
import type { Locale } from '@/lib/types';

/**
 * Bewertungen.
 *
 * Bewusst OHNE Automatik: Der Wechsel passiert nur, wenn jemand ihn auslöst.
 * Von selbst laufende Zitate sind für Menschen mit Leseschwäche oder
 * eingeschränkter Motorik ein echtes Problem (WCAG 2.2.2), und niemand liest
 * schneller, nur weil eine Karte weiterspringt.
 *
 * Die Zitate stehen in data/reviews.json und müssen wörtlich aus dem echten
 * Google-Profil übernommen werden. Solange dort 'verified' auf false steht,
 * erscheint hier ein deutlicher Warnhinweis für den Betreiber.
 */
export function Reviews({ locale }: { locale: Locale }) {
  const d = t(locale);
  const [index, setIndex] = useState(0);
  const items = reviews.items;
  const current = items[index];
  const g = business.ratings.google;

  if (items.length === 0) return null;

  const go = (next: number) => setIndex((next + items.length) % items.length);

  return (
    <section
      id="bewertungen"
      className="surface-night section border-b border-line"
      aria-labelledby="reviews-title"
    >
      <div className="shell">
        <Reveal>
          <p className="kicker">{d.reviews.kicker}</p>
          <h2 id="reviews-title" className="mt-4">
            {d.reviews.h2}
          </h2>
          <p className="lead mt-6">
            {fill(d.reviews.intro, {
              value: rating(g.value, locale),
              count: count(g.count, locale),
            })}
          </p>
        </Reveal>

        {!reviews.verified && (
          <p className="mt-6 rounded border border-dashed border-signal-closed bg-ink-3 p-4 text-small text-signal-closed">
            <strong className="font-semibold">⚠ </strong>
            {d.reviews.placeholderWarning}
          </p>
        )}

        <Reveal delay={80} className="mt-block">
          <figure className="card p-6 sm:p-10">
            <blockquote>
              {/* Der Wechsel wird angesagt, ohne den Lesefluss zu unterbrechen */}
              <p
                aria-live="polite"
                className="font-display text-h3 leading-[1.15] tracking-tight text-cream"
              >
                „{current.quote[locale]}“
              </p>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
              <span className="font-medium text-cream-dim">{current.author}</span>
              <span aria-hidden="true">·</span>
              <span>
                <span className="sr-only">{d.reviews.sourceLabel}: </span>
                {current.source}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tnum" aria-label={`${current.rating} / 5`}>
                <span aria-hidden="true">{'★'.repeat(current.rating)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={current.date} className="tnum">
                {formatMonth(current.date, locale)}
              </time>
            </figcaption>
          </figure>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-secondary !px-3"
              onClick={() => go(index - 1)}
            >
              <IconChevron size={18} className="rotate-180" />
              <span className="sr-only">{d.reviews.prev}</span>
            </button>
            <button type="button" className="btn btn-secondary !px-3" onClick={() => go(index + 1)}>
              <IconChevron size={18} />
              <span className="sr-only">{d.reviews.next}</span>
            </button>

            <ul className="flex items-center gap-1.5" role="tablist" aria-label={d.reviews.kicker}>
              {items.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className="flex h-11 w-6 items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                        i === index ? 'bg-ember-bright' : 'bg-line-strong'
                      }`}
                    />
                    <span className="sr-only">{fill(d.reviews.goTo, { n: i + 1 })}</span>
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-small text-cream-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-ember-bright"
            >
              {d.reviews.readAll}
              <IconExternal size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function formatMonth(value: string, locale: Locale): string {
  const [y, m] = value.split('-');
  if (!y || !m) return value;
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(y), Number(m) - 1, 1));
}
