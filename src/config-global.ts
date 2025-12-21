export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const HOST_API_SHARED = process.env.NEXT_PUBLIC_HOST_API_SHARED;
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
