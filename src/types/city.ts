export type CityCountrySummary = {
  id: string;
  nameAr: string;
  nameEn: string;
};

export type City = {
  id: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  countryId: string;
  country?: CityCountrySummary;
  countryNameAr?: string;
  countryNameEn?: string;
};

export type CityListResponse = {
  items: City[];
  totalCount: number;
};

export type CityFormValues = {
  nameAr: string;
  nameEn: string;
  countryId: string;
  isActive: boolean;
};

export type CityQuery = {
  CountryId?: string;
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};
