export type Nationality = {
  id: string;
  nameAr: string;
  nameEn: string;
  flagImageUrl: string;
};

export type NationalityListResponse = {
  items: Nationality[];
  totalCount: number;
};

export type NationalityFormValues = {
  nameAr: string;
  nameEn: string;
  flagImageUrl?: File | string | null;
};

export type NationalityQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};
