import API from '../shared/functions/axios';

// ----------------------------------------------------------------------

export interface GetPackagesParams {
  page?: number;
  per_page?: number;
  search?: string;
}

// ----------------------------------------------------------------------

export interface PackageItem {
  id: number;
  local_name?: string;
  name: {
    ar: string;
    en: string;
  };
  status: boolean;
  package_number?: number;
}

// ----------------------------------------------------------------------

export interface MetaPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
  has_pages: boolean;
  is_first_page: boolean;
  is_last_page: boolean;
  path: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

// ----------------------------------------------------------------------

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: PackageItem[];
  meta: MetaPagination;
}

// ----------------------------------------------------------------------

export const getPackages = async (params: GetPackagesParams = {}): Promise<PackagesResponse> => {
  const { page, per_page, search, ...restParams } = params;

  const queryParams = new URLSearchParams();
  if (per_page) queryParams.append('per_page', per_page.toString());
  if (page) queryParams.append('page', page.toString());
  if (search) queryParams.append('query', search);

  Object.entries(restParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const url = `/dashboard/settings/packages${queryString ? `?${queryString}` : ''}`;

  const response = await API.get<PackagesResponse>(url);

  return response;
};

export interface CreatePackagePayload {
  name: {
    ar: string;
    en: string;
  };
  status: boolean;
}

export interface CreatePackageResponse {
  success: boolean;
  message: string;
  data: PackageItem;
}

export const createPackage = async (
  payload: CreatePackagePayload
): Promise<CreatePackageResponse> => {
  const response = await API.post<CreatePackageResponse>('/dashboard/settings/packages', payload);
  return response;
};
