export type DashboardProfile = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  city: {
    id: string;
    nameAr: string;
    nameEn: string;
  } | null;
  nationality: {
    id: string;
    nameAr: string;
    nameEn: string;
  } | null;
};

export type UpdateDashboardProfilePayload = {
  name: string;
  email: string;
  cityId: string | null;
  nationalityId: string | null;
};

