import type { Metadata } from 'next';
import { LegalShell } from '@/components/pages/LegalShell';
import { AllergeneContent } from '@/components/pages/AllergeneContent';
import { buildMetadata } from '@/lib/metadata';
import { jsonLdString, legalGraph } from '@/lib/schema';
import { LAST_UPDATED } from '@/lib/legal';

const TITLE = 'Allergens & additives';
const DESCRIPTION =
  'Allergens and additives for every burger, side and sauce at Patties & Berries in Moers — full table under EU food information law.';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
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
            legalGraph('en', { name: TITLE, path: '/en/allergens/', description: DESCRIPTION }),
          ),
        }}
      />
      <LegalShell
        locale="en"
        altLocaleHref="/allergene/"
        title={TITLE}
        intro="Every declarable allergen for every dish. If you have an allergy, please still have a quick word with us."
        updated={LAST_UPDATED}
        reviewNotice={false}
      >
        <AllergeneContent locale="en" />
      </LegalShell>
    </>
  );
}
