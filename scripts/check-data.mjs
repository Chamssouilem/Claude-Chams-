/**
 * Prüft die Datendateien, bevor etwas kaputt live geht.
 *
 * Aufruf: `npm run check:data`
 *
 * Gedacht für den Fall, dass jemand im Laden schnell einen Preis ändert und
 * dabei ein Komma vergisst oder ein Allergen falsch schreibt. Das Skript sagt
 * dann in einfachen Worten, was nicht stimmt — statt dass Netlify einen
 * Fehler ausspuckt, mit dem niemand etwas anfangen kann.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const notes = [];

const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);
const note = (msg) => notes.push(msg);

async function load(name) {
  try {
    return JSON.parse(await readFile(join(root, 'data', name), 'utf8'));
  } catch (err) {
    fail(`data/${name} lässt sich nicht lesen: ${err.message}\n     → Meist fehlt ein Komma oder eine Klammer. Prüfen unter jsonlint.com`);
    return null;
  }
}

const menu = await load('menu.json');
const business = await load('business.json');
const photos = await load('photos.json');
const reviews = await load('reviews.json');

/* --- Speisekarte -------------------------------------------------------- */
if (menu) {
  const allergenIds = new Set(menu.allergenLegend.map((a) => a.id));
  const tagIds = new Set(menu.tagLegend.map((tag) => tag.id));
  const additiveIds = new Set(menu.additiveLegend.map((a) => a.id));
  const seen = new Map();
  let itemCount = 0;

  for (const cat of menu.categories) {
    if (!cat.id || !cat.name?.de || !cat.name?.en) {
      fail(`Kategorie ohne id oder ohne Namen in beiden Sprachen: ${JSON.stringify(cat.id)}`);
    }
    for (const item of cat.items) {
      itemCount++;
      const where = `„${item.name ?? item.id}" (${cat.id})`;

      if (!item.id) fail(`${where}: keine id`);
      if (seen.has(item.id)) fail(`Die id „${item.id}" kommt doppelt vor — jede id darf es nur einmal geben.`);
      seen.set(item.id, cat.id);

      if (typeof item.price !== 'number' || Number.isNaN(item.price)) {
        fail(`${where}: Preis ist keine Zahl. Richtig ist 10.90 (Punkt, keine Anführungszeichen, kein €).`);
      } else {
        if (item.price <= 0) fail(`${where}: Preis ist 0 oder negativ.`);
        if (Math.round(item.price * 100) !== item.price * 100) {
          warn(`${where}: Preis ${item.price} hat mehr als zwei Nachkommastellen.`);
        }
        if (item.price > 60) warn(`${where}: Preis ${item.price} € wirkt sehr hoch — Tippfehler?`);
      }

      for (const field of ['menuPrice', 'menuUpgrade', 'kidsPrice']) {
        if (item[field] != null && typeof item[field] !== 'number') {
          fail(`${where}: ${field} muss eine Zahl sein.`);
        }
      }
      if (item.menuPrice != null && item.menuPrice > item.price) {
        warn(`${where}: Menü-Preis (${item.menuPrice}) ist höher als der Einzelpreis (${item.price}).`);
      }
      if (item.kidsPrice != null && item.kidsPrice > item.price) {
        warn(`${where}: Kids-Preis ist höher als der normale Preis.`);
      }

      if (!item.description?.de || !item.description?.en) {
        fail(`${where}: Beschreibung fehlt auf Deutsch oder Englisch.`);
      }

      for (const a of item.allergens ?? []) {
        if (!allergenIds.has(a)) {
          fail(`${where}: unbekanntes Allergen „${a}". Erlaubt: ${[...allergenIds].join(', ')}`);
        }
      }
      for (const a of item.mayContain ?? []) {
        if (!allergenIds.has(a)) fail(`${where}: unbekanntes Spuren-Allergen „${a}".`);
      }
      for (const a of item.additives ?? []) {
        if (!additiveIds.has(a)) fail(`${where}: unbekannte Zusatzstoff-Nummer „${a}".`);
      }
      for (const tg of item.tags ?? []) {
        if (!tagIds.has(tg)) fail(`${where}: unbekannte Kennzeichnung „${tg}".`);
      }
      if (!(item.tags ?? []).includes('halal')) {
        warn(`${where}: nicht als „halal" gekennzeichnet — laut Seite ist alles helal.`);
      }
      if (item.image != null && /\.(jpe?g|png|webp|avif)$/i.test(item.image)) {
        fail(`${where}: „image" muss OHNE Dateiendung angegeben werden, z. B. "/img/cheeseburger".`);
      }
    }
  }

  // Menü-Aufschlag muss zur Beilagen- und Getränkeliste passen
  const deal = menu.menuDeal;
  const beilagen = menu.categories.find((cat) => cat.id === 'beilagen');
  const standard = beilagen?.items.find((i) => i.id === deal.defaultSideId);
  if (!standard) {
    fail(`menuDeal.defaultSideId „${deal.defaultSideId}" gibt es nicht in den Beilagen.`);
  } else {
    const expected = Math.round((standard.menuPrice + deal.drinkMenuPrice) * 100) / 100;
    if (expected !== deal.surcharge) {
      fail(
        `Menü-Aufschlag stimmt nicht: menuDeal.surcharge steht auf ${deal.surcharge} €, ` +
          `aus ${standard.name} im Menü (${standard.menuPrice} €) plus Getränk (${deal.drinkMenuPrice} €) ` +
          `ergeben sich aber ${expected} €. Einen der Werte anpassen.`,
      );
    }
  }

  const getraenke = menu.categories.find((cat) => cat.id === 'getraenke');
  if (!getraenke?.options?.length) {
    fail('In der Kategorie „getraenke" fehlt die Liste „options" — ohne sie hat die Bestellstrecke keine Getränkeauswahl.');
  }

  if (menu._allergeneGeprueft !== true) {
    note('Allergenangaben sind noch nicht freigegeben (_allergeneGeprueft: false). Auf der Allergenseite erscheint deshalb ein Warnhinweis. Nach der Prüfung anhand der Lieferantendatenblätter auf true setzen.');
  }
  note(`Speisekarte: ${menu.categories.length} Kategorien, ${itemCount} Artikel, Preisstand ${menu._preisstand}.`);
}

/* --- Stammdaten --------------------------------------------------------- */
if (business) {
  const time = /^([01]\d|2[0-3]):[0-5]\d$/;
  const days = new Set();
  for (const day of business.hours.week) {
    if (days.has(day.day)) fail(`Öffnungszeiten: Wochentag ${day.day} kommt doppelt vor.`);
    days.add(day.day);
    if (day.closed) continue;
    if (!time.test(day.open) || !time.test(day.close)) {
      fail(`Öffnungszeiten ${day.key}: Uhrzeit muss im Format HH:MM stehen, z. B. "15:00".`);
    } else if (day.open >= day.close) {
      fail(`Öffnungszeiten ${day.key}: Schluss (${day.close}) liegt nicht nach der Öffnung (${day.open}).`);
    }
  }
  for (let d = 0; d <= 6; d++) {
    if (!days.has(d)) fail(`Öffnungszeiten: Wochentag ${d} fehlt. Ein Ruhetag wird mit "closed": true eingetragen, nicht durch Weglassen.`);
  }

  for (const ex of business.hours.exceptions ?? []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ex.date)) {
      fail(`Ausnahme „${ex.date}": Datum muss JJJJ-MM-TT lauten, z. B. "2026-12-24".`);
    } else if (ex.date < new Date().toISOString().slice(0, 10)) {
      warn(`Ausnahme „${ex.date}" liegt in der Vergangenheit und kann gelöscht werden.`);
    }
  }

  if (!/^\+\d{8,15}$/.test(business.contact.phoneE164)) {
    fail(`contact.phoneE164 („${business.contact.phoneE164}") muss international geschrieben sein: + Ländervorwahl, nur Ziffern.`);
  }
  if (business.contact.whatsappNumber !== business.contact.phoneE164.replace('+', '')) {
    fail(
      `WhatsApp-Nummer und Telefonnummer stimmen nicht überein: ` +
        `whatsappNumber „${business.contact.whatsappNumber}" vs. phoneE164 „${business.contact.phoneE164}". ` +
        `Beide müssen dieselbe Nummer meinen, sonst geht die Bestellung ins Leere.`,
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(business.contact.email)) {
    fail(`E-Mail-Adresse „${business.contact.email}" sieht nicht richtig aus.`);
  }
  if (!/^DE\d{9}$/.test(business.impressum.vatId)) {
    warn(`USt-IdNr. „${business.impressum.vatId}" hat nicht das übliche Format DE + 9 Ziffern.`);
  }
  if (business.impressum.operatorNameNeedsReview) {
    note('Impressum: Der Name der Inhaberin/des Inhabers ist noch als „zu prüfen" markiert. § 5 DDG verlangt Vor- UND Nachnamen. Nach der Klärung „operatorNameNeedsReview" auf false setzen.');
  }
  if (business.delivery.areasNeedReview) {
    note('Liefergebiete sind noch als „zu prüfen" markiert (business.json → delivery).');
  }
  const { lat, lng } = business.geo;
  if (lat < 47 || lat > 56 || lng < 5 || lng > 16) {
    fail(`Koordinaten (${lat}, ${lng}) liegen außerhalb von Deutschland — Zahlendreher?`);
  }
  const ratingAge = (Date.now() - Date.parse(business.ratings.asOf)) / 86_400_000;
  if (ratingAge > 365) {
    warn(`Die Bewertungszahlen sind vom ${business.ratings.asOf} und damit über ein Jahr alt. Veraltete Angaben sind wettbewerbsrechtlich angreifbar — bitte aktualisieren.`);
  }
}

/* --- Fotos -------------------------------------------------------------- */
if (photos) {
  let missing = 0;
  for (const photo of photos.photos) {
    if (!photo.width || !photo.height) fail(`Foto „${photo.id}": width und height müssen gesetzt sein — sonst springt beim Laden das Layout.`);
    if (!photo.alt?.de || !photo.alt?.en) fail(`Foto „${photo.id}": Bildbeschreibung (alt) fehlt in einer Sprache.`);
    if (!photo.src) {
      missing++;
      continue;
    }
    if (/\.(jpe?g|png|webp|avif)$/i.test(photo.src)) {
      fail(`Foto „${photo.id}": „src" ohne Dateiendung angeben, z. B. "/img/hero-burger".`);
      continue;
    }
    const found = ['.avif', '.webp', '.jpg', '.jpeg', '.png'].filter((ext) =>
      existsSync(join(root, 'public', photo.src.replace(/^\//, '') + ext)),
    );
    if (found.length === 0) {
      fail(`Foto „${photo.id}": Zu „${photo.src}" liegt in public/ keine Datei. Erwartet wird ${photo.src}.jpg (und gern zusätzlich .webp/.avif).`);
    } else if (!found.includes('.jpg') && !found.includes('.jpeg')) {
      warn(`Foto „${photo.id}": Es fehlt die .jpg-Fassung als Rückfallebene für ältere Browser.`);
    }
  }
  if (missing > 0) {
    note(`${missing} von ${photos.photos.length} Bildplätzen sind noch leer — dort erscheint der beschriftete Platzhalter. Shot-Liste: FOTO-BRIEFING.md`);
  }
}

/* --- Bewertungen -------------------------------------------------------- */
if (reviews) {
  if (!reviews.verified) {
    note('Bewertungen sind noch Platzhalter (reviews.json → "verified": false). Vor dem Livegang echte Zitate aus dem Google-Profil eintragen — erfundene Bewertungen verstoßen gegen § 5 UWG.');
  } else {
    for (const r of reviews.items) {
      if (/\[.*\]/.test(r.quote.de) || /\[.*\]/.test(r.author)) {
        fail(`Bewertung „${r.id}": enthält noch Platzhaltertext in eckigen Klammern, ist aber als geprüft markiert.`);
      }
    }
  }
}

/* --- Ausgabe ------------------------------------------------------------ */
const line = '─'.repeat(70);
console.log('\nDatenprüfung\n' + line);

for (const n of notes) console.log(`  i  ${n}`);
if (notes.length && (warnings.length || errors.length)) console.log('');
for (const w of warnings) console.log(`  !  ${w}`);
if (warnings.length && errors.length) console.log('');
for (const e of errors) console.log(`  ✗  ${e}`);

console.log(line);
if (errors.length === 0) {
  console.log(
    warnings.length === 0
      ? '  Alles in Ordnung.\n'
      : `  Keine Fehler, aber ${warnings.length} Hinweis(e) zum Nachsehen.\n`,
  );
} else {
  console.log(`  ${errors.length} Fehler. Die Seite baut zwar, zeigt aber falsche Angaben.\n`);
}

process.exit(errors.length === 0 ? 0 : 1);
