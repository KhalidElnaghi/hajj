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

export interface CreatePilgrimData {
  nameAr?: string;
  nameEn?: string;
  bookingNumber?: string;
  idNumber?: string;
  city?: string;
  packageName?: string;
  nationality?: string;
  gender?: string;
  arrivalDate?: string;
  departureDate?: string;
  permit?: string;
  gregorianBirthDate?: string;
  hijriBirthDate?: string;
  age?: number;
  mobileNumber?: string;
  anotherMobileNumber?: string;
  photo?: File | string | null;
  gatheringPointType?: string;
  gatheringPoint?: string;
  prominent?: string;
  accommodationArea?: string;
  tentRoomNumber?: string;
  campStatus?: string;
  busNumber?: string;
  seatNumber?: string;
  generalHealthStatus?: string;
  healthDetails?: string;
  supervisors?: string[];
  supervisorNotes?: string;
}

export interface CreatePilgrimResponse {
  data: Pilgrim;
  message?: string;
}

// Gender mapping: string to integer (1=male, 0=female)
const genderMap: Record<string, number> = {
  male: 1,
  female: 0,
};

// Nationality mapping: string to integer ID
// IMPORTANT: Update this mapping with actual nationality IDs from your API
// The form uses string values (like "saudi", "egypt"), but backend expects integer IDs
// If the form values don't match these keys, the mapping will fail
const nationalityMap: Record<string, number> = {
  saudi: 1,    // Update with actual ID from your API
  egypt: 2,    // Update with actual ID from your API
  jordan: 3,   // Update with actual ID from your API
  // Add more mappings as needed based on your form's nationality options
};

// Helper function to check if a value is valid (not null, undefined, or empty string)
const isValidValue = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

// Helper to safely convert value to string (never null)
const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  return String(value);
};

// Helper to convert to integer (defaults to 0 if null/undefined)
const safeInteger = (value: any): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return Math.floor(value);
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? 0 : parsed;
};

export const createPilgrim = async (data: CreatePilgrimData): Promise<CreatePilgrimResponse> => {
  const formData = new FormData();
  
  // Transform name fields to API format: name as JSON string
  // The API expects: name = { "ar": "...", "en": "..." } as a JSON string
  const nameObj = {
    ar: safeString(data.nameAr),
    en: safeString(data.nameEn),
  };
  formData.append('name', JSON.stringify(nameObj));
  
  // Map idNumber to national_id (integer)
  formData.append('national_id', safeInteger(data.idNumber).toString());
  
  // Map nationality string to nationality_id integer
  // Backend expects nationality_id as an INTEGER
  // FormData sends everything as strings, so we send the integer as a string (e.g., "1" not 1)
  // The backend will parse the string as an integer
  if (isValidValue(data.nationality)) {
    // First, try to get the ID from the mapping
    const nationalityId = nationalityMap[data.nationality as string];
    if (nationalityId && nationalityId > 0 && Number.isInteger(nationalityId)) {
      // Send as string (FormData requirement), but it represents a valid integer ID
      // Backend will parse this string as an integer
      formData.append('nationality_id', String(nationalityId));
    } else {
      // If mapping not found, try to parse the value as an integer ID directly
      // This handles cases where the form might already be using integer IDs
      const parsedId = parseInt(String(data.nationality), 10);
      if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
        // Value is already a valid integer ID
        formData.append('nationality_id', String(parsedId));
      } else {
        // Invalid nationality - the mapping doesn't exist or value is not a valid integer
        console.error('Invalid nationality_id:', {
          value: data.nationality,
          mappedId: nationalityId,
          parsedId: parsedId,
          availableMappings: Object.keys(nationalityMap),
        });
        // Send 0 which will fail backend validation, but prevents null errors
        formData.append('nationality_id', '0');
      }
    }
  } else {
    // Nationality is required, but not provided
    console.error('Nationality is required but not provided');
    formData.append('nationality_id', '0'); // Will fail validation
  }
  
  // Map gender string to integer (1=male, 0=female)
  if (isValidValue(data.gender)) {
    const genderId = genderMap[String(data.gender).toLowerCase()];
    if (genderId !== undefined) {
      formData.append('gender', genderId.toString());
    } else {
      // Default to 0 if invalid
      formData.append('gender', '0');
    }
  } else {
    formData.append('gender', '0');
  }
  
  // Mobile numbers as integers
  // mobile is REQUIRED
  formData.append('mobile', safeInteger(data.mobileNumber).toString());
  
  // mobile2 is OPTIONAL - only send if provided and valid (Saudi phone number)
  if (isValidValue(data.anotherMobileNumber)) {
    const mobile2 = safeInteger(data.anotherMobileNumber);
    if (mobile2 > 0) {
      formData.append('mobile2', mobile2.toString());
    }
  }
  
  // Birth dates as strings - REQUIRED
  formData.append('birthdate', safeString(data.gregorianBirthDate));
  formData.append('birthdate_hijri', safeString(data.hijriBirthDate));
  
  // Age as integer - REQUIRED
  formData.append('age', safeInteger(data.age).toString());
  
  // Handle photo - ensure we're sending the actual File object
  // Photo is required, so we must send it if provided
  if (data.photo) {
    if (data.photo instanceof File) {
      // Verify it's actually an image file
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.includes(data.photo.type)) {
        formData.append('photo', data.photo, data.photo.name);
      } else {
        console.warn('Invalid photo file type:', data.photo.type);
        // Still append it - backend will validate
        formData.append('photo', data.photo, data.photo.name);
      }
    } else if (typeof data.photo === 'object' && 'preview' in data.photo) {
      // If it's an object with preview, check if it's still a File
      const fileWithPreview = data.photo as File & { preview?: string };
      if (fileWithPreview instanceof File) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.includes(fileWithPreview.type)) {
          formData.append('photo', fileWithPreview, fileWithPreview.name);
        } else {
          console.warn('Invalid photo file type:', fileWithPreview.type);
          formData.append('photo', fileWithPreview, fileWithPreview.name);
        }
      }
    }
  }
  // Note: If photo is required by backend, the form validation should ensure it's provided
  
  // Handle supervisors array as JSON string: [2,3]
  if (data.supervisors && Array.isArray(data.supervisors) && data.supervisors.length > 0) {
    // Convert supervisor strings to integers if possible
    const supervisorIds = data.supervisors
      .map((item) => {
        const id = safeInteger(item);
        return id > 0 ? id : null;
      })
      .filter((id): id is number => id !== null);
    
    if (supervisorIds.length > 0) {
      formData.append('supervisor_ids', JSON.stringify(supervisorIds));
    }
  }
  
  // Map packageName to package_id (integer)
  // Only send if valid (don't send 0 as it's invalid)
  if (isValidValue(data.packageName)) {
    const packageId = safeInteger(data.packageName);
    if (packageId > 0) {
      formData.append('package_id', packageId.toString());
    }
    // Don't send if 0 or invalid
  }
  
  // Map city to city_id (integer)
  // Only send if valid (don't send 0 as it's invalid)
  if (isValidValue(data.city)) {
    const cityId = safeInteger(data.city);
    if (cityId > 0) {
      formData.append('city_id', cityId.toString());
    }
    // Don't send if 0 or invalid
  }
  
  // String fields - always send as empty string if null/undefined
  const stringFields: Record<string, any> = {
    booking_date: data.arrivalDate ? safeString(data.arrivalDate) : '',
    departure_date: data.departureDate ? safeString(data.departureDate) : '',
    permit: safeString(data.permit),
    notes: safeString(data.supervisorNotes),
    health_details: safeString(data.healthDetails),
    tent_room_number: safeString(data.tentRoomNumber),
    bus_number: safeString(data.busNumber),
    seat_number: safeString(data.seatNumber),
    gathering_point_type: safeString(data.gatheringPointType),
    gathering_point: safeString(data.gatheringPoint),
    prominent: safeString(data.prominent),
    accommodation_area: safeString(data.accommodationArea),
    camp_status: safeString(data.campStatus),
    general_health_status: safeString(data.generalHealthStatus),
  };
  
  // Append all string fields
  Object.entries(stringFields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Optional integer fields (gray asterisk in API - not required)
  formData.append('pilgrim_type_id', '2');
  formData.append('reservation_id', '1');
  formData.append('status', '1'); // 1=active, 2=inactive, 3=cancelled
  formData.append('source', '3'); // 1=website, 2=excel, 3=api
  formData.append('whatsapp_active', '0');
  formData.append('departure_status', '0'); // 0=early, 1=late
  formData.append('muhrim_status', '0'); // 0=without, 1=with
  // transport_id is OPTIONAL - don't send if it's 0 (invalid)
  // Only send if we have a valid transport ID
  // formData.append('transport_id', '0'); // Removed - optional field
  
  // Don't set Content-Type header - let browser set it with boundary for FormData
  return API.post<CreatePilgrimResponse>('/pilgrims/pilgrims', formData);
};

