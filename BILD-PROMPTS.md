# Bild-Prompts — Patties & Berries

Prompts für Bildgeneratoren (Midjourney, Flux, Ideogram, DALL·E, Nano Banana),
passend zu den 13 Bildplätzen aus [`data/photos.json`](./data/photos.json).

**Die Prompts sind auf Englisch.** Alle gängigen Modelle sind überwiegend auf
englischen Bildbeschreibungen trainiert und liefern damit deutlich präzisere
Ergebnisse — besonders bei Lichtführung und Kameraangaben. Die Erklärungen
drumherum bleiben deutsch.

---

## Wofür diese Bilder gedacht sind

Die Prompts sind in zwei Teile geteilt, und der Unterschied ist wichtig:

**Teil A — Referenzbilder für das Shooting.** Das sind die Aufnahmen von Essen,
Team und Laden. Sie zeigen echte Produkte, echte Menschen und einen echten Ort.
Ein generiertes Bild davon wäre eine Behauptung über etwas, das es so nicht gibt —
und ausgerechnet bei einem Laden, der mit „selbst gewolft, täglich frisch" wirbt,
ist das die teuerste Art, Vertrauen zu verlieren. Diese Prompts sind deshalb dafür
da, **der Fotografin oder dem Fotografen zu zeigen, was gemeint ist**: Licht,
Winkel, Bildausschnitt, Stimmung. Ein Moodboard, kein Ersatz.

Das ist keine kleine Rolle. Ein gutes Referenzbild spart am Shooting-Tag eine halbe
Stunde Diskussion pro Aufnahme und sorgt dafür, dass alle 13 Bilder hinterher
zusammenpassen.

**Teil B — direkt einsetzbar.** Texturen, Hintergründe, Abstraktes. Nichts davon
behauptet etwas über den Laden, deshalb spricht nichts gegen die Verwendung.

Und ein Bildplatz, für den Generatoren die falsche Wahl sind — siehe Teil C.

---

## Der gemeinsame Stil-Baustein

Damit die Bilder wie eine Serie wirken und nicht wie 13 Einzelstücke, hängt an
jeden Prompt aus Teil A derselbe Block. Er übersetzt die Gestaltung der Website
in Kamerasprache.

```
STYLE: editorial food photography, shot on 85mm lens at f/2.8, warm tungsten
side light from camera left, deep near-black background (#141210), warm amber
highlights, high contrast with rich shadow detail, natural unstyled food, subtle
35mm film grain, muted warm color grade, shallow depth of field
```

Und der Negativ-Block. Der ist hier fast wichtiger als der Positiv-Teil: Er hält
genau die Burger-Klischees draußen, die im Briefing ausgeschlossen wurden.

```
NEGATIVE: chalkboard, distressed wood planks, rustic cutting board, checkered
paper, wicker basket, cartoon mascot, red and yellow fast food colors, cursive
script, any text, watermark, logo, plastic sheen, oversaturated, HDR, cold blue
lighting, floating ingredients, splash effects, scattered garnish, perfect
symmetry, generic stock photo look, deformed hands, extra fingers
```

**Wie man beides anhängt:**

| Modell | Wie |
|---|---|
| **Midjourney v6/v7** | Positiv-Prompt + `--ar <Verhältnis> --style raw --stylize 150`, Negatives als `--no chalkboard, distressed wood, ...` |
| **Flux (1.1 Pro, dev)** | Alles als Fließtext, Negatives positiv umformulieren („clean dark surface, no props") |
| **Ideogram v2/v3** | Positiv-Prompt, Negatives ins eigene „Negative prompt"-Feld, Style: `Realistic` |
| **DALL·E 3 / GPT Image** | Kennt keine Negativ-Prompts. Stattdessen positiv formulieren: statt „no wood" → „on a dark matte steel surface" |
| **Nano Banana / Gemini** | Umgangssprachlich beschreiben, dann nachschärfen: „mach den Hintergrund dunkler", „zeig die krossen Ränder deutlicher" |

---

# Teil A — Referenzbilder für das Shooting

> Diese Bilder gehen an die Fotografin oder den Fotografen, nicht auf die Website.

---

## 1. `hero-burger` — 3:2 (2400 × 1600)

Das wichtigste Bild der Seite. Es steht ganz oben und trägt die gesamte Behauptung
„echtes Fleisch, echte Handarbeit". Worauf es ankommt: **die krossen, spitzenartigen
Ränder der Smash-Patties.** Das ist das Verkaufsargument, das man auf keinem
Tiefkühl-Patty bekommt. Ist der Rand nicht scharf im Bild, ist das Bild wertlos.

```
Extreme close-up of a smash burger sliced cleanly in half, the cut face angled
toward the camera in a three-quarter view. Two thin beef patties with lacy,
deeply caramelised crisp edges clearly visible in cross-section, molten orange
cheddar folding over the patty edge, crisp green lettuce, one tomato slice, thin
pickle rounds, soft glossy bun slightly compressed under its own weight. Juices
glistening on the cut face but not dripping. The crisp patty edges are the
sharpest point of focus.
```

Zusatz für Midjourney: `--ar 3:2`

---

## 2. `handwerk-fleisch` — 4:5 (1200 × 1500)

Die Aufnahme, die den Preis rechtfertigt. Sie muss nach Arbeit aussehen, nicht nach
Werbung — Edelstahl, echtes Küchenlicht, Hände im Bild.

```
A commercial meat grinder working in a small restaurant kitchen. Whole cuts of
dark red beef being fed into the top hopper, freshly ground beef emerging in
thick strands into a stainless steel tray below. A cook's forearms and hands in
frame guiding the meat, sleeves rolled up, plain black apron. Brushed stainless
steel surfaces, real working kitchen light from above, dark background. Vertical
composition, documentary style, slightly gritty, unglamorous.
```

Zusatz für Midjourney: `--ar 4:5`

---

## 3. `handwerk-brot` — 4:5 (1200 × 1500)

Der Beleg für „täglich frisch vom Bäcker". Anderes Licht als der Rest der Serie —
Morgen, Tageslicht durch die Ladentür — und das ist gewollt: Es erzählt die Uhrzeit.

```
Freshly baked burger buns stacked in a baker's plain delivery tray, standing
inside a restaurant early in the morning. Pale golden glossy tops, faint steam
still rising. Soft cool daylight falling from a doorway at camera right onto the
buns, the interior behind them dark. The tray is plain and unbranded. Vertical
composition, quiet documentary style, no styling.
```

Zusatz für Midjourney: `--ar 4:5`

---

## 4. `handwerk-grill` — 4:5 (1200 × 1500)

Der Moment, in dem aus Fleisch ein Smash Burger wird. Braucht eine kurze
Belichtungszeit, sonst verwischt der Dampf zu Nebel.

```
A ball of ground beef being pressed flat onto a screaming hot flat-top griddle
with a heavy metal smash press, captured at the instant of contact. Steam and
smoke rising in defined wisps, the edges already browning and lacing outward.
A cook's hand and forearm gripping the press. Very short exposure so every wisp
of steam is frozen and separate. Dark and high contrast, the warm amber glow
coming from the sear itself. Vertical composition.
```

Zusatz für Midjourney: `--ar 4:5`

---

## 5. `burger-real-deal` — 4:3 (1200 × 900)

Drei Patties für 12,90 €. Der einzige Job dieses Bildes ist, dass man sie zählen kann.

```
A triple smash burger photographed from the side at exact eye level so that all
three beef patties are individually countable, each one thin with crisp lacy
browned edges, melted cheddar sagging between the layers. Soft glossy bun on top.
Dark matte surface, warm raking light from camera left, deep shadow falling away
behind. No props.
```

Zusatz für Midjourney: `--ar 4:3`

---

## 6. `burger-mexican` — 4:3 (1200 × 900)

Einer der beiden lokalen Signature-Burger. Nachos und Jalapeños müssen sofort
erkennbar sein — sie sind der Grund, warum jemand diesen und keinen anderen wählt.

```
A double smash burger in three-quarter view topped with whole crunchy tortilla
nacho chips wedged upright into the bun, sliced green jalapeños, raw white onion,
pickle rounds, and warm chili cheese sauce running slowly down one side. Melted
cheddar underneath. Dark matte surface, warm side light, deep shadow behind.
No props.
```

Zusatz für Midjourney: `--ar 4:3`

---

## 7. `burger-beef-bacon` — 4:3 (1200 × 900)

Der teuerste Burger der Karte (13,90 €). Der Bacon muss über den Rand hängen,
sonst sieht man nicht, wofür man zahlt.

```
A double smash burger in three-quarter view with thick strips of dry-aged beef
bacon visibly overhanging the edge of the bun, crispy fried onions scattered on
top as texture, creamy coleslaw, a tomato slice, pickle rounds, and glossy
honey-mustard barbecue sauce catching the light on the patty. Dark matte surface,
warm raking light from camera left. No props.
```

Zusatz für Midjourney: `--ar 4:3`

---

## 8. `burger-sucuk-ei` — 4:3 (1200 × 900)

Der lokale Signature-Burger — das Bild, für das man aus Krefeld herfährt. Wenn eine
Aufnahme der Serie besonders gut werden soll, dann diese. Leicht von oben, damit
Spiegelei und Sucuk beide im Bild sind.

```
A double smash burger photographed from a 45-degree angle slightly above, topped
with a fried egg with a bright intact orange yolk and three overlapping slices of
Turkish sucuk sausage, their edges curled and blistered from the griddle, melted
cheddar underneath. Dark matte surface, warm side light, deep shadow behind.
No props.
```

Zusatz für Midjourney: `--ar 4:3`

---

## 9. `team` — 3:2 (1600 × 1067)

„Hinter der Theke steht kein Personal, sondern eine zweite Familie" — das steht so
im Über-uns-Text. Ein aufgereihtes Gruppenfoto würde diesen Satz widerlegen. Also
mitten im Betrieb fotografieren.

```
A small restaurant crew of five people behind a stainless steel counter in a
compact burger shop during service. Plain black work aprons and t-shirts. Nobody
posed in a line: one is plating a burger, one is glancing toward the camera and
half-smiling, the others are working. Warm interior lighting, dark walls, a hint
of motion blur in the background. Candid documentary portrait, natural and
unglamorous, real people.
```

Zusatz für Midjourney: `--ar 3:2`

**Rechtlich beim echten Shooting:** Von jeder erkennbar abgebildeten Person eine
schriftliche Einwilligung einholen (§ 22 KUG, Art. 6 Abs. 1 lit. a DSGVO). Ein
Formular vorher vorbereiten, nicht zwischen Tür und Angel klären.

---

## 10. `laden-aussen` — 3:2 (1200 × 800)

Wiedererkennungswert für Leute, die zum ersten Mal herfahren. Die Einfahrt mit den
vier Stellplätzen gehört ins Bild — genau danach suchen sie beim Ankommen.

```
A small independent burger restaurant on a suburban German street at blue hour.
Warm light spilling out through the front windows, an illuminated sign above the
door, a short driveway with parking spaces directly in front of the entrance.
Wet asphalt reflecting the warm light against the deep blue sky. Quiet, no people
in frame. Architectural documentary photography, warm interior against cool
exterior.
```

Zusatz für Midjourney: `--ar 3:2`

---

## 11. `gutschein` — 3:2 (1200 × 800)

Ruhig und schlicht. Das Bild muss nur belegen, dass es den Gutschein wirklich gibt.
Bewusst **ohne Text im Bild** — Generatoren schreiben unlesbaren Buchstabensalat,
und auf der Website steht später ohnehin der echte Gutschein.

```
A single printed gift voucher card lying flat on a dark stainless steel counter
in a restaurant. Heavy matte card stock, completely blank front, no text and no
markings. Warm side light from camera left, shallow depth of field, deep shadow
behind. Quiet minimal product photography, no props.
```

Zusatz für Midjourney: `--ar 3:2`

---

## 12. `og-image` — 1200 × 630

Kein eigenes Shooting. Das ist das Bild, das erscheint, wenn jemand den Link per
WhatsApp weiterschickt — und es entsteht als **Zuschnitt aus `hero-burger`** auf
exakt 1200 × 630, mit dem Logo unten links und viel Luft.

Aktuell liegt unter `public/img/og-image.png` eine schlichte grafische Fassung
(Logo auf dunklem Grund), damit geteilte Links nicht ohne Vorschaubild dastehen.
Sobald das Hero-Foto da ist, wird sie ersetzt.

---

# Teil B — Direkt einsetzbar

Diese Bilder behaupten nichts über den Laden. Sie können ohne Bedenken verwendet
werden.

## Sektions-Hintergrundtextur

Für dunkle Abschnitte, sehr dezent hinterlegt (Deckkraft 6–10 %). Gibt Tiefe, ohne
sich in den Vordergrund zu drängen.

```
Seamless flat texture of a dark, well-seasoned cast iron griddle surface. Near
black with subtle warm brown mottling and faint circular tool marks. Matte, very
low contrast, no specular highlights, no reflections. Photographed straight down
under even diffuse light. Tileable.
```
`--ar 1:1 --tile`

## Warmer Hintergrundverlauf für Teilen-Bilder

```
Abstract background, deep near-black centre (#141210) fading to a very dark warm
brown at the outer edges, like the unlit corner of a kitchen. Subtle 35mm film
grain. No subject, no objects, no text, no gradient banding.
```
`--ar 40:21`

## Papierstruktur für die Allergen- und Rechtsseiten

Optional, für eine hellere Fläche mit Charakter.

```
Seamless texture of warm off-white uncoated paper (#F5F0E8), fine natural fibre
grain, no folds, no creases, no printing, photographed flat under even light.
Tileable.
```
`--ar 1:1 --tile`

---

# Teil C — Wofür Generatoren die falsche Wahl sind

## `karte-statisch` — 16:9 (1200 × 675)

Das Vorschaubild der Karte, das vor dem Google-Maps-Klick zu sehen ist.

**Nicht generieren lassen.** Ein KI-erzeugtes „Kartenbild" zeigt erfundene Straßen
mit erfundenen Namen. Wer sich danach richtet, fährt falsch — das ist kein
ästhetisches Problem, sondern ein praktisches. Ein Screenshot von Google Maps ist
lizenzrechtlich ebenfalls nicht gedeckt.

**Der richtige Weg**, in fünf Minuten erledigt:

1. [openstreetmap.org](https://www.openstreetmap.org) öffnen, Uerdinger Straße 101b,
   47441 Moers suchen
2. Zoomstufe so wählen, dass die Uerdinger Straße und ein paar Querstraßen zu sehen
   sind
3. Links auf „Teilen" → „Bild herunterladen", Format 1200 × 675
4. Den Vermerk „© OpenStreetMap-Mitwirkende, ODbL" im Bild oder in der
   Bildunterschrift stehen lassen — der ist Lizenzbedingung
5. Als `public/img/karte-statisch.jpg` ablegen und in `data/photos.json` eintragen

Alternativ liefern [Mapbox](https://www.mapbox.com/) oder
[MapTiler](https://www.maptiler.com/) statische Kartenbilder mit eigenem Farbschema —
dort ließe sich die Karte sogar an die dunkle Gestaltung der Seite anpassen. Beide
haben ein kostenloses Kontingent, das für eine Restaurantseite locker reicht.

---

# Praktisches zum Generieren

**Immer mehrere Varianten erzeugen.** Vier bis sechs pro Prompt, dann die beste
auswählen. Der erste Treffer ist selten der beste, und bei Essen entscheidet sich
die Qualität an Details, die man nicht direkt steuern kann.

**Nachschärfen statt neu anfangen.** Wenn ein Bild fast passt, den Prompt gezielt
ergänzen, nicht komplett umschreiben:

| Problem | Ergänzung |
|---|---|
| Zu hell, zu freundlich | `darker overall exposure, deeper shadows, single light source` |
| Sieht nach Werbeagentur aus | `imperfect, slightly messy, real restaurant food, not styled` |
| Patty-Rand zu glatt | `heavily caramelised lacy crust on the patty edges, Maillard browning` |
| Zu viel Beiwerk im Bild | `nothing else in frame, empty dark background` |
| Farben zu bunt | `desaturated, muted warm palette, cinematic color grade` |
| Käse sieht plastikartig aus | `real melted cheddar, matte not glossy, slightly uneven melt` |

**Auflösung.** Die Zielmaße stehen bei jedem Prompt. Die meisten Modelle liefern
kleiner — hochskalieren mit der Upscale-Funktion des jeweiligen Dienstes oder mit
[upscayl.org](https://upscayl.org) (kostenlos, offline). Für Referenzbilder reicht
ohnehin jede Größe; für echte Website-Bilder gelten die Maße aus
[FOTO-BRIEFING.md](./FOTO-BRIEFING.md).

**Wenn generierte Bilder doch auf die Seite sollen:** Nach § 5 UWG dürfen
Abbildungen nicht über die tatsächliche Beschaffenheit einer Ware täuschen. Bei
Speisen gilt zusätzlich Art. 7 LMIV. Praktisch heißt das: Ein generiertes Bild
neben „Fleisch täglich frisch gewolft" ist angreifbar, ein abstrakter Hintergrund
nicht. Im Zweifel Teil B verwenden und den Rest fotografieren lassen.
