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

  const detectLocaleFromHeaders = async () => {
    const headerList = await headers();
    const acceptLanguage =
      typeof headerList?.get === 'function' ? headerList.get('accept-language') : undefined;

    if (!acceptLanguage) {
      return undefined;
    }

    const preferredLocales = acceptLanguage
      .split(',')
      .map((languageRange: string): LanguagePreference => {
        const [localeValue, qValue] = languageRange.trim().split(';q=');
        const normalizedLocale = localeValue.split('-')[0];
        const quality = Number(qValue ?? 1);

        return { locale: normalizedLocale, quality };
      })
      .sort((a: LanguagePreference, b: LanguagePreference) => b.quality - a.quality)
      .map((entry: LanguagePreference) => entry.locale);

    return preferredLocales.find((localeValue) => routing.locales.includes(localeValue as any));
  };

  const locale =
    normalizeLocale(cookieLocale) ??
    normalizeLocale(resolvedRequestLocale) ??
    (await detectLocaleFromHeaders()) ??
    routing.defaultLocale;

  // Dynamically import messages with webpack optimization
  // This allows bundling both locales but only loads the needed one
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
