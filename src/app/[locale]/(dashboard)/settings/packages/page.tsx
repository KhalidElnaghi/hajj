import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackagesView from 'src/sections/settings/packages/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.packages'),
  };
}

export default function PackagesPage() {
  return <PackagesView />;
}

