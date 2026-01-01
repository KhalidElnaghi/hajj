import Cookie from 'js-cookie';
import axios from 'axios';
import { USER_KEY, ACCESS_TOKEN } from 'src/auth/constants';

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  type?: string;
  username?: string;
  email_verified_at?: string | null;
  current_company_id?: number;
  created_by?: number | null;
  phone?: string | null;
  status?: number;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

interface CompanyData {
  id: number;
  company_no: number;
  name: {
    ar: string;
    en: string;
  };
  status: string;
  database_name: string;
  legal_name: string;
  [key: string]: any;
}

interface SetAuthCookiesParams {
  token: string;
  user: UserData;
  companies: CompanyData[];
  rememberMe?: boolean;
}

/**
 * Sets authentication cookies
 * Saves token, user, and companies data in cookies
 */
export const setAuthCookies = ({
  token,
  user,
  companies,
  rememberMe = false,
}: SetAuthCookiesParams): void => {
  // Cookie options
  const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const baseOptions = {
    secure: isHttps,
    sameSite: 'lax' as const,
    path: '/',
  };

  // Calculate expiry dates
  // If rememberMe is true, use 30 days, otherwise use 1 day
  const expiry = rememberMe ? 30 : 1;

  // Set access token
  Cookie.set(ACCESS_TOKEN, token, {
    ...baseOptions,
    expires: expiry,
  });

  // Set user data
  Cookie.set(USER_KEY, JSON.stringify(user), {
    ...baseOptions,
    expires: expiry,
  });

  // Set companies data
  Cookie.set('companies', JSON.stringify(companies), {
    ...baseOptions,
    expires: expiry,
  });

  // Store full user object in sessionStorage for auth context (as done in auth-provider)
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(USER_KEY, JSON.stringify({ ...user, accessToken: token }));
  }

  // Set axios default authorization header
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

