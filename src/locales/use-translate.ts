'use client';

import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'src/i18n/routing';

import { useSettingsContext } from 'src/components/settings';

const SUPPORTED_LOCALES = new Set(['ar', 'en']);

export default function useTranslate() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations();
  const { onChangeDirectionByLang } = useSettingsContext();

  const onChangeLang = useCallback(
    (nextLocale: string) => {
      if (!SUPPORTED_LOCALES.has(nextLocale) || nextLocale === currentLocale) {
        return;
      }

      // Update cookie immediately (server needs this)
      Cookies.set('Language', nextLocale, { path: '/' });

      // Update theme direction immediately (client-side only)
      onChangeDirectionByLang(nextLocale);

      // Update DOM attributes immediately for instant visual feedback
      if (typeof document !== 'undefined') {
        document.documentElement.lang = nextLocale;
        document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
      }

      // Navigate to the same path but with the new locale
      // This will update the URL from /en/... to /ar/... or vice versa
      router.replace(pathname, { locale: nextLocale });
    },
    [currentLocale, router, pathname, onChangeDirectionByLang]
  );

  return {
    t,
    onChangeLang,
  };
}
