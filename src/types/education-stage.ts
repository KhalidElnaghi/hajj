export type EducationStage = {
  id: string;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type EducationStageListResponse = {
  items: EducationStage[];
  totalCount: number;
};

export type EducationStageFormValues = {
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean | string;
};

export type EducationStageQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};

