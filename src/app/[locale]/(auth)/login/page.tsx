import { getTranslations } from 'next-intl/server';
import LoginView from 'src/sections/auth/jwt/login-view';

// ----------------------------------------------------------------------



export default function LoginPage() {
  return <LoginView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Login' });

  return {
    title: t('title'),
  };
}
