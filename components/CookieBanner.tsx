'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useConsent, DENY_ALL, type ConsentState } from '@/lib/consent';
import { LEGAL_ROUTES, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Einwilligungsbanner.
 *
 * Bewusst ohne die üblichen Tricks:
 *   • „Nur Notwendiges“ steht gleichberechtigt neben „Alles erlauben“ —
 *     gleiche Größe, gleiche Reihenfolge im Fokus, keine graue Zurückhaltung.
 *   • Nichts ist vorangekreuzt.
 *   • Ohne Entscheidung wird nichts geladen; Ablehnen ist ein Klick.
 *   • Die Entscheidung lässt sich jederzeit über die Fußzeile ändern.
 *
 * Der Banner blockiert die Seite nicht: Wer nur die Karte nicht braucht, kann
 * bestellen, ohne ihn zu beachten. Eine Cookie-Wand vor der Speisekarte wäre
 * weder nötig noch zulässig.
 */
export function CookieBanner({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { bannerOpen, consent, decided, save, acceptAll, rejectAll, closeSettings } = useConsent();
  const [detail, setDetail] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DENY_ALL);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Beim Öffnen über die Fußzeile den aktuellen Stand übernehmen.
  useEffect(() => {
    if (bannerOpen) {
      setDraft(consent);
      setDetail(decided);
    }
  }, [bannerOpen, consent, decided]);

  useEffect(() => {
    if (!bannerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && decided) closeSettings();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [bannerOpen, decided, closeSettings]);

  if (!bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="no-print fixed inset-x-0 bottom-0 z-consent border-t border-line-strong bg-ink-3 shadow-[0_-12px_40px_-16px_rgb(0_0_0/0.8)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="shell max-h-[85dvh] overflow-y-auto py-5">
        <h2 id="consent-title" className="text-h4">
          {d.consent.title}
        </h2>
        <p id="consent-body" className="measure mt-2 text-small leading-relaxed text-cream-dim">
          {d.consent.body}
        </p>

        {detail && (
          <ul className="mt-5 flex flex-col gap-2">
            <Category
              title={d.consent.categoryNecessary}
              body={d.consent.categoryNecessaryBody}
              badge={d.consent.alwaysOn}
              checked
              disabled
            />
            <Category
              title={d.consent.categoryMaps}
              body={d.consent.categoryMapsBody}
              checked={draft.maps}
              onChange={(v) => setDraft((s) => ({ ...s, maps: v }))}
            />
            <Category
              title={d.consent.categoryStats}
              body={d.consent.categoryStatsBody}
              badge={d.consent.notInUse}
              checked={draft.statistics}
              onChange={(v) => setDraft((s) => ({ ...s, statistics: v }))}
            />
            <Category
              title={d.consent.categoryMarketing}
              body={d.consent.categoryMarketingBody}
              badge={d.consent.notInUse}
              checked={draft.marketing}
              onChange={(v) => setDraft((s) => ({ ...s, marketing: v }))}
            />
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Ablehnen steht zuerst und sieht genauso aus wie Annehmen. */}
          <button
            ref={firstButtonRef}
            type="button"
            className="btn btn-secondary flex-1 sm:flex-none"
            onClick={rejectAll}
          >
            {d.consent.rejectAll}
          </button>

          {detail ? (
            <button
              type="button"
              className="btn btn-secondary flex-1 sm:flex-none"
              onClick={() => save(draft)}
            >
              {d.consent.save}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-ghost !min-h-[44px] underline decoration-line-strong underline-offset-4 sm:flex-none"
              onClick={() => setDetail(true)}
            >
              {d.consent.settings}
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary flex-1 sm:flex-none"
            onClick={acceptAll}
          >
            {d.consent.acceptAll}
          </button>

          <span className="flex gap-4 text-micro text-muted sm:ml-auto">
            <Link href={LEGAL_ROUTES.datenschutz[locale]} className="underline underline-offset-2 hover:text-cream">
              {d.consent.moreInfo}
            </Link>
            <Link href={LEGAL_ROUTES.impressum[locale]} className="underline underline-offset-2 hover:text-cream">
              {d.consent.imprintLink}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function Category({
  title,
  body,
  badge,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  badge?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li>
      <label
        className={`flex gap-3 rounded border border-line bg-ink-2 p-3 ${
          disabled ? 'opacity-80' : 'cursor-pointer hover:border-line-strong'
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--pb-ember)]"
        />
        <span className="flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-small font-semibold">{title}</span>
            {badge ? (
              <span className="rounded-sm border border-line-strong px-1.5 py-0.5 text-micro text-muted">
                {badge}
              </span>
            ) : null}
          </span>
          <span className="mt-1 block text-micro leading-relaxed text-muted">{body}</span>
        </span>
      </label>
    </li>
  );
}
