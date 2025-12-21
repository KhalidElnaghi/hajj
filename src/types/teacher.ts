export type WorkTypeEnum = 'Package' | 'Session';

export type Teacher = {
    id: string;
    userId: string;
    name: string;
    phone: string;
    countryName: string | null;
    cityName: string | null;
    identityNumber: string;
    workTypeEnum: WorkTypeEnum;
    workingHours: number;
    completeProfile: boolean;
    adminAccepted: boolean;
    isActive: boolean;
};

export type TeacherListResponse = {
    items: Teacher[];
    totalCount: number;
};

export type TeacherQuery = {
    NameOrPhoneNumberOrIdentityNumber?: string;
    CountryId?: string;
    CityId?: string;
    IsActive?: string;
    CreatedAt?: string;
    WorkTypeEnum?: WorkTypeEnum | '';
    MaxResultCount: number;
    SkipCount: number;
};


