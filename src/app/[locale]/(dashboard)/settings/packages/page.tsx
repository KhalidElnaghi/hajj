import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.packages'),
  };
}

export default async function PackagesPage() {
  const t = await getTranslations('Settings.tiles.packages');
  return <SettingsPlaceholderView title={t('title')} translationKey="packages" />;
}

