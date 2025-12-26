'use client';

import Cookies from 'js-cookie';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { localStorageGetItem } from 'src/utils/storage-available';

import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
  const locale = useLocale();

  const [openDrawer, setOpenDrawer] = useState(false);
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [update]
  );
  useEffect(() => {
    // Keep the cookie and theme direction in sync with the active locale
    const resolvedLang = locale || Cookies.get('Language') || 'ar';

    onChangeDirectionByLang(resolvedLang);
    Cookies.set('Language', resolvedLang, { path: '/' });
    Cookies.remove('browserLang');
  }, [locale, onChangeDirectionByLang]);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
