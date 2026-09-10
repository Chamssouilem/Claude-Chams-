'use client';

import { useEffect, useState } from 'react';
import { berlinNow, weekInDisplayOrder } from '@/lib/hours';
import { dayName } from '@/lib/hours';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Öffnungszeiten als echte Tabelle. Der heutige Tag wird hervorgehoben —
 * das passiert erst im Browser, weil eine statisch gebaute Seite nicht wissen
 * kann, welcher Tag beim Aufruf ist. Ohne Skript bleibt die Tabelle vollständig
 * lesbar, nur ohne Hervorhebung.
 */
export function HoursTable({ locale, className = '' }: { locale: Locale; className?: string }) {
  const d = t(locale);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(berlinNow().dow);
  }, []);

  return (
    <table className={`w-full text-small ${className}`}>
      <caption className="sr-only">
        {d.find.hoursLabel} — {locale === 'de' ? 'Zeitzone Europe/Berlin' : 'Europe/Berlin time'}
      </caption>
      <tbody>
        {weekInDisplayOrder().map((day) => {
          const isToday = today === day.day;
          return (
            <tr
              key={day.key}
              className={`border-b border-line last:border-b-0 ${isToday ? 'text-cream' : 'text-cream-dim'}`}
            >
              <th
                scope="row"
                className="py-1.5 text-left font-normal"
                aria-current={isToday ? 'date' : undefined}
              >
                {dayName(day.day, locale)}
                {isToday && (
                  <span className="ml-2 rounded-sm bg-ember px-1.5 py-0.5 text-micro font-semibold uppercase tracking-wider text-cream">
                    {d.find.todayLabel}
                  </span>
                )}
              </th>
              <td className="tnum py-1.5 text-right">
                {day.closed ? d.find.closed : `${day.open} – ${day.close}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
