'use client';

import { useCallback } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';
import FilterAutocomplete from '../components/FilterAutocomplete';

type CampOption = {
  id: number;
  name?: any;
  camp_no?: string;
};

interface FiltersShape {
  camp_id: CampOption | null;
  [key: string]: any;
}

interface AccommodationSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  campsList: CampOption[];
  getLocalizedName: (name: any) => string;
  labelColor: (key: string) => string;
  t: (key: string) => string;
  initDataLoading: boolean;
}

export default function FilterAccommodationSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  campsList,
  getLocalizedName,
  labelColor,
  t,
  initDataLoading,
}: AccommodationSectionProps) {
  const handleCampChange = useCallback(
    (_event: any, newValue: CampOption | null) => {
      setFilters((prev) => ({ ...prev, camp_id: newValue }));
    },
    [setFilters]
  );

  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterAutocomplete
            label={t('Label.camp')}
            value={filters.camp_id || null}
            onChange={handleCampChange as any}
            options={campsList}
            getOptionLabel={(option) => getLocalizedName(option?.name)}
            getOptionKey={(option) => option?.id}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            disabled={initDataLoading}
            placeholder={t('Label.select')}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props as any;
              return (
                <li key={option?.id} {...otherProps}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{getLocalizedName(option?.name) || ''}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {option?.camp_no ? `(${option.camp_no})` : ''}
                    </Typography>
                  </Box>
                </li>
              );
            }}
          />
        </Stack>
      </Stack>
    </FilterSection>
  );
}
