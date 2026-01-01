'use client';

import { Autocomplete, Box, Chip, Stack, TextField, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';

import { usePilgrimIds } from 'src/sections/pilgrims/hooks/usePilgrimIds';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import { useBulkAutoAssignHousing } from 'src/services/mutations/pilgrims';

import { BulkActionViewProps } from '../shared/types';
import BulkActionFooter from '../shared/BulkActionFooter';
import BulkSectionHeader from '../shared/BulkSectionHeader';

interface Option {
  value: number;
  label: string;
}

const getLocalizedName = (name: any, locale: string): string => {
  if (!name) return '';

  if (typeof name === 'string') return name;

  if (typeof name === 'object') {
    return locale === 'ar' ? (name?.ar ?? name?.en ?? '') : (name?.en ?? name?.ar ?? '');
  }

  return '';
};

export default function AccommodationView({
  onClose,
  selectedPilgrims,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedRitual, setSelectedRitual] = useState<number | null>(null);
  const [selectedCamps, setSelectedCamps] = useState<Option[]>([]);

  const { data: initDataResponse, isLoading: isInitLoading } = useFetchPilgrimInitData();
  const bulkAssignMutation = useBulkAutoAssignHousing();

  const pilgrimIds = usePilgrimIds(selectedPilgrims);

  const ritualsOptions = useMemo<Option[]>(() => {
    const rituals = ((initDataResponse?.data as any)?.rituals ?? []) as any[];

    return rituals.reduce((acc: Option[], ritual: any) => {
      const value = Number(ritual?.id ?? ritual?.value);
      if (!Number.isFinite(value)) return acc;

      const label =
        getLocalizedName(ritual?.name ?? ritual?.label ?? ritual?.title, locale) || String(value);

      acc.push({ value, label });
      return acc;
    }, []);
  }, [initDataResponse, locale]);

  const campOptions = useMemo<Option[]>(() => {
    const camps = (initDataResponse?.data?.camps ?? []) as any[];

    return camps.reduce((acc: Option[], camp: any) => {
      const value = Number(camp?.id ?? camp?.value);
      if (!Number.isFinite(value)) return acc;

      const label =
        getLocalizedName(camp?.name ?? camp?.label ?? camp?.camp_no, locale) || String(value);

      acc.push({ value, label });
      return acc;
    }, []);
  }, [initDataResponse, locale]);

  const handleClearAll = () => {
    setSelectedRitual(null);
    setSelectedCamps([]);
  };

  const handleSave = async () => {
    if (!selectedRitual || !selectedCamps.length || !pilgrimIds.length) return;

    try {
      await bulkAssignMutation.mutateAsync({
        ritual_id: selectedRitual,
        camp_ids: selectedCamps.map((camp) => camp.value),
        pilgrim_ids: pilgrimIds,
      });

      enqueueSnackbar(t('Message.housing_auto_assigned_successfully'), { variant: 'success' });
      handleClearAll();

      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || t('Message.error_assigning_housing');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const isSaveDisabled =
    !selectedRitual || !selectedCamps.length || !pilgrimIds.length || bulkAssignMutation.isPending;

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      <BulkSectionHeader
        title={t('Label.accommodation_needs_in_rituals')}
        description={t('Description.accommodation_description')}
      />

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
            {t('Label.ritual')}
          </Typography>
          <Stack direction="row" spacing={1.5}>
            {ritualsOptions.map((ritual) => (
              <Chip
                key={ritual.value}
                label={ritual.label}
                onClick={() => setSelectedRitual(ritual.value)}
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 2.5,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedRitual === ritual.value ? '#0d6efd' : '#d1d5db',
                  bgcolor: selectedRitual === ritual.value ? '#E8F1FD' : '#fff',
                  color: selectedRitual === ritual.value ? '#0d6efd' : '#6b7280',
                  '&:hover': {
                    bgcolor: selectedRitual === ritual.value ? '#d4e7fc' : '#f3f4f6',
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
            {t('Label.camp')}
          </Typography>
          <Autocomplete
            multiple
            filterSelectedOptions
            options={campOptions}
            value={selectedCamps}
            loading={isInitLoading}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_event, newValue) => setSelectedCamps(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('Placeholder.select_camps')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    bgcolor: '#fafafa',
                    py: 0.5,
                  },
                }}
              />
            )}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 56,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {t('Label.selected_camps_count', { count: selectedCamps.length })}
          </Typography>
        </Stack>
      </Stack>

      <BulkActionFooter
        onCancel={onClose}
        cancelLabel={t('Button.cancel')}
        cancelVariant="text"
        cancelColor="error"
        justify="space-between"
        actions={[
          {
            label: t('Button.clear_all'),
            onClick: handleClearAll,
            variant: 'outlined',
            color: 'error',
            disabled: !selectedRitual && !selectedCamps.length,
          },
          {
            label: t('Button.save'),
            onClick: handleSave,
            loading: bulkAssignMutation.isPending,
            disabled: isSaveDisabled,
            sx: {
              bgcolor: '#0d6efd',
              '&:hover': {
                bgcolor: '#0b5ed7',
              },
            },
          },
        ]}
      />
    </Stack>
  );
}
