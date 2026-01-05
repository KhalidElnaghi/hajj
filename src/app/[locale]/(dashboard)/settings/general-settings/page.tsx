import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.general_settings'),
  };
}

export default async function GeneralSettingsPage() {
  const t = await getTranslations('Settings.tiles.general-settings');
  return <SettingsPlaceholderView title={t('title')} translationKey="general-settings" />;
}

