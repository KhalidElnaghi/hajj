import Cookie from 'js-cookie';
import { USER_KEY } from 'src/auth/constants';
import { setSession } from 'src/auth/context/jwt/utils';

interface UserData {
  id?: string | number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  completeTeacherProfile?: boolean;
  accessToken?: string;
  [key: string]: any;
}

interface SetAuthCookiesParams {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: string;
  refreshTokenExpireAt: string;
  user: UserData;
  rememberMe?: boolean;
}

/**
 * Sets authentication cookies and session using the existing auth utils
 * Note: Cookie expiry for rememberMe is handled by the browser session vs persistent cookies
 * The token expiry dates from the API determine actual token validity
 */
export const setAuthCookies = ({
  accessToken,
  refreshToken,
  accessTokenExpireAt,
  refreshTokenExpireAt,
  user,
  rememberMe = false,
}: SetAuthCookiesParams): void => {
  // Use existing setSession function which handles UTC conversion and token refresh timers
  setSession({
    accessToken,
    refreshToken,
    accessTokenExpireAt,
    refreshTokenExpireAt,
  });

  // Set user data cookie (for backward compatibility)
  Cookie.set(USER_KEY, user.name || '', {
    path: '/',
    ...(rememberMe && { expires: 30 }), // 30 days if rememberMe, otherwise session cookie
  });

  // Store full user object in sessionStorage for auth context (as done in auth-provider)
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(USER_KEY, JSON.stringify({ ...user, accessToken }));
  }
};

