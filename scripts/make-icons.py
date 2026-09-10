#!/usr/bin/env python3
"""Erzeugt App-Symbole und Teilen-Vorschau aus dem echten Logo.

Aufrufen, wenn sich das Logo ändert:  python3 scripts/make-icons.py

Quelle ist public/img/logo-siegel.png — das freigestellte Original des Ladens.
Am Logo selbst wird nichts verändert: Wiedererkennung ist mehr wert als jede
Verbesserung, die niemand bestellt hat.
"""
from PIL import Image, ImageDraw
import os

INK = (20, 16, 14)
BRASS = (225, 168, 89)
RED = (196, 55, 43)
LINE = (62, 51, 44)

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
seal = Image.open(os.path.join(root, "public/img/logo-siegel.png")).convert("RGBA")


def icon(size, pad_ratio, out, colors=128):
    """Siegel mittig auf dunklem Grund, mit etwas Luft am Rand."""
    canvas = Image.new("RGBA", (size, size), INK + (255,))
    inner = int(size * (1 - pad_ratio * 2))
    canvas.alpha_composite(
        seal.resize((inner, inner), Image.LANCZOS),
        ((size - inner) // 2, (size - inner) // 2),
    )
    path = os.path.join(root, out)
    canvas.convert("RGB").quantize(colors=colors, method=Image.MEDIANCUT).save(
        path, optimize=True
    )
    return os.path.getsize(path)


def og_image():
    """1200 × 630 — das Bild, das beim Teilen eines Links erscheint."""
    W, H = 1200, 630
    im = Image.new("RGBA", (W, H), INK + (255,))
    d = ImageDraw.Draw(im)

    # Warmer Schein von unten, wie auf der Seite selbst
    for y in range(H):
        t = max(0.0, (y - H * 0.35) / (H * 0.65))
        a = int(30 * t * t)
        if a:
            d.line([(0, y), (W, y)], fill=RED + (a,))

    S = 300
    im.alpha_composite(
        seal.resize((S, S), Image.LANCZOS), ((W - S) // 2, int(H * 0.5 - S * 0.62))
    )

    bar_y = int(H * 0.5 + S * 0.46)
    d.rectangle([W // 2 - 110, bar_y, W // 2 + 110, bar_y + 3], fill=BRASS + (255,))
    d.rectangle([10, 10, W - 11, H - 11], outline=LINE + (255,), width=2)

    path = os.path.join(root, "public/img/og-image.png")
    im.convert("RGB").quantize(colors=192, method=Image.MEDIANCUT).save(path, optimize=True)
    return os.path.getsize(path)


for out, size, pad in [
    ("public/apple-icon.png", 180, 0.06),
    ("public/icon-192.png", 192, 0.04),
    ("public/icon-512.png", 512, 0.04),
    ("public/icon-maskable-512.png", 512, 0.17),
    ("app/icon.png", 64, 0.02),
]:
    print(f"  ✓ {out:34s} {icon(size, pad, out) // 1024} kB")

print(f"  ✓ {'public/img/og-image.png':34s} {og_image() // 1024} kB")
