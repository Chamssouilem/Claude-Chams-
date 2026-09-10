/**
 * Typisierter Zugriff auf die Datendateien. Alle Komponenten importieren aus
 * dieser Datei — so gibt es genau eine Stelle, an der JSON auf Typen trifft.
 */
import businessJson from '@/data/business.json';
import menuJson from '@/data/menu.json';
import reviewsJson from '@/data/reviews.json';
import type {
  BusinessData,
  MenuData,
  MenuItem,
  MenuCategory,
  ReviewsData,
  AllergenId,
} from './types';

export const business = businessJson as unknown as BusinessData;
export const menu = menuJson as unknown as MenuData;
export const reviews = reviewsJson as unknown as ReviewsData;

/** Alle Artikel aller Kategorien, flach. */
export const allItems: MenuItem[] = menu.categories.flatMap((c) => c.items);

const itemIndex = new Map(allItems.map((i) => [i.id, i]));
const categoryOfItem = new Map<string, string>(
  menu.categories.flatMap((c) => c.items.map((i) => [i.id, c.id] as const)),
);

export function getItem(id: string): MenuItem | undefined {
  return itemIndex.get(id);
}

export function getCategoryIdForItem(id: string): string | undefined {
  return categoryOfItem.get(id);
}

export function getCategory(id: string): MenuCategory | undefined {
  return menu.categories.find((c) => c.id === id);
}

/** Quellen für die Optionen in der Bestellstrecke. */
export const addonItems = getCategory('addons')?.items ?? [];
export const sideItems = getCategory('beilagen')?.items ?? [];
export const sauceItems = getCategory('saucen')?.items ?? [];
export const drinkOptions = getCategory('getraenke')?.options ?? [];

/** Burger sind die einzigen Artikel, die Add-ons und Menü-Upgrade erlauben. */
export const burgerItems = getCategory('burger')?.items ?? [];

export const allergenLegend = menu.allergenLegend;
export const additiveLegend = menu.additiveLegend;
export const tagLegend = menu.tagLegend;
export const menuDeal = menu.menuDeal;

export function allergenLabel(id: AllergenId, locale: 'de' | 'en'): string {
  const entry = allergenLegend.find((a) => a.id === id);
  return entry ? entry[locale] : id;
}

export function allergenSymbol(id: AllergenId): string {
  return allergenLegend.find((a) => a.id === id)?.symbol ?? '?';
}

/**
 * Menü-Aufpreis für einen Burger inkl. Beilagen-Differenz.
 * Basis ist menuDeal.surcharge (Standard-Beilage + Getränk zum Menü-Preis);
 * teurere Beilagen kosten die Differenz zum Menü-Preis der Standard-Beilage.
 */
export function menuSurcharge(sideId?: string): number {
  const base = menuDeal.surcharge;
  if (!sideId || sideId === menuDeal.defaultSideId) return base;
  const chosen = sideItems.find((s) => s.id === sideId);
  const standard = sideItems.find((s) => s.id === menuDeal.defaultSideId);
  if (!chosen?.menuPrice || !standard?.menuPrice) return base;
  return round2(base + (chosen.menuPrice - standard.menuPrice));
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
