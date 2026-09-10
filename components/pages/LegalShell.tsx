import type { ReactNode } from 'react';
import Link from 'next/link';
import { SiteChrome } from '@/components/SiteChrome';
import { t } from '@/lib/i18n';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

/** Gemeinsamer Rahmen für Impressum, Datenschutz und Allergene. */
export function LegalShell({
  locale,
  altLocaleHref,
  title,
  intro,
  updated,
  children,
  reviewNotice = true,
}: {
  locale: Locale;
  altLocaleHref: string;
  title: string;
  intro?: string;
  updated: string;
  children: ReactNode;
  reviewNotice?: boolean;
}) {
  const d = t(locale);
  const x = c(locale);

  return (
    <SiteChrome locale={locale} altLocaleHref={altLocaleHref} showOrderBar={false}>
      <div className="section">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-small text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href={locale === 'de' ? '/' : '/en/'}
                  className="underline decoration-line-strong underline-offset-4 hover:text-cream"
                >
                  {locale === 'de' ? 'Startseite' : 'Home'}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-cream-dim">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-[18ch]">{title}</h1>
          {intro ? <p className="lead mt-5">{intro}</p> : null}

          <p className="tnum mt-4 text-small text-muted">
            {x.legal.lastUpdated}: {updated}
          </p>

          {reviewNotice && (
            <p className="mt-8 rounded border border-dashed border-signal-closed/70 bg-ink-3 p-4 text-small leading-relaxed text-cream-dim">
              <strong className="text-signal-closed">⚠ </strong>
              {x.legal.reviewNotice}
            </p>
          )}

          <div className="legal-body mt-block">{children}</div>

          <p className="mt-block border-t border-line pt-6">
            <Link href={locale === 'de' ? '/' : '/en/'} className="btn btn-secondary no-underline">
              {d.common.backHome}
            </Link>
          </p>
        </div>
      </div>
    </SiteChrome>
  );
}
