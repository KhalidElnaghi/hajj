import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.job_titles'),
  };
}

export default async function JobTitlesPage() {
  const t = await getTranslations('Settings.tiles.job-titles');
  return <SettingsPlaceholderView title={t('title')} translationKey="job-titles" />;
}

