import { tagLegend } from '@/lib/data';
import type { Locale, TagId } from '@/lib/types';

/** Kennzeichnung vegetarisch / scharf / für Kids. Helal steht global, nicht am Artikel. */
export function TagBadges({ tags, locale }: { tags: TagId[]; locale: Locale }) {
  const shown = tags.filter((tag) => tag !== 'halal');
  if (shown.length === 0) return null;

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {shown.map((id) => {
        const tag = tagLegend.find((x) => x.id === id);
        if (!tag) return null;
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1 rounded-sm border border-line-strong bg-ink-2 px-1.5 py-0.5 text-micro font-medium text-cream-dim"
          >
            {tag.emoji ? <span aria-hidden="true">{tag.emoji}</span> : null}
            {tag[locale]}
          </span>
        );
      })}
    </span>
  );
}
