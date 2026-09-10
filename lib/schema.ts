/**
 * Strukturierte Daten (JSON-LD) für Google & Co.
 *
 * Alles wird aus data/business.json und data/menu.json erzeugt — wer dort einen
 * Preis ändert, ändert ihn automatisch auch in den strukturierten Daten. Zum
 * Prüfen: search.google.com/test/rich-results und validator.schema.org
 */
import { business, menu } from './data';
import { c } from './content';
import type { Locale, MenuItem } from './types';

const SITE = business.url;

/** ISO-Wochentagsnamen, wie Schema.org sie erwartet. */
const SCHEMA_DAY: Record<number, string> = {
  0: 'https://schema.org/Sunday',
  1: 'https://schema.org/Monday',
  2: 'https://schema.org/Tuesday',
  3: 'https://schema.org/Wednesday',
  4: 'https://schema.org/Thursday',
  5: 'https://schema.org/Friday',
  6: 'https://schema.org/Saturday',
};

const ORDER = [1, 2, 3, 4, 5, 6, 0];

function openingHoursSpecification() {
  return ORDER.map((dow) => business.hours.week.find((d) => d.day === dow))
    .filter((d): d is NonNullable<typeof d> => Boolean(d) && !d!.closed)
    .map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SCHEMA_DAY[d.day],
      opens: d.open,
      closes: d.close,
    }));
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  };
}

function imageUrls(): string[] {
  // Nur echte, vorhandene Bilder ausgeben. Solange keine Fotos hinterlegt sind,
  // bleibt das Feld leer, statt auf 404-Adressen zu zeigen.
  const og = business.url + '/img/og-image.png';
  return [og];
}

function menuItemNode(item: MenuItem, locale: Locale) {
  const node: Record<string, unknown> = {
    '@type': 'MenuItem',
    '@id': `${SITE}/#menuitem-${item.id}`,
    name: item.name,
    description: item.description[locale],
    offers: {
      '@type': 'Offer',
      price: item.price.toFixed(2),
      priceCurrency: business.currency,
      availability: 'https://schema.org/InStock',
    },
  };

  if (item.tags.includes('vegetarisch')) {
    node.suitableForDiet = ['https://schema.org/VegetarianDiet', 'https://schema.org/HalalDiet'];
  } else {
    node.suitableForDiet = ['https://schema.org/HalalDiet'];
  }

  if (item.allergens.length > 0) {
    const legend = menu.allergenLegend;
    node.additionalProperty = item.allergens.map((a) => ({
      '@type': 'PropertyValue',
      name: locale === 'de' ? 'Allergen' : 'Allergen',
      value: legend.find((l) => l.id === a)?.[locale] ?? a,
    }));
  }

  return node;
}

/** Vollständige Speisekarte als Menu → MenuSection → MenuItem. */
export function menuSchema(locale: Locale) {
  return {
    '@type': 'Menu',
    '@id': `${SITE}/#menu`,
    name: locale === 'de' ? 'Speisekarte' : 'Menu',
    url: `${SITE}/#speisekarte`,
    inLanguage: locale === 'de' ? 'de-DE' : 'en',
    hasMenuSection: menu.categories.map((cat) => ({
      '@type': 'MenuSection',
      '@id': `${SITE}/#menusection-${cat.id}`,
      name: cat.name[locale],
      description: cat.intro?.[locale],
      hasMenuItem: cat.items.map((item) => menuItemNode(item, locale)),
    })),
  };
}

export function restaurantSchema(locale: Locale) {
  const x = c(locale);
  return {
    '@type': 'Restaurant',
    '@id': `${SITE}/#restaurant`,
    name: business.name,
    alternateName: 'Patties and Berries',
    description: x.meta.description,
    url: SITE,
    image: imageUrls(),
    logo: `${SITE}/img/logo-siegel.png`,
    telephone: business.contact.phoneE164,
    email: business.contact.email,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${business.geo.lat},${business.geo.lng}`,
    priceRange: business.priceRange,
    currenciesAccepted: business.currency,
    paymentAccepted: business.payment.schemaOrg.join(', '),
    servesCuisine: business.servesCuisine,
    acceptsReservations: business.reservations.accepted,
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: { '@id': `${SITE}/#menu` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.ratings.google.value,
      reviewCount: business.ratings.google.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [business.social.instagram, business.social.facebook],
    areaServed: business.delivery.active
      ? business.delivery.areas.map((a) => ({ '@type': 'City', name: a }))
      : [{ '@type': 'City', name: business.address.city }],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Takeaway', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Delivery', value: business.delivery.active },
      { '@type': 'LocationFeatureSpecification', name: 'Catering', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor seating', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair accessible entrance', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Dogs allowed', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Smoking area', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
    ],
    publicAccess: true,
    isAccessibleForFree: true,
    smokingAllowed: false,
    knowsLanguage: ['de-DE', 'tr-TR', 'en'],
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/#bestellen`,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      deliveryMethod: [
        'https://schema.org/OnSitePickup',
        ...(business.delivery.active ? ['https://schema.org/ParcelService'] : []),
      ],
    },
  };
}

export function faqSchema(locale: Locale) {
  const x = c(locale);
  return {
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    mainEntity: x.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: Array<{ name: string; path: string }>,
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE}${trail[trail.length - 1]?.path ?? '/'}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE}${crumb.path}`,
    })),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: business.name,
    inLanguage: locale === 'de' ? 'de-DE' : 'en',
    publisher: { '@id': `${SITE}/#restaurant` },
  };
}

/** Alles zusammen als ein @graph — ein Skript-Tag statt fünf. */
export function homeGraph(locale: Locale) {
  const x = c(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      restaurantSchema(locale),
      menuSchema(locale),
      faqSchema(locale),
      websiteSchema(locale),
      breadcrumbSchema(locale, [
        { name: locale === 'de' ? 'Startseite' : 'Home', path: locale === 'de' ? '/' : '/en/' },
      ]),
      {
        '@type': 'WebPage',
        '@id': `${SITE}${locale === 'de' ? '/' : '/en/'}#webpage`,
        url: `${SITE}${locale === 'de' ? '/' : '/en/'}`,
        name: x.meta.title,
        description: x.meta.description,
        inLanguage: locale === 'de' ? 'de-DE' : 'en',
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#restaurant` },
        primaryImageOfPage: `${SITE}/img/og-image.png`,
      },
    ],
  };
}

/** Graph für die Rechtsseiten: schlanker, aber mit Brotkrumen. */
export function legalGraph(
  locale: Locale,
  page: { name: string; path: string; description: string },
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(locale),
      breadcrumbSchema(locale, [
        { name: locale === 'de' ? 'Startseite' : 'Home', path: locale === 'de' ? '/' : '/en/' },
        { name: page.name, path: page.path },
      ]),
      {
        '@type': 'WebPage',
        '@id': `${SITE}${page.path}#webpage`,
        url: `${SITE}${page.path}`,
        name: page.name,
        description: page.description,
        inLanguage: locale === 'de' ? 'de-DE' : 'en',
        isPartOf: { '@id': `${SITE}/#website` },
      },
    ],
  };
}

/** JSON-LD sicher in einen <script>-Tag schreiben. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
