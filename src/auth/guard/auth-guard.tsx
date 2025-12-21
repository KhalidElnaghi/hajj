type Props = {
  children: React.ReactNode;
};

// NOTE: Auth logic kept here but commented for future integration.
// Un-comment the block below when backend auth is ready.
/*
import { useState, useEffect, useCallback } from 'react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from '../hooks';

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};
*/

export default function AuthGuard({ children }: Props) {
  /*
  const { loading } = useAuthContext();
  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
  */
  return <>{children}</>;
}

/*
function Container({ children }: Props) {
  const router = useRouter();
  const { authenticated, method } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];
      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
*/
