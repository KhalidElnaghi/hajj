import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.gathering_point_types'),
  };
}

export default async function GatheringPointTypesPage() {
  const t = await getTranslations('Settings.tiles.gathering-point-types');
  return <SettingsPlaceholderView title={t('title')} translationKey="gathering-point-types" />;
}

