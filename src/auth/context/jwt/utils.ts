import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

import { paths } from 'src/routes/paths';

import { RefreshToken } from 'src/actions/auth';

let accessTokenTimer: ReturnType<typeof setTimeout>;
let refreshTokenTimer: ReturnType<typeof setTimeout>;

export interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded || null;
  } catch (error) {
    return null;
  }
}

/**
 * Converts a UTC date string to local timezone ISO format
 * Example: 2025-11-19T18:48:39.322Z -> 2025-11-19T20:48:39.322Z (for UTC+2 timezone)
 * Note: This adjusts the time representation to local timezone while keeping the format
 */
function convertUtcToLocalTimezone(utcDateString: string | null): string | null {
  if (!utcDateString) return null;

  try {
    // Parse the UTC date string
    const date = new Date(utcDateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', utcDateString);
      return utcDateString;
    }

    // Get local timezone offset in minutes (negative for ahead of UTC, positive for behind)
    // For UTC+2, getTimezoneOffset() returns -120
    // We need to add the offset to convert UTC to local time
    const offsetMinutes = -date.getTimezoneOffset(); // Negate to get correct direction
    const offsetMs = offsetMinutes * 60 * 1000;

    // Create new date adjusted to local timezone
    const localDate = new Date(date.getTime() + offsetMs);

    // Format as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ format) using UTC methods
    // since we've already adjusted the timestamp
    const year = localDate.getUTCFullYear();
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(localDate.getUTCMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  } catch (error) {
    console.warn('Error converting UTC date to local timezone:', error);
    return utcDateString;
  }
}

function logout() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('accessTokenExpireAt');
  Cookies.remove('refreshTokenExpireAt');
  Cookies.remove('user');
  delete axios.defaults.headers.common.Authorization;
  window.location.href = paths.auth.jwt.login;
}

// Refresh accessToken before it expires
async function refreshAccessToken() {
  try {
    const res = await RefreshToken();
    const token = res.accessToken || res.token;
    const { refreshToken, accessTokenExpireAt, refreshTokenExpireAt } = res;

    if (!token || !refreshToken || !accessTokenExpireAt || !refreshTokenExpireAt) {
      throw new Error('Invalid refresh token response');
    }

    setSession({
      accessToken: token,
      refreshToken,
      accessTokenExpireAt,
      refreshTokenExpireAt,
    });
  } catch (error) {
    setTimeout(() => {
      refreshAccessToken();
    }, 2000);
  }
}

export const setSession = ({
  accessToken,
  refreshToken,
  accessTokenExpireAt,
  refreshTokenExpireAt,
}: {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpireAt: string | null;
  refreshTokenExpireAt: string | null;
}) => {
  clearTimeout(accessTokenTimer);
  clearTimeout(refreshTokenTimer);
  if (accessToken && refreshToken && accessTokenExpireAt && refreshTokenExpireAt) {
    // Convert UTC dates to local timezone before storing
    const convertedAccessTokenExpireAt = convertUtcToLocalTimezone(accessTokenExpireAt);
    const convertedRefreshTokenExpireAt = convertUtcToLocalTimezone(refreshTokenExpireAt);

    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    Cookies.set('accessTokenExpireAt', convertedAccessTokenExpireAt || accessTokenExpireAt);
    Cookies.set('refreshTokenExpireAt', convertedRefreshTokenExpireAt || refreshTokenExpireAt);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const now = Date.now();
    // Use converted dates for timer calculations
    const accessExpTime = new Date(convertedAccessTokenExpireAt || accessTokenExpireAt).getTime();
    const refreshExpTime = new Date(
      convertedRefreshTokenExpireAt || refreshTokenExpireAt
    ).getTime();

    const refreshIn = accessExpTime - now - 20000;
    if (refreshIn > 0) {
      accessTokenTimer = setTimeout(() => {
        refreshAccessToken();
      }, refreshIn);
    }

    const logoutIn = refreshExpTime - now - 20000;
    if (logoutIn > 0) {
      refreshTokenTimer = setTimeout(() => {
        if (Cookies.get('refreshToken') === refreshToken) {
          logout();
        }
      }, logoutIn);
    }
  } else {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('accessTokenExpireAt');
    Cookies.remove('refreshTokenExpireAt');
    Cookies.remove('user');
    delete axios.defaults.headers.common.Authorization;
    clearTimeout(accessTokenTimer);
    clearTimeout(refreshTokenTimer);
  }
};

export const isValidToken = (token: string, expireAt?: string | null) => {
  // First try to use the provided expireAt date
  if (expireAt) {
    const expMs = new Date(expireAt).getTime();
    const nowMs = Date.now();
    return expMs > nowMs;
  }

  // Fallback to decoding the JWT token for exp claim
  const decoded = decodeToken(token);
  if (!decoded?.exp) return false;

  const expMs = decoded.exp * 1000;
  const nowMs = Date.now();

  return expMs > nowMs;
};
