'use client';

import { useLocale } from 'next-intl';
import { getLocalesSettings, getAllLocales } from 'src/i18n/config-locale';
import useTranslate from './use-translate';

export default function useLocales() {
  const locale = useLocale();
  const { t } = useTranslate();

  // Get locale settings with translated labels
  const translatedLocalesSettings = getLocalesSettings(t);
  const currentLang = translatedLocalesSettings[locale as keyof typeof translatedLocalesSettings];

  return {
    allLangs: getAllLocales(t),
    currentLang,
  };
}
