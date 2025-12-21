import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SupervisorsView from 'src/sections/supervisors/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('supervisors_management'),
  };
}

export default function SupervisorsPage() {
  return <SupervisorsView />;
}

