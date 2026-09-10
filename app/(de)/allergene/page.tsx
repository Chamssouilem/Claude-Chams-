import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { AllergeneContent } from '@/components/pages/AllergeneContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Allergene & Zusatzstoffe';
const DESCRIPTION =
  'Allergene und Zusatzstoffe aller Burger, Beilagen und Saucen von Patties & Berries in Moers — vollständige Tabelle nach LMIV.';

export const metadata: Metadata = buildMetadata({
  locale: 'de',
  page: 'allergene',
  title: `${TITLE} — Patties & Berries Moers`,
  description: DESCRIPTION,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            legalGraph('de', { name: TITLE, path: '/allergene/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell
        locale="de"
        altLocaleHref="/en/allergens/"
        title={TITLE}
        intro="Alle kennzeichnungspflichtigen Allergene zu jedem Gericht. Wenn du eine Allergie hast, sprich uns bitte trotzdem kurz an."
        updated={LAST_UPDATED}
        reviewNotice={false}
      >
        <AllergeneContent locale="de" />
      </LegalShell>
    </>
  );
}
