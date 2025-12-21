export type Setting = {
  id: string;
  nameAr: string;
  nameEn: string;
  value: string;
};

export type SettingListResponse = {
  items: Setting[];
  totalCount: number;
};

export type SettingFormValues = {
  value: string;
};

export type SettingQuery = {
  MaxResultCount?: number;
  SkipCount?: number;
};

