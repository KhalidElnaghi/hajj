'use client';

import { Autocomplete, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';

import { usePilgrimIds } from 'src/sections/pilgrims/hooks/usePilgrimIds';
import { useManualDistributePilgrims } from 'src/services/mutations/pilgrims';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';

import BulkActionFooter from '../shared/BulkActionFooter';
import BulkSectionHeader from '../shared/BulkSectionHeader';
import { BulkActionViewProps } from '../shared/types';

interface Option<T = any> {
  value: number;
  label: string;
  meta?: T;
}

const getLocalizedName = (name: any, locale: string): string => {
  if (!name) return '';

  if (typeof name === 'string') return name;

  if (typeof name === 'object') {
    return locale === 'ar' ? name?.ar ?? name?.en ?? '' : name?.en ?? name?.ar ?? '';
  }

  return '';
};

export default function TransportationView({
  onClose,
  selectedPilgrims,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  const { data: initDataResponse, isLoading: isInitLoading } = useFetchPilgrimInitData();
  const distributeMutation = useManualDistributePilgrims();

  const [gatheringPointTypeId, setGatheringPointTypeId] = useState<number | null>(null);
  const [selectedBuses, setSelectedBuses] = useState<Option[]>([]);

  const pilgrimIds = usePilgrimIds(selectedPilgrims);

  const gatheringPointTypeOptions = useMemo<Option[]>(() => {
    const types = (initDataResponse?.data?.gatheringPointTypes ?? []) as any[];

    return types.reduce((acc: Option[], type: any) => {
      const value = Number(type?.id ?? type?.value);
      if (!Number.isFinite(value)) return acc;

      const label = getLocalizedName(type?.name ?? type?.label, locale) || String(value);
      acc.push({ value, label });

      return acc;
    }, []);
  }, [initDataResponse, locale]);

  const busOptions = useMemo<Option[]>(() => {
    const buses = (initDataResponse?.data?.buses ?? []) as any[];

    return buses.reduce((acc: Option[], bus: any) => {
      const value = Number(bus?.id ?? bus?.value);
      if (!Number.isFinite(value)) return acc;

      const label = getLocalizedName(bus?.name ?? bus?.label, locale) || String(value);
      acc.push({ value, label, meta: bus });

      return acc;
    }, []);
  }, [initDataResponse, locale]);

  const handleClearAll = () => {
    setGatheringPointTypeId(null);
    setSelectedBuses([]);
  };

  const handleSave = async () => {
    if (!gatheringPointTypeId || !selectedBuses.length || !pilgrimIds.length) return;

    try {
      await distributeMutation.mutateAsync({
        gathering_point_type_id: gatheringPointTypeId,
        pilgrim_ids: pilgrimIds,
        bus_ids: selectedBuses.map((bus) => bus.value),
      });

      enqueueSnackbar(t('Message.manual_distribute_successfully'), { variant: 'success' });
      handleClearAll();

      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || t('Message.manual_distribute_error');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const isSaveDisabled =
    !gatheringPointTypeId ||
    !selectedBuses.length ||
    !pilgrimIds.length ||
    distributeMutation.isPending;

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      <BulkSectionHeader title={t('Label.transportation_data')} />

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
            {t('Label.gathering_point_type')}
          </Typography>

          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            {gatheringPointTypeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => {
                  setGatheringPointTypeId(option.value);
                }}
                sx={{
                  borderRadius: '50px',
                  border:
                    gatheringPointTypeId === option.value
                      ? '1px solid #0d6efd'
                      : '1px solid #5D6679',
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  bgcolor: gatheringPointTypeId === option.value ? '#E8F1FD' : 'white',
                  color: gatheringPointTypeId === option.value ? '#0d6efd' : '#5D6679',
                  '&:hover': {
                    bgcolor: gatheringPointTypeId === option.value ? '#E8F1FD' : '#f9fafb',
                  },
                }}
              >
                {option.label}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
            {t('Label.transportation_vehicles')}
          </Typography>

          <Autocomplete
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            options={busOptions}
            value={selectedBuses}
            onChange={(_event, newValue) => setSelectedBuses(newValue)}
            loading={isInitLoading}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => {
              const { key, ...restProps } = props;
              const capacity = option.meta?.capacity;
              const plate = option.meta?.plate_no ?? option.meta?.plate;

              return (
                <li key={option.value} {...restProps}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {option.label}
                    </Typography>
                    {(capacity || plate) && (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {capacity ? `Capacity: ${capacity}` : ''}
                        {capacity && plate ? ' · ' : ''}
                        {plate ? `${t('Label.bus_number')}: ${plate}` : ''}
                      </Typography>
                    )}
                  </Box>
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.value}
                  label={option.label}
                  sx={{
                    borderRadius: '16px',
                    bgcolor: '#E8F1FD',
                    color: '#5D6679',
                    '& .MuiChip-label': { fontSize: 13, px: 1, fontWeight: 600 },
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('Label.transportation_data')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: '#fafafa',
                    minHeight: 56,
                  },
                }}
              />
            )}
            sx={{
              '& .MuiAutocomplete-endAdornment': {
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
          />
        </Stack>
      </Stack>

      <BulkActionFooter
        onCancel={onClose}
        cancelLabel={t('Button.cancel')}
        cancelSx={{
          borderColor: '#e5e7eb',
          color: '#666',
          '&:hover': {
            borderColor: '#d1d5db',
            bgcolor: '#fafafa',
          },
        }}
        actions={[
          {
            label: t('Button.save'),
            onClick: handleSave,
            loading: distributeMutation.isPending,
            disabled: isSaveDisabled,
            sx: {
              bgcolor: '#0d6efd',
              '&:hover': {
                bgcolor: '#0b5ed7',
              },
            },
          },
          {
            label: t('Button.clear'),
            onClick: handleClearAll,
            disabled: !gatheringPointTypeId && !selectedBuses.length,
            variant: 'outlined',
            sx: {
              borderColor: '#e5e7eb',
              color: '#5D6679',
              '&:hover': {
                borderColor: '#d1d5db',
                bgcolor: '#fafafa',
              },
            },
          },
        ]}
        justify="space-between"
      />
    </Stack>
  );
}
