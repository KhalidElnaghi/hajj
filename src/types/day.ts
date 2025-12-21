export type Day = {
  id: string;
  isActive: boolean;
  dayName: string;
};

export type DayListResponse = {
  items: Day[];
  totalCount: number;
};

export type DayQuery = {
  IsActive?: string;
  MaxResultCount: number;
  SkipCount: number;
};

export type ActivateDayPayload = {
  IsActive: boolean;
};

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  dayId: string;
};

export type TimeSlotListResponse = {
  items: TimeSlot[];
  totalCount: number;
};

export type TimeSlotQuery = {
  dayId: string;
  Sorting?: string;
  SkipCount?: number;
  MaxResultCount?: number;
};

export type TimeSlotFormValues = {
  startTime: string;
  dayId: string;
};
