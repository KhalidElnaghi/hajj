// Ensure HTTPS is always used
const ensureHttps = (url: string) => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

export const HOST_API = ensureHttps(
  process.env.NEXT_PUBLIC_HOST_API || 'https://psghajj.site/api/'
);
export const HOST_API_SHARED = ensureHttps(
  process.env.NEXT_PUBLIC_HOST_API_SHARED || 'https://psghajj.site/api/'
);
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
import { paths } from 'src/routes/paths';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboar

export const COOKIES_KEYS = {
  lang: 'NEXT_LOCALE',
  session: 'accessToken',
  user: 'user',
  cart: 'cart',
};

export const MAX_FILE_SIZE = 500 * 1024; // 50KB
export const MAX_FILE_SIZE_HELPER = true;
