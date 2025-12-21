export type EducationApproachStageGrade = {
  id: string;
  educationApproachStageId: string;
  educationApproachStageNameAr: string;
  educationApproachStageNameEn: string;
  educationGradeId: string;
  educationGradeNameAr: string;
  educationGradeNameEn: string;
  order: number;
  isActive: boolean;
};

export type EducationApproachStageGradeListResponse = {
  items: EducationApproachStageGrade[];
  totalCount: number;
};

export type EducationApproachStageGradeQuery = {
  EducationApproachStageId: string;
  MaxResultCount: number;
  SkipCount: number;
  IsActive?: string;
  EducationGradeName?: string;
};

