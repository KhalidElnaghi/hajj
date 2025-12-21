export type Country = {
  id: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  creationTime?: string;
  lastModificationTime?: string;
};

export type CountryListResponse = {
  items: Country[];
  totalCount: number;
};

export type CountryFormValues = {
  nameAr: string;
  nameEn: string;
  isActive: boolean;
};

export type CountryQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};
