import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { DatenschutzContent } from '@/components/pages/DatenschutzContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Privacy policy';
const DESCRIPTION =
  'What Patties & Berries does with your data — and what it does not. No tracking, no accounts, map only on click.';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
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
            legalGraph('en', { name: TITLE, path: '/en/privacy/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell
        locale="en"
        altLocaleHref="/datenschutz/"
        title={TITLE}
        intro="This site has no user accounts, no database and no analytics. Here is exactly what does happen."
        updated={LAST_UPDATED}
      >
        <DatenschutzContent locale="en" />
      </LegalShell>
    </>
  );
}
