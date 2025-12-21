export type PaymentMethod = {
  id: string;
  name: string;
  type: string;
  image: string;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
};

export type PaymentMethodListResponse = {
  items: PaymentMethod[];
  totalCount: number;
};

export type PaymentMethodFormValues = {
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
  type: string;
  image?: File | string | null;
};

export type PaymentMethodQuery = {
  MaxResultCount: number;
  SkipCount: number;
};
