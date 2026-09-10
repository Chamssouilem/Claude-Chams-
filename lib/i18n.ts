/**
 * Sämtliche sichtbaren Texte der Seite, zweisprachig.
 *
 * Ton: Deutsch durchgängig per „du“, direkt, warm, ohne Werbesprech.
 * So spricht ein Laden im Ruhrgebiet mit seiner Nachbarschaft — nicht eine
 * Marketingabteilung mit einer Zielgruppe. Wer hier etwas ändert, sollte den
 * Satz einmal laut lesen: klingt er nach Broschüre, ist er falsch.
 */
import type { Locale } from './types';

export const LOCALES: Locale[] = ['de', 'en'];
export const DEFAULT_LOCALE: Locale = 'de';

/** Routen-Präfix je Sprache. Deutsch liegt auf der Wurzel. */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (locale === 'de') return '/' + clean;
  return '/en/' + clean;
}

export const LEGAL_ROUTES = {
  impressum: { de: '/impressum/', en: '/en/imprint/' },
  datenschutz: { de: '/datenschutz/', en: '/en/privacy/' },
  allergene: { de: '/allergene/', en: '/en/allergens/' },
} as const;

const de = {

  common: {
    skipToContent: 'Direkt zum Inhalt',
    orderNow: 'Jetzt bestellen',
    viewMenu: 'Speisekarte ansehen',
    close: 'Schließen',
    open: 'Öffnen',
    back: 'Zurück',
    backHome: 'Zurück zur Startseite',
    langSwitch: 'Sprache wechseln',
    langLabelDe: 'Deutsch',
    langLabelEn: 'English',
    whatsapp: 'WhatsApp',
    callUs: 'Anrufen',
    email: 'E-Mail',
    from: 'ab',
    each: 'pro Stück',
    optional: 'optional',
    required: 'Pflichtfeld',
    showMore: 'Mehr anzeigen',
    showLess: 'Weniger anzeigen',
    barTagline: 'Frisch gewolft · helal',
  },

  nav: {
    label: 'Hauptnavigation',
    menu: 'Speisekarte',
    order: 'Bestellen',
    about: 'Über uns',
    find: 'Finden',
    faq: 'Fragen',
    reviews: 'Bewertungen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },

  status: {
    open: 'Jetzt geöffnet — bis {time}',
    closingSoon: 'Noch {min} Min. geöffnet — bis {time}',
    opensToday: 'Heute ab {time}',
    opensTomorrow: 'Morgen ab {time}',
    opensOn: 'Ab {day} {time}',
    closed: 'Gerade geschlossen',
    loading: 'Öffnungszeiten werden geprüft',
  },




  menu: {
    kicker: 'Speisekarte',
    h2: 'Unsere Burger in Moers',
    intro:
      'Alles frisch gemacht, wenn du bestellst. Preise inkl. MwSt. Allergene stehen an jedem Artikel — tippe auf das Kürzel, wenn du wissen willst, wofür es steht.',
    searchLabel: 'Speisekarte durchsuchen',
    searchPlaceholder: 'Suchen: Burger, Pommes, Sauce …',
    searchClear: 'Suche zurücksetzen',
    filterLabel: 'Nach Eigenschaft filtern',
    filterAll: 'Alle',
    resultsCount: '{n} Artikel',
    resultsCountOne: '1 Artikel',
    noResults: 'Dazu haben wir nichts gefunden.',
    noResultsHint: 'Versuch es mit einem anderen Begriff oder setz die Filter zurück.',
    resetFilters: 'Filter zurücksetzen',
    addToCart: 'In den Warenkorb',
    added: 'Hinzugefügt',
    configure: 'Zusammenstellen',
    menuUpgrade: 'Im Menü {price}',
    menuUpgradeHint: 'Burger + Beilage + Getränk',
    singlePrice: 'einzeln',
    menuPrice: 'im Menü',
    kidsPrice: 'Kids',
    allergensLabel: 'Allergene',
    mayContainLabel: 'Kann Spuren enthalten von',
    additivesLabel: 'Zusatzstoffe',
    noAllergens: 'keine der kennzeichnungspflichtigen',
    allergenTableLink: 'Vollständige Allergentabelle',
    signature: 'Signature',
    categoryNavLabel: 'Kategorien der Speisekarte',
    priceNote: 'Alle Preise in Euro, inklusive Mehrwertsteuer.',
    priceAsOf: 'Preisstand: {date}',
  },

  order: {
    kicker: 'Bestellen',
    h2: 'Bestell direkt bei uns — ohne Umweg',
    intro:
      'Stell dir hier zusammen, was du willst. Am Ende schicken wir alles als fertige Nachricht per WhatsApp an den Laden — genau so, wie wir Bestellungen ohnehin annehmen. Kein Konto, keine App, keine Provision an eine Plattform.',
    steps: {
      one: 'Zusammenstellen',
      two: 'Abholen oder liefern',
      three: 'Abschicken',
    },
    modeLabel: 'Wie möchtest du es haben?',
    modePickup: 'Abholen',
    modePickupHint: 'Fertig, wenn du kommst',
    modeDelivery: 'Liefern',
    modeDeliveryHint: 'Wir bestätigen telefonisch',
    modeEatIn: 'Vor Ort essen',
    modeEatInHint: 'Kleiner Laden, ohne Reservierung',
    timeLabel: 'Wann?',
    timeAsap: 'So schnell wie möglich',
    timeSlot: 'Zu einer bestimmten Zeit',
    timeSlotLabel: 'Uhrzeit wählen',
    timeClosedNote: 'Wir haben gerade zu. Du kannst trotzdem vorbestellen — wir melden uns, sobald wir aufmachen.',
    contactLegend: 'Deine Kontaktdaten',
    nameLabel: 'Name',
    namePlaceholderHint: 'Damit wir wissen, für wen wir packen',
    phoneLabel: 'Telefonnummer',
    phoneHint: 'Für die Bestätigung und falls es Rückfragen gibt',
    addressLegend: 'Lieferadresse',
    streetLabel: 'Straße und Hausnummer',
    zipLabel: 'PLZ',
    cityLabel: 'Ort',
    addressNoteLabel: 'Hinweis für den Fahrer',
    addressNoteHint: 'Klingel, Hinterhaus, Etage — was hilft',
    noteLabel: 'Anmerkung zur Bestellung',
    noteHint: 'Allergien, „ohne Zwiebeln“, alles was wir wissen sollten',
    cartTitle: 'Deine Bestellung',
    cartEmpty: 'Noch nichts drin.',
    cartEmptyHint: 'Such dir oben in der Speisekarte etwas aus.',
    cartItems: 'Artikel im Warenkorb',
    remove: 'Entfernen',
    increase: 'Menge erhöhen',
    decrease: 'Menge verringern',
    quantity: 'Menge',
    subtotal: 'Zwischensumme',
    total: 'Summe',
    totalNote: 'inkl. MwSt.',
    deliveryFeeNote: 'Liefergebühr wird bei der Bestätigung genannt',
    submitWhatsapp: 'Bestellung per WhatsApp senden',
    submitEmail: 'Lieber per E-Mail senden',
    submitHint: 'Es öffnet sich WhatsApp mit einer fertig geschriebenen Nachricht. Du siehst sie noch einmal, bevor du sie abschickst.',
    disclaimer: 'Deine Bestellung ist erst nach unserer Bestätigung verbindlich.',
    paymentTitle: 'Bezahlen',
    paymentNote:
      'Online bezahlst du hier nichts. Bezahlt wird bei Abholung, bei der Lieferung oder im Laden — bar, mit Karte oder kontaktlos. PayPal auf Anfrage.',
    errorRequired: 'Bitte ausfüllen.',
    errorPhone: 'Bitte eine erreichbare Telefonnummer angeben.',
    errorCartEmpty: 'Dein Warenkorb ist noch leer.',
    errorSummary: 'Bitte prüf noch kurz diese Angaben:',
    optionsTitle: '{name} zusammenstellen',
    optionsAddons: 'Extras',
    optionsSauces: 'Saucen',
    optionsMenu: 'Als Menü',
    optionsMenuOn: 'Ja, als Menü',
    optionsSide: 'Beilage',
    optionsDrink: 'Getränk',
    optionsKids: 'Kids-Portion',
    optionsNote: 'Sonderwunsch für diesen Artikel',
    optionsAdd: 'Für {price} hinzufügen',
    optionsCancel: 'Abbrechen',
    cartRestored: 'Wir haben deinen Warenkorb von vorhin wiederhergestellt.',
    goToCart: 'Zum Warenkorb',
    itemsInCart: '{n} im Warenkorb',
  },

  wa: {
    greeting: 'Hallo Patties & Berries, ich möchte gerne bestellen:',
    orderLine: '{qty}× {name}',
    mode: 'Art',
    modePickup: 'Abholung',
    modeDelivery: 'Lieferung',
    modeEatIn: 'Vor Ort essen',
    time: 'Zeit',
    asap: 'so schnell wie möglich',
    name: 'Name',
    phone: 'Telefon',
    address: 'Adresse',
    note: 'Anmerkung',
    total: 'Summe',
    footer: 'Gesendet über pattiesandberries.de',
  },


  reviews: {
    kicker: 'Bewertungen',
    h2: 'Was Gäste über uns schreiben',
    intro: '{value} von 5 bei {count} Google-Bewertungen. Hier ein paar Stimmen im Original.',
    sourceLabel: 'Quelle',
    prev: 'Vorherige Bewertung',
    next: 'Nächste Bewertung',
    goTo: 'Zu Bewertung {n}',
    readAll: 'Alle Bewertungen bei Google lesen',
    placeholderWarning:
      'Hinweis für den Betreiber: Hier stehen noch Platzhalter. Vor dem Livegang echte Zitate in data/reviews.json eintragen — erfundene Bewertungen sind wettbewerbswidrig.',
  },


  find: {
    kicker: 'Finden & Kontakt',
    h2: 'Du findest uns an der Uerdinger Straße in Moers',
    addressLabel: 'Adresse',
    hoursLabel: 'Öffnungszeiten',
    contactLabel: 'Kontakt',
    todayLabel: 'heute',
    closed: 'geschlossen',
    kitchenNote: 'Die Küche schließt mit dem Laden.',
    parkingLabel: 'Parken',
    seatingLabel: 'Platz im Laden',
    amenitiesLabel: 'Gut zu wissen',
    directions: 'Route planen',
    mapConsentTitle: 'Karte von Google Maps',
    mapConsentBody:
      'Wenn du die Karte lädst, stellt dein Browser eine Verbindung zu Google her. Dabei werden deine IP-Adresse und Angaben zu deinem Gerät an Google LLC in den USA übertragen. Das passiert erst, wenn du hier klickst.',
    mapConsentButton: 'Karte laden',
    mapConsentRemember: 'Entscheidung merken',
    mapConsentPrivacy: 'Mehr dazu in unserer Datenschutzerklärung',
    mapPlaceholderAlt: 'Vorschau der Karte mit unserem Standort in Moers',
    mapLoaded: 'Karte geladen',
    mapUnload: 'Karte wieder ausblenden',
  },


  footer: {
    tagline: 'Smash Burger aus Moers. Fleisch täglich frisch gewolft, alles helal.',
    navLabel: 'Fußzeilen-Navigation',
    social: 'Folg uns',
    paymentLabel: 'Zahlungsarten',
    legalLabel: 'Rechtliches',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    allergene: 'Allergene',
    copyright: '© {year} Patties & Berries, Moers',
    builtNote: 'Alle Preise inkl. MwSt.',
  },

  consent: {
    title: 'Kurz zu Cookies',
    body: 'Wir nutzen nur das, was die Seite zum Funktionieren braucht — dein Warenkorb und deine Sprachwahl bleiben lokal in deinem Browser. Für die Google-Karte brauchen wir deine Einwilligung, weil dabei Daten an Google in die USA gehen.',
    acceptAll: 'Alles erlauben',
    rejectAll: 'Nur Notwendiges',
    settings: 'Einstellungen',
    save: 'Auswahl speichern',
    categoryNecessary: 'Notwendig',
    categoryNecessaryBody:
      'Warenkorb, Spracheinstellung und deine Cookie-Entscheidung. Wird lokal in deinem Browser gespeichert und nicht übertragen. Ohne das funktioniert die Bestellung nicht — deshalb nicht abwählbar.',
    categoryMaps: 'Karte (Google Maps)',
    categoryMapsBody:
      'Lädt die Karte von Google. Dabei gehen deine IP-Adresse und Gerätedaten an Google LLC in den USA. Ohne Einwilligung zeigen wir stattdessen ein Vorschaubild.',
    categoryStats: 'Statistik',
    categoryStatsBody:
      'Derzeit nicht im Einsatz. Sollten wir später eine Reichweitenmessung einsetzen, greift diese Einstellung.',
    categoryMarketing: 'Marketing',
    categoryMarketingBody:
      'Derzeit nicht im Einsatz. Wir schalten keine Werbe- oder Tracking-Pixel auf dieser Seite.',
    alwaysOn: 'immer aktiv',
    notInUse: 'derzeit nicht im Einsatz',
    manage: 'Cookie-Einstellungen',
    moreInfo: 'Datenschutzerklärung',
    imprintLink: 'Impressum',
  },

};

/**
 * Die deutsche Fassung ist maßgeblich: Sie bestimmt, welche Schlüssel es gibt.
 * Fehlt in der englischen Fassung ein Eintrag, schlägt der Build fehl — so
 * kann keine Sprache still hinter der anderen zurückbleiben.
 */
type Dict = typeof de;

const en: Dict = {

  common: {
    skipToContent: 'Skip to content',
    orderNow: 'Order now',
    viewMenu: 'See the menu',
    close: 'Close',
    open: 'Open',
    back: 'Back',
    backHome: 'Back to the homepage',
    langSwitch: 'Change language',
    langLabelDe: 'Deutsch',
    langLabelEn: 'English',
    whatsapp: 'WhatsApp',
    callUs: 'Call us',
    email: 'Email',
    from: 'from',
    each: 'each',
    optional: 'optional',
    required: 'Required',
    showMore: 'Show more',
    showLess: 'Show less',
    barTagline: 'Ground fresh · halal',
  },

  nav: {
    label: 'Main navigation',
    menu: 'Menu',
    order: 'Order',
    about: 'About us',
    find: 'Find us',
    faq: 'FAQ',
    reviews: 'Reviews',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  status: {
    open: 'Open now — until {time}',
    closingSoon: 'Closing in {min} min — at {time}',
    opensToday: 'Opens today at {time}',
    opensTomorrow: 'Opens tomorrow at {time}',
    opensOn: 'Opens {day} at {time}',
    closed: 'Currently closed',
    loading: 'Checking opening hours',
  },




  menu: {
    kicker: 'Menu',
    h2: 'Our burgers in Moers',
    intro:
      'Everything is made fresh when you order. Prices include VAT. Allergens are listed on every item — tap a code to see what it stands for.',
    searchLabel: 'Search the menu',
    searchPlaceholder: 'Search: burger, fries, sauce …',
    searchClear: 'Clear search',
    filterLabel: 'Filter by property',
    filterAll: 'All',
    resultsCount: '{n} items',
    resultsCountOne: '1 item',
    noResults: 'Nothing matched that.',
    noResultsHint: 'Try another word or reset the filters.',
    resetFilters: 'Reset filters',
    addToCart: 'Add to order',
    added: 'Added',
    configure: 'Build it',
    menuUpgrade: 'As a meal {price}',
    menuUpgradeHint: 'Burger + side + drink',
    singlePrice: 'on its own',
    menuPrice: 'in a meal',
    kidsPrice: 'Kids',
    allergensLabel: 'Allergens',
    mayContainLabel: 'May contain traces of',
    additivesLabel: 'Additives',
    noAllergens: 'none of the declarable ones',
    allergenTableLink: 'Full allergen table',
    signature: 'Signature',
    categoryNavLabel: 'Menu categories',
    priceNote: 'All prices in euros, VAT included.',
    priceAsOf: 'Prices as of {date}',
  },

  order: {
    kicker: 'Order',
    h2: 'Order straight from us — no middleman',
    intro:
      'Build what you want here. At the end we turn it into a ready-written WhatsApp message to the shop — exactly how we take orders anyway. No account, no app, no platform commission.',
    steps: { one: 'Build it', two: 'Pickup or delivery', three: 'Send it' },
    modeLabel: 'How would you like it?',
    modePickup: 'Pickup',
    modePickupHint: 'Ready when you arrive',
    modeDelivery: 'Delivery',
    modeDeliveryHint: 'We confirm by phone',
    modeEatIn: 'Eat in',
    modeEatInHint: 'Small room, no reservations',
    timeLabel: 'When?',
    timeAsap: 'As soon as possible',
    timeSlot: 'At a specific time',
    timeSlotLabel: 'Choose a time',
    timeClosedNote: 'We’re closed right now. You can still pre-order — we’ll get back to you as soon as we open.',
    contactLegend: 'Your details',
    nameLabel: 'Name',
    namePlaceholderHint: 'So we know who we’re packing for',
    phoneLabel: 'Phone number',
    phoneHint: 'For the confirmation and any questions',
    addressLegend: 'Delivery address',
    streetLabel: 'Street and number',
    zipLabel: 'Postcode',
    cityLabel: 'Town',
    addressNoteLabel: 'Note for the driver',
    addressNoteHint: 'Doorbell, rear building, floor — whatever helps',
    noteLabel: 'Note on your order',
    noteHint: 'Allergies, “no onions”, anything we should know',
    cartTitle: 'Your order',
    cartEmpty: 'Nothing in here yet.',
    cartEmptyHint: 'Pick something from the menu above.',
    cartItems: 'Items in your order',
    remove: 'Remove',
    increase: 'Increase quantity',
    decrease: 'Decrease quantity',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    total: 'Total',
    totalNote: 'VAT included',
    deliveryFeeNote: 'Any delivery fee is named when we confirm',
    submitWhatsapp: 'Send order via WhatsApp',
    submitEmail: 'Send by email instead',
    submitHint: 'WhatsApp opens with the message already written. You get to read it once more before sending.',
    disclaimer: 'Your order is only binding once we have confirmed it.',
    paymentTitle: 'Paying',
    paymentNote:
      'You pay nothing online here. Payment happens at pickup, on delivery or in the shop — cash, card or contactless. PayPal on request.',
    errorRequired: 'Please fill this in.',
    errorPhone: 'Please give us a number we can reach you on.',
    errorCartEmpty: 'Your order is still empty.',
    errorSummary: 'Please check these details:',
    optionsTitle: 'Build your {name}',
    optionsAddons: 'Extras',
    optionsSauces: 'Sauces',
    optionsMenu: 'Make it a meal',
    optionsMenuOn: 'Yes, as a meal',
    optionsSide: 'Side',
    optionsDrink: 'Drink',
    optionsKids: 'Kids portion',
    optionsNote: 'Special request for this item',
    optionsAdd: 'Add for {price}',
    optionsCancel: 'Cancel',
    cartRestored: 'We restored the order you started earlier.',
    goToCart: 'Go to your order',
    itemsInCart: '{n} in your order',
  },

  wa: {
    greeting: 'Hallo Patties & Berries, ich möchte gerne bestellen:',
    orderLine: '{qty}× {name}',
    mode: 'Art',
    modePickup: 'Abholung',
    modeDelivery: 'Lieferung',
    modeEatIn: 'Vor Ort essen',
    time: 'Zeit',
    asap: 'so schnell wie möglich',
    name: 'Name',
    phone: 'Telefon',
    address: 'Adresse',
    note: 'Anmerkung',
    total: 'Summe',
    footer: 'Gesendet über pattiesandberries.de',
  },


  reviews: {
    kicker: 'Reviews',
    h2: 'What guests write about us',
    intro: '{value} out of 5 across {count} Google reviews. A few of them in their own words.',
    sourceLabel: 'Source',
    prev: 'Previous review',
    next: 'Next review',
    goTo: 'Go to review {n}',
    readAll: 'Read all reviews on Google',
    placeholderWarning:
      'Note to the owner: these are still placeholders. Put real quotes into data/reviews.json before going live — invented reviews are unlawful under German competition law.',
  },


  find: {
    kicker: 'Find us & contact',
    h2: 'You’ll find us on Uerdinger Straße in Moers',
    addressLabel: 'Address',
    hoursLabel: 'Opening hours',
    contactLabel: 'Contact',
    todayLabel: 'today',
    closed: 'closed',
    kitchenNote: 'The kitchen closes when the shop does.',
    parkingLabel: 'Parking',
    seatingLabel: 'Room inside',
    amenitiesLabel: 'Good to know',
    directions: 'Get directions',
    mapConsentTitle: 'Map by Google Maps',
    mapConsentBody:
      'Loading the map connects your browser to Google. Your IP address and device details are transferred to Google LLC in the USA. None of that happens until you click here.',
    mapConsentButton: 'Load the map',
    mapConsentRemember: 'Remember my choice',
    mapConsentPrivacy: 'More on this in our privacy policy',
    mapPlaceholderAlt: 'Preview of the map showing our location in Moers',
    mapLoaded: 'Map loaded',
    mapUnload: 'Hide the map again',
  },


  footer: {
    tagline: 'Smash burgers from Moers. Beef ground fresh daily, everything halal.',
    navLabel: 'Footer navigation',
    social: 'Follow us',
    paymentLabel: 'Payment methods',
    legalLabel: 'Legal',
    impressum: 'Imprint',
    datenschutz: 'Privacy',
    allergene: 'Allergens',
    copyright: '© {year} Patties & Berries, Moers',
    builtNote: 'All prices include VAT.',
  },

  consent: {
    title: 'A quick word on cookies',
    body: 'We only use what the site needs to work — your order and language choice stay locally in your browser. For the Google map we need your consent, because that sends data to Google in the USA.',
    acceptAll: 'Allow everything',
    rejectAll: 'Essential only',
    settings: 'Settings',
    save: 'Save my choice',
    categoryNecessary: 'Essential',
    categoryNecessaryBody:
      'Your order, language setting and cookie choice. Stored locally in your browser and never transmitted. Ordering doesn’t work without it, which is why it can’t be switched off.',
    categoryMaps: 'Map (Google Maps)',
    categoryMapsBody:
      'Loads the map from Google. Your IP address and device data go to Google LLC in the USA. Without consent we show a preview image instead.',
    categoryStats: 'Analytics',
    categoryStatsBody:
      'Not in use at the moment. If we ever add audience measurement, this setting will govern it.',
    categoryMarketing: 'Marketing',
    categoryMarketingBody:
      'Not in use at the moment. We run no advertising or tracking pixels on this site.',
    alwaysOn: 'always on',
    notInUse: 'not currently in use',
    manage: 'Cookie settings',
    moreInfo: 'Privacy policy',
    imprintLink: 'Imprint',
  },

};

export const dictionaries: Record<Locale, Dict> = { de, en };

export function t(locale: Locale): Dict {
  return dictionaries[locale];
}

/** Ersetzt {platzhalter} in einem Text. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}
