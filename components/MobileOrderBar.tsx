'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { price } from '@/lib/format';
import { fill, t } from '@/lib/i18n';
import { IconCart } from './Icons';
import type { Locale } from '@/lib/types';

/**
 * Feste Bestellleiste am unteren Rand — nur auf dem Handy.
 *
 * Der Bestell-Aufruf muss auf jedem Bildschirm sichtbar bleiben; auf kleinen
 * Geräten ist der Kopfbereich dafür zu voll. Sobald etwas im Warenkorb liegt,
 * zeigt die Leiste Anzahl und Summe.
 *
 * Der Platz dafür ist über --bottombar-h im body-padding reserviert, damit die
 * Leiste nie Inhalte verdeckt.
 */
export function MobileOrderBar({ locale, homeHref }: { locale: Locale; homeHref: string }) {
  const d = t(locale);
  const { count, total, ready } = useCart();
  const [visible, setVisible] = useState(false);

  // Erst einblenden, wenn der Hero durchgescrollt ist — dort stehen die
  // Schaltflächen ohnehin schon groß im Bild.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hasItems = ready && count > 0;

  return (
    <div
      className={`no-print fixed inset-x-0 bottom-0 z-bottombar border-t border-line bg-ink/95 backdrop-blur-md transition-transform duration-300 ease-pb md:hidden ${
        visible || hasItems ? 'translate-y-0' : 'translate-y-full'
      }`}
      // Nicht fokussierbar, solange sie unten weggeschoben ist.
      aria-hidden={!(visible || hasItems)}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="shell flex items-center gap-3 py-2.5">
        {hasItems ? (
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-micro text-muted">{fill(d.order.itemsInCart, { n: count })}</span>
            <span className="tnum text-body font-semibold">{price(total, locale)}</span>
          </span>
        ) : (
          <span className="min-w-0 truncate text-small text-cream-dim">{d.common.barTagline}</span>
        )}
        <a
          href={`${homeHref}#bestellen`}
          className="btn btn-primary ml-auto shrink-0 no-underline"
          tabIndex={visible || hasItems ? undefined : -1}
        >
          <IconCart size={18} />
          {hasItems ? d.order.goToCart : d.common.orderNow}
        </a>
      </div>
    </div>
  );
}
