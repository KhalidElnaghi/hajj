'use client';

import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';

type FiltersShape = {
  healthStatus: string;
  [key: string]: any;
};

interface HealthSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  labelColor: (key: string) => string;
  t: (key: string) => string;
}

export default function FilterHealthSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  labelColor,
  t,
}: HealthSectionProps) {
  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <FormControl fullWidth>
        <Typography
          sx={{
            mb: 1,
            color: labelColor('Label.general_health_status'),
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '22px',
            textTransform: 'capitalize',
          }}
        >
          {t('Label.general_health_status')}
        </Typography>
        <Select
          value={filters.healthStatus}
          onChange={(e) => setFilters((prev) => ({ ...prev, healthStatus: e.target.value }))}
          displayEmpty
          sx={{ borderRadius: 1 }}
        >
          <MenuItem value="">{t('Label.select')}</MenuItem>
          <MenuItem value="good">جيد</MenuItem>
          <MenuItem value="attention">يحتاج عناية</MenuItem>
        </Select>
      </FormControl>
    </FilterSection>
  );
}
