'use client';

import Link from 'next/link';
import { business } from '@/lib/data';
import { groupedHours } from '@/lib/hours';
import { LEGAL_ROUTES, t } from '@/lib/i18n';
import { useConsent } from '@/lib/consent';
import { LogoMark, Wordmark } from './Wordmark';
import { IconCard, IconFacebook, IconInstagram, IconMail, IconPhone } from './Icons';
import type { Locale } from '@/lib/types';

export function Footer({ locale, homeHref }: { locale: Locale; homeHref: string }) {
  const d = t(locale);
  const { openSettings } = useConsent();
  const year = new Date().getFullYear();

  const nav = [
    { href: `${homeHref}#speisekarte`, label: d.nav.menu },
    { href: `${homeHref}#bestellen`, label: d.nav.order },
    { href: `${homeHref}#ueber-uns`, label: d.nav.about },
    { href: `${homeHref}#bewertungen`, label: d.nav.reviews },
    { href: `${homeHref}#finden`, label: d.nav.find },
    { href: `${homeHref}#faq`, label: d.nav.faq },
  ];

  return (
    <footer className="no-print border-t border-line bg-ink-2">
      <div className="shell py-block">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href={homeHref} className="inline-flex items-center gap-2.5 no-underline">
              <LogoMark size={34} />
              <Wordmark stacked className="text-[1.25rem]" />
            </Link>
            <p className="measure mt-4 text-small leading-relaxed text-cream-dim">
              {d.footer.tagline}
            </p>

            <ul className="mt-5 flex gap-2">
              <li>
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-cream-dim transition-colors hover:border-cream hover:text-cream"
                >
                  <IconInstagram />
                  <span className="sr-only">Instagram {business.social.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-cream-dim transition-colors hover:border-cream hover:text-cream"
                >
                  <IconFacebook />
                  <span className="sr-only">Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label={d.footer.navLabel} className="md:col-span-3">
            <h2 className="text-h4">{d.nav.label}</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[36px] items-center text-small text-cream-dim no-underline transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-h4">{d.find.contactLabel}</h2>
            <address className="mt-3 not-italic text-small leading-relaxed text-cream-dim">
              {business.address.street}
              <br />
              {business.address.postalCode} {business.address.city}
            </address>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={`tel:${business.contact.phoneE164}`}
                  className="tnum inline-flex items-center gap-2 text-small text-cream-dim no-underline hover:text-cream"
                >
                  <IconPhone size={16} />
                  {business.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.contact.email}`}
                  className="inline-flex items-center gap-2 break-all text-small text-cream-dim no-underline hover:text-cream"
                >
                  <IconMail size={16} />
                  {business.contact.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-6 text-h4">{d.find.hoursLabel}</h2>
            <ul className="mt-2 flex flex-col gap-1 text-small text-cream-dim">
              {groupedHours(locale).map((row) => (
                <li key={row.label} className="tnum flex justify-between gap-4">
                  <span>{row.label}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-h4">{d.footer.legalLabel}</h2>
            <ul className="mt-3 flex flex-col gap-1">
              <li>
                <Link
                  href={LEGAL_ROUTES.impressum[locale]}
                  className="inline-flex min-h-[36px] items-center text-small text-cream-dim no-underline transition-colors hover:text-cream"
                >
                  {d.footer.impressum}
                </Link>
              </li>
              <li>
                <Link
                  href={LEGAL_ROUTES.datenschutz[locale]}
                  className="inline-flex min-h-[36px] items-center text-small text-cream-dim no-underline transition-colors hover:text-cream"
                >
                  {d.footer.datenschutz}
                </Link>
              </li>
              <li>
                <Link
                  href={LEGAL_ROUTES.allergene[locale]}
                  className="inline-flex min-h-[36px] items-center text-small text-cream-dim no-underline transition-colors hover:text-cream"
                >
                  {d.footer.allergene}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openSettings}
                  className="inline-flex min-h-[36px] items-center text-left text-small text-cream-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream"
                >
                  {d.consent.manage}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Zahlarten: bewusst als Text statt als Markenlogos — siehe components/Icons.tsx */}
        <div className="mt-block border-t border-line pt-6">
          <h2 className="text-micro font-semibold uppercase tracking-[0.16em] text-muted">
            {d.footer.paymentLabel}
          </h2>
          <ul className="mt-3 flex flex-wrap items-center gap-1.5">
            <li className="text-muted">
              <IconCard size={18} />
            </li>
            {business.payment.methods.map((m) => (
              <li
                key={m.id}
                className="rounded-sm border border-line px-2 py-1 text-micro text-cream-dim"
              >
                {m[locale]}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-micro text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{d.footer.copyright.replace('{year}', String(year))}</p>
          <p>{d.footer.builtNote}</p>
        </div>
      </div>
    </footer>
  );
}
