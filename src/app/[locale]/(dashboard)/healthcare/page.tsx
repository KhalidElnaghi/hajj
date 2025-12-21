import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HealthcareView from 'src/sections/healthcare/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('healthcare'),
  };
}

export default function HealthcarePage() {
  return <HealthcareView />;
}

