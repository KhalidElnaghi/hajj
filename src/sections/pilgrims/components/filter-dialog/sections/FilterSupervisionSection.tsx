'use client';

import { Stack, Typography } from '@mui/material';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';
import FilterAutocomplete from '../components/FilterAutocomplete';

type EmployeeOption = {
  id: number;
  name?: any;
};

type FiltersShape = {
  supervisor: EmployeeOption | null;
  [key: string]: any;
};

interface SupervisionSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  supervisorsList: EmployeeOption[];
  getLocalizedName: (name: any) => string;
  labelColor: (key: string) => string;
  t: (key: string) => string;
}

export default function FilterSupervisionSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  supervisorsList,
  getLocalizedName,
  labelColor,
  t,
}: SupervisionSectionProps) {
  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <Stack spacing={2.5}>
        <FilterAutocomplete
          label={t('Label.supervisors')}
          value={filters.supervisor || null}
          onChange={(_event, newValue) =>
            setFilters((prev) => ({ ...prev, supervisor: newValue as EmployeeOption | null }))
          }
          options={supervisorsList}
          getOptionLabel={(option) => getLocalizedName(option?.name)}
          getOptionKey={(option) => option?.id}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          placeholder={t('Label.select')}
          highlighted={false}
        />
      </Stack>
    </FilterSection>
  );
}
