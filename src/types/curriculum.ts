export type Curriculum = {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  order: number;
  isActive: boolean;
};

export type CurriculumListResponse = {
  items: Curriculum[];
  totalCount: number;
};

export type CurriculumFormValues = {
  nameAr: string;
  nameEn: string;
  logo?: File | string | null;
  order: number;
  isActive: boolean | string;
};

export type CurriculumQuery = {
  Name?: string;
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};

