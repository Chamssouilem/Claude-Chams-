/**
 * Erzeugt die PNG-Symbole (Apple-Touch-Icon, Maskable-Icon) aus derselben
 * Form wie public/logo.svg. Läuft ohne externe Bibliothek — Node kann alles,
 * was ein PNG braucht: zlib und ein bisschen Rechnerei.
 *
 * Aufrufen nach einer Änderung am Logo: `node scripts/make-icons.mjs`
 */
import { deflateSync } from 'node:zlib';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'public');

const INK = [0x14, 0x12, 0x10];
const CREAM = [0xf5, 0xf0, 0xe8];
const EMBER = [0xb8, 0x3d, 0x1b];
const BERRY = [0x7a, 0x2e, 0x45];

/** Zeichnet das Logo in ein 64×64-Koordinatensystem, 4-fach überabgetastet. */
function renderLogo(size, { padding = 0, background = INK } = {}) {
  const SS = 4; // Kantenglättung durch Überabtastung
  const px = new Uint8ClampedArray(size * size * 4);
  const scale = (size * (1 - padding * 2)) / 64;
  const offset = size * padding;

  const toLocal = (x, y) => [(x - offset) / scale, (y - offset) / scale];

  const inRoundRect = (x, y, rx, ry, w, h, r) =>
    x >= rx && x <= rx + w && y >= ry && y <= ry + h &&
    !(x < rx + r && y < ry + r && (x - rx - r) ** 2 + (y - ry - r) ** 2 > r * r) &&
    !(x > rx + w - r && y < ry + r && (x - rx - w + r) ** 2 + (y - ry - r) ** 2 > r * r) &&
    !(x < rx + r && y > ry + h - r && (x - rx - r) ** 2 + (y - ry - h + r) ** 2 > r * r) &&
    !(x > rx + w - r && y > ry + h - r && (x - rx - w + r) ** 2 + (y - ry - h + r) ** 2 > r * r);

  /** Farbe an einem Punkt im 64er-Raster, oder null für „durchsichtig“. */
  function colorAt(lx, ly) {
    if (lx < 0 || ly < 0 || lx > 64 || ly > 64) return null;

    // Beere (liegt oben auf)
    if ((lx - 47) ** 2 + (ly - 17) ** 2 <= 4.5 ** 2) return BERRY;

    // Oberes Bun: Halbellipse 14..50 mit Scheitel bei y=12
    if (ly >= 12 && ly <= 24 && lx >= 14 && lx <= 50) {
      const nx = (lx - 32) / 18;
      const ny = (ly - 22) / 10;
      if (ly <= 22 ? nx * nx + ny * ny <= 1 : true) return CREAM;
    }

    // Patty
    if (inRoundRect(lx, ly, 12, 27, 40, 9, 4.5)) return EMBER;

    // Unteres Bun
    if (ly >= 40 && ly <= 50 && lx >= 14 && lx <= 50) {
      if (ly <= 43) return CREAM;
      const nx = (lx - 32) / 18;
      const ny = (ly - 43) / 7;
      if (nx * nx + ny * ny <= 1) return CREAM;
    }
    return null;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const [lx, ly] = toLocal(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS);
          const c = colorAt(lx, ly) ?? background;
          r += c[0]; g += c[1]; b += c[2];
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      px[i] = r / n; px[i + 1] = g / n; px[i + 2] = b / n; px[i + 3] = 255;
    }
  }
  return px;
}

/* --- Minimaler PNG-Schreiber ------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(px, width, height = width) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // Bittiefe
  ihdr[9] = 6;  // Farbtyp RGBA
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // Filter „None“
    Buffer.from(px.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const targets = [
  { file: 'apple-icon.png', size: 180, padding: 0.06 },
  { file: 'icon-192.png', size: 192, padding: 0.04 },
  { file: 'icon-512.png', size: 512, padding: 0.04 },
  { file: 'icon-maskable-512.png', size: 512, padding: 0.16 },
];

for (const t of targets) {
  const png = encodePng(renderLogo(t.size, { padding: t.padding }), t.size);
  await writeFile(join(OUT, t.file), png);
  console.log(`  ✓ ${t.file}  ${t.size}×${t.size}  (${(png.length / 1024).toFixed(1)} kB)`);
}

/* --- Teilen-Vorschau (Open Graph) --------------------------------------- */

/**
 * Erzeugt public/img/og-image.png in 1200 × 630 — das Bild, das erscheint,
 * wenn jemand den Link per WhatsApp weiterschickt.
 *
 * Vorläufig rein grafisch: Bildzeichen auf dunklem Grund mit einem
 * Akzentstrich. Das ist kein Notbehelf aus Bequemlichkeit, sondern die
 * ehrliche Variante — ein KI-erzeugtes oder gekauftes Burgerfoto wäre für
 * einen Laden, der mit Frische wirbt, genau das falsche Signal. Sobald das
 * echte Hero-Foto vorliegt, wird es hier ersetzt (siehe FOTO-BRIEFING.md).
 */
async function makeOgImage() {
  const W = 1200;
  const H = 630;
  const SS = 3;
  const px = new Uint8ClampedArray(W * H * 4);

  // Logo mittig, 300 px groß
  const LOGO = 300;
  const lx0 = (W - LOGO) / 2;
  const ly0 = (H - LOGO) / 2 - 26;
  const logo = renderLogo(LOGO, { padding: 0, background: INK });

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      let c = INK;

      // Akzentstrich unter dem Zeichen
      const barY = ly0 + LOGO + 46;
      if (y >= barY && y < barY + 6 && x >= W / 2 - 90 && x < W / 2 + 90) {
        c = EMBER;
      }
      // Rahmenlinie
      if (x < 8 || x >= W - 8 || y < 8 || y >= H - 8) {
        c = [0x3d, 0x36, 0x2f];
      }

      px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = 255;

      // Logo einsetzen
      if (x >= lx0 && x < lx0 + LOGO && y >= ly0 && y < ly0 + LOGO) {
        const li = ((y - ly0) * LOGO + (x - lx0)) * 4;
        px[i] = logo[li]; px[i + 1] = logo[li + 1]; px[i + 2] = logo[li + 2];
      }
    }
  }

  const { mkdir } = await import('node:fs/promises');
  await mkdir(join(OUT, 'img'), { recursive: true });
  const png = encodePng(px, W, H);
  await writeFile(join(OUT, 'img', 'og-image.png'), png);
  console.log(`  ✓ img/og-image.png  ${W}×${H}  (${(png.length / 1024).toFixed(1)} kB)`);
  void SS;
}

await makeOgImage();
