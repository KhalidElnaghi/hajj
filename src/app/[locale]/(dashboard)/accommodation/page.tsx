import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AccommodationView from 'src/sections/accommodation/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('accommodation'),
  };
}

export default function AccommodationPage() {
  return <AccommodationView />;
}
