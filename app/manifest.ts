import type { MetadataRoute } from 'next';
import { business } from '@/lib/data';

export const dynamic = 'force-static';

/** Web-App-Manifest — damit die Seite sauber auf den Homescreen passt. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} — Burger Restaurant Moers`,
    short_name: 'Patties & Berries',
    description:
      'Smash Burger aus Moers. Fleisch täglich frisch gewolft, alles helal. Bestellen per WhatsApp.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#141210',
    theme_color: '#141210',
    lang: 'de-DE',
    dir: 'ltr',
    categories: ['food', 'restaurant'],
    icons: [
      
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
