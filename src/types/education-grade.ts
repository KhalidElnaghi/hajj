export type EducationGrade = {
  id: string;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type EducationGradeListResponse = {
  items: EducationGrade[];
  totalCount: number;
};

export type EducationGradeFormValues = {
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean | string;
};

export type EducationGradeQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};

