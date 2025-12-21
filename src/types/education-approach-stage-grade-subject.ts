export type EducationApproachStageGradeSubject = {
  id: string;
  educationApproachStageGradeId: string;
  educationApproachStageId: string;
  educationApproachId: string;
  educationApproachNameAr: string;
  educationApproachNameEn: string;
  educationStageId: string;
  educationStageNameAr: string;
  educationStageNameEn: string;
  educationGradeId: string;
  educationGradeNameAr: string;
  educationGradeNameEn: string;
  educationSubjectId: string;
  educationSubjectNameAr: string;
  educationSubjectNameEn: string;
  pdf: string;
  logo: string;
  order: number;
  isActive: boolean;
};

export type EducationApproachStageGradeSubjectListResponse = {
  items: EducationApproachStageGradeSubject[];
  totalCount: number;
};

export type EducationApproachStageGradeSubjectQuery = {
  EducationApproachStageGradeId: string;
  MaxResultCount: number;
  SkipCount: number;
  IsActive?: string;
  Name?: string;
};

