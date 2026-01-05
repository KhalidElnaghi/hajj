import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.countries'),
  };
}

export default async function CountriesPage() {
  const t = await getTranslations('Settings.tiles.countries');
  return <SettingsPlaceholderView title={t('title')} translationKey="countries" />;
}

