/**
 * Öffnungszeiten-Logik. Rechnet immer in Europe/Berlin, egal in welcher
 * Zeitzone das Gerät der Besucherin steht — jemand im Urlaub soll nicht
 * „geöffnet“ lesen, wenn der Laden in Moers längst zu hat.
 */
import { business } from './data';
import type { DayHours, HoursException, Locale } from './types';

const TZ = business.hours.timezone; // Europe/Berlin

export interface BerlinTime {
  /** ISO-Datum in Berlin, z. B. "2026-09-10". */
  date: string;
  /** 0 = Sonntag … 6 = Samstag. */
  dow: number;
  /** Minuten seit Mitternacht. */
  minutes: number;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

/** Aktuelle Wanduhrzeit in Berlin. */
export function berlinNow(now: Date = new Date()): BerlinTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  // Intl liefert bei hour12:false gelegentlich "24" für Mitternacht.
  const hour = parseInt(get('hour'), 10) % 24;

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    dow: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: hour * 60 + parseInt(get('minute'), 10),
  };
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10));
  return h * 60 + m;
}

export function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Datum n Tage nach einem ISO-Datum, ohne Zeitzonen-Drift. */
function addDays(isoDate: string, n: number): string {
  const [y, m, d] = isoDate.split('-').map((v) => parseInt(v, 10));
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

function findException(isoDate: string): HoursException | undefined {
  return business.hours.exceptions.find((e) => e.date === isoDate);
}

export interface EffectiveDay {
  closed: boolean;
  open?: string;
  close?: string;
  exception?: HoursException;
}

/** Öffnungszeiten für ein konkretes Datum, Ausnahmen haben Vorrang. */
export function hoursForDate(isoDate: string, dow: number): EffectiveDay {
  const exception = findException(isoDate);
  if (exception) {
    if (exception.closed) return { closed: true, exception };
    return {
      closed: false,
      open: exception.open ?? regularDay(dow)?.open,
      close: exception.close ?? regularDay(dow)?.close,
      exception,
    };
  }
  const regular = regularDay(dow);
  if (!regular || regular.closed) return { closed: true };
  return { closed: false, open: regular.open, close: regular.close };
}

export function regularDay(dow: number): DayHours | undefined {
  return business.hours.week.find((d) => d.day === dow);
}

export type StatusKind =
  | 'open'
  | 'closing-soon'
  | 'opens-today'
  | 'closed';

export interface OpenStatus {
  kind: StatusKind;
  /** Schlusszeit, wenn gerade geöffnet. */
  closesAt?: string;
  /** Nächste Öffnungszeit, wenn geschlossen. */
  opensAt?: string;
  /** 0 = heute, 1 = morgen, sonst Wochentag-Index der nächsten Öffnung. */
  opensInDays?: number;
  opensDow?: number;
  minutesToClose?: number;
  note?: string;
}

/** Wie lange vor Ladenschluss der Hinweis „schließt bald“ erscheint. */
const CLOSING_SOON_MINUTES = 30;

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const t = berlinNow(now);
  const today = hoursForDate(t.date, t.dow);

  if (!today.closed && today.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);

    if (t.minutes < open) {
      return { kind: 'opens-today', opensAt: today.open, opensInDays: 0, opensDow: t.dow };
    }
    if (t.minutes < close) {
      const left = close - t.minutes;
      return {
        kind: left <= CLOSING_SOON_MINUTES ? 'closing-soon' : 'open',
        closesAt: today.close,
        minutesToClose: left,
      };
    }
  }

  // Geschlossen — nächste Öffnung in den kommenden sieben Tagen suchen.
  for (let i = 1; i <= 7; i++) {
    const date = addDays(t.date, i);
    const dow = (t.dow + i) % 7;
    const day = hoursForDate(date, dow);
    if (!day.closed && day.open) {
      return {
        kind: 'closed',
        opensAt: day.open,
        opensInDays: i,
        opensDow: dow,
        note: today.exception?.note?.de,
      };
    }
  }
  return { kind: 'closed' };
}

const DOW_LONG: Record<Locale, string[]> = {
  de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export function dayName(dow: number, locale: Locale): string {
  return DOW_LONG[locale][dow] ?? '';
}

/** Wochentage in der Reihenfolge Montag … Sonntag für die Zeiten-Tabelle. */
export function weekInDisplayOrder(): DayHours[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return order
    .map((d) => business.hours.week.find((w) => w.day === d))
    .filter((d): d is DayHours => Boolean(d));
}

/**
 * Öffnungszeiten zu Blöcken zusammenfassen ("Mo – Do 15:00 – 21:30").
 * Wird für Schema.org und die kompakte Anzeige im Footer gebraucht.
 */
export function groupedHours(locale: Locale): Array<{ label: string; time: string }> {
  const days = weekInDisplayOrder();
  const groups: Array<{ days: DayHours[]; open: string; close: string; closed: boolean }> = [];

  for (const d of days) {
    const last = groups[groups.length - 1];
    if (last && last.closed === d.closed && last.open === d.open && last.close === d.close) {
      last.days.push(d);
    } else {
      groups.push({ days: [d], open: d.open, close: d.close, closed: d.closed });
    }
  }

  const short = (dow: number) => dayName(dow, locale).slice(0, locale === 'de' ? 2 : 3);
  return groups.map((g) => ({
    label:
      g.days.length === 1
        ? dayName(g.days[0].day, locale)
        : `${short(g.days[0].day)} – ${short(g.days[g.days.length - 1].day)}`,
    time: g.closed
      ? locale === 'de' ? 'geschlossen' : 'closed'
      : `${g.open} – ${g.close}`,
  }));
}

/** Buchbare Abholzeiten für heute (bzw. den nächsten Öffnungstag), im 15-Minuten-Raster. */
export function pickupSlots(now: Date = new Date(), leadMinutes = 20): Array<{ value: string; label: string }> {
  const t = berlinNow(now);
  const slots: Array<{ value: string; label: string }> = [];

  for (let i = 0; i <= 7 && slots.length === 0; i++) {
    const date = addDays(t.date, i);
    const dow = (t.dow + i) % 7;
    const day = hoursForDate(date, dow);
    if (day.closed || !day.open || !day.close) continue;

    const open = toMinutes(day.open);
    const close = toMinutes(day.close);
    // Letzte Bestellung 15 Minuten vor Schluss, sonst steht jemand vor der Tür.
    const lastOrder = close - 15;
    const earliest = i === 0 ? Math.max(open, t.minutes + leadMinutes) : open;
    const start = Math.ceil(earliest / 15) * 15;

    for (let m = start; m <= lastOrder; m += 15) {
      slots.push({
        value: `${date}T${fromMinutes(m)}`,
        label: i === 0 ? fromMinutes(m) : `${fromMinutes(m)} (${date.slice(8, 10)}.${date.slice(5, 7)}.)`,
      });
    }
  }
  return slots;
}
