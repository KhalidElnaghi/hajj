'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks';
import { usePathname } from 'src/routes/hooks';
import Cookie from 'js-cookie';

import { SplashScreen } from 'src/components/loading-screen';

import { ACCESS_TOKEN } from '../constants';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    const token = Cookie.get(ACCESS_TOKEN);

    if (!token) {
      // No token, redirect to login
      const searchParams = new URLSearchParams({
        returnTo: pathname || paths.dashboard.root,
      }).toString();

      const loginPath = paths.auth.jwt.login;
      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [router, pathname]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
