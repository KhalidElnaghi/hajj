export type AcademicDegree = {
  id: string;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type AcademicDegreeListResponse = {
  items: AcademicDegree[];
  totalCount: number;
};

export type AcademicDegreeFormValues = {
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type AcademicDegreeQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};
