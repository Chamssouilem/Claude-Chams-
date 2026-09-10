/**
 * Wandelt den Warenkorb in eine Nachricht um, die im Laden gelesen wird.
 *
 * Das ist der eigentliche Kern des Umbaus: Der Inhaber nimmt Bestellungen
 * ohnehin über WhatsApp an. Statt ihm ein neues System aufzuzwingen, liefern
 * wir ihm dieselbe Nachricht wie bisher — nur vollständig, sortiert und ohne
 * Rückfragen. Die Nachricht ist immer auf Deutsch, unabhängig von der
 * Sprachwahl der Besucherin: Lesen muss sie die Küche.
 */
import { business, getItem, menuDeal, sideItems, drinkOptions, menuSurcharge } from './data';
import { priceDe } from './format';
import { lineTotal, lineUnitPrice, cartTotal } from './pricing';
import type { CartLine, OrderMode } from './types';

export interface OrderDetails {
  mode: OrderMode;
  /** ISO-Zeitpunkt "JJJJ-MM-TTTHH:MM" oder leer für „so schnell wie möglich“. */
  time: string;
  name: string;
  phone: string;
  street?: string;
  zip?: string;
  city?: string;
  addressNote?: string;
  note?: string;
}

const MODE_LABEL: Record<OrderMode, string> = {
  abholen: 'Abholung',
  liefern: 'Lieferung',
  'vor-ort': 'Vor Ort essen',
};

function sideName(id?: string): string {
  return sideItems.find((s) => s.id === id)?.name ?? '';
}

function drinkName(id?: string): string {
  return drinkOptions.find((dr) => dr.id === id)?.name ?? '';
}

/** Eine Warenkorbzeile als lesbarer Block, inklusive aller Optionen. */
export function describeLine(line: CartLine): string[] {
  const rows: string[] = [];
  const head = `${line.qty}× ${line.name}${line.kids ? ' (Kids)' : ''}`;
  rows.push(`${head}  —  ${priceDe(lineTotal(line))}`);

  if (line.variantName) {
    rows.push(`   • ${line.variantName}`);
  }

  if (line.asMenu) {
    const parts = [sideName(line.menuSideId), drinkName(line.menuDrinkId)].filter(Boolean);
    rows.push(
      `   • Als Menü (${parts.join(' + ')}) ${priceDe(menuSurcharge(line.menuSideId))}`,
    );
  }

  for (const id of line.addonIds) {
    const item = getItem(id);
    if (item) rows.push(`   • Extra: ${item.name} ${priceDe(item.price)}`);
  }

  for (const id of line.sauceIds) {
    const item = getItem(id);
    if (item) rows.push(`   • Sauce: ${item.name} ${priceDe(item.price)}`);
  }

  if (line.note?.trim()) {
    rows.push(`   • Hinweis: ${line.note.trim()}`);
  }

  if (line.qty > 1) {
    rows.push(`   (${priceDe(lineUnitPrice(line))} pro Stück)`);
  }

  return rows;
}

function formatTime(time: string): string {
  if (!time) return 'so schnell wie möglich';
  const [date, hhmm] = time.split('T');
  if (!date || !hhmm) return time;
  const [y, m, d] = date.split('-');
  const today = new Date().toISOString().slice(0, 10);
  return date === today ? `heute ${hhmm} Uhr` : `${d}.${m}.${y} um ${hhmm} Uhr`;
}

/** Die vollständige Bestellnachricht als Klartext. */
export function buildOrderMessage(lines: CartLine[], details: OrderDetails): string {
  const out: string[] = [];

  out.push('Hallo Patties & Berries, ich möchte gerne bestellen:');
  out.push('');

  for (const line of lines) {
    out.push(...describeLine(line));
  }

  out.push('');
  out.push(`Summe: ${priceDe(cartTotal(lines))}`);
  out.push('');
  out.push(`Art: ${MODE_LABEL[details.mode]}`);
  out.push(`Zeit: ${formatTime(details.time)}`);
  out.push(`Name: ${details.name.trim()}`);
  out.push(`Telefon: ${details.phone.trim()}`);

  if (details.mode === 'liefern') {
    const address = [
      details.street?.trim(),
      [details.zip?.trim(), details.city?.trim()].filter(Boolean).join(' '),
    ]
      .filter(Boolean)
      .join(', ');
    out.push(`Adresse: ${address}`);
    if (details.addressNote?.trim()) out.push(`Hinweis Lieferung: ${details.addressNote.trim()}`);
  }

  if (details.note?.trim()) {
    out.push(`Anmerkung: ${details.note.trim()}`);
  }

  out.push('');
  out.push('(Gesendet über pattiesandberries.de — bitte kurz bestätigen.)');

  return out.join('\n');
}

/** wa.me-Link mit vorausgefüllter Nachricht. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** mailto-Link als Alternative, falls jemand kein WhatsApp nutzt. */
export function mailtoHref(message: string, details: OrderDetails): string {
  const subject = `Bestellung ${details.name.trim() || ''} — ${MODE_LABEL[details.mode]}`.trim();
  return `mailto:${business.contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;
}

export { MODE_LABEL, menuDeal };
