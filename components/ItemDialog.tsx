'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  addonItems,
  drinkOptions,
  getItem,
  menuDeal,
  menuSurcharge,
  sauceItems,
  sideItems,
} from '@/lib/data';
import { price, surcharge } from '@/lib/format';
import { fill, t } from '@/lib/i18n';
import { useCart } from '@/lib/cart';
import { IconClose, IconMinus, IconPlus } from './Icons';
import { AllergenBadges } from './AllergenBadges';
import type { CartLine, Locale, MenuItem } from '@/lib/types';

interface ItemDialogProps {
  item: MenuItem;
  categoryId: string;
  locale: Locale;
  onClose: () => void;
}

/**
 * Der Artikel-Zusammensteller.
 *
 * Nutzt das native <dialog>-Element: Fokusfalle, Escape zum Schließen und das
 * Stilllegen des Hintergrunds bringt der Browser mit — zuverlässiger als jede
 * selbstgebaute Lösung und ohne zusätzliche Bibliothek.
 *
 * Hier sitzt außerdem der Menü-Aufschlag. Das ist die Stelle, an der aus einem
 * Burger ein Menü wird — sichtbar, mit ausgewiesenem Preis, ohne Vorauswahl.
 */
export function ItemDialog({ item, categoryId, locale, onClose }: ItemDialogProps) {
  const d = t(locale);
  const { add } = useCart();
  const ref = useRef<HTMLDialogElement>(null);

  const isBurger = categoryId === 'burger';
  const isDrink = categoryId === 'getraenke';

  const [qty, setQty] = useState(1);
  const [kids, setKids] = useState(false);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [sauceIds, setSauceIds] = useState<string[]>([]);
  const [asMenu, setAsMenu] = useState(false);
  const [sideId, setSideId] = useState(menuDeal.defaultSideId);
  const [drinkId, setDrinkId] = useState(drinkOptions[0]?.id ?? '');
  const [variantId, setVariantId] = useState(drinkOptions[0]?.id ?? '');
  const [note, setNote] = useState('');

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    // Escape und Klick auf den Hintergrund melden dasselbe Ereignis.
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);

    // Hintergrund darf nicht mitscrollen.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const unitBase = kids && item.kidsPrice ? item.kidsPrice : item.price;

  const draft: Omit<CartLine, 'lineId'> = useMemo(
    () => ({
      itemId: item.id,
      categoryId,
      name: item.name,
      qty,
      unitBase,
      kids,
      addonIds,
      sauceIds,
      asMenu,
      menuSideId: asMenu ? sideId : undefined,
      menuDrinkId: asMenu ? drinkId : undefined,
      variantId: isDrink ? variantId : undefined,
      variantName: isDrink ? drinkOptions.find((o) => o.id === variantId)?.name : undefined,
      note: note.trim() || undefined,
    }),
    [item.id, item.name, categoryId, qty, unitBase, kids, addonIds, sauceIds, asMenu, sideId, drinkId, isDrink, variantId, note],
  );

  const unitPrice = useMemo(() => {
    let sum = unitBase;
    for (const id of addonIds) sum += getItem(id)?.price ?? 0;
    for (const id of sauceIds) sum += getItem(id)?.price ?? 0;
    if (asMenu) sum += menuSurcharge(sideId);
    return Math.round((sum + Number.EPSILON) * 100) / 100;
  }, [unitBase, addonIds, sauceIds, asMenu, sideId]);

  const total = Math.round((unitPrice * qty + Number.EPSILON) * 100) / 100;

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const submit = () => {
    add(draft);
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="item-dialog-title"
      className="m-0 max-h-[100dvh] w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:m-auto sm:max-h-[90vh] sm:w-[min(38rem,calc(100vw-2rem))]"
      // Klick auf den Hintergrund schließt — der Inhalt fängt den Klick ab.
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="flex max-h-[100dvh] flex-col overflow-hidden border border-line bg-ink-3 text-cream sm:max-h-[90vh] sm:rounded">
        <header className="flex items-start gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 id="item-dialog-title" className="text-h3">
              {item.name}
            </h2>
            <p className="mt-1.5 text-small leading-relaxed text-cream-dim">
              {item.description[locale]}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost !min-h-[40px] shrink-0 !px-2"
            onClick={() => ref.current?.close()}
          >
            <IconClose />
            <span className="sr-only">{d.common.close}</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <AllergenBadges
            allergens={item.allergens}
            mayContain={item.mayContain}
            locale={locale}
            className="mb-5"
          />

          {/* Getränkeauswahl */}
          {isDrink && drinkOptions.length > 0 && (
            <Fieldset legend={d.order.optionsDrink}>
              <div className="grid gap-2 sm:grid-cols-2">
                {drinkOptions.map((option) => (
                  <Radio
                    key={option.id}
                    name="drink-variant"
                    checked={variantId === option.id}
                    onChange={() => setVariantId(option.id)}
                    label={option.name}
                  />
                ))}
              </div>
            </Fieldset>
          )}

          {/* Kids-Portion */}
          {item.kidsPrice != null && (
            <Fieldset legend={d.order.optionsKids}>
              <Check
                checked={kids}
                onChange={() => setKids((v) => !v)}
                label={`${d.order.optionsKids}${item.kidsNote ? ` — ${item.kidsNote[locale]}` : ''}`}
                right={price(item.kidsPrice, locale)}
              />
            </Fieldset>
          )}

          {/* Menü-Aufschlag */}
          {isBurger && (
            <Fieldset legend={d.order.optionsMenu} hint={menuDeal.description[locale]}>
              <Check
                checked={asMenu}
                onChange={() => setAsMenu((v) => !v)}
                label={d.order.optionsMenuOn}
                right={surcharge(menuDeal.surcharge, locale)}
              />

              {asMenu && (
                <div className="mt-4 grid gap-4 border-l-2 border-ember-bright pl-4">
                  <div>
                    <p className="field-label">{d.order.optionsSide}</p>
                    <div className="grid gap-2">
                      {sideItems.map((side) => {
                        const delta = menuSurcharge(side.id) - menuDeal.surcharge;
                        return (
                          <Radio
                            key={side.id}
                            name="menu-side"
                            checked={sideId === side.id}
                            onChange={() => setSideId(side.id)}
                            label={side.name}
                            right={delta > 0 ? surcharge(delta, locale) : undefined}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="field-label">{d.order.optionsDrink}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {drinkOptions.map((option) => (
                        <Radio
                          key={option.id}
                          name="menu-drink"
                          checked={drinkId === option.id}
                          onChange={() => setDrinkId(option.id)}
                          label={option.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Fieldset>
          )}

          {/* Extras */}
          {isBurger && (
            <Fieldset legend={d.order.optionsAddons}>
              <div className="grid gap-2">
                {addonItems.map((addon) => (
                  <Check
                    key={addon.id}
                    checked={addonIds.includes(addon.id)}
                    onChange={() => toggle(addonIds, setAddonIds, addon.id)}
                    label={addon.name}
                    right={surcharge(addon.price, locale)}
                  />
                ))}
              </div>
            </Fieldset>
          )}

          {/* Saucen */}
          {isBurger && (
            <Fieldset legend={d.order.optionsSauces}>
              <div className="grid gap-2 sm:grid-cols-2">
                {sauceItems.map((sauce) => (
                  <Check
                    key={sauce.id}
                    checked={sauceIds.includes(sauce.id)}
                    onChange={() => toggle(sauceIds, setSauceIds, sauce.id)}
                    label={sauce.name}
                    right={surcharge(sauce.price, locale)}
                  />
                ))}
              </div>
            </Fieldset>
          )}

          {/* Sonderwunsch */}
          <div className="mt-6">
            <label htmlFor="item-note" className="field-label">
              {d.order.optionsNote}
              <span className="ml-1.5 font-normal text-muted">({d.common.optional})</span>
            </label>
            <textarea
              id="item-note"
              className="input min-h-[72px] resize-y"
              rows={2}
              maxLength={200}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={locale === 'de' ? 'z. B. ohne Zwiebeln' : 'e.g. no onions'}
            />
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-3 border-t border-line bg-ink-2 px-5 py-4">
          <div className="flex items-center gap-1 rounded border border-line-strong">
            <button
              type="button"
              className="btn btn-ghost !min-h-[44px] !px-3"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              <IconMinus size={16} />
              <span className="sr-only">{d.order.decrease}</span>
            </button>
            <span className="tnum w-8 text-center font-semibold" aria-live="polite">
              <span className="sr-only">{d.order.quantity}: </span>
              {qty}
            </span>
            <button
              type="button"
              className="btn btn-ghost !min-h-[44px] !px-3"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
            >
              <IconPlus size={16} />
              <span className="sr-only">{d.order.increase}</span>
            </button>
          </div>

          <button type="button" className="btn btn-primary ml-auto flex-1 sm:flex-none" onClick={submit}>
            {fill(d.order.optionsAdd, { price: price(total, locale) })}
          </button>
        </footer>
      </div>
    </dialog>
  );
}

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mb-6 border-0 p-0">
      <legend className="field-label mb-2 p-0">{legend}</legend>
      {hint ? <p className="field-hint !mt-0 mb-2.5">{hint}</p> : null}
      {children}
    </fieldset>
  );
}

function Check({
  checked,
  onChange,
  label,
  right,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  right?: string;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded border border-line bg-ink-2 px-3 py-2 transition-colors hover:border-line-strong has-[:checked]:border-ember-bright has-[:checked]:bg-ink-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[18px] w-[18px] shrink-0 accent-[var(--pb-ember)]"
      />
      <span className="flex-1 text-small">{label}</span>
      {right ? <span className="tnum shrink-0 text-small text-cream-dim">{right}</span> : null}
    </label>
  );
}

function Radio({
  name,
  checked,
  onChange,
  label,
  right,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  right?: string;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded border border-line bg-ink-2 px-3 py-2 transition-colors hover:border-line-strong has-[:checked]:border-ember-bright has-[:checked]:bg-ink-4">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-[18px] w-[18px] shrink-0 accent-[var(--pb-ember)]"
      />
      <span className="flex-1 text-small">{label}</span>
      {right ? <span className="tnum shrink-0 text-small text-cream-dim">{right}</span> : null}
    </label>
  );
}
