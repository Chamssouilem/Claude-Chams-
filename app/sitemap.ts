import type { MetadataRoute } from 'next';
import { business } from '@/lib/data';
import { PAGE_PAIRS } from '@/lib/metadata';

/**
 * sitemap.xml — wird beim Build erzeugt.
 *
 * Jede Seite erscheint einmal pro Sprache, mit wechselseitigen hreflang-
 * Verweisen. Google mag es, wenn Sitemap und die <link>-Angaben im HTML
 * dasselbe sagen.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const priority: Record<string, number> = {
    home: 1,
    allergene: 0.5,
    impressum: 0.3,
    datenschutz: 0.3,
  };

  for (const [page, pair] of Object.entries(PAGE_PAIRS)) {
    for (const locale of ['de', 'en'] as const) {
      entries.push({
        url: `${business.url}${pair[locale]}`,
        lastModified: now,
        changeFrequency: page === 'home' ? 'weekly' : 'yearly',
        priority: (priority[page] ?? 0.5) * (locale === 'de' ? 1 : 0.9),
        alternates: {
          languages: {
            'de-DE': `${business.url}${pair.de}`,
            en: `${business.url}${pair.en}`,
          },
        },
      });
    }
  }

  return entries;
}
