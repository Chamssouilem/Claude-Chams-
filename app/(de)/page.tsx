import type { Metadata } from 'next';
import { HomePage } from '@/components/pages/HomePage';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({ locale: 'de', page: 'home' });

export default function Page() {
  return <HomePage locale="de" />;
}
