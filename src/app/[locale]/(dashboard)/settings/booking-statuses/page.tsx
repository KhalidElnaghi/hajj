import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SettingsPlaceholderView from 'src/sections/settings/placeholder-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('settings.booking_statuses'),
  };
}

export default async function BookingStatusesPage() {
  const t = await getTranslations('Settings.tiles.booking-statuses');
  return <SettingsPlaceholderView title={t('title')} translationKey="booking-statuses" />;
}

