/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export: Netlify liefert reines HTML/CSS/JS aus, keine Serverless-Funktionen.
  // Das ist für diese Seite die schnellste und günstigste Variante — es gibt keinen
  // serverseitigen Code (Bestellungen laufen über WhatsApp/E-Mail).
  output: 'export',
  trailingSlash: true,
  images: {
    // Pflicht bei output: 'export'. Wir nutzen ohnehin natives <picture> mit
    // AVIF/WebP-Quellen und expliziten Maßen — siehe components/Photo.tsx.
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
