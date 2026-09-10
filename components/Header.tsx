'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LogoMark, Wordmark } from './Wordmark';
import { StatusPill } from './StatusPill';
import { IconClose, IconMenuBars } from './Icons';
import { useCart } from '@/lib/cart';
import { fill, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export interface NavTarget {
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  /** Präfix für die Sprunganker — auf Rechtsseiten "/" bzw. "/en/". */
  homeHref: string;
  /** Dieselbe Seite in der anderen Sprache. */
  altLocaleHref: string;
  /** Auf Rechtsseiten gibt es keinen Warenkorb-Zähler im Kopf. */
  showCart?: boolean;
}

export function Header({ locale, homeHref, altLocaleHref, showCart = true }: HeaderProps) {
  const d = t(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const nav: NavTarget[] = [
    { href: `${homeHref}#speisekarte`, label: d.nav.menu },
    { href: `${homeHref}#bestellen`, label: d.nav.order },
    { href: `${homeHref}#ueber-uns`, label: d.nav.about },
    { href: `${homeHref}#finden`, label: d.nav.find },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape schließt das mobile Menü, der Fokus geht zurück auf den Auslöser.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-header border-b transition-colors duration-200 ${
        scrolled || open
          ? 'border-line bg-ink/95 backdrop-blur-md'
          : 'border-transparent bg-ink/70 backdrop-blur-sm'
      }`}
    >
      <div className="shell flex h-header items-center gap-3">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center gap-2.5 rounded-sm py-1 no-underline"
          aria-label={locale === 'de' ? 'Patties & Berries — Startseite' : 'Patties & Berries — home'}
        >
          <LogoMark size={30} />
          <Wordmark className="text-[1.0625rem] md:text-[1.1875rem]" />
        </Link>

        <nav aria-label={d.nav.label} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-sm px-3 text-small font-medium text-cream-dim no-underline transition-colors hover:text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LanguageSwitch locale={locale} altHref={altLocaleHref} />

          <a href={`${homeHref}#bestellen`} className="btn btn-primary hidden no-underline sm:inline-flex">
            {d.common.orderNow}
            {showCart ? <CartCount locale={locale} /> : null}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="btn btn-secondary !px-3 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenuBars />}
            <span className="sr-only">{open ? d.nav.closeMenu : d.nav.openMenu}</span>
          </button>
        </div>
      </div>

      {/* Mobiles Menü */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-ink md:hidden"
      >
        <nav aria-label={d.nav.label} className="shell py-4">
          <ul className="flex flex-col gap-1">
            {[...nav, { href: `${homeHref}#bewertungen`, label: d.nav.reviews }, { href: `${homeHref}#faq`, label: d.nav.faq }].map(
              (item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center border-b border-line/60 font-display text-h4 uppercase tracking-tight no-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <StatusPill locale={locale} className="self-start" />
            <a
              href={`${homeHref}#bestellen`}
              onClick={() => setOpen(false)}
              className="btn btn-primary btn-block no-underline"
            >
              {d.common.orderNow}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartCount({ locale }: { locale: Locale }) {
  const { count, ready } = useCart();
  const d = t(locale);
  if (!ready || count === 0) return null;
  return (
    <span className="tnum ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-cream px-1.5 text-[0.6875rem] font-bold text-ink">
      {count}
      <span className="sr-only"> {fill(d.order.itemsInCart, { n: count })}</span>
    </span>
  );
}

function LanguageSwitch({ locale, altHref }: { locale: Locale; altHref: string }) {
  const d = t(locale);
  const other: Locale = locale === 'de' ? 'en' : 'de';
  return (
    <Link
      href={altHref}
      hrefLang={other}
      lang={other}
      className="inline-flex min-h-[44px] items-center gap-1 rounded-sm px-2 text-small font-semibold uppercase tracking-wider text-cream-dim no-underline transition-colors hover:text-cream"
    >
      <span aria-hidden="true">{locale === 'de' ? 'EN' : 'DE'}</span>
      <span className="sr-only">
        {d.common.langSwitch}: {other === 'de' ? d.common.langLabelDe : d.common.langLabelEn}
      </span>
    </Link>
  );
}
