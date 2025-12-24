'use client';

import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import { QueryStringUpdate, useQueryString } from 'src/hooks/use-queryString';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type BaseFilterConfig = {
  name: string;
  width?: number | string;
};

type SearchFilterConfig = BaseFilterConfig & {
  type: 'search';
  placeholder?: string;
  debounceMs?: number;
};

type SelectFilterConfig = BaseFilterConfig & {
  type: 'select';
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  allowClear?: boolean;
  disabled?: boolean;
};

type NumberFilterConfig = BaseFilterConfig & {
  type: 'number';
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  allowClear?: boolean;
};

type DateFilterConfig = BaseFilterConfig & {
  type: 'date';
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
};

export type FilterConfig =
  | SearchFilterConfig
  | SelectFilterConfig
  | NumberFilterConfig
  | DateFilterConfig;

type QueryFiltersProps = {
  filters: FilterConfig[];
  spacing?: number;
};

export default function QueryFilters({ filters, spacing = 2 }: QueryFiltersProps) {
  const searchParams = useSearchParams();
  const querySignature = searchParams.toString();
  const { createQueryString } = useQueryString();
  const tLabel = useTranslations('Label');
  const searchFilters = useMemo(
    () => filters.filter((filter): filter is SearchFilterConfig => filter.type === 'search'),
    [filters]
  );
  const [searchValues, setSearchValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    searchFilters.forEach((filter) => {
      initialValues[filter.name] = searchParams.get(filter.name) ?? '';
    });
    return initialValues;
  });

  type TimerId = ReturnType<typeof setTimeout>;
  const debounceTimers = useRef<Record<string, TimerId | number>>({});

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        clearTimeout(timer as TimerId);
      });
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(querySignature);
    setSearchValues((prev) => {
      const next = { ...prev };
      let changed = false;
      searchFilters.forEach((filter) => {
        const paramValue = params.get(filter.name) ?? '';
        if (next[filter.name] !== paramValue) {
          next[filter.name] = paramValue;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [querySignature, searchFilters]);

  const applyUpdates = useCallback(
    (updates: QueryStringUpdate[]) => {
      const sanitizedUpdates = updates.map((update) => ({
        name: update.name,
        value: update.value && update.value.length > 0 ? update.value : undefined,
      }));

      createQueryString(sanitizedUpdates);
    },
    [createQueryString]
  );

  const handleSearchChange = useCallback(
    (name: string, value: string, debounceMs = 500) => {
      setSearchValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (debounceTimers.current[name]) {
        clearTimeout(debounceTimers.current[name] as TimerId);
      }

      debounceTimers.current[name] = window.setTimeout(() => {
        applyUpdates([{ name, value }]);
      }, debounceMs);
    },
    [applyUpdates]
  );

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      applyUpdates([{ name, value }]);
    },
    [applyUpdates]
  );

  const handleNumberChange = useCallback(
    (name: string, value: string) => {
      applyUpdates([{ name, value }]);
    },
    [applyUpdates]
  );

  const handleDateChange = useCallback(
    (name: string, value: Dayjs | null) => {
      const formatted = value && value.isValid() ? value.toISOString() : '';
      applyUpdates([{ name, value: formatted }]);
    },
    [applyUpdates]
  );

  const baseFieldSx = {
    '& .MuiInputBase-input': {
      py: 1,
      px: 1.5,
    },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      spacing={spacing}
      sx={{ width: '100%' }}
    >
      {filters.map((filter) => {
        if (filter.type === 'search') {
          return (
            <TextField
              key={filter.name}
              size="small"
              value={searchValues[filter.name] ?? ''}
              onChange={(event) =>
                handleSearchChange(filter.name, event.target.value, filter.debounceMs)
              }
              placeholder={filter.placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src="/assets/images/pilgrims/search.svg"
                      alt="search"
                      sx={{ width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: filter.width || 240,
                ...baseFieldSx,
              }}
            />
          );
        }

        if (filter.type === 'number') {
          const numberFilter = filter as NumberFilterConfig;
          const currentValue = searchParams.get(numberFilter.name) ?? '';

          return (
            <TextField
              key={numberFilter.name}
              type="number"
              size="small"
              label={numberFilter.label}
              value={currentValue}
              onChange={(event) => handleNumberChange(numberFilter.name, event.target.value)}
              placeholder={numberFilter.placeholder}
              sx={{
                minWidth: numberFilter.width || 200,
                ...baseFieldSx,
                flex: { xs: 1, md: 0 },
              }}
              InputProps={{
                inputProps: {
                  min: numberFilter.min,
                  max: numberFilter.max,
                  step: numberFilter.step,
                },
                endAdornment:
                  numberFilter.allowClear && currentValue ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => handleNumberChange(numberFilter.name, '')}
                        edge="end"
                      >
                        <Iconify icon="mingcute:close-line" />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
              }}
            />
          );
        }

        if (filter.type === 'date') {
          const dateFilter = filter as DateFilterConfig;
          const currentValue = searchParams.get(dateFilter.name);
          const dateValue = currentValue ? dayjs(currentValue) : null;

          return (
            <Stack
              key={dateFilter.name}
              direction="row"
              alignItems="center"
              sx={{ position: 'relative' }}
            >
              <DatePicker
                label={dateFilter.label}
                value={dateValue}
                onChange={(newValue) => handleDateChange(dateFilter.name, newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    placeholder: dateFilter.placeholder,
                    sx: {
                      minWidth: dateFilter.width || 220,
                      ...baseFieldSx,
                      flex: { xs: 1, md: 0 },
                    },
                  },
                }}
              />
              {dateFilter.allowClear && currentValue && (
                <IconButton
                  size="small"
                  onClick={() => handleDateChange(dateFilter.name, null)}
                  sx={{
                    position: 'absolute',
                    right: 60,
                    zIndex: 1,
                  }}
                >
                  <Iconify icon="mingcute:close-line" width={18} />
                </IconButton>
              )}
            </Stack>
          );
        }

        const selectFilter = filter as SelectFilterConfig;
        const currentValue = searchParams.get(selectFilter.name) ?? '';

        return (
          <TextField
            key={selectFilter.name}
            select
            size="small"
            label={selectFilter.label}
            value={currentValue}
            onChange={(event) => handleSelectChange(selectFilter.name, event.target.value)}
            sx={{
              minWidth: selectFilter.width || 200,
              ...baseFieldSx,
              flex: 1,
            }}
            placeholder={selectFilter.placeholder}
            disabled={selectFilter.disabled}
          >
            {selectFilter.allowClear && <MenuItem value="">{tLabel('all')}</MenuItem>}
            {selectFilter.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      })}
    </Stack>
  );
}
