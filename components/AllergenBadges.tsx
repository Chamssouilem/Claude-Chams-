import { allergenLegend } from '@/lib/data';
import { t } from '@/lib/i18n';
import type { AllergenId, Locale } from '@/lib/types';

/**
 * Allergen-Kürzel an jedem Artikel (LMIV / LMIDV).
 *
 * Die Kürzel tragen ein title-Attribut für die Maus UND einen Text nur für
 * Screenreader — ein title allein ist auf dem Handy unerreichbar und für
 * Screenreader unzuverlässig.
 */
export function AllergenBadges({
  allergens,
  mayContain = [],
  locale,
  className = '',
}: {
  allergens: AllergenId[];
  mayContain?: AllergenId[];
  locale: Locale;
  className?: string;
}) {
  const d = t(locale);
  if (allergens.length === 0 && mayContain.length === 0) return null;

  const label = (id: AllergenId) => allergenLegend.find((a) => a.id === id);

  return (
    <p className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="sr-only">
        {allergens.length > 0
          ? `${d.menu.allergensLabel}: ${allergens.map((a) => label(a)?.[locale]).join(', ')}.`
          : ''}
        {mayContain.length > 0
          ? ` ${d.menu.mayContainLabel}: ${mayContain.map((a) => label(a)?.[locale]).join(', ')}.`
          : ''}
      </span>

      {allergens.map((id) => (
        <span key={id} className="allergen-badge" title={label(id)?.[locale]} aria-hidden="true">
          {label(id)?.symbol}
        </span>
      ))}

      {mayContain.map((id) => (
        <span
          key={`spur-${id}`}
          className="allergen-badge border-dashed opacity-70"
          title={`${d.menu.mayContainLabel}: ${label(id)?.[locale]}`}
          aria-hidden="true"
        >
          ({label(id)?.symbol})
        </span>
      ))}
    </p>
  );
}
