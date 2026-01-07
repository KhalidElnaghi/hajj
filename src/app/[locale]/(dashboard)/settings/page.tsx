import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsView from 'src/sections/settings/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.title'),
  };
}

export default function SettingsPage() {
  return <SettingsView />;
}

