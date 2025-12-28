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
  saudi: 1, // Update with actual ID from your API
  egypt: 2, // Update with actual ID from your API
  jordan: 3, // Update with actual ID from your API
  // Add more mappings as needed based on your form's nationality options
};

// Package mapping: string to integer ID
// IMPORTANT: Update this mapping with actual package IDs from your API
const packageMap: Record<string, number> = {
  package1: 1, // Update with actual ID from your API
  package2: 2, // Update with actual ID from your API
  // Add more mappings as needed
};

// City mapping: string to integer ID
// IMPORTANT: Update this mapping with actual city IDs from your API
const cityMap: Record<string, number> = {
  makkah: 100, // Update with actual ID from your API (example: 100)
  madinah: 101, // Update with actual ID from your API
  riyadh: 102, // Update with actual ID from your API
  // Add more mappings as needed
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
  // Prepare JSON body data (all data except photo)
  const bodyData: any = {};

  // Transform name fields to API format: name as JSON string
  // The API expects: name = { "ar": "...", "en": "..." } as a JSON string
  const nameObj = {
    ar: safeString(data.nameAr),
    en: safeString(data.nameEn),
  };
  bodyData.name = JSON.stringify(nameObj);

  // Map idNumber to national_id (integer)
  bodyData.national_id = safeInteger(data.idNumber);

  // Map nationality string to nationality_id integer
  // Backend expects nationality_id as an INTEGER
  // FormData sends everything as strings, so we send the integer as a string (e.g., "1" not 1)
  // The backend will parse the string as an integer
  // IMPORTANT: nationality_id must be a valid integer (not 0, not null, not undefined)
  let nationalityIdValue: number = 0;

  if (isValidValue(data.nationality)) {
    // First, try to get the ID from the mapping
    const mappedId = nationalityMap[data.nationality as string];
    if (mappedId && mappedId > 0 && Number.isInteger(mappedId)) {
      nationalityIdValue = mappedId;
    } else {
      // If mapping not found, try to parse the value as an integer ID directly
      // This handles cases where the form might already be using integer IDs
      const parsedId = parseInt(String(data.nationality), 10);
      if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
        nationalityIdValue = parsedId;
      } else {
        // Invalid nationality - log error but still need to send something
        console.error('Invalid nationality_id:', {
          value: data.nationality,
          mappedId: mappedId,
          parsedId: parsedId,
          availableMappings: Object.keys(nationalityMap),
        });
        // Since it's required, send 0 (will fail backend validation)
        nationalityIdValue = 0;
      }
    }
  } else {
    // Nationality is required, but not provided
    console.error('Nationality is required but not provided');
    nationalityIdValue = 0; // Will fail validation
  }

  // Always send nationality_id as an integer (not string)
  bodyData.nationality_id = Math.floor(nationalityIdValue);
  
  // Log for debugging
  if (nationalityIdValue === 0) {
    console.error('WARNING: nationality_id is 0 - this will fail backend validation', {
      inputValue: data.nationality,
      nationalityMap: nationalityMap,
    });
  } else {
    console.log('nationality_id:', nationalityIdValue, 'from input:', data.nationality);
  }

  // Map gender string to integer (1=male, 0=female)
  if (isValidValue(data.gender)) {
    const genderId = genderMap[String(data.gender).toLowerCase()];
    if (genderId !== undefined) {
      bodyData.gender = genderId;
    } else {
      // Default to 0 if invalid
      bodyData.gender = 0;
    }
  } else {
    bodyData.gender = 0;
  }

  // Mobile numbers as integers
  // mobile is REQUIRED
  bodyData.mobile = safeInteger(data.mobileNumber);

  // mobile2 is OPTIONAL - only send if provided and valid (Saudi phone number)
  if (isValidValue(data.anotherMobileNumber)) {
    const mobile2 = safeInteger(data.anotherMobileNumber);
    if (mobile2 > 0) {
      bodyData.mobile2 = mobile2;
    }
  }

  // Birth dates as strings - REQUIRED
  bodyData.birthdate = safeString(data.gregorianBirthDate);
  bodyData.birthdate_hijri = safeString(data.hijriBirthDate);

  // Age as integer - REQUIRED
  bodyData.age = safeInteger(data.age);

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
      bodyData.supervisor_ids = JSON.stringify(supervisorIds);
    }
  }

  // Map packageName to package_id (integer) - REQUIRED
  let packageIdValue: number = 0;
  
  if (isValidValue(data.packageName)) {
    // First, try to get the ID from the mapping
    const mappedId = packageMap[data.packageName as string];
    if (mappedId && mappedId > 0 && Number.isInteger(mappedId)) {
      packageIdValue = mappedId;
    } else {
      // If mapping not found, try to parse the value as an integer ID directly
      const parsedId = parseInt(String(data.packageName), 10);
      if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
        packageIdValue = parsedId;
      } else {
        console.error('Invalid package_id:', {
          value: data.packageName,
          mappedId: mappedId,
          parsedId: parsedId,
          availableMappings: Object.keys(packageMap),
        });
        packageIdValue = 0;
      }
    }
  } else {
    console.error('Package is required but not provided');
    packageIdValue = 0;
  }
  
  bodyData.package_id = Math.floor(packageIdValue);
  
  if (packageIdValue === 0) {
    console.error('WARNING: package_id is 0 - this will fail backend validation', {
      inputValue: data.packageName,
      packageMap: packageMap,
    });
  } else {
    console.log('package_id:', packageIdValue, 'from input:', data.packageName);
  }

  // Map city to city_id (integer) - REQUIRED
  let cityIdValue: number = 0;
  
  if (isValidValue(data.city)) {
    // First, try to get the ID from the mapping
    const mappedId = cityMap[data.city as string];
    if (mappedId && mappedId > 0 && Number.isInteger(mappedId)) {
      cityIdValue = mappedId;
    } else {
      // If mapping not found, try to parse the value as an integer ID directly
      const parsedId = parseInt(String(data.city), 10);
      if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
        cityIdValue = parsedId;
      } else {
        console.error('Invalid city_id:', {
          value: data.city,
          mappedId: mappedId,
          parsedId: parsedId,
          availableMappings: Object.keys(cityMap),
        });
        cityIdValue = 0;
      }
    }
  } else {
    console.error('City is required but not provided');
    cityIdValue = 0;
  }
  
  bodyData.city_id = Math.floor(cityIdValue);
  
  if (cityIdValue === 0) {
    console.error('WARNING: city_id is 0 - this will fail backend validation', {
      inputValue: data.city,
      cityMap: cityMap,
    });
  } else {
    console.log('city_id:', cityIdValue, 'from input:', data.city);
  }

  // String fields - always send as empty string if null/undefined
  bodyData.booking_date = data.arrivalDate ? safeString(data.arrivalDate) : '';
  bodyData.departure_date = data.departureDate ? safeString(data.departureDate) : '';
  bodyData.permit = safeString(data.permit);
  bodyData.notes = safeString(data.supervisorNotes);
  bodyData.health_details = safeString(data.healthDetails);
  bodyData.tent_room_number = safeString(data.tentRoomNumber);
  bodyData.bus_number = safeString(data.busNumber);
  bodyData.seat_number = safeString(data.seatNumber);
  bodyData.gathering_point_type = safeString(data.gatheringPointType);
  bodyData.gathering_point = safeString(data.gatheringPoint);
  bodyData.prominent = safeString(data.prominent);
  bodyData.accommodation_area = safeString(data.accommodationArea);
  bodyData.camp_status = safeString(data.campStatus);
  bodyData.general_health_status = safeString(data.generalHealthStatus);

  // Optional integer fields (gray asterisk in API - not required)
  bodyData.pilgrim_type_id = 2;
  bodyData.reservation_id = 1;
  bodyData.status = 1; // 1=active, 2=inactive, 3=cancelled
  bodyData.source = 3; // 1=website, 2=excel, 3=api
  bodyData.whatsapp_active = 0;
  bodyData.departure_status = 0; // 0=early, 1=late
  bodyData.muhrim_status = 0; // 0=without, 1=with

  // transport_id is OPTIONAL - only send if valid
  // Note: transport_id field is not in the form data, so we don't send it
  // If needed, it should be added to CreatePilgrimData interface

  // Handle photo - send in FormData if provided
  const formData = new FormData();
  let photoAdded = false;
  
  if (data.photo) {
    let photoFile: File | null = null;
    
    if (data.photo instanceof File) {
      photoFile = data.photo;
    } else if (typeof data.photo === 'object' && 'preview' in data.photo) {
      // If it's an object with preview, check if it's still a File
      const fileWithPreview = data.photo as File & { preview?: string };
      if (fileWithPreview instanceof File) {
        photoFile = fileWithPreview;
      }
    }
    
    if (photoFile) {
      // Verify it's actually an image file
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.includes(photoFile.type)) {
        formData.append('photo', photoFile, photoFile.name);
        photoAdded = true;
        console.log('Photo added to FormData:', {
          name: photoFile.name,
          type: photoFile.type,
          size: photoFile.size,
        });
      } else {
        console.warn('Invalid photo file type:', photoFile.type);
        // Still append it - backend will validate
        formData.append('photo', photoFile, photoFile.name);
        photoAdded = true;
      }
    } else {
      console.error('Photo is not a valid File object:', data.photo);
    }
  } else {
    console.warn('Photo is required but not provided');
  }
  
  if (!photoAdded) {
    console.error('Photo was not added to FormData - this will cause backend validation error');
  }

  // Append all body data to FormData as JSON string, or send separately
  // Option 1: Send everything in FormData (including JSON body as a field)
  // Option 2: Send photo in FormData and data in JSON body (requires multipart/form-data)
  
  // We'll use Option 1: Send all data in FormData, but with proper types
  // Convert all body data to FormData format
  Object.entries(bodyData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (typeof value === 'number') {
        formData.append(key, value.toString());
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else {
        formData.append(key, String(value));
      }
    }
  });

  // Log FormData contents for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, 'File', { name: value.name, type: value.type, size: value.size });
      } else {
        console.log(`${key}:`, value);
      }
    }
  }

  // Don't set Content-Type header - let browser set it with boundary for FormData
  return API.post<CreatePilgrimResponse>('/pilgrims/pilgrims', formData);
};
