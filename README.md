# Patties & Berries — Website

Website für **Patties & Berries**, Burger Restaurant, Uerdinger Straße 101b, 47441 Moers.
Ersetzt die bisherige DISH-Seite unter `patties-and-berries.eatbu.com`.
Zieladresse: **pattiesandberries.de**

Deutsch als Hauptsprache (per „du"), Englisch als Zweitsprache unter `/en/`.

---

## Das Wichtigste in einem Absatz

Preise, Öffnungszeiten, Allergene, Fotos und Bewertungen stehen alle in vier
JSON-Dateien im Ordner **`data/`**. Wer dort etwas ändert, speichert, committet und
pusht, hat die Seite geändert — Netlify baut sie automatisch neu. Am Code muss dafür
niemand etwas anfassen. Vor dem Pushen einmal `npm run check:data` ausführen: Das
Skript sagt in normalem Deutsch, wenn etwas nicht stimmt.

---

## Inhalt

1. [Vor dem Livegang zu klären](#vor-dem-livegang-zu-klären)
2. [Preise ändern](#preise-ändern)
3. [Öffnungszeiten und Feiertage ändern](#öffnungszeiten-und-feiertage-ändern)
4. [Fotos einsetzen](#fotos-einsetzen)
5. [Bewertungen eintragen](#bewertungen-eintragen)
6. [Texte ändern](#texte-ändern)
7. [Allergene pflegen](#allergene-pflegen)
8. [Entwicklung und Deployment](#entwicklung-und-deployment)
9. [Wie die Seite aufgebaut ist](#wie-die-seite-aufgebaut-ist)
10. [Rechtliches](#rechtliches)
11. [Leistung und das JavaScript-Budget](#leistung-und-das-javascript-budget)
12. [Barrierefreiheit](#barrierefreiheit)
13. [Suchmaschinen](#suchmaschinen)

---

## Vor dem Livegang zu klären

Diese Punkte sind **nicht** technisch, aber sie blockieren den Livegang. Sie stehen
hier oben, damit sie nicht untergehen. `npm run check:data` erinnert an jeden davon,
solange er offen ist.

| # | Was | Warum es wichtig ist | Wo geändert wird |
|---|---|---|---|
| 1 | **Vollständiger Name der Inhaberin/des Inhabers** | § 5 DDG verlangt Vor- **und** Nachnamen der verantwortlichen Person. Im bisherigen Impressum steht nur „Yeter", in Bewertungen wird durchgängig „Emre" genannt. Ein unvollständiges Impressum ist abmahnfähig. | `data/business.json` → `impressum.operatorName`, danach `operatorNameNeedsReview: false` |
| 2 | **Preise bestätigen** | Die eingetragenen Preise stammen von speisekarte.de, Stand 20.11.2025. Ältere Listungen auf Lieferplattformen zeigen niedrigere Preise (Cheeseburger 8,90 € statt 10,90 €). Falsche Preise auf der eigenen Seite sind ärgerlicher als jeder Tippfehler. | `data/menu.json` |
| 3 | **Allergene prüfen** | Die Angaben sind eine sorgfältige Ersteinschätzung anhand der Zutatenlisten, aber **nicht** anhand der Datenblätter der Lieferanten. Sie sind rechtlich verbindlich (LMIV/LMIDV). Bis zur Prüfung zeigt die Allergenseite einen Warnhinweis. | `data/menu.json` → pro Artikel `allergens`, danach `_allergeneGeprueft: true` |
| 4 | **Echte Bewertungszitate** | Aktuell stehen dort Platzhalter. Erfundene oder geschönte Bewertungen verstoßen gegen § 5 UWG (Anhang Nr. 23b) und sind abmahnfähig. | `data/reviews.json`, danach `verified: true` |
| 5 | **WhatsApp-Nummer testen** | Das Briefing nannte `4917817922450` (13 Stellen). Aus +49 178 179 22 45 ergibt sich international `491781792245` (12 Stellen); diese Variante ist eingetragen. **Einmal auf den WhatsApp-Knopf klicken und prüfen, ob der richtige Chat aufgeht.** Stimmt sie nicht, geht jede Bestellung ins Leere. | `data/business.json` → `contact.phoneE164` und `contact.whatsappNumber` |
| 6 | **Liefert ihr, und über welchen Kanal?** | Uber Eats listet den Laden derzeit als nicht verfügbar. Wenn nicht geliefert wird: `delivery.active` auf `false` — dann verschwindet der Liefer-Modus aus der Bestellstrecke und aus den strukturierten Daten. | `data/business.json` → `delivery` |
| 7 | **Fotos** | Siehe [FOTO-BRIEFING.md](./FOTO-BRIEFING.md). Solange keine echten Fotos vorliegen, zeigt die Seite beschriftete Platzhalter — bewusst, statt Stock- oder KI-Bilder einzusetzen. | `data/photos.json` |
| 8 | **Rechtstexte anwaltlich prüfen lassen** | Impressum und Datenschutzerklärung sind sorgfältig vorbereitete Entwürfe, aber keine Rechtsberatung. Die zu prüfenden Stellen sind auf den Seiten farbig hervorgehoben. | `components/pages/*Content.tsx` |
| 9 | **Getränkeauswahl anpassen** | Die Getränkeliste in der Bestellstrecke ist ein Startpunkt und muss an das tatsächliche Sortiment angeglichen werden. | `data/menu.json` → Kategorie `getraenke` → `options` |

---

## Preise ändern

Alles steht in **`data/menu.json`**.

```json
{
  "id": "cheeseburger",
  "name": "Cheeseburger",
  "description": {
    "de": "2× Premium Beef, P&B Belag …",
    "en": "2× premium beef, P&B toppings …"
  },
  "price": 10.90,
  "menuUpgrade": 7.00,
  "tags": ["halal"],
  "allergens": ["gluten", "milch", "senf", "ei"],
  "mayContain": ["sesam", "soja"],
  "image": null,
  "featured": false
}
```

**Regeln für Preise:**

- Punkt statt Komma: `10.90`, **nicht** `10,90`
- Keine Anführungszeichen und kein Eurozeichen: `10.90`, **nicht** `"10,90 €"`
- Auf der Seite erscheint der Preis automatisch in deutscher Schreibweise als `10,90 €`

**Die einzelnen Felder:**

| Feld | Bedeutung |
|---|---|
| `price` | Einzelpreis |
| `menuPrice` | Preis, wenn der Artikel Teil eines Menüs ist (nur Beilagen und Getränke) |
| `menuUpgrade` | Aufpreis, um einen Burger zum Menü zu machen |
| `kidsPrice` | Kinderpreis, falls es einen gibt |
| `tags` | `halal`, `vegetarisch`, `scharf`, `kids` — steuert die Filterknöpfe |
| `allergens` | Was **enthalten** ist |
| `mayContain` | Was als **Spur** möglich ist (erscheint in Klammern) |
| `featured` | `true` = große Karte mit Foto ganz oben in der Speisekarte |
| `image` | Pfad **ohne** Dateiendung, z. B. `"/img/cheeseburger"`, oder `null` |

**Menü-Aufschlag:** Ein Menü ist Burger + Beilage + Getränk. Der Grundaufschlag von
7,00 € steht in `menuDeal.surcharge` und ergibt sich aus Crunchy Pommes im Menü
(3,50 €) plus Getränk im Menü (3,50 €). Teurere Beilagen rechnet die Seite als
Differenz automatisch dazu — Süßkartoffelpommes machen aus 7,00 € also 8,00 €.
Wer die Pommes- oder Getränkepreise ändert, muss `menuDeal.surcharge` mit ändern;
`npm run check:data` meldet es, wenn die Zahlen nicht mehr zusammenpassen.

**Einen Artikel hinzufügen:** Einen bestehenden Block kopieren, `id` auf etwas
Eindeutiges setzen (Kleinbuchstaben, Bindestriche, keine Umlaute), Werte anpassen.
Die Reihenfolge in der Datei ist die Reihenfolge auf der Seite.

**Einen Artikel entfernen:** Den ganzen Block zwischen `{` und `}` löschen, samt dem
Komma davor oder danach.

Danach:

```bash
npm run check:data
```

---

## Öffnungszeiten und Feiertage ändern

In **`data/business.json`** unter `hours`:

```json
{ "day": 1, "key": "monday", "open": "15:00", "close": "21:30", "closed": false }
```

`day` ist der Wochentag: **0 = Sonntag**, 1 = Montag … 6 = Samstag. Alle sieben Tage
müssen vorhanden bleiben. Für einen Ruhetag `"closed": true` setzen — den Tag **nicht**
löschen.

Die Zeiten gelten in der Zeitzone Europe/Berlin. Die Anzeige „Jetzt geöffnet — bis
21:30" rechnet damit, egal wo die Besucherin gerade ist.

**Feiertage und Betriebsurlaub** kommen in `hours.exceptions`:

```json
{
  "date": "2026-12-24",
  "closed": true,
  "note": { "de": "Heiligabend geschlossen", "en": "Closed on Christmas Eve" }
}
```

Für einen Tag mit anderen Zeiten statt `"closed": true` einfach `"open"` und `"close"`
angeben. Abgelaufene Ausnahmen dürfen stehen bleiben, `npm run check:data` weist auf
sie hin.

---

## Fotos einsetzen

Die vollständige Liste der benötigten Aufnahmen mit Maßen und Bildideen steht in
**[FOTO-BRIEFING.md](./FOTO-BRIEFING.md)** — diese Datei kann direkt an eine
Fotografin oder einen Fotografen weitergegeben werden.

**So kommt ein Foto auf die Seite:**

1. Datei nach `public/img/` legen, benannt wie die Bild-ID, z. B. `hero-burger.jpg`
2. In `data/photos.json` beim passenden Eintrag `"src": null` ersetzen durch
   `"src": "/img/hero-burger"` — **ohne Dateiendung**
3. `npm run check:data` ausführen
4. Committen und pushen

Solange `src` auf `null` steht, zeigt die Seite an dieser Stelle einen sichtbar
beschrifteten Platzhalter mit den exakten Maßen und der Beschreibung der benötigten
Aufnahme. Das ist Absicht: Für einen Laden, der mit Frische wirbt, sind Stock- oder
KI-Bilder der schnellste Weg, Vertrauen zu verlieren.

**Moderne Bildformate (empfohlen, nicht zwingend):** Liegt neben `hero-burger.jpg`
auch `hero-burger.webp` und `hero-burger.avif`, nimmt jeder Browser automatisch das
kleinste Format, das er versteht. Umwandeln lässt sich das mit
[squoosh.app](https://squoosh.app) im Browser oder auf der Kommandozeile:

```bash
# ImageMagick, falls installiert
magick hero-burger.jpg -quality 82 hero-burger.webp
magick hero-burger.jpg -quality 55 hero-burger.avif
```

Die `.jpg`-Fassung muss immer dabei bleiben — sie ist die Rückfallebene.

**Bildbeschreibungen (alt-Texte)** stehen ebenfalls in `data/photos.json` und sind
bereits formuliert. Sie beschreiben, was auf dem Bild zu sehen sein wird. Weicht das
gelieferte Foto davon ab, den Text anpassen — er wird Blinden vorgelesen und von
Google gelesen.

---

## Bewertungen eintragen

In **`data/reviews.json`**. Aktuell stehen dort Platzhalter.

1. Google-Profil öffnen, vier echte Bewertungen aussuchen
2. Text **wörtlich** übernehmen. Kürzen ist erlaubt, Auslassungen mit `[…]` kennzeichnen.
   Sinnentstellendes Umschreiben ist nicht erlaubt.
3. `author` so schreiben, wie der Name öffentlich bei Google steht (üblich: Vorname
   und erster Buchstabe des Nachnamens)
4. `source` auf `Google`, `Restaurant Guru` oder `Tripadvisor` setzen, `date` als `JJJJ-MM`
5. Ganz oben `"verified": true` setzen — erst dann verschwindet der Warnhinweis auf der Seite

**Wichtig:** Erfundene, gekaufte oder geschönte Bewertungen sind in Deutschland
wettbewerbswidrig (§ 5 UWG, Anhang Nr. 23b) und werden regelmäßig abgemahnt. Der
Aufwand, vier echte Zitate herauszusuchen, ist kleiner als jede Abmahnung.

Die Sternebewertungen im Kopfbereich (4,7 aus 1.277 Bewertungen) stehen separat in
`data/business.json` unter `ratings` und sollten etwa jährlich aktualisiert werden.

---

## Texte ändern

| Was | Wo |
|---|---|
| Überschriften, Absätze, FAQ, Über uns | `lib/content.ts` |
| Knöpfe, Formularbeschriftungen, Fehlermeldungen | `lib/i18n.ts` |
| Impressum | `components/pages/ImpressumContent.tsx` |
| Datenschutzerklärung | `components/pages/DatenschutzContent.tsx` |
| Allergenseite (Rahmentexte) | `components/pages/AllergeneContent.tsx` |
| Stand der Rechtstexte | `lib/legal.ts` |

Jeder Text existiert zweimal: einmal unter `de`, einmal unter `en`. Fehlt ein Eintrag
in der englischen Fassung, bricht der Build ab — so kann keine Sprache stillschweigend
hinter der anderen zurückbleiben.

**Zum Ton:** Deutsch durchgängig per „du", direkt, ohne Werbesprech. Wer einen Satz
ändert, sollte ihn einmal laut lesen. Klingt er nach Broschüre, ist er falsch.

`lib/content.ts` und `lib/i18n.ts` sind getrennt, weil `content.ts` nur auf dem Server
gerendert wird und dadurch nicht im Browser landet. Deshalb: **`lib/content.ts` niemals
aus einer Datei mit `'use client'` importieren.**

---

## Allergene pflegen

Die Angaben stehen pro Artikel in `data/menu.json`. Daraus entstehen automatisch:

- die Kürzel an jedem Artikel in der Speisekarte
- die vollständige Tabelle unter `/allergene/`
- die Angaben in den strukturierten Daten für Google

Kürzel und Bedeutung stehen in `menu.allergenLegend`, die Zusatzstoff-Nummern nach
ZZulV in `menu.additiveLegend`.

**Rechtlicher Rahmen:** Bei loser Ware — und das ist alles, was hier über die Theke
geht — müssen die 14 kennzeichnungspflichtigen Allergene angegeben werden (LMIV
i. V. m. LMIDV). Nährwerte sind für frisch zubereitete, nicht vorverpackte Speisen
nach Art. 44 LMIV **nicht** verpflichtend; die Seite gibt deshalb bewusst keine an,
weil eine gerundete Schätzung für Menschen, die auf genaue Werte angewiesen sind,
schlechter wäre als keine Angabe.

Solange `_allergeneGeprueft` auf `false` steht, erscheint auf der Allergenseite ein
deutlicher Warnhinweis. Nach der Prüfung anhand der Lieferantendatenblätter (Buns,
Saucen, Käse, Sucuk, Veggie-Patty, Cheesecake) auf `true` setzen.

---

## Entwicklung und Deployment

**Voraussetzung:** Node.js 20 oder neuer.

```bash
npm install          # einmalig
npm run dev          # lokal auf http://localhost:3000
npm run build        # statische Seite nach out/ bauen
npm run start        # das Ergebnis lokal ansehen
```

**Prüfskripte:**

| Befehl | Was es prüft |
|---|---|
| `npm run check:data` | Preise, Öffnungszeiten, Allergene, Fotos, Telefonnummern — in verständlichem Deutsch |
| `npm run check:contrast` | Alle Farbkombinationen gegen WCAG 2.2 AA, gelesen aus `app/globals.css` |
| `npm run check:budget` | Wie viel JavaScript, CSS und HTML wirklich geladen wird (gzip) |
| `npm run typecheck` | TypeScript |
| `npm run check` | Typen, Kontrast und Daten in einem Aufwasch |

**Hilfsskripte:**

| Befehl | Was es tut |
|---|---|
| `npm run fonts` | Lädt Anton und Inter neu herunter und legt sie lokal ab |
| `npm run icons` | Erzeugt die App-Symbole und das Teilen-Bild aus dem Logo |
| `npm run photo-brief` | Erzeugt `FOTO-BRIEFING.md` neu aus `data/photos.json` |

**Netlify:** Die Datei `netlify.toml` ist fertig eingerichtet. Beim Verbinden des
Repositories erkennt Netlify sie automatisch:

- Build-Befehl: `npm run build`
- Verzeichnis: `out`
- Node-Version: 22

Jeder Push auf den Hauptzweig baut und veröffentlicht neu. Für die eigene Domain in
Netlify unter *Domain management* `pattiesandberries.de` hinzufügen und die DNS-Einträge
beim Domain-Anbieter setzen. Das kostenlose TLS-Zertifikat richtet Netlify selbst ein.

**Nach dem Umzug von eatbu.com:** Beim alten Anbieter Weiterleitungen auf die neue
Domain einrichten, damit die aufgebaute Sichtbarkeit bei Google nicht verloren geht.
In der Google Search Console anschließend die neue Property anlegen und die
`sitemap.xml` einreichen.

---

## Wie die Seite aufgebaut ist

```
app/
  (de)/                 Deutsche Seiten — Deutsch liegt auf der Wurzel „/"
    page.tsx            Startseite
    impressum/  datenschutz/  allergene/
    not-found.tsx       404
  (en)/en/              Englische Seiten unter „/en/"
  globals.css           Sämtliche Design-Token: Farben, Größen, Abstände
  fonts.generated.css   Erzeugt von scripts/fetch-fonts.mjs
  sitemap.ts robots.ts manifest.ts

components/             Bausteine der Seite
  pages/                Ganze Seiteninhalte (Startseite, Rechtstexte)

lib/
  data.ts               Typisierter Zugriff auf data/*.json
  photos.ts             Fotos — getrennt, damit sie nicht im Browser landen
  content.ts            Fließtexte (nur Server)
  i18n.ts               Bedienelement-Texte (auch Browser)
  hours.ts              Öffnungszeiten-Logik, immer Europe/Berlin
  pricing.ts            Preisberechnung des Warenkorbs
  order.ts              Baut die WhatsApp-Nachricht
  cart.tsx              Warenkorb (nur im Browser, localStorage)
  consent.tsx           Einwilligungsverwaltung
  schema.ts             Strukturierte Daten für Google

data/                   ← Hier wird gepflegt
public/fonts/           Selbstgehostete Schriften
scripts/                Prüf- und Hilfsskripte
```

**Warum statischer Export:** Es gibt keinen serverseitigen Code — Bestellungen laufen
über WhatsApp, Zahlungen im Laden. Netlify liefert also reines HTML, CSS und JavaScript
aus. Das ist am schnellsten, am günstigsten und hat die kleinste Angriffsfläche.

**Warum kein Bezahlvorgang auf der Seite:** Der Laden nimmt Bestellungen ohnehin über
WhatsApp an. Ein eigenes Bestellsystem würde bedeuten: Zahlungsdienstleister,
PCI-Pflichten, Gebühren pro Bestellung und ein zweites System, in das jemand schauen
muss. Stattdessen erzeugt die Seite eine fertig formulierte WhatsApp-Nachricht an
dieselbe Nummer wie bisher — nur diesmal vollständig, sortiert und ohne Rückfragen.

---

## Rechtliches

Was eingebaut ist:

- **Impressum** (`/impressum/`) nach § 5 DDG und § 18 Abs. 2 MStV, inklusive
  Verweis auf die EU-Streitschlichtungsplattform. Aus dem Fußbereich jeder Seite
  mit einem Klick erreichbar.
- **Datenschutzerklärung** (`/datenschutz/`) nach DSGVO und TDDDG. Beschreibt, was
  die Seite tatsächlich tut: Warenkorb und Spracheinstellung bleiben lokal im
  Browser, es gibt kein Tracking, keine Nutzerkonten und keine Datenbank.
  Ausdrücklich behandelt: WhatsApp als Bestellkanal samt Drittlandübermittlung,
  Google Maps, Hosting bei Netlify.
- **Einwilligungsbanner** mit einzeln wählbaren Kategorien. Nichts ist vorangekreuzt,
  „Nur Notwendiges" steht gleichberechtigt neben „Alles erlauben", und ohne
  Entscheidung wird nichts Nicht-Notwendiges geladen. Jederzeit über die Fußzeile
  änderbar.
- **Google Maps hinter einer Klickschranke.** Vor dem Klick geht keine einzige
  Anfrage an Google. Das ist keine Vorsicht, sondern Pflicht — das LG München I hat
  schon für eine eingebettete Schriftart Schadensersatz zugesprochen.
- **Allergenkennzeichnung** (`/allergene/`) nach LMIV/LMIDV, dazu die
  Zusatzstoff-Kennzeichnung nach ZZulV.
- **Preisangaben** durchgängig in Euro inklusive Mehrwertsteuer, mit dem Hinweis,
  dass eine Liefergebühr anfallen kann und bei der Bestätigung genannt wird.
- **Verbindlichkeit:** Der Hinweis „Deine Bestellung ist erst nach unserer
  Bestätigung verbindlich" steht direkt über dem Absendeknopf.

**Nicht enthalten, weil nicht erforderlich:** Eine Widerrufsbelehrung. Für Speisen,
die frisch zubereitet und sofort geliefert werden, besteht nach § 312g Abs. 2 Nr. 2
und Nr. 9 BGB kein Widerrufsrecht. Sollte künftig etwas Vorverpacktes verschickt
werden, ändert sich das.

> Die Rechtstexte sind sorgfältig vorbereitete Entwürfe, keine Rechtsberatung.
> Vor dem Livegang anwaltlich prüfen lassen. Die Stellen, an denen noch Angaben
> fehlen, sind auf den Seiten farbig hervorgehoben.

---

## Leistung und das JavaScript-Budget

`npm run check:budget` misst nach jedem Build, was tatsächlich über die Leitung geht.

**Stand jetzt (Startseite, gzip):**

| | |
|---|---|
| React + Next.js App Router | 100,3 kB |
| Eigener Code, Speisekarte, Texte | 39,9 kB |
| **JavaScript gesamt** | **140,2 kB** |
| CSS | 7,8 kB |
| HTML | 36,2 kB |

**Zur Zielvorgabe von 100 kB:** Sie ist mit dem vorgegebenen Stack nicht erreichbar.
React 19 und die Next.js-Laufzeit belegen für sich genommen bereits 100,3 kB gzip,
bevor eine einzige eigene Zeile dazukommt. Das ist keine Nachlässigkeit, sondern eine
Eigenschaft des Frameworks.

Am eigenen Anteil ist gearbeitet worden — er lag anfangs bei 45,9 kB:

- Die Fotobeschreibungen (`data/photos.json`) liegen in einem eigenen Modul, das nur
  der Server lädt. Sie sind ausführlich und wurden vorher unnötig mitgeliefert.
- Die langen Fließtexte (FAQ, Über uns, Handwerk) sind nach `lib/content.ts`
  gewandert, das kein Browser-Code importiert.
- Interne Bearbeitungshinweise standen in den JSON-Dateien und wurden dadurch
  öffentlich mit ausgeliefert. Sie stehen jetzt hier in dieser README.

**Wenn die 100-kB-Grenze zwingend ist**, führt der Weg über einen Bau ohne Framework:
dieselben Daten, dieselbe Gestaltung, aber serverseitig zu HTML gerendert und mit
etwa 8–12 kB eigenem JavaScript für Filter, Warenkorb und Einwilligung. Das kostet
die Bequemlichkeit von React-Komponenten und macht spätere Änderungen aufwendiger.
Diese Abwägung sollte bewusst getroffen werden, nicht nebenbei.

**Was für die Ladezeit ohnehin getan ist:**

- Statisches HTML, keine Serverantwortzeit
- Schriften selbst gehostet, vorgeladen, mit `font-display: swap`
- Jedes Bild mit fester Breite und Höhe im HTML — es springt beim Laden nichts (CLS)
- Bilder außerhalb des ersten Bildschirms werden verzögert geladen
- Lange Cache-Zeiten für Schriften, Bilder und Programmcode (siehe `netlify.toml`)
- Keine externen Skripte, keine Werbenetzwerke, keine Schriften von Google

---

## Barrierefreiheit

Die Seite ist auf WCAG 2.2 Stufe AA gebaut. Für Bestellvorgänge gilt in Deutschland
seit Juni 2025 das Barrierefreiheitsstärkungsgesetz.

Was geprüft ist:

- **Farbkontraste** — alle 31 verwendeten Kombinationen erfüllen die Anforderung,
  nachprüfbar mit `npm run check:contrast`. Das Skript liest die Werte aus der
  ausgelieferten CSS-Datei, kann also nicht stillschweigend veralten.
- **Tastaturbedienung** — die gesamte Bestellstrecke ist ohne Maus bedienbar. Der
  Artikeldialog nutzt das native `<dialog>`-Element und hält den Fokus fest;
  Escape schließt ihn.
- **Sichtbarer Fokus** überall, und zwar sofort statt eingeblendet.
- **Sprunglink** zum Hauptinhalt als erstes Tab-Ziel.
- **Formulare** mit echten `<label>`-Elementen, keine Beschriftung im Platzhaltertext.
  Fehler erscheinen als Übersicht mit Sprungpunkten und werden über `aria-describedby`
  am Feld angesagt.
- **Überschriften** in sauberer Reihenfolge, genau ein `<h1>` pro Seite.
- **Bildbeschreibungen** auf Deutsch für jedes Bild.
- **`prefers-reduced-motion`** schaltet sämtliche Bewegung ab, auch das weiche Scrollen.
- **Bewertungen wechseln nur auf Klick**, nichts läuft von allein (WCAG 2.2.2).

---

## Suchmaschinen

Ausgerichtet auf: „Burger Moers", „Burger Restaurant Moers", „bester Burger Moers",
„helal Burger Moers", „Burger Lieferservice Moers", „Burger Niederrhein".

- Die Speisekarte ist echtes HTML, kein Bild. Jeder Artikel mit Name, Beschreibung und
  Preis ist für Google lesbar — das war bei der alten Seite nicht so und ist der
  größte einzelne Gewinn an dieser Stelle.
- Strukturierte Daten (JSON-LD) für `Restaurant`, die komplette `Menu` mit allen 29
  Artikeln und Preisen, `FAQPage`, `BreadcrumbList` und `WebSite`. Prüfen unter
  [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- `sitemap.xml`, `robots.txt`, `canonical` und `hreflang` für Deutsch und Englisch
  werden beim Build erzeugt.
- Öffnungszeiten für alle sieben Tage in den strukturierten Daten — dadurch kann
  Google „Jetzt geöffnet" direkt in den Suchergebnissen anzeigen.

**Nach dem Livegang:**

1. Google Search Console: Property für `pattiesandberries.de` anlegen, `sitemap.xml`
   einreichen
2. Google Unternehmensprofil: Website-Adresse auf die neue Domain ändern
3. Instagram und Facebook: Link in der Profilbeschreibung aktualisieren
4. Bei eatbu.com eine Weiterleitung auf die neue Domain einrichten
5. Nach ein bis zwei Wochen in der Search Console prüfen, ob die Seiten indexiert sind

---

## Lizenzen

Der Programmcode dieser Seite gehört Patties & Berries. Die Schriften Anton und Inter
stehen unter der SIL Open Font License 1.1 und dürfen kommerziell genutzt werden.
Die Zahlungsarten sind bewusst als Text und nicht als Markenlogos dargestellt — deren
Verwendung ist markenrechtlich an Vorgaben der jeweiligen Anbieter gebunden.
