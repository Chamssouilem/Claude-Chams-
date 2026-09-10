/**
 * Erzeugt FOTO-BRIEFING.md aus data/photos.json.
 *
 * So kann die Liste, die an die Fotografin oder den Fotografen geht, nicht von
 * dem abweichen, was die Seite tatsächlich erwartet. Nach jeder Änderung an
 * photos.json neu ausführen: `npm run photo-brief`
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const { photos } = JSON.parse(await readFile(join(root, 'data', 'photos.json'), 'utf8'));

const open = photos.filter((p) => !p.src);
const done = photos.filter((p) => p.src);

const mp = (w, h) => ((w * h) / 1_000_000).toFixed(1);

const lines = [];

lines.push('# Foto-Briefing — Patties & Berries');
lines.push('');
lines.push('> Diese Datei wird erzeugt. Nicht von Hand bearbeiten — stattdessen `data/photos.json`');
lines.push('> ändern und `npm run photo-brief` ausführen.');
lines.push('');
lines.push('Diese Liste kann direkt an eine Fotografin oder einen Fotografen weitergegeben werden.');
lines.push('');
lines.push(`**Stand:** ${new Date().toLocaleDateString('de-DE')} · **Offen:** ${open.length} von ${photos.length} Aufnahmen`);
lines.push('');

lines.push('## Warum das der wichtigste Posten im Budget ist');
lines.push('');
lines.push('Der Laden verkauft Frische und Handarbeit. Ein gekauftes Stockfoto oder ein');
lines.push('KI-erzeugtes Burgerbild widerspricht genau dem Versprechen, mit dem geworben wird —');
lines.push('und Gäste erkennen den Unterschied schneller, als man denkt. Solange kein echtes');
lines.push('Foto vorliegt, zeigt die Seite bewusst einen beschrifteten Platzhalter statt eines');
lines.push('fremden Bildes. Das ist ehrlicher und kostet weniger Vertrauen.');
lines.push('');
lines.push('Ein halber Tag Foto-Shooting im Laden bringt für die Bestellquote mehr als jede');
lines.push('einzelne Gestaltungsentscheidung an dieser Seite.');
lines.push('');
lines.push('Für das Gespräch mit der Fotografin oder dem Fotografen gibt es zu jeder Aufnahme');
lines.push('unten einen fertigen Bildgenerator-Prompt in [BILD-PROMPTS.md](./BILD-PROMPTS.md).');
lines.push('Damit lässt sich vorab ein Referenzbild erzeugen, das Licht, Winkel und Stimmung');
lines.push('zeigt — als Moodboard, nicht als Ersatz für die echte Aufnahme.');
lines.push('');

lines.push('## Rahmenbedingungen für alle Aufnahmen');
lines.push('');
lines.push('- **Licht:** warm und seitlich, kein direkter Blitz von vorn. Die Seite ist dunkel');
lines.push('  gehalten — Aufnahmen mit dunklem Hintergrund fügen sich am besten ein.');
lines.push('- **Hintergrund:** ruhig und dunkel. Keine Requisiten, keine Holzbretter, keine');
lines.push('  gestreuten Pommes, keine Sauce-Kleckse als Deko.');
lines.push('- **Bearbeitung:** leichte warme Abstimmung, sonst zurückhaltend. Nichts, was das');
lines.push('  Essen anders aussehen lässt, als es serviert wird.');
lines.push('- **Dateiformat:** JPEG in bestmöglicher Qualität liefern lassen. Die Umwandlung');
lines.push('  nach WebP und AVIF erledigt der Betrieb später (siehe README).');
lines.push('- **Personen:** Für jede erkennbar abgebildete Person eine schriftliche Einwilligung');
lines.push('  einholen (§ 22 KUG und Art. 6 Abs. 1 lit. a DSGVO). Formular vorbereiten.');
lines.push('- **Nutzungsrechte:** Zeitlich und räumlich unbeschränktes, übertragbares Nutzungsrecht');
lines.push('  für Website, Social Media und Print schriftlich vereinbaren.');
lines.push('');

lines.push('## Die Aufnahmen im Einzelnen');
lines.push('');

for (const [i, photo] of photos.entries()) {
  lines.push(`### ${i + 1}. ${photo.id}${photo.src ? ' ✅ vorhanden' : ''}`);
  lines.push('');
  lines.push(`| | |`);
  lines.push(`|---|---|`);
  lines.push(`| **Wo auf der Seite** | ${photo.usage} |`);
  lines.push(`| **Mindestmaße** | ${photo.width} × ${photo.height} px (${mp(photo.width, photo.height)} MP), Seitenverhältnis ${ratio(photo.width, photo.height)} |`);
  lines.push(`| **Priorität** | ${photo.priority ? 'hoch — erstes sichtbares Bild der Seite' : 'normal'} |`);
  lines.push(`| **Dateiname** | \`public/img/${photo.id}.jpg\` |`);
  lines.push('');
  lines.push(`**Bildidee:** ${photo.shot.de}`);
  lines.push('');
  lines.push(`**Bildbeschreibung für Screenreader (steht bereits fest):** ${photo.alt.de}`);
  lines.push('');
}

lines.push('## Ablauf für ein Shooting an einem halben Tag');
lines.push('');
lines.push('Eine mögliche Reihenfolge, die ohne Umbauten auskommt:');
lines.push('');
lines.push('1. **Vormittags, vor dem Öffnen** — die Bun-Lieferung (`handwerk-brot`), das Wolfen');
lines.push('   des Fleisches (`handwerk-fleisch`). Beides passiert ohnehin und lässt sich');
lines.push('   mitlaufend fotografieren.');
lines.push('2. **Direkt danach am Grill** — der Smash-Moment (`handwerk-grill`). Braucht kurze');
lines.push('   Belichtungszeiten, damit der Dampf steht.');
lines.push('3. **Studioaufbau an einem Tisch im Laden** — die vier Burger-Aufnahmen und der');
lines.push('   Querschnitt für den Einstieg. Für den Querschnitt mehrere Burger einplanen:');
lines.push('   der erste Schnitt sitzt selten.');
lines.push('4. **Kurz vor dem Öffnen** — das Team hinter der Theke (`team`).');
lines.push('5. **Zur blauen Stunde** — die Außenaufnahme (`laden-aussen`) mit beleuchtetem Schild.');
lines.push('');
lines.push('Das Teilen-Bild (`og-image`) ist kein eigener Termin: Es ist ein Zuschnitt aus der');
lines.push('Hero-Aufnahme auf exakt 1200 × 630 px.');
lines.push('');

lines.push('## Was noch fehlt, außer Fotos');
lines.push('');
lines.push('- **Kartenbild (`karte-statisch`):** Kein Screenshot von Google Maps — das ist');
lines.push('  lizenzrechtlich nicht gedeckt. Stattdessen über openstreetmap.org ein Bild');
lines.push('  exportieren (Urhebervermerk „© OpenStreetMap-Mitwirkende, ODbL" beibehalten)');
lines.push('  oder eine eigene, schlichte Karte gestalten.');
lines.push('');

if (done.length) {
  lines.push(`## Bereits eingesetzt (${done.length})`);
  lines.push('');
  for (const p of done) lines.push(`- \`${p.id}\` → \`${p.src}\``);
  lines.push('');
}

function ratio(w, h) {
  const g = (a, b) => (b ? g(b, a % b) : a);
  const d = g(w, h);
  return `${w / d}:${h / d}`;
}

await writeFile(join(root, 'FOTO-BRIEFING.md'), lines.join('\n'));
console.log(`FOTO-BRIEFING.md erzeugt — ${photos.length} Aufnahmen, davon ${open.length} offen.`);
