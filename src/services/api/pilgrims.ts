import API from '../shared/functions/axios';

export interface GetPilgrimsParams {
  page?: number;
  limit?: number;
  search?: string;
  searchParam?: string;
  status?: string;
  filters?: string;
  created_at?: string;
  registrationStatus?: string;
  gender?: string;
  city?: string;
  healthStatus?: string;
  nationality?: string;
}

export interface Pilgrim {
  id: number;
  name: string;
  idNumber: string;
  bookingNumber: string;
  registrationStatus: string;
  gender: string;
  city: string;
  healthStatus: string;
  accommodation: string;
  hajjOperations: string;
  busStatus: string;
  funding: string;
  sponsor: string;
  phone: string;
  gatheringPointType: string;
  nationality: string;
  package: string;
  bus: string;
}

export interface PilgrimsResponse {
  data: Pilgrim[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

export const getPilgrims = async (params: GetPilgrimsParams = {}): Promise<PilgrimsResponse> => {
  const { page, limit, searchParam, search, ...restParams } = params;
  
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append('limit', limit.toString());
  if (page) queryParams.append('page', page.toString());
  if (searchParam) queryParams.append('search', searchParam);
  if (search) queryParams.append('search', search);
  
  // Add other params
  Object.entries(restParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const url = `/pilgrims/pilgrims${queryString ? `?${queryString}` : ''}`;
  
  return API.get<PilgrimsResponse>(url);
};

export const getPilgrimDetails = async (id: string | number): Promise<Pilgrim> => {
  return API.get<Pilgrim>(`/pilgrims/${id}`);
};

