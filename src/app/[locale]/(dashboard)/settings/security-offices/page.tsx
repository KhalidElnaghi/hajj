import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.security_offices'),
  };
}

export default async function SecurityOfficesPage() {
  const t = await getTranslations('Settings.tiles.security-offices');
  return <SettingsPlaceholderView title={t('title')} translationKey="security-offices" />;
}

