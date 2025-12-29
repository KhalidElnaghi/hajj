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
  // Filter parameters
  package_id?: string;
  city_id?: string;
  nationality_id?: string;
  transport_id?: string;
  pilgrim_type_id?: string;
  source?: string;
  departure_status?: string;
  muhrim_status?: string;
}

// Pilgrim interface matching the actual API response
export interface Pilgrim {
  id: number;
  haj_no: number;
  name: {
    ar: string;
    en: string;
  };
  reservation_no: string;
  national_id: string;
  mobile: string;
  mobile2: string | null;
  gender: number;
  gender_name: string;
  birthdate: string;
  birthdate_hijri: string | null;
  age: number | null;
  pilgrim_photo: string | null;
  whatsapp_active: boolean;
  status: number;
  status_name: string;
  source: number;
  source_name: string;
  departure_status: number;
  departure_status_name: string;
  muhrim_status: number;
  muhrim_status_name: string;
  notes: string | null;
  pilgrim_style: string;
  booking_via: string;
  booking_date: string;
  payment_mechanism: string;
  payment_status: string;
  package: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    status: boolean;
  };
  city: {
    id: number;
    city_id: number;
    city: {
      id: number;
      country_id: number;
      name: {
        ar: string;
        en: string;
      };
      latitude: string;
      longitude: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  nationality: {
    id: number;
    country_id: number;
    country: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
      code: string;
      phone_code: string;
      currency: {
        code: string;
        name: string;
        symbol: string;
      };
      flag: {
        alt: string;
        png: string;
        svg: string;
      };
      coat_of_arms: {
        png: string;
        svg: string;
      };
      latitude: string;
      longitude: string;
      official: {
        ar: string;
        en: string;
      };
      google_map: string;
      open_street_map: string;
      region: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  transport: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    status: boolean;
    created_at: string;
    updated_at: string;
  };
  pilgrim_type: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    status: boolean;
    created_at: string;
    updated_at: string;
  };
  reservation: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    status: boolean;
  };
  supervisors: any[];
  tags: any[];
  created_at: string;
  updated_at: string;
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
  if (limit) queryParams.append('per_page', limit.toString());
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

  const response = await API.get<Pilgrim[] | PilgrimsResponse>(url);

  // Handle both array response and object response
  if (Array.isArray(response)) {
    return {
      data: response,
      meta: {
        total: response.length,
        page: page || 1,
        limit: limit || response.length,
        totalPages: 1,
      },
    };
  }

  return response as PilgrimsResponse;
};

export interface PilgrimDetailsResponse {
  success: boolean;
  message: string | null;
  data: {
    id: number;
    haj_no: number;
    name: {
      ar: string;
      en: string;
    };
    reservation_no: string;
    national_id: string;
    mobile: string;
    mobile2: string | null;
    gender: number;
    gender_name: string;
    birthdate: string | null;
    birthdate_hijri: string | null;
    age: number | null;
    pilgrim_photo: string | null;
    whatsapp_active: boolean;
    status: number;
    status_name: string;
    source: number;
    source_name: string;
    departure_status: number;
    departure_status_name: string;
    muhrim_status: number;
    muhrim_status_name: string;
    notes: string | null;
    pilgrim_style: string;
    booking_via: string;
    booking_date: string;
    payment_mechanism: string;
    payment_status: string;
    package: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
      status: boolean;
    };
    city: {
      id: number;
      city_id: number;
      city: {
        id: number;
        country_id: number;
        name: {
          ar: string;
          en: string;
        };
        latitude: string;
        longitude: string;
        created_at: string;
        updated_at: string;
      };
      created_at: string;
      updated_at: string;
    };
    nationality: {
      id: number;
      country_id: number;
      country: {
        id: number;
        name: {
          ar: string;
          en: string;
        };
        code: string;
        phone_code: string;
        currency: {
          code: string;
          name: string;
          symbol: string;
        };
        flag: {
          alt: string;
          png: string;
          svg: string;
        };
        coat_of_arms: {
          png: string;
          svg: string;
        };
        latitude: string;
        longitude: string;
        official: {
          ar: string;
          en: string;
        };
        google_map: string;
        open_street_map: string;
        region: string;
        created_at: string;
        updated_at: string;
      };
      created_at: string;
      updated_at: string;
    };
    transport?: any;
    pilgrim_type?: any;
    reservation?: any;
    supervisors: Array<{ id: number; [key: string]: any }>;
    tags: any[];
    created_at: string;
    updated_at: string;
  };
}

export const getPilgrimDetails = async (id: string | number): Promise<PilgrimDetailsResponse> => {
  return API.get<PilgrimDetailsResponse>(`/pilgrims/pilgrims/${id}`);
};

// Init Data Interfaces
export interface InitDataOption {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  name_ar?: string;
  name_en?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // Allow additional properties
}

export interface Employee {
  id: number;
  emp_no: number;
  name: {
    ar: string;
    en: string;
  };
  job_id: number;
  role: number;
  national_id: string;
  mobile: string;
  ID_expire_dt: string;
  gender: boolean;
  nationality_id: number;
  job_number: string;
  bank_account: string;
  bank_name: string;
  iban: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  color: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface InitDataSimpleOption {
  value: number;
  label: string;
}

export interface PilgrimInitDataResponse {
  data: {
    packages: InitDataOption[];
    cities: Array<{
      id: number;
      city_id: number;
      created_at: string;
      updated_at: string;
      city: {
        id: number;
        country_id: number;
        name: {
          ar: string;
          en: string;
        };
        name_en: string;
        name_ar: string;
        latitude: string;
        longitude: string;
        created_at: string;
        updated_at: string;
      };
    }>;
    countries: Array<{
      id: number;
      country_id: number;
      created_at: string;
      updated_at: string;
      country: {
        id: number;
        name: {
          ar: string;
          en: string;
        };
        name_ar: string;
        name_en: string;
        code: string;
        phone_code: string;
        flag: {
          alt: string;
          png: string;
          svg: string;
        };
        currency: {
          code: string;
          name: string;
          symbol: string;
        };
        official: {
          ar: string;
          en: string;
        };
      };
    }>;
    transports: InitDataOption[];
    pilgrimTypes: InitDataOption[];
    employees: Employee[];
    tags: Tag[];
    muhrimStatuses: InitDataSimpleOption[];
    genders: InitDataSimpleOption[];
    pilgrimStatuses: InitDataSimpleOption[];
    sources: InitDataSimpleOption[];
    departureStatuses: InitDataSimpleOption[];
  };
}

export const getPilgrimInitData = async (): Promise<PilgrimInitDataResponse> => {
  return API.get<PilgrimInitDataResponse>('/pilgrims/pilgrims/init-data');
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

  // Map nationality to nationality_id integer
  // The form now sends string IDs directly from the API (e.g., "1", "2")
  // Parse the ID directly - no mapping needed
  let nationalityIdValue: number = 0;

  if (isValidValue(data.nationality)) {
    const parsedId = parseInt(String(data.nationality), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      nationalityIdValue = parsedId;
    } else {
      console.error('Invalid nationality_id:', {
        value: data.nationality,
        parsedId: parsedId,
      });
      nationalityIdValue = 0;
    }
  } else {
    console.error('Nationality is required but not provided');
    nationalityIdValue = 0;
  }

  bodyData.nationality_id = Math.floor(nationalityIdValue);

  if (nationalityIdValue === 0) {
    console.error('WARNING: nationality_id is 0 - this will fail backend validation', {
      inputValue: data.nationality,
    });
  } else {
    console.log('Sending nationality_id:', bodyData.nationality_id);
  }

  // Map gender to integer
  // The form now sends string IDs directly from the API (e.g., "1", "0")
  // Parse the ID directly - no mapping needed
  if (isValidValue(data.gender)) {
    const parsedId = parseInt(String(data.gender), 10);
    if (!isNaN(parsedId) && Number.isInteger(parsedId)) {
      bodyData.gender = parsedId;
    } else {
      // Fallback: try old mapping for backward compatibility
      const genderId = genderMap[String(data.gender).toLowerCase()];
      if (genderId !== undefined) {
        bodyData.gender = genderId;
      } else {
        bodyData.gender = 0;
      }
    }
  } else {
    bodyData.gender = 0;
  }

  // Mobile numbers as integers
  // mobile is REQUIRED
  // Remove country code prefix (699+, 966+, +699, +966, 699, 966) if present
  const cleanMobile = String(data.mobileNumber || '').replace(/^(\+?699|\+?966)/, '');
  bodyData.mobile = safeInteger(cleanMobile);

  // mobile2 is OPTIONAL - only send if provided and valid (Saudi phone number)
  if (isValidValue(data.anotherMobileNumber)) {
    const cleanMobile2 = String(data.anotherMobileNumber).replace(/^(\+?699|\+?966)/, '');
    const mobile2 = safeInteger(cleanMobile2);
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
  // The form now sends string IDs directly from the API (e.g., "1", "2")
  let packageIdValue: number = 0;

  if (isValidValue(data.packageName)) {
    const parsedId = parseInt(String(data.packageName), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      packageIdValue = parsedId;
    } else {
      console.error('Invalid package_id:', {
        value: data.packageName,
        parsedId: parsedId,
      });
      packageIdValue = 0;
    }
  } else {
    console.error('Package is required but not provided');
    packageIdValue = 0;
  }

  bodyData.package_id = Math.floor(packageIdValue);

  if (packageIdValue === 0) {
    console.error('WARNING: package_id is 0 - this will fail backend validation', {
      inputValue: data.packageName,
    });
  } else {
    console.log('Sending package_id:', bodyData.package_id);
  }

  // Map city to city_id (integer) - REQUIRED
  // The form now sends string IDs directly from the API (e.g., "1", "2")
  let cityIdValue: number = 0;

  if (isValidValue(data.city)) {
    const parsedId = parseInt(String(data.city), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      cityIdValue = parsedId;
    } else {
      console.error('Invalid city_id:', {
        value: data.city,
        parsedId: parsedId,
      });
      cityIdValue = 0;
    }
  } else {
    console.error('City is required but not provided');
    cityIdValue = 0;
  }

  bodyData.city_id = Math.floor(cityIdValue);

  if (cityIdValue === 0) {
    console.error('WARNING: city_id is 0 - this will fail backend validation', {
      inputValue: data.city,
    });
  } else {
    console.log('Sending city_id:', bodyData.city_id);
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

  // Add photo to FormData if provided (same logic as your example)
  // Check if photo exists and is a valid File object (not empty object or null)
  const hasValidPhoto =
    data.photo &&
    (data.photo instanceof File ||
      (typeof data.photo === 'object' &&
        data.photo !== null &&
        Object.keys(data.photo as object).length > 0 &&
        'preview' in data.photo));

  if (hasValidPhoto && data.photo) {
    console.log('Photo data received:', {
      type: typeof data.photo,
      isFile: data.photo instanceof File,
      hasPreview: typeof data.photo === 'object' && data.photo !== null && 'preview' in data.photo,
      isEmptyObject:
        typeof data.photo === 'object' &&
        data.photo !== null &&
        Object.keys(data.photo as object).length === 0,
    });

    // Extract File object (handle both File and File with preview property)
    let photoFile: File | null = null;

    if (data.photo instanceof File) {
      photoFile = data.photo;
      console.log('Photo is a File:', { name: photoFile.name, type: photoFile.type });
    } else if (typeof data.photo === 'object' && data.photo !== null && 'preview' in data.photo) {
      // Check if it's a File object with preview property
      // Try to access the File object directly
      const fileWithPreview = data.photo as any;

      // Check if it's actually a File object (even with preview property)
      if (fileWithPreview instanceof File) {
        photoFile = fileWithPreview;
        console.log('Photo is a File with preview:', {
          name: photoFile.name,
          type: photoFile.type,
        });
      } else if (fileWithPreview.constructor?.name === 'File' || fileWithPreview instanceof Blob) {
        // Sometimes File objects lose their instanceof check but are still Files
        photoFile = fileWithPreview as File;
        console.log('Photo is a File (via constructor check):', {
          name: photoFile.name,
          type: photoFile.type,
          constructor: fileWithPreview.constructor?.name,
        });
      } else {
        console.error('Photo has preview property but is not a File:', {
          type: typeof fileWithPreview,
          constructor: fileWithPreview?.constructor?.name,
          keys: Object.keys(fileWithPreview),
        });
      }
    }

    if (photoFile) {
      // Verify file type before appending
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      console.log('Photo file details:', {
        name: photoFile.name,
        type: photoFile.type,
        size: photoFile.size,
        isValidType: validTypes.includes(photoFile.type),
        constructor: photoFile.constructor.name,
        isFile: photoFile instanceof File,
        isBlob: photoFile instanceof Blob,
      });

      if (validTypes.includes(photoFile.type)) {
        // Append file to FormData - use the File object directly
        formData.append('photo', photoFile, photoFile.name);
        console.log('✅ Photo added to FormData:', {
          name: photoFile.name,
          type: photoFile.type,
          size: photoFile.size,
        });
      } else {
        console.error('❌ Invalid photo file type:', photoFile.type, 'Expected: jpeg, jpg, png');
        // Still append it - backend will validate
        formData.append('photo', photoFile, photoFile.name);
      }
    } else {
      console.error('❌ Photo is not a valid File object:', {
        photo: data.photo,
        type: typeof data.photo,
        isFile: data.photo instanceof File,
        constructor: data.photo?.constructor?.name,
      });
    }
  } else {
    console.log('No photo provided (optional field)');
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

  // API.post will automatically handle FormData and remove Content-Type header
  // so browser can set it with the correct boundary
  return API.post<CreatePilgrimResponse>('/pilgrims/pilgrims', formData);
};

// Update Pilgrim Data interface (same as CreatePilgrimData)
export interface UpdatePilgrimData extends CreatePilgrimData {
  // Additional fields that might be needed for update
  transport_id?: number;
  status?: number;
  source?: number;
  whatsapp_active?: number;
  departure_status?: number;
  muhrim_status?: number;
  pilgrim_type_id?: number;
  reservation_id?: number;
  pilgrim_style?: string;
  booking_via?: string;
  booking_date?: string;
  payment_mechanism?: string;
  payment_status?: string;
  tag_ids?: string;
}

export interface UpdatePilgrimResponse {
  data: Pilgrim;
  message?: string;
}

export const updatePilgrim = async (
  id: string | number,
  data: UpdatePilgrimData
): Promise<UpdatePilgrimResponse> => {
  // Prepare JSON body data (all data except photo)
  const bodyData: any = {};

  // Add _method: PATCH for Laravel form method spoofing (as shown in API example)
  bodyData._method = 'PATCH';

  // Transform name fields to API format: name as JSON string
  // The API expects: name = { "ar": "...", "en": "..." } as a JSON string
  const nameObj = {
    ar: safeString(data.nameAr),
    en: safeString(data.nameEn),
  };
  bodyData.name = JSON.stringify(nameObj);

  // Map idNumber to national_id (integer)
  bodyData.national_id = safeInteger(data.idNumber);

  // Map nationality to nationality_id integer
  let nationalityIdValue: number = 0;

  if (isValidValue(data.nationality)) {
    const parsedId = parseInt(String(data.nationality), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      nationalityIdValue = parsedId;
    } else {
      console.error('Invalid nationality_id:', {
        value: data.nationality,
        parsedId: parsedId,
      });
      nationalityIdValue = 0;
    }
  }

  bodyData.nationality_id = Math.floor(nationalityIdValue);

  // Map gender to integer
  if (isValidValue(data.gender)) {
    const parsedId = parseInt(String(data.gender), 10);
    if (!isNaN(parsedId) && Number.isInteger(parsedId)) {
      bodyData.gender = parsedId;
    } else {
      // Fallback: try old mapping for backward compatibility
      const genderId = genderMap[String(data.gender).toLowerCase()];
      if (genderId !== undefined) {
        bodyData.gender = genderId;
      } else {
        bodyData.gender = 0;
      }
    }
  } else {
    bodyData.gender = 0;
  }

  // Mobile numbers as integers
  // Remove country code prefix (699+, 966+, +699, +966, 699, 966) if present
  const cleanMobile = String(data.mobileNumber || '').replace(/^(\+?699|\+?966)/, '');
  bodyData.mobile = safeInteger(cleanMobile);

  // mobile2 is OPTIONAL - only send if provided and valid
  if (isValidValue(data.anotherMobileNumber)) {
    const cleanMobile2 = String(data.anotherMobileNumber).replace(/^(\+?699|\+?966)/, '');
    const mobile2 = safeInteger(cleanMobile2);
    if (mobile2 > 0) {
      bodyData.mobile2 = mobile2;
    }
  }

  // Birth dates as strings
  bodyData.birthdate = safeString(data.gregorianBirthDate);
  bodyData.birthdate_hijri = safeString(data.hijriBirthDate);

  // Age as integer
  bodyData.age = safeInteger(data.age);

  // Handle supervisors array as JSON string: [2,3]
  if (data.supervisors && Array.isArray(data.supervisors) && data.supervisors.length > 0) {
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

  // Map packageName to package_id (integer)
  let packageIdValue: number = 0;

  if (isValidValue(data.packageName)) {
    const parsedId = parseInt(String(data.packageName), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      packageIdValue = parsedId;
    } else {
      console.error('Invalid package_id:', {
        value: data.packageName,
        parsedId: parsedId,
      });
      packageIdValue = 0;
    }
  }

  bodyData.package_id = Math.floor(packageIdValue);

  // Map city to city_id (integer)
  let cityIdValue: number = 0;

  if (isValidValue(data.city)) {
    const parsedId = parseInt(String(data.city), 10);
    if (!isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId)) {
      cityIdValue = parsedId;
    } else {
      console.error('Invalid city_id:', {
        value: data.city,
        parsedId: parsedId,
      });
      cityIdValue = 0;
    }
  }

  bodyData.city_id = Math.floor(cityIdValue);

  // Transport ID (optional)
  if (data.transport_id !== undefined && data.transport_id !== null) {
    bodyData.transport_id = safeInteger(data.transport_id);
  }

  // String fields
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

  // Optional fields with defaults or from data
  bodyData.pilgrim_type_id =
    data.pilgrim_type_id !== undefined ? safeInteger(data.pilgrim_type_id) : 2;
  bodyData.reservation_id =
    data.reservation_id !== undefined ? safeInteger(data.reservation_id) : 1;
  bodyData.status = data.status !== undefined ? safeInteger(data.status) : 1; // 1=active, 2=inactive, 3=cancelled
  bodyData.source = data.source !== undefined ? safeInteger(data.source) : 1; // 1=website, 2=excel, 3=api
  bodyData.whatsapp_active =
    data.whatsapp_active !== undefined ? safeInteger(data.whatsapp_active) : 0;
  bodyData.departure_status =
    data.departure_status !== undefined ? safeInteger(data.departure_status) : 0; // 0=early, 1=late
  bodyData.muhrim_status = data.muhrim_status !== undefined ? safeInteger(data.muhrim_status) : 0; // 0=without, 1=with

  // Additional optional fields
  if (data.pilgrim_style) bodyData.pilgrim_style = safeString(data.pilgrim_style);
  if (data.booking_via) bodyData.booking_via = safeString(data.booking_via);
  if (data.booking_date) bodyData.booking_date = safeString(data.booking_date);
  if (data.payment_mechanism) bodyData.payment_mechanism = safeString(data.payment_mechanism);
  if (data.payment_status !== undefined) bodyData.payment_status = safeString(data.payment_status);
  if (data.tag_ids) bodyData.tag_ids = safeString(data.tag_ids);

  // Handle photo - send in FormData if provided
  const formData = new FormData();

  // Add photo to FormData if provided
  const hasValidPhoto =
    data.photo &&
    (data.photo instanceof File ||
      (typeof data.photo === 'object' &&
        data.photo !== null &&
        Object.keys(data.photo as object).length > 0 &&
        'preview' in data.photo));

  if (hasValidPhoto && data.photo) {
    let photoFile: File | null = null;

    if (data.photo instanceof File) {
      photoFile = data.photo;
    } else if (typeof data.photo === 'object' && data.photo !== null && 'preview' in data.photo) {
      const fileWithPreview = data.photo as any;

      if (fileWithPreview instanceof File) {
        photoFile = fileWithPreview;
      } else if (fileWithPreview.constructor?.name === 'File' || fileWithPreview instanceof Blob) {
        photoFile = fileWithPreview as File;
      }
    }

    if (photoFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.includes(photoFile.type)) {
        formData.append('photo', photoFile, photoFile.name);
      } else {
        formData.append('photo', photoFile, photoFile.name);
      }
    }
  }

  // Append all body data to FormData
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
    console.log('Update Pilgrim FormData contents:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, 'File', { name: value.name, type: value.type, size: value.size });
      } else {
        console.log(`${key}:`, value);
      }
    }
  }

  // Use POST with _method: PATCH (Laravel method spoofing) as shown in API example
  // API.post will automatically handle FormData and remove Content-Type header
  try {
    return await API.post<UpdatePilgrimResponse>(`/pilgrims/pilgrims/${id}`, formData);
  } catch (error: any) {
    console.error('Error in updatePilgrim API call:', {
      message: error?.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
    });
    // Re-throw the error so it can be handled by the mutation
    throw error;
  }
};
