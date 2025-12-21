export type LocaleType = 'en' | 'ar';

interface LocaleSetting {
  label: string;
  value: LocaleType;
  dir: 'ltr' | 'rtl';
  currency: string;
  icon: string;
  numberFormat: {
    code: string;
    currency: string;
  };
}

export const locales: LocaleType[] = ['ar', 'en'];
export const defaultLocale: LocaleType = 'ar';

// Base locale settings without translations (for server-side or initial rendering)
export const localesSettings: { [key in LocaleType]: LocaleSetting } = {
  ar: {
    label: 'العربية',
    value: 'ar',
    dir: 'rtl',
    currency: 'ر.س',
    icon: 'flagpack:sa',
    numberFormat: {
      code: 'ar',
      currency: 'AED',
    },
  },
  en: {
    label: 'English',
    value: 'en',
    dir: 'ltr',
    currency: 'SAR',
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },
};

// Helper function to get locale settings with translated labels
export const getLocalesSettings = (
  t: (key: string) => string
): { [key in LocaleType]: LocaleSetting } => ({
  ar: {
    ...localesSettings.ar,
    label: t('Label.language_arabic'),
  },
  en: {
    ...localesSettings.en,
    label: t('Label.language_english'),
  },
});

// Helper function to get all locales with translated labels
export const getAllLocales = (t: (key: string) => string): LocaleSetting[] =>
  Object.values(getLocalesSettings(t));

export const allLocales = Object.values(localesSettings);
