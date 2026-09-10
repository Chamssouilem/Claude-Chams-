/**
 * Fotos — bewusst ein eigenes Modul, nicht Teil von lib/data.ts.
 *
 * Grund: photos.json enthält für jeden Bildplatz eine ausführliche
 * Aufnahmebeschreibung. Die braucht nur der Server beim Rendern des
 * Platzhalters. Läge die Datei in lib/data.ts, würde sie über die
 * Client-Komponenten (Speisekarte, Bestellstrecke) mit in den Browser
 * ausgeliefert — rund 10 kB, die dort niemand liest.
 *
 * Diese Datei darf deshalb NUR aus Server-Komponenten importiert werden.
 */
import photosJson from '@/data/photos.json';
import type { Photo, PhotosData } from './types';

export const photos = (photosJson as unknown as PhotosData).photos;

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}
