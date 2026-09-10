import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { buildMetadata, PRELOAD_FONTS } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({ locale: 'en', page: 'home' });

export const viewport: Viewport = {
  themeColor: '#141210',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/** Wurzel-Layout der englischen Seiten unter /en/. */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
