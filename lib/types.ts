/** Gemeinsame Typen für die Datendateien unter data/. */

export type Locale = 'de' | 'en';

/** Zweisprachiger Text. Alle sichtbaren Inhalte aus data/ nutzen diese Form. */
export interface Localized {
  de: string;
  en: string;
}

export type AllergenId =
  | 'gluten'
  | 'milch'
  | 'ei'
  | 'senf'
  | 'sesam'
  | 'soja'
  | 'sulfite'
  | 'nuesse';

export type TagId = 'halal' | 'vegetarisch' | 'scharf' | 'kids';

export interface AllergenLegendEntry extends Localized {
  id: AllergenId;
  symbol: string;
}

export interface AdditiveLegendEntry extends Localized {
  id: string;
}

export interface TagLegendEntry extends Localized {
  id: TagId;
  emoji: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: Localized;
  price: number;
  /** Preis, wenn der Artikel Teil eines Menüs ist (nur Beilagen und Getränke). */
  menuPrice?: number;
  /** Aufpreis, um diesen Burger zum Menü zu machen. */
  menuUpgrade?: number;
  kidsPrice?: number;
  kidsNote?: Localized;
  tags: TagId[];
  allergens: AllergenId[];
  mayContain?: AllergenId[];
  additives?: string[];
  /** Pfad OHNE Dateiendung, z. B. "/img/burger-real-deal". null = Platzhalter. */
  image: string | null;
  featured: boolean;
}

export interface DrinkOption {
  id: string;
  name: string;
  additives?: string[];
  allergens?: AllergenId[];
}

export interface MenuCategory {
  id: string;
  name: Localized;
  intro?: Localized;
  items: MenuItem[];
  options?: DrinkOption[];
  hasMenuPrice?: boolean;
  isAddonSource?: boolean;
  isSideSource?: boolean;
  isDrinkSource?: boolean;
  isSauceSource?: boolean;
}

export interface MenuDeal {
  surcharge: number;
  defaultSideId: string;
  drinkMenuPrice: number;
  label: Localized;
  description: Localized;
}

export interface MenuData {
  _preisstand: string;
  _allergeneGeprueft: boolean;
  allergenLegend: AllergenLegendEntry[];
  additiveLegend: AdditiveLegendEntry[];
  tagLegend: TagLegendEntry[];
  menuDeal: MenuDeal;
  categories: MenuCategory[];
}

export interface DayHours {
  /** 0 = Sonntag … 6 = Samstag (wie Date.getDay()). */
  day: number;
  key: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface HoursException {
  date: string;
  closed: boolean;
  open?: string;
  close?: string;
  note?: Localized;
}

export interface BusinessData {
  name: string;
  legalName: string;
  tagline: Localized;
  url: string;
  previousUrl: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
    countryName: Localized;
  };
  geo: { lat: number; lng: number };
  contact: {
    phoneE164: string;
    phoneDisplay: string;
    whatsappNumber: string;
    email: string;
  };
  social: { instagram: string; instagramHandle: string; facebook: string };
  impressum: {
    operatorName: string;
    operatorNameNeedsReview: boolean;
    vatId: string;
    contentResponsible: string;
    legalForm: Localized;
  };
  hours: {
    timezone: string;
    week: DayHours[];
    exceptions: HoursException[];
  };
  ratings: {
    google: { value: number; count: number; url: string };
    restaurantGuru: { value: number; count: number };
    tripadvisor: { value: number; rank: number; outOf: number };
    asOf: string;
  };
  amenities: Array<{ id: string; icon: string; de: string; en: string }>;
  payment: {
    methods: Array<{ id: string; de: string; en: string }>;
    schemaOrg: string[];
  };
  parking: Localized;
  seatingNote: Localized;
  delivery: {
    active: boolean;
    channel: string;
    feeNote: Localized;
    areas: string[];
    areasNeedReview: boolean;
    minOrder: number | null;
  };
  reservations: { accepted: boolean; note: Localized };
  vouchers: { available: boolean; anyAmount: boolean; redeemInStore: boolean };
  priceRange: string;
  currency: string;
  servesCuisine: string[];
  foundingStory: { startedAt: string; founder: string; founderNeedsReview: boolean };
}

export interface Photo {
  id: string;
  src: string | null;
  width: number;
  height: number;
  priority: boolean;
  alt: Localized;
  shot: Localized;
  usage: string;
}

export interface PhotosData {
  photos: Photo[];
}

export interface Review {
  id: string;
  quote: Localized;
  author: string;
  source: string;
  rating: number;
  date: string;
}

export interface ReviewsData {
  verified: boolean;
  items: Review[];
}

/** Ein Artikel im Warenkorb, inklusive aller Optionen. */
export interface CartLine {
  /** Eindeutig pro Konfiguration, damit gleiche Burger mit anderen Optionen getrennt bleiben. */
  lineId: string;
  itemId: string;
  categoryId: string;
  name: string;
  qty: number;
  /** Basispreis pro Stück (Kids-Preis bereits berücksichtigt). */
  unitBase: number;
  kids: boolean;
  addonIds: string[];
  sauceIds: string[];
  asMenu: boolean;
  menuSideId?: string;
  menuDrinkId?: string;
  /** Auswahl innerhalb eines Artikels, z. B. welches Getränk. */
  variantId?: string;
  variantName?: string;
  note?: string;
}

export type OrderMode = 'abholen' | 'liefern' | 'vor-ort';
