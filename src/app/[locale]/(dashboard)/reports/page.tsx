import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ReportsView from 'src/sections/reports/view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('reports_analytics'),
  };
}

export default function ReportsPage() {
  return <ReportsView />;
}
