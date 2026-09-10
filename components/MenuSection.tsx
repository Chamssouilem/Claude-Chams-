'use client';

import { useMemo, useRef, useState } from 'react';
import { menu, menuDeal } from '@/lib/data';
import { price, surcharge } from '@/lib/format';
import { fill, LEGAL_ROUTES, t } from '@/lib/i18n';
import { useCart } from '@/lib/cart';
import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { ItemDialog } from './ItemDialog';
import { AllergenBadges } from './AllergenBadges';
import { TagBadges } from './TagBadges';
import { IconCheck, IconClose, IconPlus, IconSearch } from './Icons';
import type { Locale, MenuCategory, MenuItem, TagId } from '@/lib/types';

/** Fotos für die Signature-Karten. Reihenfolge egal, Zuordnung über die ID. */
const FEATURED_PHOTO: Record<string, string> = {
  'real-deal': 'burger-real-deal',
  mexican: 'burger-mexican',
  'beef-bacon': 'burger-beef-bacon',
  'sucuk-ei': 'burger-sucuk-ei',
};

const FILTER_TAGS: TagId[] = ['vegetarisch', 'scharf', 'kids'];

/** Artikel, bei denen sich vor dem Hinzufügen etwas auswählen lässt. */
function needsOptions(categoryId: string): boolean {
  return categoryId === 'burger' || categoryId === 'getraenke';
}

/**
 * Die Speisekarte.
 *
 * Sie steht auf Metzgerpapier, nicht auf dunklem Grund. Eine Karte ist
 * gedruckt — auf Papier wirken die Führungspunkte wie eine Preistafel im Laden
 * und nicht wie eine Tabelle im Netz. Zugleich bricht der helle Block die Reihe
 * dunkler Abschnitte auf, die sonst über zehn Sektionen ermüdet.
 */
export function MenuSection({ locale }: { locale: Locale }) {
  const d = t(locale);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<TagId | null>(null);
  const [dialog, setDialog] = useState<{ item: MenuItem; categoryId: string } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const normalized = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return menu.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          if (tag && !item.tags.includes(tag)) return false;
          if (!normalized) return true;
          return (
            item.name.toLowerCase().includes(normalized) ||
            item.description[locale].toLowerCase().includes(normalized) ||
            cat.name[locale].toLowerCase().includes(normalized)
          );
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [normalized, tag, locale]);

  const resultCount = filtered.reduce((n, c) => n + c.items.length, 0);
  const isFiltered = Boolean(normalized || tag);

  const reset = () => {
    setQuery('');
    setTag(null);
    searchRef.current?.focus();
  };

  const featured = menu.categories
    .find((c) => c.id === 'burger')
    ?.items.filter((i) => i.featured) ?? [];

  return (
    <section
      id="speisekarte"
      className="on-cream surface-paper section"
      aria-labelledby="menu-title"
    >
      <div className="shell">
        <Reveal>
          <p className="kicker">{d.menu.kicker}</p>
          <h2 id="menu-title" className="mt-4">
            {d.menu.h2}
          </h2>
          <p className="lead mt-6">{d.menu.intro}</p>
        </Reveal>

        {/* Signature-Burger: die drei, die diesen Laden ausmachen */}
        {!isFiltered && featured.length > 0 && (
          <div className="mt-block grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 70} as="article" className="h-full">
                <FeaturedCard
                  item={item}
                  locale={locale}
                  onOpen={() => setDialog({ item, categoryId: 'burger' })}
                />
              </Reveal>
            ))}
          </div>
        )}

        {/* Suche und Filter */}
        <div className="mt-block">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="w-full md:max-w-xs">
              <label htmlFor="menu-search" className="field-label">
                {d.menu.searchLabel}
              </label>
              <div className="relative">
                <IconSearch
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  ref={searchRef}
                  id="menu-search"
                  type="search"
                  className="input !pl-10 !pr-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={d.menu.searchPlaceholder}
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={reset}
                    className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm text-muted transition-colors hover:text-cream"
                  >
                    <IconClose size={16} />
                    <span className="sr-only">{d.menu.searchClear}</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <p id="filter-label" className="field-label">
                {d.menu.filterLabel}
              </p>
              <div
                role="group"
                aria-labelledby="filter-label"
                className="no-scrollbar -mx-gutter flex gap-2 overflow-x-auto px-gutter md:mx-0 md:flex-wrap md:px-0"
              >
                <button
                  type="button"
                  className="chip"
                  aria-pressed={tag === null}
                  onClick={() => setTag(null)}
                >
                  {d.menu.filterAll}
                </button>
                {FILTER_TAGS.map((id) => {
                  const legend = menu.tagLegend.find((x) => x.id === id);
                  return (
                    <button
                      key={id}
                      type="button"
                      className="chip"
                      aria-pressed={tag === id}
                      onClick={() => setTag(tag === id ? null : id)}
                    >
                      {legend?.emoji ? <span aria-hidden="true">{legend.emoji}</span> : null}
                      {legend?.[locale]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ergebniszahl — für Screenreader hörbar, wenn sich der Filter ändert */}
          <p className="mt-4 text-small text-muted" role="status" aria-live="polite">
            {resultCount === 1
              ? d.menu.resultsCountOne
              : fill(d.menu.resultsCount, { n: resultCount })}
          </p>
        </div>

        {/* Kategorie-Navigation, klebt unter dem Kopf */}
        {!isFiltered && (
          <nav
            aria-label={d.menu.categoryNavLabel}
            className="sticky top-header z-30 -mx-gutter mt-6 border-y border-line bg-paper/95 px-gutter backdrop-blur-md"
          >
            <ul className="no-scrollbar flex gap-1 overflow-x-auto py-2">
              {menu.categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#kategorie-${cat.id}`}
                    className="inline-flex min-h-[40px] items-center whitespace-nowrap rounded-sm px-3 text-small font-medium text-cream-dim no-underline transition-colors hover:bg-ink-3 hover:text-cream"
                  >
                    {cat.name[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Die Karte */}
        {filtered.length === 0 ? (
          <div className="mt-block rounded border border-dashed border-line-strong px-6 py-12 text-center">
            <p className="font-display text-h3">{d.menu.noResults}</p>
            <p className="mt-3 text-cream-dim">{d.menu.noResultsHint}</p>
            <button type="button" className="btn btn-secondary mt-6" onClick={reset}>
              {d.menu.resetFilters}
            </button>
          </div>
        ) : (
          <div className="mt-block flex flex-col gap-block">
            {filtered.map((cat) => (
              <CategoryBlock
                key={cat.id}
                category={cat}
                locale={locale}
                onOpen={(item) => setDialog({ item, categoryId: cat.id })}
              />
            ))}
          </div>
        )}

        <p className="mt-block border-t border-line pt-6 text-small text-muted">
          {d.menu.priceNote}{' '}
          <a
            href={LEGAL_ROUTES.allergene[locale]}
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-ember-bright"
          >
            {d.menu.allergenTableLink}
          </a>
          .
        </p>
      </div>

      {dialog && (
        <ItemDialog
          item={dialog.item}
          categoryId={dialog.categoryId}
          locale={locale}
          onClose={() => setDialog(null)}
        />
      )}
    </section>
  );
}

function CategoryBlock({
  category,
  locale,
  onOpen,
}: {
  category: MenuCategory;
  locale: Locale;
  onOpen: (item: MenuItem) => void;
}) {
  const d = t(locale);

  return (
    <div id={`kategorie-${category.id}`} className="scroll-mt-[calc(var(--header-h)+64px)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-h3">{category.name[locale]}</h3>
        {category.hasMenuPrice && (
          <p className="text-small text-muted">
            {d.menu.singlePrice} / {d.menu.menuPrice}
          </p>
        )}
      </div>
      {category.intro && (
        <p className="measure mt-3 text-small text-cream-dim">{category.intro[locale]}</p>
      )}

      <hr className="rule-ember mt-5 border-0" />

      <ul className="mt-2">
        {category.items.map((item) => (
          <li key={item.id}>
            <MenuRow item={item} categoryId={category.id} locale={locale} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Eine Zeile der Karte im Stil einer Tafel im Laden: Name, Führungspunkte,
 * Preis. Die Punkte sind reine Typografie, keine Grafik — sie skalieren mit
 * und bleiben bei jeder Textgröße lesbar.
 */
function MenuRow({
  item,
  categoryId,
  locale,
  onOpen,
}: {
  item: MenuItem;
  categoryId: string;
  locale: Locale;
  onOpen: (item: MenuItem) => void;
}) {
  const d = t(locale);
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (needsOptions(categoryId)) {
      onOpen(item);
      return;
    }
    add({
      itemId: item.id,
      categoryId,
      name: item.name,
      qty: 1,
      unitBase: item.price,
      kids: false,
      addonIds: [],
      sauceIds: [],
      asMenu: false,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="group border-b border-line py-5 transition-colors last:border-b-0 hover:bg-ink-2/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="leader">
            <h4 className="font-display text-h4 uppercase">{item.name}</h4>
            <span className="leader-fill" aria-hidden="true" />
            <span className="leader-price tnum text-h4" data-price>
              {price(item.price, locale)}
              {item.menuPrice != null && (
                <span className="ml-2 font-normal text-muted">/ {price(item.menuPrice, locale)}</span>
              )}
            </span>
          </div>

          <p className="measure mt-2 text-small leading-relaxed text-cream-dim">
            {item.description[locale]}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <TagBadges tags={item.tags} locale={locale} />
            <AllergenBadges
              allergens={item.allergens}
              mayContain={item.mayContain}
              locale={locale}
            />
          </div>

          {item.kidsPrice != null && (
            <p className="tnum mt-2 text-small text-berry-text">
              {d.menu.kidsPrice}: {price(item.kidsPrice, locale)}
              {item.kidsNote ? ` — ${item.kidsNote[locale]}` : ''}
            </p>
          )}

          {item.menuUpgrade != null && (
            <p className="tnum mt-2 text-small text-ember-text">
              {fill(d.menu.menuUpgrade, { price: surcharge(menuDeal.surcharge, locale) })}
              <span className="ml-1.5 text-muted">— {d.menu.menuUpgradeHint}</span>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`btn shrink-0 self-start ${justAdded ? 'btn-secondary !border-signal-open !text-signal-open' : 'btn-secondary group-hover:!border-cream'}`}
        >
          {justAdded ? <IconCheck size={16} /> : <IconPlus size={16} />}
          <span>
            {justAdded
              ? d.menu.added
              : needsOptions(categoryId)
                ? d.menu.configure
                : d.menu.addToCart}
          </span>
          <span className="sr-only">: {item.name}</span>
        </button>
      </div>
    </div>
  );
}

/** Große Karte mit Foto für die Aushängeschilder. */
function FeaturedCard({
  item,
  locale,
  onOpen,
}: {
  item: MenuItem;
  locale: Locale;
  onOpen: () => void;
}) {
  const d = t(locale);
  const photoId = FEATURED_PHOTO[item.id];

  return (
    <div className="card card-interactive flex h-full flex-col overflow-hidden">
      <div className="relative">
        {photoId ? (
          <Photo
            id={photoId}
            locale={locale}
            sizes="(min-width: 1200px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="w-full"
          />
        ) : null}
        <span className="absolute bottom-3 left-3 rounded-sm bg-berry px-2 py-1 text-micro font-semibold uppercase tracking-[0.14em] text-paper">
          {d.menu.signature}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="leader">
          <h3 className="font-display text-h4 uppercase">{item.name}</h3>
          <span className="leader-fill" aria-hidden="true" />
          <span className="leader-price tnum" data-price>
            {price(item.price, locale)}
          </span>
        </div>

        <p className="mt-2 flex-1 text-small leading-relaxed text-cream-dim">
          {item.description[locale]}
        </p>

        <div className="mt-3">
          <AllergenBadges allergens={item.allergens} mayContain={item.mayContain} locale={locale} />
        </div>

        <button type="button" onClick={onOpen} className="btn btn-primary btn-block mt-4">
          <IconPlus size={16} />
          {d.menu.addToCart}
          <span className="sr-only">: {item.name}</span>
        </button>
      </div>
    </div>
  );
}
