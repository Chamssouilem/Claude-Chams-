import { c } from '@/lib/content';
import { Reveal } from './Reveal';
import type { Locale } from '@/lib/types';

/**
 * FAQ.
 *
 * Nutzt <details>/<summary> — auf- und zuklappbar ohne eine Zeile JavaScript,
 * mit Tastatur bedienbar, und der Text steht auch im geschlossenen Zustand im
 * HTML. Genau das braucht Google für das FAQ-Snippet (siehe lib/schema.ts).
 *
 * Die Fragen sind nach echten Suchanfragen gewählt, nicht nach dem, was der
 * Laden gern erzählen würde.
 */
export function Faq({ locale }: { locale: Locale }) {
  const x = c(locale);

  return (
    <section id="faq" className="surface-night section border-t border-line" aria-labelledby="faq-title">
      <div className="shell grid gap-block md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4">
          <p className="kicker">{x.faq.kicker}</p>
          <h2 id="faq-title" className="mt-4 max-w-[14ch]">
            {x.faq.h2}
          </h2>
        </Reveal>

        <Reveal delay={80} className="md:col-span-8">
          <ul className="border-t border-line">
            {x.faq.items.map((item) => (
              <li key={item.q}>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start gap-4 py-5 font-display text-h4 uppercase tracking-tight [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-ember-text transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="measure pb-6 text-cream-dim">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
