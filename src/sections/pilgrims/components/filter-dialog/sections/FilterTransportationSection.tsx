'use client';

import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';
import FilterDropdown from '../components/FilterDropdown';

type FiltersShape = {
  transport: string;
  [key: string]: any;
};

interface TransportationSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  transportOptions: any[];
  t: (key: string) => string;
  initDataLoading: boolean;
  searchValue: string;
}

export default function FilterTransportationSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  transportOptions,
  t,
  initDataLoading,
  searchValue,
}: TransportationSectionProps) {
  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <FilterDropdown
        label={t('Label.transport')}
        value={filters.transport}
        onChange={(value: string) => setFilters((prev) => ({ ...prev, transport: value }))}
        options={transportOptions}
        allLabel={t('Label.all')}
        disabled={initDataLoading}
        highlighted={!!(searchValue && t('Label.transport')?.toLowerCase().includes(searchValue))}
      />
    </FilterSection>
  );
}
