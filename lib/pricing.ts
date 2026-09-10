/**
 * Preisberechnung für den Warenkorb. Bewusst als reine Funktionen ohne React,
 * damit sich die Zahlen jederzeit einzeln nachrechnen lassen.
 */
import { getItem, menuSurcharge, round2 } from './data';
import type { CartLine } from './types';

/** Preis eines Artikels für ein Stück, inklusive aller gewählten Optionen. */
export function lineUnitPrice(line: CartLine): number {
  let sum = line.unitBase;

  for (const id of line.addonIds) {
    sum += getItem(id)?.price ?? 0;
  }
  for (const id of line.sauceIds) {
    sum += getItem(id)?.price ?? 0;
  }
  if (line.asMenu) {
    sum += menuSurcharge(line.menuSideId);
  }
  return round2(sum);
}

export function lineTotal(line: CartLine): number {
  return round2(lineUnitPrice(line) * line.qty);
}

export function cartTotal(lines: CartLine[]): number {
  return round2(lines.reduce((sum, l) => sum + lineTotal(l), 0));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

/**
 * Stabile Kennung für eine Konfiguration. Zwei identisch zusammengestellte
 * Burger landen dadurch in einer Zeile, unterschiedlich belegte nicht.
 */
export function configKey(line: Omit<CartLine, 'lineId' | 'qty'>): string {
  return [
    line.itemId,
    line.kids ? 'kids' : '',
    [...line.addonIds].sort().join('+'),
    [...line.sauceIds].sort().join('+'),
    line.asMenu ? `menu:${line.menuSideId ?? ''}:${line.menuDrinkId ?? ''}` : '',
    line.variantId ?? '',
    (line.note ?? '').trim().toLowerCase(),
  ].join('|');
}
