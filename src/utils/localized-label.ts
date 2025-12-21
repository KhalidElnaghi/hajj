'use client';

import Cookie from 'js-cookie';

import { defaultLocale } from 'src/i18n/config-locale';

export const getCurrentLanguage = (): string => Cookie.get('Language') || defaultLocale;

export const getLocalizedLabel = (
  nameAr?: string | null,
  nameEn?: string | null,
  fallback?: string | null
): string => {
  const lang = getCurrentLanguage();
  if (lang === 'ar') {
    return nameAr || nameEn || fallback || '';
  }
  return nameEn || nameAr || fallback || '';
};

