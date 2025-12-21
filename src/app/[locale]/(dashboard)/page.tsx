import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MainPage from 'src/sections/main/view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('main_page'),
  };
}

export default function HomePage() {
  return <MainPage />;
}
