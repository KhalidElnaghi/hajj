import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

type LanguagePreference = {
  locale: string;
  quality: number;
};

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedRequestLocale = await requestLocale;
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('Language')?.value;

  const normalizeLocale = (value?: string | null) =>
    value && routing.locales.includes(value as any) ? value : undefined;

  const locale =
    normalizeLocale(cookieLocale) ?? normalizeLocale(resolvedRequestLocale) ?? routing.defaultLocale;

  // Dynamically import messages with webpack optimization
  // This allows bundling both locales but only loads the needed one
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
