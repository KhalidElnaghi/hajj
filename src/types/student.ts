export type Student = {
    id: string;
    userId: string;
    name: string;
    phone: string;
    educationApproachName: string;
    educationApproachStageName: string;
    countryName: string | null;
    cityName: string | null;
    isActive: boolean;
};

export type StudentListResponse = {
    items: Student[];
    totalCount: number;
};

export type StudentQuery = {
    NameOrPhoneNumber?: string;
    Gender?: string;
    EducationApproachId?: string;
    EducationApproachStageId?: string;
    CountryId?: string;
    CityId?: string;
    IsActive?: string;
    MaxResultCount: number;
    SkipCount: number;
};
