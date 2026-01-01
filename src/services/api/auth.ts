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

export interface Company {
  id: number;
  company_no: number;
  name: {
    ar: string;
    en: string;
  };
  status: string;
  database_name: string;
  legal_name: string;
  registration_no?: string | null;
  tax_number?: string | null;
  cr_expiry_date?: string | null;
  license_number?: string | null;
  address?: string | null;
  country_id?: number | null;
  city_id?: number | null;
  postal_code?: string | null;
  phone?: string | null;
  hotline?: string | null;
  email?: string | null;
  website?: string | null;
  language: string;
  logo?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  type: string;
  username: string;
  email_verified_at?: string | null;
  current_company_id: number;
  created_by?: number | null;
  phone?: string | null;
  status: number;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    requires_company_selection: boolean;
    companies: Company[];
    user: LoginUser;
    token: string;
  };
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

export interface SelectCompanyResponse {
  success: boolean;
  message: string;
  data: {
    user: LoginUser;
    token: string;
  };
}

export const selectCompany = async (companyId: number | string): Promise<SelectCompanyResponse> => {
  const lang = Cookie.get('Language') || 'ar';
  const token = Cookie.get('accessToken');
  
  const response = await SharedApiClient.post<SelectCompanyResponse>(
    endpoints.auth.selectCompany,
    {
      company_id: companyId,
    },
    {
      headers: {
        'Accept-Language': lang,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  return response.data;
};

