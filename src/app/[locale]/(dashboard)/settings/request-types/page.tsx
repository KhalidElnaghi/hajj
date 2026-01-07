import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.request_types'),
  };
}

export default async function RequestTypesPage() {
  const t = await getTranslations('Settings.tiles.request-types');
  return <SettingsPlaceholderView title={t('title')} translationKey="request-types" />;
}

