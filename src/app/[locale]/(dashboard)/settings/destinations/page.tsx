import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.destinations'),
  };
}

export default async function DestinationsPage() {
  const t = await getTranslations('Settings.tiles.destinations');
  return <SettingsPlaceholderView title={t('title')} translationKey="destinations" />;
}

