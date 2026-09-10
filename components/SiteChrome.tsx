import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { MobileOrderBar } from './MobileOrderBar';
import { Providers } from './Providers';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Der Rahmen um jede Seite: Kopf, Inhalt, Fuß, Einwilligungsbanner und —
 * auf dem Handy — die feste Bestellleiste.
 */
export function SiteChrome({
  locale,
  altLocaleHref,
  children,
  showOrderBar = true,
}: {
  locale: Locale;
  altLocaleHref: string;
  children: ReactNode;
  showOrderBar?: boolean;
}) {
  const d = t(locale);
  const homeHref = locale === 'de' ? '/' : '/en/';

  return (
    <Providers>
      <a href="#hauptinhalt" className="skip-link">
        {d.common.skipToContent}
      </a>

      <Header locale={locale} homeHref={homeHref} altLocaleHref={altLocaleHref} />

      <main id="hauptinhalt" tabIndex={-1}>
        {children}
      </main>

      <Footer locale={locale} homeHref={homeHref} />
      <CookieBanner locale={locale} />
      {showOrderBar && <MobileOrderBar locale={locale} homeHref={homeHref} />}
    </Providers>
  );
}
