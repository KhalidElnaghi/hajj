/* eslint-disable prefer-destructuring */
import Cookie from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HOST_API, HOST_API_SHARED } from 'src/config-global';

import { ACCESS_TOKEN } from '../auth/constants';

export interface Params {
  page: number;
  limit: number;
  status?: string;
  filters?: string;
  created_at?: string;
  headers?: { access_token: string };
}
const apiClient: AxiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': Cookie.get('Language') ? Cookie.get('Language') : 'ar',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

const SharedApiClient: AxiosInstance = axios.create({
  baseURL: HOST_API_SHARED,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': Cookie.get('Language') ? Cookie.get('Language') : 'ar',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
axios.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = Cookie.get('Language') || 'ar';
    return config;
  },
  (error) => Promise.reject(error)
);

// Request interceptor to handle FormData properly
apiClient.interceptors.request.use(
  (config) => {
    // If data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth cookies
      Cookie.remove(ACCESS_TOKEN);
      Cookie.remove('user');
      Cookie.remove('companies');
      
      // Clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
      }
      
      // Clear axios default header
      delete axios.defaults.headers.common.Authorization;
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const searchParams = new URLSearchParams({
          returnTo: currentPath,
        }).toString();
        window.location.href = `/login?${searchParams}`;
      }
    }
    
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

SharedApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth cookies
      Cookie.remove(ACCESS_TOKEN);
      Cookie.remove('user');
      Cookie.remove('companies');
      
      // Clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
      }
      
      // Clear axios default header
      delete axios.defaults.headers.common.Authorization;
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const searchParams = new URLSearchParams({
          returnTo: currentPath,
        }).toString();
        window.location.href = `/login?${searchParams}`;
      }
    }
    
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default apiClient;
export { apiClient, SharedApiClient };

export const baseUrl = HOST_API;
export const sharedBaseUrl = HOST_API_SHARED;

export const fetcher = async ({ url, config }: { url: string; config?: AxiosRequestConfig }) => {
  const response = await apiClient.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
      'Accept-Language': Cookie.get('Language') || 'ar',
    },
  });

  return response.data;
};

export const fetcherAuth = async ({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}) => {
  const response = await SharedApiClient.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
      'Accept-Language': Cookie.get('Language') || 'ar',
    },
  });

  return response.data;
};
export const getErrorMessage = (error: any): string => {
  const toReadable = (value: unknown): string | null => {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    const normalized = raw.replace(/[_-]+/g, ' ');
    const lower = normalized.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // Prefer explicit validation error message when present
  const validationMsg = error?.validationErrors?.[0]?.message;
  const candidates: Array<string | null> = [
    toReadable(validationMsg),
    toReadable(error?.error?.message),
    toReadable(error?.message),
    toReadable(error?.error?.code),
    toReadable(error?.code),
    toReadable(error?.error && typeof error.error === 'string' ? error.error : null),
    toReadable(error && typeof error === 'string' ? error : null),
  ];

  const first = candidates.find((m) => m && m.length > 0);
  return first || 'Something went wrong';
};
