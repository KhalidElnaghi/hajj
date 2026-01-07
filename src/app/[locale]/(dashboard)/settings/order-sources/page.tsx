import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.order_sources'),
  };
}

export default async function OrderSourcesPage() {
  const t = await getTranslations('Settings.tiles.order-sources');
  return <SettingsPlaceholderView title={t('title')} translationKey="order-sources" />;
}

