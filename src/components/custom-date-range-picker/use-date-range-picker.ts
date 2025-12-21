import { useState, useCallback } from 'react';
import { Dayjs } from 'dayjs';

import { fDate } from 'src/utils/format-time';

import { shortDateLabel } from './utils';
import { DateRangePickerProps } from './types';

// ----------------------------------------------------------------------

type ReturnType = DateRangePickerProps;

export default function useDateRangePicker(start: Dayjs | null, end: Dayjs | null): ReturnType {
  const [open, setOpen] = useState(false);

  const [endDate, setEndDate] = useState(end);

  const [startDate, setStartDate] = useState(start);

  const error = start && end ? start.valueOf() > end.valueOf() : false;

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeStartDate = useCallback((newValue: Dayjs | null) => {
    setStartDate(newValue);
  }, []);

  const onChangeEndDate = useCallback(
    (newValue: Dayjs | null) => {
      if (error) {
        setEndDate(null);
      }
      setEndDate(newValue);
    },
    [error]
  );

  const onReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen,
    onClose,
    onReset,
    //
    selected: !!startDate && !!endDate,
    error,
    //
    label: `${fDate(startDate)} - ${fDate(endDate)}`,
    shortLabel: shortDateLabel(startDate, endDate),
    //
    setStartDate,
    setEndDate,
  };
}
