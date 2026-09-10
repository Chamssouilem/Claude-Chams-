import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { ImpressumContent } from '@/components/pages/ImpressumContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Imprint';
const DESCRIPTION =
  'Legal notice for Patties & Berries, Uerdinger Straße 101b, 47441 Moers, Germany — as required by § 5 DDG.';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
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
            legalGraph('en', { name: TITLE, path: '/en/imprint/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell locale="en" altLocaleHref="/impressum/" title={TITLE} updated={LAST_UPDATED}>
        <ImpressumContent locale="en" />
      </LegalShell>
    </>
  );
}
