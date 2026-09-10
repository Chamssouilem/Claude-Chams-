/**
 * Fließtexte der Seite — die eigentliche Kopie.
 *
 * Getrennt von lib/i18n.ts, weil diese Texte ausschließlich in
 * Server-Komponenten gerendert werden (Einstieg, Handwerk, Über uns, FAQ,
 * Gutscheine, Seitenkopfdaten). Läge alles in einer Datei, würden die sieben
 * FAQ-Antworten und drei Über-uns-Absätze in beiden Sprachen mit ins
 * Browser-Bundle wandern, obwohl der Browser sie nie braucht.
 *
 * Regel: Diese Datei NICHT aus einer Komponente mit 'use client' importieren.
 *
 * Ton: Deutsch durchgängig per „du", direkt, warm, ohne Werbesprech. So
 * spricht ein Laden im Ruhrgebiet mit seiner Nachbarschaft. Wer hier etwas
 * ändert, sollte den Satz einmal laut lesen: klingt er nach Broschüre, ist er
 * falsch.
 */
import type { Locale } from './types';

const de = {
  meta: {
    title: 'Patties & Berries — Bester Burger in Moers | Fleisch täglich frisch gewolft',
    description:
      'Smash Burger in Moers: Wir wolfen unser Fleisch täglich selbst aus ganzen Premium-Cuts. 100 % helal, Buns frisch vom Bäcker. Bestellen per WhatsApp — Uerdinger Str. 101b.',
    ogAlt: 'Patties & Berries — Burger Restaurant in Moers',
  },
  hero: {
    h1: 'Echtes Fleisch. Echte Handarbeit. Echt Moers.',
    /* Der Zeilenumbruch ist gesetzt, nicht dem Zufall überlassen: drei Zeilen,
       drei Behauptungen. Die letzte trägt den Akzent. */
    h1Lines: ['Echtes Fleisch.', 'Echte Handarbeit.', 'Echt Moers.'],
    sub: 'Wir wolfen unser Fleisch selbst — jeden Tag, aus ganzen Premium-Cuts. Keine Abschnitte, keine Zusatzstoffe. Alles helal.',
    scrollHint: 'Weiter zur Speisekarte',
  },
  trust: {
    label: 'Auf einen Blick',
    googleReviews: '{count} Google-Bewertungen',
    halal: '100 % helal',
    ground: 'Fleisch täglich frisch gewolft',
    local: 'Seit Jahren in Moers',
  },
  handwerk: {
    kicker: 'Unser Handwerk',
    h2: 'Warum ein Burger bei uns kostet, was er kostet',
    intro:
      'Wir könnten billiger. Wir müssten dafür nur Abschnitte kaufen statt ganzer Stücke, tiefgekühlte Patties nehmen statt selbst zu wolfen und Buns bestellen, die eine Woche halten. Machen wir aber nicht. Deshalb hier, was hinter der Theke wirklich passiert.',
    panels: [
      {
        title: 'Das Fleisch',
        lead: 'Ganze Premium-Cuts. Bei uns vor Ort gewolft. Jeden Tag. Keine Abschnitte, keine Zusatzstoffe.',
        body: 'Fertig gewolftes Hackfleisch ist Resteverwertung — da landet drin, was beim Zerlegen übrig bleibt. Wir kaufen ganze Stücke und drehen sie hier durch den Wolf, morgens, für den Tag. Das schmeckt man am Rand, wenn das Patty auf der heißen Platte krosch wird.',
      },
      {
        title: 'Das Brot',
        lead: 'Täglich frisch vom Bäcker geliefert. Nie von gestern.',
        body: 'Unsere Buns kommen jeden Morgen von einem Bäcker hier aus der Gegend. Kein Aufbackbrot, keine Ware mit Haltbarkeitsdatum in drei Wochen. Ein gutes Bun hält den Saft aus, ohne durchzuweichen — das kriegt nur frisches hin.',
      },
      {
        title: 'Helal',
        lead: 'Alle unsere Produkte sind helal. Ohne Ausnahme.',
        body: 'Kein „das meiste“, kein Kleingedrucktes. Vom Rind über den Beef Bacon bis zur Sucuk ist bei uns alles helal — und das gilt für die ganze Karte, nicht nur für ein paar Gerichte.',
      },
    ],
  },
  about: {
    kicker: 'Über uns',
    h2: 'Vom Stand am Kaufland an die Uerdinger Straße',
    paragraphs: [
      'Angefangen haben wir mit einem Stand am Kaufland in Moers-Hülsdonk. Ein Grill, zwei Hände und ein Rezept, an dem Emre so lange gefeilt hat, bis es saß. Wer damals dort stand, stand meistens ein paar Wochen später wieder da. Und dann wieder.',
      'Irgendwann war der Stand zu klein. Wir sind an die Uerdinger Straße gezogen — und die Leute sind mitgekommen. Manche fahren heute aus Duisburg her, aus Krefeld, ein paar sogar über die Grenze aus den Niederlanden. Das ist nichts, was man plant. Das passiert, wenn man jeden Tag dasselbe macht: gutes Fleisch, frisch gewolft, ordentlich gewürzt, heiß auf die Platte.',
      'Hinter der Theke steht bei uns kein Personal, sondern eine zweite Familie. Die meisten sind seit Jahren dabei. Das merkt man, wenn es voll wird — und daran, dass hier keiner den Kopf einzieht, wenn mal was schiefgeht. Wir machen es lieber richtig als schnell. Meistens kriegen wir beides hin.',
    ],
  },
  faq: {
    kicker: 'Häufige Fragen',
    h2: 'Fragen, die uns oft gestellt werden',
    items: [
      {
        q: 'Ist euer Fleisch wirklich helal?',
        a: 'Ja. Alle unsere Produkte sind helal — ohne Ausnahme. Das gilt für das Rindfleisch genauso wie für Beef Bacon und Sucuk. Wir führen bewusst nichts, was das aufweichen würde. Wenn du die Zertifikate unserer Lieferanten sehen möchtest, sprich uns im Laden an.',
      },
      {
        q: 'Liefert ihr auch nach Neukirchen-Vluyn, Rheinberg oder Duisburg?',
        a: 'Wir liefern in Moers und die direkte Umgebung, dazu gehören unter anderem Neukirchen-Vluyn, Rheinberg, Kamp-Lintfort und Duisburg-Rheinhausen. Ob deine Adresse dabei ist und was die Lieferung kostet, klären wir kurz am Telefon, wenn deine Bestellung reinkommt. Ruf im Zweifel einfach an: 0178 179 22 45.',
      },
      {
        q: 'Kann ich einen Tisch reservieren?',
        a: 'Reservieren geht bei uns nicht — der Laden ist klein und wir wollen niemandem einen Tisch freihalten, an dem eine halbe Stunde niemand sitzt. Was du aber jederzeit machen kannst: vorbestellen. Dann ist dein Essen fertig, wenn du kommst, und du wartest nicht in der Schlange.',
      },
      {
        q: 'Gibt es vegetarische Burger?',
        a: 'Ja, unseren Veggie Burger mit einem saftigen Erbsen-Patty, dem kompletten P&B Belag und Cheddar. Das Erbsen-Patty gibt es auch als Extra auf jedem anderen Burger. Rein pflanzlich ist der Veggie Burger nicht — Cheddar und unsere Secret Sauce enthalten Milch und Ei. Sag Bescheid, dann lassen wir das weg.',
      },
      {
        q: 'Wo kann ich parken?',
        a: '4 Stellplätze direkt in unserer Einfahrt, dazu Parkplätze an der Uerdinger Straße. Zu Stoßzeiten am Wochenende kann die Einfahrt belegt sein — an der Straße findet sich aber fast immer etwas.',
      },
      {
        q: 'Kann ich mit Karte zahlen?',
        a: 'Ja. Bar, EC- und Girocard, Maestro, VISA, Mastercard, kontaktlos und Apple Pay. PayPal geht auf Anfrage. Online bezahlst du auf dieser Seite nichts — bezahlt wird bei Abholung, bei der Lieferung oder im Laden.',
      },
      {
        q: 'Wie lange dauert eine Bestellung?',
        a: 'Wir machen alles frisch, wenn du bestellst. Rechne unter der Woche mit etwa 20 Minuten, freitags und samstags abends kann es länger dauern. Wer vorbestellt, spart sich die Wartezeit.',
      },
    ],
  },
  vouchers: {
    kicker: 'Gutscheine',
    h2: 'Gutscheine gibt es über jeden Betrag',
    body: 'Als Geschenk, als Dankeschön oder weil jemand mal wieder einen ordentlichen Burger braucht. Du bekommst den Gutschein direkt bei uns im Laden. Schreib uns vorher kurz auf WhatsApp, dann liegt er bereit, wenn du kommst.',
    cta: 'Gutschein per WhatsApp anfragen',
    waMessage: 'Hallo Patties & Berries, ich hätte gerne einen Gutschein. Über welchen Betrag ist das möglich?',
  },
  legal: {
    reviewNotice:
      'Rechtlicher Hinweis für den Betreiber: Dieser Text ist ein sorgfältig vorbereiteter Entwurf, aber keine Rechtsberatung. Vor dem Livegang von einer Anwältin oder einem Anwalt prüfen lassen — insbesondere die farbig hervorgehobenen Stellen.',
    lastUpdated: 'Stand',
  },
};

type Content = typeof de;

const en: Content = {
  meta: {
    title: 'Patties & Berries — The Best Burger in Moers | Beef Ground Fresh Daily',
    description:
      'Smash burgers in Moers: we grind our beef in-house every day from whole premium cuts. 100 % halal, buns delivered fresh each morning. Order via WhatsApp — Uerdinger Str. 101b.',
    ogAlt: 'Patties & Berries — burger restaurant in Moers',
  },
  hero: {
    h1: 'Real meat. Real handwork. Really Moers.',
    h1Lines: ['Real meat.', 'Real handwork.', 'Really Moers.'],
    sub: 'We grind our beef ourselves — every day, from whole premium cuts. No trimmings, no additives. All halal.',
    scrollHint: 'On to the menu',
  },
  trust: {
    label: 'At a glance',
    googleReviews: '{count} Google reviews',
    halal: '100 % halal',
    ground: 'Beef ground fresh daily',
    local: 'In Moers for years',
  },
  handwerk: {
    kicker: 'Our craft',
    h2: 'Why a burger here costs what it costs',
    intro:
      'We could go cheaper. All it would take is buying trimmings instead of whole cuts, using frozen patties instead of grinding our own, and ordering buns that keep for a week. We don’t. So here is what actually happens behind the counter.',
    panels: [
      {
        title: 'The meat',
        lead: 'Whole premium cuts. Ground here, on site. Every day. No trimmings, no additives.',
        body: 'Pre-ground mince is leftovers management — whatever is left after butchering ends up in it. We buy whole cuts and put them through the grinder here, in the morning, for that day. You can taste it at the edges, where the patty crisps up on the hot flat top.',
      },
      {
        title: 'The bread',
        lead: 'Delivered fresh from the baker every morning. Never yesterday’s.',
        body: 'Our buns come from a baker here in the area, every morning. No part-baked stock, nothing with a three-week shelf life. A good bun takes the juices without going soggy — only a fresh one manages that.',
      },
      {
        title: 'Halal',
        lead: 'Every product we serve is halal. Without exception.',
        body: 'Not “mostly”, no small print. From the beef to the beef bacon to the sucuk, everything here is halal — and that holds for the whole menu, not just a few dishes.',
      },
    ],
  },
  about: {
    kicker: 'About us',
    h2: 'From a stand at Kaufland to Uerdinger Straße',
    paragraphs: [
      'We started with a stand at the Kaufland in Moers-Hülsdonk. One grill, two hands, and a recipe Emre kept working on until it was right. Most people who stood there once were standing there again a few weeks later. And then again.',
      'At some point the stand was too small. We moved to Uerdinger Straße — and people came with us. Some drive over from Duisburg now, from Krefeld, a few even across the border from the Netherlands. That isn’t something you plan. It happens when you do the same thing every day: good meat, freshly ground, properly seasoned, hot on the flat top.',
      'What stands behind our counter isn’t staff, it’s a second family. Most of us have been here for years. You notice it when the place fills up — and in the fact that nobody here ducks when something goes wrong. We’d rather get it right than get it fast. Most nights we manage both.',
    ],
  },
  faq: {
    kicker: 'FAQ',
    h2: 'Questions we get asked a lot',
    items: [
      {
        q: 'Is your meat really halal?',
        a: 'Yes. Every product we serve is halal — without exception. That covers the beef just as much as the beef bacon and the sucuk. We deliberately don’t stock anything that would compromise it. If you’d like to see our suppliers’ certificates, just ask us in the shop.',
      },
      {
        q: 'Do you deliver to Neukirchen-Vluyn, Rheinberg or Duisburg?',
        a: 'We deliver in Moers and the immediate area, which includes Neukirchen-Vluyn, Rheinberg, Kamp-Lintfort and Duisburg-Rheinhausen among others. Whether your address is covered and what delivery costs, we sort out on the phone when your order comes in. If in doubt, just call: 0178 179 22 45.',
      },
      {
        q: 'Can I reserve a table?',
        a: 'We don’t take reservations — the room is small and we don’t want to hold a table that sits empty for half an hour. What you can always do is pre-order. Then your food is ready when you arrive and you skip the queue.',
      },
      {
        q: 'Do you have vegetarian burgers?',
        a: 'Yes, our Veggie Burger with a juicy pea-protein patty, the full P&B toppings and cheddar. You can add the pea patty to any other burger too. It isn’t vegan — the cheddar and our secret sauce contain milk and egg. Tell us and we’ll leave them off.',
      },
      {
        q: 'Where can I park?',
        a: '4 spaces right in our driveway, plus street parking on Uerdinger Straße. At weekend peak times the driveway can be full — but there is almost always something on the street.',
      },
      {
        q: 'Can I pay by card?',
        a: 'Yes. Cash, EC and Girocard, Maestro, VISA, Mastercard, contactless and Apple Pay. PayPal on request. You pay nothing online on this site — payment happens at pickup, on delivery or in the shop.',
      },
      {
        q: 'How long does an order take?',
        a: 'We make everything fresh once you order. Reckon on about 20 minutes on weekdays; Friday and Saturday evenings it can take longer. Pre-ordering saves you the wait.',
      },
    ],
  },
  vouchers: {
    kicker: 'Gift vouchers',
    h2: 'Vouchers for any amount you like',
    body: 'As a present, as a thank you, or because somebody needs a proper burger again. You pick the voucher up in the shop. Send us a quick WhatsApp beforehand and it will be waiting for you.',
    cta: 'Ask about a voucher on WhatsApp',
    waMessage: 'Hallo Patties & Berries, ich hätte gerne einen Gutschein. Über welchen Betrag ist das möglich?',
  },
  legal: {
    reviewNotice:
      'Legal note for the operator: this text is a carefully prepared draft, not legal advice. Have a lawyer review it before going live — especially the passages marked with [square brackets].',
    lastUpdated: 'Last updated',
  },
};

const contents: Record<Locale, Content> = { de, en };

/** Fließtexte für eine Sprache. Nur in Server-Komponenten verwenden. */
export function c(locale: Locale): Content {
  return contents[locale];
}
