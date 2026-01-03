import { getTranslations } from 'next-intl/server';
import RegisterView from 'src/sections/auth/jwt/register-view';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return <RegisterView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Register' });

  return {
    title: t('title'),
  };
}

