import { SharedApiClient } from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';
import Cookie from 'js-cookie';

export interface LoginPayload {
  email: string;
  password: string;
  companyId?: string | number;
  company?: string | number;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: string;
  refreshTokenExpireAt: string;
  name?: string;
  id?: string | number;
  email?: string;
  phoneNumber?: string;
  role?: string;
  completeTeacherProfile?: boolean;
  [key: string]: any;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const lang = Cookie.get('Language') || 'ar';
  const response = await SharedApiClient.post<LoginResponse>(
    endpoints.auth.login,
    {
      email: payload.email,
      password: payload.password,
      companyId: payload.companyId || payload.company,
      rememberMe: payload.rememberMe,
    },
    {
      headers: {
        'Accept-Language': lang,
      },
    }
  );

  return response.data;
};

