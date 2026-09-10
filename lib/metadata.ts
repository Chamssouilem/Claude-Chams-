import type { Metadata } from 'next';
import { business } from './data';
import { c } from './content';
import type { Locale } from './types';

const SITE = business.url;

/** Zuordnung deutscher zu englischen Pfaden für hreflang. */
export const PAGE_PAIRS: Record<string, { de: string; en: string }> = {
  home: { de: '/', en: '/en/' },
  impressum: { de: '/impressum/', en: '/en/imprint/' },
  datenschutz: { de: '/datenschutz/', en: '/en/privacy/' },
  allergene: { de: '/allergene/', en: '/en/allergens/' },
};

interface BuildOptions {
  locale: Locale;
  page: keyof typeof PAGE_PAIRS;
  title?: string;
  description?: string;
  /** Rechtsseiten gehören nicht in den Index-Wettbewerb, aber sie müssen indexierbar bleiben. */
  noindex?: boolean;
}

/**
 * Baut die Metadaten einer Seite.
 *
 * Wichtig für zweisprachige Seiten: canonical zeigt immer auf die Seite
 * selbst, hreflang verweist wechselseitig, und x-default zeigt auf die
 * deutsche Fassung — das ist die Sprache der Nachbarschaft, die hier bestellt.
 */
export function buildMetadata({
  locale,
  page,
  title,
  description,
  noindex,
}: BuildOptions): Metadata {
  const x = c(locale);
  const pair = PAGE_PAIRS[page];
  const path = pair[locale];
  const url = `${SITE}${path}`;

  const finalTitle = title ?? x.meta.title;
  const finalDescription = description ?? x.meta.description;

  return {
    metadataBase: new URL(SITE),
    title: finalTitle,
    description: finalDescription,
    applicationName: business.name,
    authors: [{ name: business.name, url: SITE }],
    creator: business.name,
    publisher: business.name,
    generator: undefined,
    alternates: {
      canonical: url,
      languages: {
        'de-DE': `${SITE}${pair.de}`,
        en: `${SITE}${pair.en}`,
        'x-default': `${SITE}${pair.de}`,
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: business.name,
      title: finalTitle,
      description: finalDescription,
      url,
      locale: locale === 'de' ? 'de_DE' : 'en_GB',
      alternateLocale: locale === 'de' ? ['en_GB'] : ['de_DE'],
      images: [
        {
          url: '/img/og-image.png',
          width: 1200,
          height: 630,
          alt: x.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: ['/img/og-image.png'],
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
    formatDetection: { telephone: true, address: true, email: true },
    category: 'restaurant',
    other: {
      // Für lokale Suche und Karten-Apps
      'geo.region': 'DE-NW',
      'geo.placename': business.address.city,
      'geo.position': `${business.geo.lat};${business.geo.lng}`,
      ICBM: `${business.geo.lat}, ${business.geo.lng}`,
    },
  };
}

/** Die beiden Schrift-Dateien, die auf jeder Seite sofort gebraucht werden. */
export const PRELOAD_FONTS = ['/fonts/inter-latin.woff2', '/fonts/anton-latin.woff2'];
