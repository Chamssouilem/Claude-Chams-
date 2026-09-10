'use client';

import { useEffect, useState } from 'react';
import { dayName, getOpenStatus, type OpenStatus } from '@/lib/hours';
import { fill, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * „Jetzt geöffnet — bis 21:30“ / „Heute ab 15:00“.
 *
 * Die Zeit wird immer in Europe/Berlin gerechnet (siehe lib/hours.ts). Der
 * Status kann beim statischen Export nicht vorab berechnet werden, deshalb
 * rendert der Server einen Platzhalter gleicher Größe und der Browser ersetzt
 * ihn nach dem Laden — dadurch springt nichts (CLS) und es gibt keinen
 * Hydration-Konflikt.
 */
export function StatusPill({ locale, className = '' }: { locale: Locale; className?: string }) {
  const d = t(locale);
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    // Einmal pro Minute nachrechnen, damit „schließt in 12 Min.“ stimmt.
    const timer = window.setInterval(update, 60_000);
    const onVisible = () => document.visibilityState === 'visible' && update();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  if (!status) {
    return (
      <span className={`status-pill text-cream-dim ${className}`}>
        <span className="status-dot bg-line-strong" aria-hidden="true" />
        <span className="sr-only">{d.status.loading}</span>
        <span aria-hidden="true" className="tnum opacity-50">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </span>
    );
  }

  const label = statusLabel(status, locale);

  return (
    <span className={`status-pill ${className}`}>
      <span className="status-dot" data-state={status.kind} aria-hidden="true" />
      {/* aria-live, damit ein Screenreader den Wechsel „geöffnet → schließt bald“ mitbekommt */}
      <span aria-live="polite">{label}</span>
    </span>
  );
}

export function statusLabel(status: OpenStatus, locale: Locale): string {
  const d = t(locale);
  switch (status.kind) {
    case 'open':
      return fill(d.status.open, { time: status.closesAt ?? '' });
    case 'closing-soon':
      return fill(d.status.closingSoon, {
        min: status.minutesToClose ?? 0,
        time: status.closesAt ?? '',
      });
    case 'opens-today':
      return fill(d.status.opensToday, { time: status.opensAt ?? '' });
    case 'closed':
      if (!status.opensAt) return d.status.closed;
      if (status.opensInDays === 1) {
        return fill(d.status.opensTomorrow, { time: status.opensAt });
      }
      return fill(d.status.opensOn, {
        day: dayName(status.opensDow ?? 0, locale),
        time: status.opensAt,
      });
    default:
      return d.status.closed;
  }
}
