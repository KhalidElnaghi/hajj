import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.taggables'),
  };
}

export default async function TaggablesPage() {
  const t = await getTranslations('Settings.tiles.taggables');
  return <SettingsPlaceholderView title={t('title')} translationKey="taggables" />;
}

