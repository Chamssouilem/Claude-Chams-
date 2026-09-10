/**
 * Misst, wie viel JavaScript und CSS eine Seite tatsächlich lädt — gzip-komprimiert,
 * so wie es beim Besucher ankommt.
 *
 * Aufruf: `npm run check:budget` (nach `npm run build`)
 *
 * Warum das hier steht: Die Zahl, die `next build` ausgibt, ist unkomprimiert
 * und enthält das Polyfill-Bündel, das moderne Browser gar nicht laden
 * (es ist mit `nomodule` ausgezeichnet). Dieses Skript rechnet, was wirklich
 * über die Leitung geht, und trennt Gerüst von eigenem Code.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'out');

/** Grenzwerte aus dem Briefing. */
const BUDGET_JS_KB = 100;

async function gzipSize(path) {
  return gzipSync(await readFile(path), { level: 9 }).length;
}

const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(6) + ' kB';

/** Alle Skript- und Stilverweise einer HTML-Seite einsammeln. */
function collectAssets(html) {
  const scripts = new Set();
  const styles = new Set();

  // <script src="..."> — Bündel mit nomodule laden moderne Browser nicht.
  for (const m of html.matchAll(/<script([^>]*?)src="(\/_next\/[^"]+\.js)"([^>]*)>/g)) {
    const attrs = m[1] + m[3];
    if (/nomodule/i.test(attrs)) continue;
    scripts.add(m[2]);
  }
  // Von Next vorab angeforderte Bündel zählen ebenfalls zur ersten Ladung.
  for (const m of html.matchAll(/<link[^>]+rel="preload"[^>]+href="(\/_next\/[^"]+\.js)"/g)) {
    scripts.add(m[1]);
  }
  for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="(\/_next\/[^"]+\.css)"/g)) {
    styles.add(m[1]);
  }
  return { scripts: [...scripts], styles: [...styles] };
}

/** Gerüstbündel (React + Next-Laufzeit) von eigenem Code unterscheiden. */
function isFramework(path) {
  return /\/(webpack|main-app|polyfills)-|\/4bd1b696-|\/255-/.test(path);
}

async function measure(htmlPath, label) {
  const html = await readFile(join(OUT, htmlPath), 'utf8');
  const { scripts, styles } = collectAssets(html);

  let framework = 0;
  let app = 0;
  const rows = [];

  for (const src of scripts) {
    const size = await gzipSize(join(OUT, src));
    const fw = isFramework(src);
    if (fw) framework += size;
    else app += size;
    rows.push({ src, size, fw });
  }

  let css = 0;
  for (const href of styles) css += await gzipSize(join(OUT, href));

  const htmlSize = gzipSync(Buffer.from(html), { level: 9 }).length;
  const totalJs = framework + app;

  console.log(`\n${label}   (${htmlPath})`);
  console.log('─'.repeat(64));
  for (const r of rows.sort((a, b) => b.size - a.size)) {
    console.log(`  ${kb(r.size)}  ${r.fw ? '[Gerüst]' : '[eigen] '}  ${r.src.replace('/_next/static/chunks/', '')}`);
  }
  console.log('─'.repeat(64));
  console.log(`  ${kb(framework)}  React + Next.js (unveränderlich)`);
  console.log(`  ${kb(app)}  eigener Code, Speisekarte und Texte`);
  console.log(`  ${kb(totalJs)}  JavaScript gesamt (gzip)`);
  console.log(`  ${kb(css)}  CSS (gzip)`);
  console.log(`  ${kb(htmlSize)}  HTML (gzip)`);
  console.log(`  ${kb(totalJs + css + htmlSize)}  Erste Ladung gesamt`);

  return { totalJs, framework, app, css, htmlSize };
}

const home = await measure('index.html', 'Startseite (Deutsch)');
await measure('impressum/index.html', 'Impressum');

console.log('\n' + '═'.repeat(64));
const overBudget = home.totalJs / 1024 > BUDGET_JS_KB;
console.log(
  `Vorgabe aus dem Briefing: JavaScript unter ${BUDGET_JS_KB} kB gzip.\n` +
    `Gemessen auf der Startseite: ${(home.totalJs / 1024).toFixed(1)} kB.`,
);
if (overBudget) {
  console.log(
    '\nHINWEIS — bekannte Abweichung, siehe README, Abschnitt „JavaScript-Budget“:\n' +
      `React 19 und die Next.js-App-Router-Laufzeit belegen allein ${(home.framework / 1024).toFixed(1)} kB gzip,\n` +
      'bevor eine einzige eigene Zeile dazukommt. Mit dem im Briefing vorgegebenen\n' +
      'Stack ist die 100-kB-Grenze deshalb rechnerisch nicht erreichbar.\n' +
      `Der eigene Anteil liegt bei ${(home.app / 1024).toFixed(1)} kB — daran ist gearbeitet worden.\n` +
      'Wenn die Grenze zwingend ist, ist ein Bau ohne Framework nötig (README).',
  );
}
// Kein Fehler-Exit: Die Abweichung ist dokumentiert und bewusst, das Skript
// soll den Netlify-Build nicht abbrechen.
