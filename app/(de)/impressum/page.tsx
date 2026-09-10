import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { ImpressumContent } from '@/components/pages/ImpressumContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Impressum';
const DESCRIPTION =
  'Impressum von Patties & Berries, Uerdinger Straße 101b, 47441 Moers — Angaben nach § 5 DDG.';

export const metadata: Metadata = buildMetadata({
  locale: 'de',
  page: 'impressum',
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
            legalGraph('de', { name: TITLE, path: '/impressum/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell
        locale="de"
        altLocaleHref="/en/imprint/"
        title={TITLE}
        updated={LAST_UPDATED}
      >
        <ImpressumContent locale="de" />
      </LegalShell>
    </>
  );
}
