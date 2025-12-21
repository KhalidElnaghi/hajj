export type EducationApproachStage = {
  id: string;
  educationApproachId: string;
  educationApproachNameAr: string;
  educationApproachNameEn: string;
  educationStageId: string;
  educationStageNameAr: string;
  educationStageNameEn: string;
  canTeachBothGenders: boolean;
  minimumPriceOnline: number;
  maximumPriceOnline: number;
  minimumPriceOffline: number;
  maximumPriceOffline: number;
  order: number;
  isActive: boolean;
};

export type EducationApproachStageListResponse = {
  items: EducationApproachStage[];
  totalCount: number;
};

export type EducationApproachStageQuery = {
  EducationApproachId: string;
  MaxResultCount: number;
  SkipCount: number;
  IsActive?: string;
  CanTeachBothGenders?: string;
  EducationStageName?: string;
};

