export type EducationSubject = {
  id: string;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type EducationSubjectListResponse = {
  items: EducationSubject[];
  totalCount: number;
};

export type EducationSubjectFormValues = {
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean | string;
};

export type EducationSubjectQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};

