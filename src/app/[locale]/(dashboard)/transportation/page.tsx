import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TransportationView from 'src/sections/transportation/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('transportation'),
  };
}

export default function TransportationPage() {
  return <TransportationView />;
}

