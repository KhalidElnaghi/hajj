import { Dayjs } from 'dayjs';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function shortDateLabel(startDate: Dayjs | null, endDate: Dayjs | null) {
  const getCurrentYear = new Date().getFullYear();

  const startDateYear = startDate ? startDate.year() : null;

  const endDateYear = endDate ? endDate.year() : null;

  const currentYear = getCurrentYear === startDateYear && getCurrentYear === endDateYear;

  const sameDay = startDate && endDate ? startDate.isSame(endDate, 'day') : false;

  const sameMonth = startDate && endDate ? startDate.isSame(endDate, 'month') : false;

  if (currentYear) {
    if (sameMonth) {
      if (sameDay) {
        return fDate(endDate, 'dd MMM yy');
      }
      return `${fDate(startDate, 'dd')} - ${fDate(endDate, 'dd MMM yy')}`;
    }
    return `${fDate(startDate, 'dd MMM')} - ${fDate(endDate, 'dd MMM yy')}`;
  }

  return `${fDate(startDate, 'dd MMM yy')} - ${fDate(endDate, 'dd MMM yy')}`;
}
