import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { DatenschutzContent } from '@/components/pages/DatenschutzContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Datenschutzerklärung';
const DESCRIPTION =
  'Was Patties & Berries mit deinen Daten macht — und was nicht. Kein Tracking, kein Nutzerkonto, Karte nur auf Klick.';

export const metadata: Metadata = buildMetadata({
  locale: 'de',
  page: 'datenschutz',
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
            legalGraph('de', { name: TITLE, path: '/datenschutz/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell
        locale="de"
        altLocaleHref="/en/privacy/"
        title={TITLE}
        intro="Diese Seite hat keine Nutzerkonten, keine Datenbank und keine Analysewerkzeuge. Hier steht genau, was trotzdem passiert."
        updated={LAST_UPDATED}
      >
        <DatenschutzContent locale="de" />
      </LegalShell>
    </>
  );
}
