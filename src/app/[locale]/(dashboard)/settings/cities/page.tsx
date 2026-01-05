import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.cities'),
  };
}

export default async function CitiesPage() {
  const t = await getTranslations('Settings.tiles.cities');
  return <SettingsPlaceholderView title={t('title')} translationKey="cities" />;
}

