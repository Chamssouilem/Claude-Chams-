import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Handwerk } from '@/components/Handwerk';
import { MenuSection } from '@/components/MenuSection';
import { OrderSection } from '@/components/OrderSection';
import { About } from '@/components/About';
import { Reviews } from '@/components/Reviews';
import { Vouchers } from '@/components/Vouchers';
import { FindUs } from '@/components/FindUs';
import { Faq } from '@/components/Faq';
import { SiteChrome } from '@/components/SiteChrome';
import { homeGraph, jsonLdString } from '@/lib/schema';
import type { Locale } from '@/lib/types';

/**
 * Die Startseite. Eine durchgehende Seite mit verlinkbaren Abschnitten —
 * jeder Anker ist eine eigene Adresse, die sich teilen lässt
 * (z. B. pattiesandberries.de/#speisekarte).
 *
 * Reihenfolge mit Absicht: erst der Grund, warum das Fleisch besser ist
 * (Handwerk), dann die Karte, dann die Bestellung. Wer die Karte vor der
 * Begründung sieht, liest 10,90 € als Preis. Wer sie danach sieht, liest sie
 * als Ergebnis.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const altHref = locale === 'de' ? '/en/' : '/';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(homeGraph(locale)) }}
      />
      <SiteChrome locale={locale} altLocaleHref={altHref}>
        <Hero locale={locale} />
        <TrustStrip locale={locale} />
        <Handwerk locale={locale} />
        <MenuSection locale={locale} />
        <OrderSection locale={locale} />
        <About locale={locale} />
        <Reviews locale={locale} />
        <Vouchers locale={locale} />
        <FindUs locale={locale} />
        <Faq locale={locale} />
      </SiteChrome>
    </>
  );
}
