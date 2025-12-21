import { getTranslations } from 'next-intl/server';
import ModernForgotPasswordView from 'src/sections/auth/jwt/modern-forgot-password-view';

export default function ModernForgotPasswordPage() {
  return <ModernForgotPasswordView />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.ForgotPassword' });

  return {
    title: t('title'),
  };
}
