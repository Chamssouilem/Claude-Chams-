/**
 * Lädt die Schriften EINMALIG von Google Fonts herunter und legt sie unter
 * public/fonts/ ab. Die Dateien werden ins Repository eingecheckt.
 *
 * Wichtig für die DSGVO: Der Browser der Besucher:innen kontaktiert Google
 * NIEMALS. Dieses Skript läuft nur auf dem Rechner der Entwicklung, nicht im
 * Build und nicht im Browser. Erneut ausführen nur, wenn eine Schrift
 * aktualisiert werden soll: `npm run fonts`
 *
 * Lizenzen: Anton und Inter stehen unter der SIL Open Font License 1.1.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const OUT_DIR = join(process.cwd(), 'public', 'fonts');
/** Die @font-face-Regeln liegen im app-Ordner, damit sie beim Build in die
 *  Haupt-CSS eingebettet werden — eine Anfrage weniger auf dem kritischen Pfad. */
const CSS_OUT = join(process.cwd(), 'app', 'fonts.generated.css');

/** Nur diese Subsets werden benötigt: Deutsch + Englisch. */
const WANTED_SUBSETS = new Set(['latin', 'latin-ext']);

const FAMILIES = [
  { query: 'Anton', slug: 'anton' },
  { query: 'Inter:wght@400..700', slug: 'inter' },
];

/** Zerlegt die Google-Fonts-CSS in einzelne @font-face-Blöcke inkl. Subset-Kommentar. */
function parseFaces(css) {
  const faces = [];
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    faces.push({ subset: m[1], block: m[2] });
  }
  return faces;
}

function field(block, name) {
  const m = block.match(new RegExp(`${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const cssOut = [];
  const preloadList = [];

  for (const family of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family.query,
    ).replace(/%3A/g, ':').replace(/%40/g, '@')}&display=swap`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`CSS ${family.query}: HTTP ${res.status}`);
    const css = await res.text();

    for (const { subset, block } of parseFaces(css)) {
      if (!WANTED_SUBSETS.has(subset)) continue;

      const srcMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
      if (!srcMatch) continue;

      const weight = field(block, 'font-weight') ?? '400';
      const style = field(block, 'font-style') ?? 'normal';
      const unicodeRange = field(block, 'unicode-range');

      const fileName = `${family.slug}-${subset}.woff2`;
      const binRes = await fetch(srcMatch[1], { headers: { 'User-Agent': UA } });
      if (!binRes.ok) throw new Error(`Datei ${fileName}: HTTP ${binRes.status}`);
      const buf = Buffer.from(await binRes.arrayBuffer());
      await writeFile(join(OUT_DIR, fileName), buf);
      console.log(`  ✓ ${fileName}  (${(buf.length / 1024).toFixed(1)} kB)`);

      if (subset === 'latin') preloadList.push(`/fonts/${fileName}`);

      cssOut.push(
        [
          '@font-face {',
          `  font-family: '${family.slug === 'anton' ? 'Anton' : 'Inter'}';`,
          `  font-style: ${style};`,
          `  font-weight: ${weight};`,
          '  font-display: swap;',
          `  src: url('/fonts/${fileName}') format('woff2');`,
          unicodeRange ? `  unicode-range: ${unicodeRange};` : null,
          '}',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }

  const header = [
    '/*',
    ' * AUTOMATISCH ERZEUGT von scripts/fetch-fonts.mjs — nicht von Hand bearbeiten.',
    ' * Selbstgehostete Schriften. Es geht keine Anfrage an Google, weder beim Build',
    ' * noch im Browser. Anton & Inter: SIL Open Font License 1.1.',
    ' */',
    '',
  ].join('\n');

  await writeFile(CSS_OUT, header + cssOut.join('\n\n') + '\n');
  console.log('\nVorladen (preload) in app/layout.tsx:');
  preloadList.forEach((p) => console.log('  ' + p));
}

run().catch((err) => {
  console.error('Fehler:', err.message);
  process.exit(1);
});
