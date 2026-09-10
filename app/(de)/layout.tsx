import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { buildMetadata, PRELOAD_FONTS } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({ locale: 'de', page: 'home' });

export const viewport: Viewport = {
  themeColor: '#141210',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Zoomen darf niemals gesperrt werden — das ist eine Zugänglichkeitsfrage.
  maximumScale: 5,
};

/**
 * Wurzel-Layout der deutschen Seiten.
 *
 * Deutsch liegt bewusst auf der Wurzel („/“), nicht unter „/de/“: Das ist die
 * Sprache der Nachbarschaft, die hier bestellt, und die kürzeste Adresse
 * gehört der wichtigsten Zielgruppe.
 */
export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
