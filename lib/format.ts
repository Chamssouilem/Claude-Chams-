import type { Locale } from './types';

const FORMATTERS: Record<Locale, Intl.NumberFormat> = {
  de: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
  en: new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }),
};

/** Preis in der Schreibweise der jeweiligen Sprache: 10,90 € bzw. €10.90 */
export function price(value: number, locale: Locale = 'de'): string {
  return FORMATTERS[locale].format(value);
}

/** Immer deutsche Schreibweise — für die WhatsApp-Nachricht an den Laden. */
export function priceDe(value: number): string {
  return FORMATTERS.de.format(value);
}

/** Aufpreis mit Vorzeichen: „+ 2,50 €“ */
export function surcharge(value: number, locale: Locale = 'de'): string {
  return `+ ${price(value, locale)}`;
}

/** Zahl mit deutschem Tausenderpunkt: 1.277 */
export function count(value: number, locale: Locale = 'de'): string {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(value);
}

/** Bewertung mit einer Nachkommastelle: 4,7 */
export function rating(value: number, locale: Locale = 'de'): string {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}
