'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterDropdown from '../components/FilterDropdown';
import FilterSection from '../components/FilterSection';
import FilterToggleGroup from '../components/FilterToggleGroup';
import FilterAutocomplete from '../components/FilterAutocomplete';

type CountryOption = { country: { id: number; name: any; flag?: { svg?: string } } };
type CityOption = { city_id: number; city: { name: any } };
type BookingStatusOption = { id: number; name: any };

type FiltersShape = {
  nationality: CountryOption | null;
  city: CityOption | null;
  tag_id: string;
  gender: string;
  marriedLate: string;
  reservation_id: BookingStatusOption | null;
  package: string;
  pilgrimType: string;
  muhrimStatus: string;
  pilgrimStatus: string;
  source: string;
  [key: string]: any;
};

interface PersonalSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  countriesList: CountryOption[];
  citiesList: CityOption[];
  packageOptions: any[];
  tagOptions: any[];
  bookingStatusesList: BookingStatusOption[];
  pilgrimStatusOptions: any[];
  pilgrimTypeOptions: any[];
  muhrimStatusOptions: any[];
  genderToggleOptions: any[];
  departureToggleOptions: any[];
  sourceOptions: any[];
  getLocalizedName: (name: any) => string;
  labelColor: (key: string) => string;
  t: (key: string) => string;
  initDataLoading: boolean;
  searchValue: string;
}

export default function FilterPersonalSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  countriesList,
  citiesList,
  packageOptions,
  tagOptions,
  bookingStatusesList,
  pilgrimStatusOptions,
  pilgrimTypeOptions,
  muhrimStatusOptions,
  genderToggleOptions,
  departureToggleOptions,
  sourceOptions,
  getLocalizedName,
  labelColor,
  t,
  initDataLoading,
  searchValue,
}: PersonalSectionProps) {
  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterAutocomplete
            label={t('Label.nationality')}
            value={filters.nationality || null}
            onChange={(_event, newValue) =>
              setFilters((prev) => ({ ...prev, nationality: newValue as CountryOption | null }))
            }
            options={countriesList}
            getOptionLabel={(option) => getLocalizedName(option?.country?.name)}
            getOptionKey={(option) => option?.country?.id}
            isOptionEqualToValue={(option, value) => option?.country?.id === value?.country?.id}
            disabled={initDataLoading}
            placeholder={t('Label.all')}
            highlighted={
              !!(searchValue && t('Label.nationality')?.toLowerCase().includes(searchValue))
            }
            renderOption={(props, option) => {
              const { key, ...otherProps } = props as any;
              return (
                <li key={option?.country?.id} {...otherProps}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option?.country?.flag?.svg && (
                      <Image
                        src={option.country.flag.svg}
                        alt={getLocalizedName(option?.country?.name) || 'Flag'}
                        width={20}
                        height={15}
                        style={{ borderRadius: 2 }}
                      />
                    )}
                    <Typography variant="body2">
                      {getLocalizedName(option?.country?.name) || ''}
                    </Typography>
                  </Box>
                </li>
              );
            }}
          />

          <FilterAutocomplete
            label={t('Label.city')}
            value={filters.city || null}
            onChange={(_event, newValue) =>
              setFilters((prev) => ({ ...prev, city: newValue as CityOption | null }))
            }
            options={citiesList}
            getOptionLabel={(option) => getLocalizedName(option?.city?.name)}
            getOptionKey={(option) => option?.city_id}
            isOptionEqualToValue={(option, value) => option?.city_id === value?.city_id}
            disabled={initDataLoading}
            placeholder={t('Label.all')}
            highlighted={!!(searchValue && t('Label.city')?.toLowerCase().includes(searchValue))}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props as any;
              return (
                <li key={option?.city_id} {...otherProps}>
                  {getLocalizedName(option?.city?.name) || ''}
                </li>
              );
            }}
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterDropdown
            label={t('Label.package_name')}
            value={filters.package}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, package: value }))}
            options={packageOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={
              !!(searchValue && t('Label.package_name')?.toLowerCase().includes(searchValue))
            }
          />
          <FilterDropdown
            label={t('Label.tags')}
            value={filters.tag_id}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, tag_id: value }))}
            options={tagOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={!!(searchValue && t('Label.tags')?.toLowerCase().includes(searchValue))}
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterAutocomplete
            label={t('Label.booking_status')}
            value={filters.reservation_id || null}
            onChange={(_event, newValue) =>
              setFilters((prev) => ({
                ...prev,
                reservation_id: newValue as BookingStatusOption | null,
              }))
            }
            options={bookingStatusesList}
            getOptionLabel={(option) => getLocalizedName(option?.name)}
            getOptionKey={(option) => option?.id}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            disabled={initDataLoading}
            placeholder={t('Label.select')}
            highlighted={
              !!(searchValue && t('Label.booking_status')?.toLowerCase().includes(searchValue))
            }
            renderOption={(props, option) => {
              const { key, ...otherProps } = props as any;
              return (
                <li key={option?.id} {...otherProps}>
                  {getLocalizedName(option?.name) || ''}
                </li>
              );
            }}
          />
          <FilterDropdown
            label={t('Label.pilgrim_status')}
            value={filters.pilgrimStatus}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, pilgrimStatus: value }))}
            options={pilgrimStatusOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={
              !!(searchValue && t('Label.pilgrim_status')?.toLowerCase().includes(searchValue))
            }
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterDropdown
            label={t('Label.pilgrim_type')}
            value={filters.pilgrimType}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, pilgrimType: value }))}
            options={pilgrimTypeOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={
              !!(searchValue && t('Label.pilgrim_type')?.toLowerCase().includes(searchValue))
            }
          />
          <FilterDropdown
            label={t('Label.muhrim_status')}
            value={filters.muhrimStatus}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, muhrimStatus: value }))}
            options={muhrimStatusOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={
              !!(searchValue && t('Label.muhrim_status')?.toLowerCase().includes(searchValue))
            }
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterToggleGroup
            label={t('Label.gender')}
            value={filters.gender}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, gender: value }))}
            options={genderToggleOptions}
            disabled={initDataLoading}
            highlighted={!!(searchValue && t('Label.gender')?.toLowerCase().includes(searchValue))}
          />

          <FilterToggleGroup
            label={t('Label.early_late')}
            value={filters.marriedLate}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, marriedLate: value }))}
            options={departureToggleOptions}
            disabled={initDataLoading}
            highlighted={
              !!(searchValue && t('Label.early_late')?.toLowerCase().includes(searchValue))
            }
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FilterDropdown
            label={t('Label.source')}
            value={filters.source}
            onChange={(value: string) => setFilters((prev) => ({ ...prev, source: value }))}
            options={sourceOptions}
            allLabel={t('Label.all')}
            disabled={initDataLoading}
            highlighted={!!(searchValue && t('Label.source')?.toLowerCase().includes(searchValue))}
          />
        </Stack>
      </Stack>
    </FilterSection>
  );
}
