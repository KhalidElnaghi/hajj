'use server';

import { cookies } from 'next/headers';
import { getTranslations, getLocale } from 'next-intl/server';
import { defaultLocale } from 'src/i18n/config-locale';
import { HOST_API, COOKIES_KEYS } from 'src/config-global';
import { ApiResponse, RequestOptions, ApiErrorResponse } from 'src/types/crud-types';

// Base URL for the API
const API_BASE_URL = HOST_API;

function isFormData(value: unknown) {
  return value instanceof FormData;
}
const commonErrorMessages = new Map([
  ['404', 'not_found'],
  ['500', 'internal_server_error'],
  ['503', 'service_not_available'],
]);
const commonErrorStatus = new Set([500, 503, 404]);
// generic function to make API requests
async function apiRequest<TResponse, TBody = undefined>(
  endpoint: string,
  method: string,
  body?: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> {
  const t = await getTranslations('Global.Server');
  const url = `${API_BASE_URL}${endpoint}`;
  const cookie = await cookies();

  const token = cookie.get(COOKIES_KEYS.session)?.value;
  const locale = await getLocale();
  const lang = locale || defaultLocale;

  const headers = {
    ...(!isFormData(body) && {
      'Content-Type': 'application/json',
    }),
    ...(!options.skipAuth &&
      token && {
        Authorization: `Bearer ${token}`,
      }),
    'Accept-Language': lang,
    ...options.headers,
  };

  let reqBody;
  if (body) {
    reqBody = isFormData(body) ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: reqBody,
      cache: options.cache,
      next: { tags: options.tags },
    });

    // UN-AUTHORIZED (skip for guest mode)
    if (response.status === 401 && !options.skipAuth) {
      return errorObject(t('unauthorized'), response.status);
    }

    // IF THE RETURN VALUR IS NOTHING BUT A SUCCESS REQUEST (ex: edit/delete requests);
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {
        success: true,
        data: {} as TResponse, // return an empty object or a default value
        meta: undefined,
        message: 'Success',
        status: response.status,
      };
    }

    // Try to parse JSON response, handle non-JSON error responses gracefully
    let responseData: any;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      // If response is not valid JSON (e.g., HTML error page), use generic error message
      if (!response.ok) {
        const errorKey = commonErrorStatus.has(response.status)
          ? commonErrorMessages.get(response.status.toString())
          : null;
        const errMsg = errorKey ? t(errorKey) : t('unexpected_error');
        return errorObject(errMsg, response.status);
      }
      // If successful response but invalid JSON, return unexpected error
      return errorObject(t('unexpected_error'), response.status);
    }

    // Response check after parsing so i can get the error message
    if (!response.ok) {
      // Handle nested error structure: { error: { message, code, details } }
      // or flat structure: { message, code, details }
      const nestedError = responseData?.error;
      const apiErrorMessage = nestedError?.message
        ? Array.isArray(nestedError.message)
          ? nestedError.message.join(' | ')
          : nestedError.message
        : Array.isArray(responseData?.message)
          ? responseData?.message.join(' | ')
          : responseData?.message;

      // Fall back to generic message only if API didn't provide one
      let errMsg: string;
      if (apiErrorMessage) {
        errMsg = apiErrorMessage;
      } else if (commonErrorStatus.has(response.status)) {
        const errorKey = commonErrorMessages.get(response.status.toString());
        errMsg = errorKey ? t(errorKey) : t('unexpected_error');
      } else {
        errMsg = t('unexpected_error');
      }

      const resCode = nestedError?.code || responseData?.code || null;
      const resDetails = nestedError?.details || responseData?.details || null;
      const resData = responseData?.data || {};
      const resVErrors = responseData?.validationErrors || null;
      return errorObject(errMsg, response.status, resCode, resDetails, resData, resVErrors);
    }

    return {
      success: true,
      data: responseData,
      meta: responseData.meta,
      message: responseData.message || 'Success',
      status: response.status,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : t('unexpected_error');
    return errorObject(errMsg, 500);
  }
}

// CRUD functions
export async function getData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'GET', undefined, options);
}

export async function postData<TResponse, TBody>(
  endpoint: string,
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, 'POST', data, options);
}

export async function editData<TResponse, TBody>(
  endpoint: string,
  method: 'PUT' | 'PATCH',
  data: TBody,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>(endpoint, method, data, options);
}

export async function deleteData<TResponse>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>(endpoint, 'DELETE', undefined, options);
}

const errorObject = (
  error: string = '',
  status: string | number = '',
  code: unknown = null,
  details: unknown = null,
  data: unknown = {},
  validationErrors: unknown = null
): ApiErrorResponse => ({
  success: false,
  error,
  status,
  code,
  details,
  data,
  validationErrors,
});
