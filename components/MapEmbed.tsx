'use client';

import { useState } from 'react';
import { business } from '@/lib/data';
import { useConsent } from '@/lib/consent';
import { LEGAL_ROUTES, t } from '@/lib/i18n';
import { Photo } from './Photo';
import { IconClose, IconExternal, IconPin } from './Icons';
import type { Locale } from '@/lib/types';

/**
 * Karte hinter einer Einwilligungsschranke (Zwei-Klick-Lösung).
 *
 * Vor dem Klick geht KEINE Anfrage an Google — kein iframe, kein Preconnect,
 * kein Vorabruf. Erst der bewusste Klick lädt die Karte. Das ist in Deutschland
 * keine Vorsicht, sondern Pflicht: Das LG München I hat schon für eine
 * eingebettete Schriftart Schadensersatz zugesprochen, und eine Karte überträgt
 * deutlich mehr.
 *
 * Wer im Banner „Karte“ erlaubt hat, sieht sie direkt — die Entscheidung wurde
 * ja bereits getroffen.
 */
export function MapEmbed({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { consent, save } = useConsent();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [remember, setRemember] = useState(false);

  const loaded = consent.maps || sessionLoaded;

  const embedSrc =
    `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}` +
    `&hl=${locale}&z=17&output=embed`;

  const directionsHref =
    `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`;

  if (loaded) {
    return (
      <div className="overflow-hidden rounded border border-line">
        <iframe
          src={embedSrc}
          title={
            locale === 'de'
              ? 'Google-Karte mit dem Standort von Patties & Berries, Uerdinger Straße 101b, 47441 Moers'
              : 'Google map showing Patties & Berries at Uerdinger Straße 101b, 47441 Moers'
          }
          width={1200}
          height={675}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[16/9] w-full border-0"
        />
        <div className="flex flex-wrap items-center gap-3 border-t border-line bg-ink-2 px-4 py-3">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary !min-h-[40px] no-underline"
          >
            <IconPin size={16} />
            {d.find.directions}
            <IconExternal size={14} />
          </a>
          {!consent.maps && (
            <button
              type="button"
              onClick={() => setSessionLoaded(false)}
              className="btn btn-ghost !min-h-[40px]"
            >
              <IconClose size={16} />
              {d.find.mapUnload}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded border border-line">
      <Photo id="karte-statisch" locale={locale} sizes="(min-width: 900px) 55vw, 100vw" />

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink via-ink/85 to-ink/25">
        <div className="w-full border-t border-line bg-ink p-4 sm:p-6">
          <h3 className="text-h4">{d.find.mapConsentTitle}</h3>
          <p className="mt-2 max-w-[52ch] text-small leading-relaxed text-cream-dim">
            {d.find.mapConsentBody}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (remember) save({ ...consent, maps: true });
                else setSessionLoaded(true);
              }}
            >
              {d.find.mapConsentButton}
            </button>

            <label className="flex cursor-pointer items-center gap-2 text-small text-cream-dim">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-[18px] w-[18px] accent-[var(--pb-ember)]"
              />
              {d.find.mapConsentRemember}
            </label>

            <a
              href={LEGAL_ROUTES.datenschutz[locale]}
              className="text-small text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream"
            >
              {d.find.mapConsentPrivacy}
            </a>
          </div>

          <p className="mt-4 border-t border-line pt-3 text-micro text-muted">
            {locale === 'de'
              ? 'Du kannst auch ohne Karte hierher finden: '
              : 'You can find us without the map too: '}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-cream"
            >
              {business.address.street}, {business.address.postalCode} {business.address.city}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
