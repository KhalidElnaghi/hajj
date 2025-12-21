import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import RequestsView from 'src/sections/requests/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('requests_management'),
  };
}

export default function RequestsPage() {
  return <RequestsView />;
}

