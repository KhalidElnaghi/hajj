import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PilgrimsView from 'src/sections/pilgrims/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('pilgrims_management'),
  };
}

export default function PilgrimsPage() {
  return <PilgrimsView />;
}
