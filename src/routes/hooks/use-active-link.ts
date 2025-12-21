import { usePathname } from 'src/i18n/routing';

import { paths } from '../paths';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}`;

  const normalActive =
    !checkPath &&
    (pathname === currentPath ||
      (pathname.includes('report') && currentPath === paths.dashboard.root));
  const deepActive = !checkPath && pathname.includes(currentPath);

  return deep ? deepActive : normalActive;
}
