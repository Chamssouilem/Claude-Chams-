import Link from 'next/link';
import { SiteChrome } from '@/components/SiteChrome';

export const metadata = {
  title: 'Seite nicht gefunden — Patties & Berries Moers',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome locale="de" altLocaleHref="/en/" showOrderBar={false}>
      <div className="section">
        <div className="shell">
          <p className="kicker">404</p>
          <h1 className="mt-4 max-w-[16ch]">Diese Seite gibt es nicht</h1>
          <p className="lead mt-6">
            Vielleicht ist der Link alt, vielleicht hat sich ein Tippfehler
            eingeschlichen. Die Speisekarte findest du auf jeden Fall hier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#speisekarte" className="btn btn-primary no-underline">
              Zur Speisekarte
            </Link>
            <Link href="/" className="btn btn-secondary no-underline">
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
