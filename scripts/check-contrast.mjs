/**
 * Prüft die tatsächlich ausgelieferten Farbwerte aus app/globals.css gegen
 * WCAG 2.2 AA. Nach jeder Farbänderung ausführen: `npm run check:contrast`
 *
 * Der Test liest die Werte aus der CSS-Datei, nicht aus einer Kopie — er kann
 * also nicht stillschweigend veralten.
 */
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

/**
 * Farbwerte einlesen.
 *
 * Die Token stehen als Kanalwerte in der CSS ("--pb-ink-rgb: 20 16 14"), weil
 * Tailwinds Deckkraft-Schreibweise das so verlangt. Hier werden sie für die
 * Rechnung wieder in Hex übersetzt — geprüft wird also genau das, was
 * ausgeliefert wird.
 */
function parseChannels(block) {
  const tokens = {};
  for (const m of block.matchAll(/(--pb-[\w-]+)-rgb:\s*(\d+)\s+(\d+)\s+(\d+)\s*;/g)) {
    tokens[m[1]] =
      '#' + [m[2], m[3], m[4]].map((n) => Number(n).toString(16).padStart(2, '0')).join('');
  }
  return tokens;
}

function readTokens(source) {
  return parseChannels(
    source.slice(source.indexOf(':root {'), source.indexOf('@media (min-width: 900px)')),
  );
}

/** Die abweichenden Werte der hellen Sektion (.on-cream). */
function readCreamTokens(source) {
  const start = source.indexOf('.on-cream {');
  return parseChannels(source.slice(start, source.indexOf('}', start)));
}

const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (h) => {
  const [r, g, b] = toRgb(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
  return (hi + 0.05) / (lo + 0.05);
};

const T = readTokens(css);
const C = readCreamTokens(css);
const cream = T['--pb-cream'];

/** [Beschreibung, Vordergrund, Hintergrund, Mindestverhältnis] */
const checks = [
  ['Fließtext auf Basis',              T['--pb-cream'],       T['--pb-ink'],    4.5],
  ['Fließtext auf Fläche 2',           T['--pb-cream'],       T['--pb-ink-2'],  4.5],
  ['Fließtext auf Karte',              T['--pb-cream'],       T['--pb-ink-3'],  4.5],
  ['Fließtext auf Karte (Hover)',      T['--pb-cream'],       T['--pb-ink-4'],  4.5],
  ['Sekundärtext auf Basis',           T['--pb-cream-dim'],   T['--pb-ink'],    4.5],
  ['Sekundärtext auf Karte',           T['--pb-cream-dim'],   T['--pb-ink-3'],  4.5],
  ['Hilfstext auf Basis',              T['--pb-muted'],       T['--pb-ink'],    4.5],
  ['Hilfstext auf Fläche 2',           T['--pb-muted'],       T['--pb-ink-2'],  4.5],
  ['Hilfstext auf Karte',              T['--pb-muted'],       T['--pb-ink-3'],  4.5],
  ['Hilfstext auf Eingabefeld',        T['--pb-muted'],       T['--pb-ink-4'],  4.5],
  ['CTA-Schrift auf Akzentfläche',     cream,                 T['--pb-ember'],  4.5],
  ['CTA-Schrift im Hover',             cream,                 T['--pb-ember-hover'], 4.5],
  ['Akzentschrift auf Basis',          T['--pb-ember-text'],  T['--pb-ink'],    4.5],
  ['Akzentschrift auf Karte',          T['--pb-ember-text'],  T['--pb-ink-3'],  4.5],
  ['Beerenschrift auf Basis',          T['--pb-berry-text'],  T['--pb-ink'],    4.5],
  ['Beerenschrift auf Karte',          T['--pb-berry-text'],  T['--pb-ink-3'],  4.5],
  ['Fokusring auf Basis',              T['--pb-ember-bright'],T['--pb-ink'],    3],
  ['Fokusring auf Karte',              T['--pb-ember-bright'],T['--pb-ink-3'],  3],
  ['Fokusring auf Eingabefeld',        T['--pb-ember-bright'],T['--pb-ink-4'],  3],
  ['Feldrahmen auf Basis',             T['--pb-line-strong'], T['--pb-ink'],    1.5],
  ['Status „geöffnet“',                T['--pb-open'],        T['--pb-ink'],    4.5],
  ['Status „geschlossen“ / Fehler',    T['--pb-closed'],      T['--pb-ink'],    4.5],
  ['Fehlertext auf Eingabefeld',       T['--pb-closed'],      T['--pb-ink-4'],  4.5],
  ['Schrift auf Beerenfläche',         cream,                 T['--pb-berry'],  4.5],
  ['Messing auf Basis',                T['--pb-brass'],       T['--pb-ink'],    4.5],
  ['Messing auf Karte',                T['--pb-brass'],       T['--pb-ink-3'],  4.5],
  ['Messing auf Fläche 2',             T['--pb-brass'],       T['--pb-ink-2'],  4.5],
  // Helle Sektion (.on-cream): dort werden die Variablen umdefiniert
  ['hell: Fließtext',                  C['--pb-cream'],       T['--pb-cream'],  4.5],
  ['hell: Sekundärtext',               C['--pb-cream-dim'],   T['--pb-cream'],  4.5],
  ['hell: Hilfstext',                  C['--pb-muted'],       T['--pb-cream'],  4.5],
  ['hell: Akzentschrift',              C['--pb-ember-text'],  T['--pb-cream'],  4.5],
  ['hell: Beerenschrift',              C['--pb-berry-text'],  T['--pb-cream'],  4.5],
  ['hell: Fließtext auf Karte',        C['--pb-cream'],       C['--pb-ink-3'],  4.5],
  ['hell: Hilfstext auf Karte',        C['--pb-muted'],       C['--pb-ink-3'],  4.5],
  ['hell: Allergen-Kürzel',            C['--pb-cream-dim'],   C['--pb-ink-2'],  4.5],
  ['dunkel: Allergen-Kürzel',          T['--pb-cream-dim'],   T['--pb-ink-2'],  4.5],
  ['hell: Messing',                    T['--pb-brass-deep'],  T['--pb-paper'],  4.5],
  ['helle Fläche gegen dunkle Basis',  T['--pb-paper'],       T['--pb-ink'],    3],
];

let failed = 0;
console.log('Kontrastprüfung (WCAG 2.2 AA) — Werte aus app/globals.css\n');
for (const [label, fg, bg, min] of checks) {
  if (!fg || !bg) {
    console.log(`  ??  ${label} — Farbwert nicht gefunden`);
    failed++;
    continue;
  }
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `  ${ok ? '✓' : '✗'}  ${r.toFixed(2).padStart(5)} : ${String(min).padEnd(4)} ${label}` +
      (ok ? '' : `   ← ${fg} auf ${bg}`),
  );
}

console.log(
  failed === 0
    ? `\nAlle ${checks.length} Kombinationen erfüllen die Anforderung.`
    : `\n${failed} von ${checks.length} Kombinationen erfüllen die Anforderung NICHT.`,
);
process.exit(failed === 0 ? 0 : 1);
