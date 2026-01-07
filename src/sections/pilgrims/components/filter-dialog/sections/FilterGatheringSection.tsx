'use client';

import { useCallback, useMemo } from 'react';
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import FilterSection from '../components/FilterSection';

type FiltersShape = {
  gathering_point_type_id: string | number;
  gathering_point_id: string | number;
  destination_id: string | number;
  gathering_point_time_id: string | number;
  [key: string]: any;
};

interface GatheringSectionProps {
  title: string;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
  filters: FiltersShape;
  setFilters: Dispatch<SetStateAction<FiltersShape>>;
  initData: any;
  getLocalizedName: (name: any) => string;
  labelColor: (key: string) => string;
  t: (key: string) => string;
  initDataLoading: boolean;
  formatTime: (time: string, locale: string) => string;
  locale: string;
}

export default function FilterGatheringSection({
  title,
  expanded,
  onChange,
  filters,
  setFilters,
  initData,
  getLocalizedName,
  labelColor,
  t,
  initDataLoading,
  formatTime,
  locale,
}: GatheringSectionProps) {
  const gatheringPointTypes = useMemo(() => initData?.data?.gatheringPointTypes ?? [], [initData]);

  const selectedType = useMemo(
    () => gatheringPointTypes.find((type: any) => type.id === filters.gathering_point_type_id),
    [gatheringPointTypes, filters.gathering_point_type_id]
  );

  const selectedPoint = useMemo(
    () => selectedType?.gathering_points?.find((point: any) => point.id === filters.gathering_point_id),
    [selectedType, filters.gathering_point_id]
  );

  const handleTypeChange = useCallback(
    (value: string | number) => {
      setFilters((prev) => ({
        ...prev,
        gathering_point_type_id: value,
        gathering_point_id: '',
        destination_id: '',
        gathering_point_time_id: '',
      }));
    },
    [setFilters]
  );

  const handlePointChange = useCallback(
    (value: string | number) => {
      setFilters((prev) => ({
        ...prev,
        gathering_point_id: value,
        destination_id: '',
        gathering_point_time_id: '',
      }));
    },
    [setFilters]
  );

  const handleDestinationChange = useCallback(
    (value: string | number) => setFilters((prev) => ({ ...prev, destination_id: value })),
    [setFilters]
  );

  const handleTimeChange = useCallback(
    (value: string | number) => setFilters((prev) => ({ ...prev, gathering_point_time_id: value })),
    [setFilters]
  );

  return (
    <FilterSection title={title} expanded={expanded} onChange={onChange}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.gathering_point_type'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.gathering_point_type')}
            </Typography>
            <Select
              value={filters.gathering_point_type_id}
              onChange={(e) => handleTypeChange(e.target.value)}
              displayEmpty
              disabled={initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {gatheringPointTypes.map((type: any) => (
                <MenuItem key={type.id} value={type.id}>
                  {getLocalizedName(type.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.gathering_point'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.gathering_point')}
            </Typography>
            <Select
              value={filters.gathering_point_id}
              onChange={(e) => handlePointChange(e.target.value)}
              displayEmpty
              disabled={!filters.gathering_point_type_id || initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {selectedType?.gathering_points?.map((point: any) => (
                <MenuItem key={point.id} value={point.id}>
                  {getLocalizedName(point.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.destination'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.destination')}
            </Typography>
            <Select
              value={filters.destination_id}
              onChange={(e) => handleDestinationChange(e.target.value)}
              displayEmpty
              disabled={!filters.gathering_point_id || initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {selectedPoint?.destinations?.map((dest: any) => (
                <MenuItem key={dest.id} value={dest.destination_id}>
                  {getLocalizedName(dest.destination?.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Typography
              sx={{
                mb: 1,
                color: labelColor('Label.gathering_time'),
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '22px',
                textTransform: 'capitalize',
              }}
            >
              {t('Label.gathering_time')}
            </Typography>
            <Select
              value={filters.gathering_point_time_id}
              onChange={(e) => handleTimeChange(e.target.value)}
              displayEmpty
              disabled={!filters.gathering_point_id || initDataLoading}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="">{t('Label.all')}</MenuItem>
              {selectedPoint?.times?.map((time: any) => (
                <MenuItem key={time.id} value={time.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatTime(time.from, locale)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {locale === 'en' ? '→' : '←'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatTime(time.to, locale)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </FilterSection>
  );
}
