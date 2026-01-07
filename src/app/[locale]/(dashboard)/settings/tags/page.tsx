import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.tags'),
  };
}

export default async function TagsPage() {
  const t = await getTranslations('Settings.tiles.tags');
  return <SettingsPlaceholderView title={t('title')} translationKey="tags" />;
}

