import { business } from '@/lib/data';
import { berlinNow, weekInDisplayOrder, dayName, hoursForDate } from '@/lib/hours';
import { t } from '@/lib/i18n';
import { Reveal } from './Reveal';
import { MapEmbed } from './MapEmbed';
import { HoursTable } from './HoursTable';
import { AMENITY_ICONS, IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import type { Locale } from '@/lib/types';

export function FindUs({ locale }: { locale: Locale }) {
  const d = t(locale);
  const waHref = `https://wa.me/${business.contact.whatsappNumber}`;

  return (
    <section id="finden" className="surface-night section border-b border-line" aria-labelledby="find-title">
      <div className="shell">
        <Reveal>
          <p className="kicker">{d.find.kicker}</p>
          <h2 id="find-title" className="mt-4 max-w-[20ch]">
            {d.find.h2}
          </h2>
        </Reveal>

        <div className="mt-block grid gap-8 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <MapEmbed locale={locale} />

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-h4">{d.find.parkingLabel}</h3>
                <p className="mt-2 text-small leading-relaxed text-cream-dim">
                  {business.parking[locale]}
                </p>
              </div>
              <div>
                <h3 className="text-h4">{d.find.seatingLabel}</h3>
                {/* Ehrlich statt schön: Der Laden ist klein, das steht hier auch so. */}
                <p className="mt-2 text-small leading-relaxed text-cream-dim">
                  {business.seatingNote[locale]}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-h4">{d.find.amenitiesLabel}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {business.amenities.map((a) => {
                  const Icon = AMENITY_ICONS[a.icon];
                  return (
                    <li
                      key={a.id}
                      className="inline-flex items-center gap-2 rounded-sm border border-line bg-ink-2 px-2.5 py-1.5 text-small text-cream-dim"
                    >
                      {Icon ? <Icon size={16} className="text-ember-text" /> : null}
                      {a[locale]}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="md:col-span-5">
            <div className="card p-5 sm:p-6">
              <h3 className="text-h4">{d.find.addressLabel}</h3>
              <address className="mt-3 not-italic leading-relaxed text-cream-dim">
                <span className="block font-semibold text-cream">{business.name}</span>
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
                <br />
                {business.address.countryName[locale]}
              </address>

              <h3 className="mt-7 text-h4">{d.find.contactLabel}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                <li>
                  <a
                    href={`tel:${business.contact.phoneE164}`}
                    className="tnum inline-flex items-center gap-2.5 text-cream-dim no-underline transition-colors hover:text-cream"
                  >
                    <IconPhone size={18} className="text-ember-text" />
                    {business.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="inline-flex items-center gap-2.5 break-all text-cream-dim no-underline transition-colors hover:text-cream"
                  >
                    <IconMail size={18} className="text-ember-text" />
                    {business.contact.email}
                  </a>
                </li>
              </ul>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-block mt-4 no-underline"
              >
                <IconWhatsApp size={18} />
                {d.common.whatsapp}
              </a>

              <h3 className="mt-7 text-h4">{d.find.hoursLabel}</h3>
              <HoursTable locale={locale} className="mt-3" />
              <p className="mt-3 text-micro text-muted">{d.find.kitchenNote}</p>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block mt-5 no-underline"
              >
                <IconPin size={16} />
                {d.find.directions}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
