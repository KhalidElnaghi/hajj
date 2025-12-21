import { Dayjs } from 'dayjs';

// ----------------------------------------------------------------------

export type DateRangePickerProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onChangeStartDate: (newValue: Dayjs | null) => void;
  onChangeEndDate: (newValue: Dayjs | null) => void;
  //
  open: boolean;
  onOpen?: VoidFunction;
  onClose: VoidFunction;
  onReset?: VoidFunction;
  //
  selected?: boolean;
  error?: boolean;
  //
  label?: string;
  shortLabel?: string;
  //
  title?: string;
  variant?: 'calendar' | 'input';
  //
  setStartDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
};
