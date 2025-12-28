import Cookie from 'js-cookie';
import { apiClient, SharedApiClient } from 'src/utils/axios';
import { ACCESS_TOKEN } from 'src/auth/constants';

// Static token for now (will be changed later)
const STATIC_TOKEN = '18|8klbf3Fgr1zsoXIbzeoSf68yzSVayuZ0j0qnyUzF294260f8';

// Main API client wrapper
export const API = {
  get: async <T = any>(url: string, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await apiClient.get(url, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  post: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    
    // If data is FormData, don't set Content-Type header - let browser/axios set it with boundary
    const isFormData = data instanceof FormData;
    const headers: any = {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Accept-Language': Cookie.get('Language') || 'ar',
      ...config?.headers,
    };
    
    // Remove Content-Type for FormData to let browser set it automatically
    if (isFormData) {
      delete headers['Content-Type'];
    }
    
    const response = await apiClient.post(url, data, {
      ...config,
      headers,
    });
    return response.data;
  },

  put: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await apiClient.put(url, data, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  patch: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await apiClient.patch(url, data, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  delete: async <T = any>(url: string, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await apiClient.delete(url, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },
};

// Shared API client wrapper (for HOST_API_SHARED)
export const SharedAPI = {
  get: async <T = any>(url: string, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await SharedApiClient.get(url, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  post: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await SharedApiClient.post(url, data, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  put: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await SharedApiClient.put(url, data, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  patch: async <T = any>(url: string, data?: any, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await SharedApiClient.patch(url, data, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },

  delete: async <T = any>(url: string, config?: any): Promise<T> => {
    const token = STATIC_TOKEN || Cookie.get(ACCESS_TOKEN);
    const response = await SharedApiClient.delete(url, {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Accept-Language': Cookie.get('Language') || 'ar',
        ...config?.headers,
      },
    });
    return response.data;
  },
};

export default API;

