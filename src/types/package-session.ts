export type PackageSession = {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  durationMinutes: number;
  totalHours: number;
  daysPerWeek: number;
  isPopular: boolean;
  order: number;
};

export type PackageSessionListResponse = {
  items: PackageSession[];
  totalCount: number;
};

export type PackageSessionFormValues = {
  NameAr: string;
  NameEn: string;
  TotalHours: number;
  DaysPerWeek: number;
  IsPopular: boolean;
  IsActive: boolean;
  Order: number;
};

export type PackageSessionQuery = {
  SearchByName?: string;
  IsActive?: string;
  IsPopular?: string;
  DaysPerWeek?: string;
  TotalHours?: string;
  MaxResultCount: number;
  SkipCount: number;
};
