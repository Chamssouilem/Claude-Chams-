'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { business, menuDeal, sideItems, drinkOptions, getItem, menuSurcharge } from '@/lib/data';
import { price } from '@/lib/format';
import { getOpenStatus, pickupSlots } from '@/lib/hours';
import { fill, LEGAL_ROUTES, t } from '@/lib/i18n';
import { useCart } from '@/lib/cart';
import { lineTotal, lineUnitPrice } from '@/lib/pricing';
import { buildOrderMessage, mailtoHref, whatsappHref, type OrderDetails } from '@/lib/order';
import { Reveal } from './Reveal';
import {
  IconCard,
  IconCheck,
  IconClock,
  IconMail,
  IconMinus,
  IconPlus,
  IconWhatsApp,
} from './Icons';
import type { CartLine, Locale, OrderMode } from '@/lib/types';

type FieldName = 'name' | 'phone' | 'street' | 'zip' | 'city';

/**
 * Die Bestellstrecke.
 *
 * Der entscheidende Unterschied zur alten Seite: Dort füllte man ein Formular
 * aus, das als unbestätigte E-Mail irgendwo landete und einen Rückruf nach sich
 * zog. Hier entsteht eine fertig formulierte WhatsApp-Nachricht an genau die
 * Nummer, über die der Laden ohnehin Bestellungen annimmt. Kein neues System,
 * kein Konto, keine Plattformprovision — und die Küche bekommt zum ersten Mal
 * eine vollständige Bestellung ohne Rückfragen.
 *
 * Es wird bewusst nichts online bezahlt: Das spart Gebühren, PCI-Pflichten und
 * eine Widerrufsbelehrung, die für frisch zubereitete Speisen ohnehin nicht
 * greift (§ 312g Abs. 2 Nr. 2 BGB).
 */
export function OrderSection({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { lines, total, count, ready, remove, setQty, restored, dismissRestored } = useCart();

  const [mode, setMode] = useState<OrderMode>('abholen');
  const [timeMode, setTimeMode] = useState<'asap' | 'slot'>('asap');
  const [slot, setSlot] = useState('');
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: '',
    phone: '',
    street: '',
    zip: '',
    city: business.address.city,
  });
  const [addressNote, setAddressNote] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldName | 'cart', string>>>({});
  const [showErrors, setShowErrors] = useState(false);

  const [slots, setSlots] = useState<Array<{ value: string; label: string }>>([]);
  const [closedNow, setClosedNow] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Zeitfenster und Öffnungsstatus erst im Browser berechnen: beim statischen
  // Export gibt es zur Bauzeit keine sinnvolle „jetzt“-Angabe.
  useEffect(() => {
    setSlots(pickupSlots());
    const status = getOpenStatus();
    setClosedNow(status.kind === 'closed' || status.kind === 'opens-today');
  }, []);

  const deliveryActive = business.delivery.active;

  const details: OrderDetails = useMemo(
    () => ({
      mode,
      time: timeMode === 'slot' ? slot : '',
      name: values.name,
      phone: values.phone,
      street: values.street,
      zip: values.zip,
      city: values.city,
      addressNote,
      note,
    }),
    [mode, timeMode, slot, values, addressNote, note],
  );

  const message = useMemo(() => buildOrderMessage(lines, details), [lines, details]);
  const waHref = whatsappHref(message);
  const mailHref = mailtoHref(message, details);

  function validate(): Partial<Record<FieldName | 'cart', string>> {
    const next: Partial<Record<FieldName | 'cart', string>> = {};
    if (lines.length === 0) next.cart = d.order.errorCartEmpty;
    if (!values.name.trim()) next.name = d.order.errorRequired;
    // Mindestens sechs Ziffern — alles darunter ist keine erreichbare Nummer.
    if ((values.phone.match(/\d/g) ?? []).length < 6) next.phone = d.order.errorPhone;
    if (mode === 'liefern') {
      if (!values.street.trim()) next.street = d.order.errorRequired;
      if (!values.zip.trim()) next.zip = d.order.errorRequired;
      if (!values.city.trim()) next.city = d.order.errorRequired;
    }
    return next;
  }

  function handleSubmit(e: React.MouseEvent<HTMLAnchorElement>) {
    const found = validate();
    setErrors(found);
    setShowErrors(Object.keys(found).length > 0);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      // Fokus in die Fehlerübersicht, damit Screenreader sie vorlesen.
      window.requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const set = (field: FieldName, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors(({ [field]: _drop, ...rest }) => rest);
  };

  const errorList = (Object.entries(errors) as Array<[FieldName | 'cart', string]>).filter(
    ([, msg]) => Boolean(msg),
  );

  return (
    <section id="bestellen" className="section border-b border-line" aria-labelledby="order-title">
      <div className="shell">
        <Reveal>
          <p className="kicker">{d.order.kicker}</p>
          <h2 id="order-title" className="mt-4 max-w-[16ch]">
            {d.order.h2}
          </h2>
          <p className="lead mt-6">{d.order.intro}</p>
        </Reveal>

        <div className="mt-block grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Warenkorb */}
          <div className="lg:col-span-5 lg:order-2">
            <div className="card sticky top-[calc(var(--header-h)+16px)] p-5">
              <h3 className="text-h3">{d.order.cartTitle}</h3>

              {restored && count > 0 && (
                <p className="mt-3 flex items-start gap-2 rounded-sm border border-line bg-ink-2 p-3 text-small text-cream-dim">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-signal-open" />
                  <span className="flex-1">{d.order.cartRestored}</span>
                  <button
                    type="button"
                    onClick={dismissRestored}
                    className="shrink-0 text-micro text-muted underline underline-offset-2 hover:text-cream"
                  >
                    {d.common.close}
                  </button>
                </p>
              )}

              {!ready ? (
                <p className="mt-5 h-10 animate-pulse rounded-sm bg-ink-4" aria-hidden="true" />
              ) : lines.length === 0 ? (
                <div className="mt-5 rounded-sm border border-dashed border-line-strong p-5 text-center">
                  <p className="font-medium">{d.order.cartEmpty}</p>
                  <p className="mt-1.5 text-small text-muted">{d.order.cartEmptyHint}</p>
                  <a href="#speisekarte" className="btn btn-secondary mt-4 no-underline">
                    {d.common.viewMenu}
                  </a>
                </div>
              ) : (
                <>
                  <ul aria-label={d.order.cartItems} className="mt-4 flex flex-col">
                    {lines.map((line) => (
                      <CartRow
                        key={line.lineId}
                        line={line}
                        locale={locale}
                        onRemove={() => remove(line.lineId)}
                        onQty={(q) => setQty(line.lineId, q)}
                      />
                    ))}
                  </ul>

                  <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
                    <span className="font-display text-h4 uppercase">{d.order.total}</span>
                    <span className="tnum font-display text-h3" data-price>
                      {price(total, locale)}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-micro text-muted">{d.order.totalNote}</p>
                  {mode === 'liefern' && (
                    <p className="mt-1 text-right text-micro text-muted">
                      {d.order.deliveryFeeNote}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Formular */}
          <form
            className="lg:col-span-7 lg:order-1"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Fehlerübersicht */}
            {showErrors && errorList.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-6 rounded border border-signal-closed bg-ink-3 p-4"
              >
                <p className="font-semibold text-signal-closed">{d.order.errorSummary}</p>
                <ul className="mt-2 list-disc pl-5 text-small">
                  {errorList.map(([field, msg]) => (
                    <li key={field}>
                      {field === 'cart' ? (
                        <a href="#speisekarte" className="underline underline-offset-2">
                          {msg}
                        </a>
                      ) : (
                        <a href={`#order-${field}`} className="underline underline-offset-2">
                          {fieldLabel(field, d)}: {msg}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Art der Bestellung */}
            <fieldset className="border-0 p-0">
              <legend className="field-label mb-3 p-0 text-h4 font-normal uppercase tracking-tight [font-family:var(--font-display)]">
                {d.order.modeLabel}
              </legend>
              <div className="segmented">
                <ModeOption
                  value="abholen"
                  current={mode}
                  onChange={setMode}
                  title={d.order.modePickup}
                  hint={d.order.modePickupHint}
                />
                {deliveryActive && (
                  <ModeOption
                    value="liefern"
                    current={mode}
                    onChange={setMode}
                    title={d.order.modeDelivery}
                    hint={d.order.modeDeliveryHint}
                  />
                )}
                <ModeOption
                  value="vor-ort"
                  current={mode}
                  onChange={setMode}
                  title={d.order.modeEatIn}
                  hint={d.order.modeEatInHint}
                />
              </div>
              {mode === 'vor-ort' && (
                <p className="field-hint">{business.seatingNote[locale]}</p>
              )}
              {mode === 'liefern' && (
                <p className="field-hint">{business.delivery.feeNote[locale]}</p>
              )}
            </fieldset>

            {/* Zeit */}
            <fieldset className="mt-block border-0 p-0">
              <legend className="field-label mb-3 flex items-center gap-2 p-0 text-h4 font-normal uppercase tracking-tight [font-family:var(--font-display)]">
                <IconClock size={18} />
                {d.order.timeLabel}
              </legend>

              {closedNow && <p className="field-hint !mt-0 mb-3">{d.order.timeClosedNote}</p>}

              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex min-h-[46px] flex-1 cursor-pointer items-center gap-3 rounded border border-line bg-ink-3 px-3 has-[:checked]:border-ember-bright has-[:checked]:bg-ink-4">
                  <input
                    type="radio"
                    name="time-mode"
                    checked={timeMode === 'asap'}
                    onChange={() => setTimeMode('asap')}
                    className="h-[18px] w-[18px] accent-[var(--pb-ember)]"
                  />
                  <span className="text-small">{d.order.timeAsap}</span>
                </label>
                <label className="flex min-h-[46px] flex-1 cursor-pointer items-center gap-3 rounded border border-line bg-ink-3 px-3 has-[:checked]:border-ember-bright has-[:checked]:bg-ink-4">
                  <input
                    type="radio"
                    name="time-mode"
                    checked={timeMode === 'slot'}
                    onChange={() => {
                      setTimeMode('slot');
                      if (!slot && slots[0]) setSlot(slots[0].value);
                    }}
                    className="h-[18px] w-[18px] accent-[var(--pb-ember)]"
                    disabled={slots.length === 0}
                  />
                  <span className="text-small">{d.order.timeSlot}</span>
                </label>
              </div>

              {timeMode === 'slot' && slots.length > 0 && (
                <div className="mt-3">
                  <label htmlFor="order-slot" className="field-label">
                    {d.order.timeSlotLabel}
                  </label>
                  <select
                    id="order-slot"
                    className="input"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                  >
                    {slots.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </fieldset>

            {/* Kontakt */}
            <fieldset className="mt-block border-0 p-0">
              <legend className="field-label mb-3 p-0 text-h4 font-normal uppercase tracking-tight [font-family:var(--font-display)]">
                {d.order.contactLegend}
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="order-name"
                  label={d.order.nameLabel}
                  hint={d.order.namePlaceholderHint}
                  value={values.name}
                  onChange={(v) => set('name', v)}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  id="order-phone"
                  label={d.order.phoneLabel}
                  hint={d.order.phoneHint}
                  value={values.phone}
                  onChange={(v) => set('phone', v)}
                  error={errors.phone}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>
            </fieldset>

            {/* Lieferadresse */}
            {mode === 'liefern' && (
              <fieldset className="mt-block border-0 p-0">
                <legend className="field-label mb-3 p-0 text-h4 font-normal uppercase tracking-tight [font-family:var(--font-display)]">
                  {d.order.addressLegend}
                </legend>
                <div className="grid gap-4">
                  <Field
                    id="order-street"
                    label={d.order.streetLabel}
                    value={values.street}
                    onChange={(v) => set('street', v)}
                    error={errors.street}
                    autoComplete="street-address"
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <Field
                      id="order-zip"
                      label={d.order.zipLabel}
                      value={values.zip}
                      onChange={(v) => set('zip', v)}
                      error={errors.zip}
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                    />
                    <Field
                      id="order-city"
                      label={d.order.cityLabel}
                      value={values.city}
                      onChange={(v) => set('city', v)}
                      error={errors.city}
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="order-address-note" className="field-label">
                      {d.order.addressNoteLabel}{' '}
                      <span className="font-normal text-muted">({d.common.optional})</span>
                    </label>
                    <input
                      id="order-address-note"
                      className="input"
                      value={addressNote}
                      onChange={(e) => setAddressNote(e.target.value)}
                      aria-describedby="order-address-note-hint"
                      maxLength={120}
                    />
                    <span id="order-address-note-hint" className="field-hint">
                      {d.order.addressNoteHint}
                    </span>
                  </div>
                </div>
              </fieldset>
            )}

            {/* Anmerkung */}
            <div className="mt-block">
              <label htmlFor="order-note" className="field-label">
                {d.order.noteLabel}{' '}
                <span className="font-normal text-muted">({d.common.optional})</span>
              </label>
              <textarea
                id="order-note"
                className="input min-h-[88px] resize-y"
                rows={3}
                maxLength={400}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                aria-describedby="order-note-hint"
              />
              <span id="order-note-hint" className="field-hint">
                {d.order.noteHint}
              </span>
            </div>

            {/* Bezahlen */}
            <div className="mt-block rounded border border-line bg-ink-2 p-5">
              <h3 className="flex items-center gap-2 text-h4">
                <IconCard size={18} />
                {d.order.paymentTitle}
              </h3>
              <p className="mt-2.5 text-small leading-relaxed text-cream-dim">
                {d.order.paymentNote}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {business.payment.methods.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-sm border border-line-strong px-2 py-1 text-micro text-cream-dim"
                  >
                    {m[locale]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Absenden */}
            <div className="mt-block">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSubmit}
                  className="btn btn-whatsapp flex-1 no-underline"
                >
                  <IconWhatsApp size={18} />
                  {d.order.submitWhatsapp}
                </a>
                <a
                  href={mailHref}
                  onClick={handleSubmit}
                  className="btn btn-secondary no-underline"
                >
                  <IconMail size={18} />
                  {d.order.submitEmail}
                </a>
              </div>

              <p className="field-hint">{d.order.submitHint}</p>

              <p className="mt-5 flex items-start gap-2 rounded border border-ember/40 bg-ink-3 p-4 text-small">
                <span aria-hidden="true" className="mt-0.5 text-ember-text">
                  !
                </span>
                <span>
                  <strong className="font-semibold">{d.order.disclaimer}</strong>{' '}
                  <a
                    href={LEGAL_ROUTES.datenschutz[locale]}
                    className="text-cream-dim underline decoration-line-strong underline-offset-4 hover:text-cream"
                  >
                    {d.consent.moreInfo}
                  </a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function fieldLabel(field: FieldName, d: ReturnType<typeof t>): string {
  switch (field) {
    case 'name':
      return d.order.nameLabel;
    case 'phone':
      return d.order.phoneLabel;
    case 'street':
      return d.order.streetLabel;
    case 'zip':
      return d.order.zipLabel;
    case 'city':
      return d.order.cityLabel;
  }
}

function ModeOption({
  value,
  current,
  onChange,
  title,
  hint,
}: {
  value: OrderMode;
  current: OrderMode;
  onChange: (v: OrderMode) => void;
  title: string;
  hint: string;
}) {
  return (
    <label className="segment">
      <input
        type="radio"
        name="order-mode"
        value={value}
        checked={current === value}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span className="font-display text-h4 uppercase tracking-tight">{title}</span>
      <span className="text-micro text-muted">{hint}</span>
    </label>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  type = 'text',
  required,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'numeric';
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-ember-text" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
      />
      {error && (
        <span id={errorId} className="field-error">
          {error}
        </span>
      )}
      {hint && (
        <span id={hintId} className="field-hint">
          {hint}
        </span>
      )}
    </div>
  );
}

function CartRow({
  line,
  locale,
  onRemove,
  onQty,
}: {
  line: CartLine;
  locale: Locale;
  onRemove: () => void;
  onQty: (q: number) => void;
}) {
  const d = t(locale);
  const extras: string[] = [];

  if (line.variantName) extras.push(line.variantName);
  if (line.kids) extras.push(d.order.optionsKids);
  if (line.asMenu) {
    const side = sideItems.find((s) => s.id === line.menuSideId)?.name;
    const drink = drinkOptions.find((x) => x.id === line.menuDrinkId)?.name;
    extras.push(
      `${menuDeal.label[locale]} (${[side, drink].filter(Boolean).join(' + ')}) ${price(
        menuSurcharge(line.menuSideId),
        locale,
      )}`,
    );
  }
  for (const id of [...line.addonIds, ...line.sauceIds]) {
    const item = getItem(id);
    if (item) extras.push(`${item.name} ${price(item.price, locale)}`);
  }

  return (
    <li className="flex gap-3 border-b border-line py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="font-medium">{line.name}</p>
        {extras.length > 0 && (
          <ul className="mt-1 text-micro leading-relaxed text-muted">
            {extras.map((e, i) => (
              <li key={i}>+ {e}</li>
            ))}
          </ul>
        )}
        {line.note && <p className="mt-1 text-micro italic text-muted">„{line.note}“</p>}

        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-line-strong transition-colors hover:border-cream"
            onClick={() => onQty(line.qty - 1)}
          >
            <IconMinus size={14} />
            <span className="sr-only">
              {d.order.decrease}: {line.name}
            </span>
          </button>
          <span className="tnum w-8 text-center text-small font-semibold">
            <span className="sr-only">{d.order.quantity}: </span>
            {line.qty}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-line-strong transition-colors hover:border-cream"
            onClick={() => onQty(line.qty + 1)}
          >
            <IconPlus size={14} />
            <span className="sr-only">
              {d.order.increase}: {line.name}
            </span>
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 rounded-sm px-2 py-1 text-micro text-muted underline underline-offset-2 transition-colors hover:text-signal-closed"
          >
            {d.order.remove}
            <span className="sr-only">: {line.name}</span>
          </button>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span className="tnum font-semibold" data-price>
          {price(lineTotal(line), locale)}
        </span>
        {line.qty > 1 && (
          <span className="tnum mt-0.5 block text-micro text-muted">
            {price(lineUnitPrice(line), locale)} {d.common.each}
          </span>
        )}
      </div>
    </li>
  );
}
