'use client';

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';

import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import { useAssignPilgrimSupervisors } from 'src/services/mutations/pilgrims';

import { BulkActionViewProps } from '../shared/types';

interface SupervisorOption {
  value: string;
  label: string;
  avatar?: string;
  employee: any;
}

export default function SupervisorsView({
  onClose,
  onClearSelection,
  selectedPilgrims,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  const { data: initDataResponse, isLoading } = useFetchPilgrimInitData();
  const employees = (initDataResponse?.data?.employees ?? []) as any[];
  const assignSupervisorsMutation = useAssignPilgrimSupervisors();

  const supervisorOptions = useMemo<SupervisorOption[]>(() => {
    return employees.reduce<SupervisorOption[]>((acc, employee) => {
      const name = employee?.name;
      const localizedName =
        locale === 'ar'
          ? ((typeof name === 'string' ? name : name?.ar) ?? name?.en ?? '')
          : ((typeof name === 'string' ? name : name?.en) ?? name?.ar ?? '');

      if (!localizedName) return acc;

      const avatar =
        employee?.avatar ??
        employee?.image ??
        employee?.profile_image ??
        employee?.media?.original_url;

      acc.push({
        value: String(employee?.id ?? ''),
        label: localizedName,
        avatar,
        employee,
      });

      return acc;
    }, []);
  }, [employees, locale]);

  const [selectedSupervisors, setSelectedSupervisors] = useState<SupervisorOption[]>([]);

  const handleSave = async () => {
    const pilgrimIds = (selectedPilgrims ?? [])
      .map((pilgrim) => Number(pilgrim?.id))
      .filter((id) => Number.isFinite(id));
    const supervisorIds = selectedSupervisors
      .map((option) => Number(option.value))
      .filter((id) => Number.isFinite(id));


    try {
    const response = await assignSupervisorsMutation.mutateAsync({
        pilgrim_ids: pilgrimIds,
        supervisor_ids: supervisorIds,
      });
      enqueueSnackbar(t('Message.supervisors_assigned_successfully'), { variant: 'success' });
      setSelectedSupervisors([]);

      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Failed to link supervisors';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleClearAll = () => {
    setSelectedSupervisors([]);
  };

  return (
    <Stack spacing={2.5} sx={{ p: 1 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Label.link_supervisors')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Label.supervision_organization')}
        </Typography>
      </Box>

      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 14 }}>
          {t('Label.supervisors')}
        </Typography>
        <Autocomplete
          multiple
          disableCloseOnSelect
          filterSelectedOptions
          options={supervisorOptions}
          value={selectedSupervisors}
          loading={isLoading}
          onChange={(_event, newValue) => setSelectedSupervisors(newValue)}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option) => {
            const { key, ...restProps } = props;
            return (
              <li
                key={option.value}
                {...restProps}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Avatar
                  src={option.avatar}
                  alt={option.label}
                  sx={{ width: 28, height: 28, bgcolor: '#e5e7eb' }}
                >
                  {!option.avatar && option.label.charAt(0)}
                </Avatar>
                <Box component="span" sx={{ fontSize: 14 }}>
                  {option.label}
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
                avatar={
                  option.avatar ? (
                    <Avatar src={option.avatar} alt={option.label} sx={{ width: 24, height: 24 }} />
                  ) : undefined
                }
                sx={{
                  borderRadius: '16px',
                  bgcolor: '#E8F1FD',
                  color: '#5D6679',
                  // border: '1px solid #0d6efd',
                  '& .MuiChip-label': { fontSize: 13, px: 1, fontWeight: 600 },
                  // '& .MuiChip-avatar': { bgcolor: '#fff' },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  bgcolor: '#fafafa',
                },
              }}
            />
          )}
          sx={{
            '& .MuiOutlinedInput-root': {
              minHeight: 56,
            },
            '& .MuiAutocomplete-endAdornment': {
              top: '50%',
              transform: 'translateY(-50%)',
            },
          }}
        />
      </Stack>

      <Stack direction="row" spacing={1.5} justifyContent="space-between">
        <Button
          variant="text"
          onClick={onClose}
          color="error"
          sx={{
            borderRadius: 1,

            px: 3,
          }}
        >
          {t('Button.cancel')}
        </Button>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            disabled={!selectedSupervisors.length}
            sx={{
              borderRadius: 1,
              px: 3,
            }}
          >
            {t('Button.clear_all')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleSave}
            loading={assignSupervisorsMutation.isPending}
            disabled={
              !selectedSupervisors.length ||
              !selectedPilgrims?.length ||
              assignSupervisorsMutation.isPending
            }
            sx={{
              borderRadius: 1,
              bgcolor: '#0d6efd',
              px: 3,
              '&:hover': {
                bgcolor: '#0b5ed7',
              },
            }}
          >
            {t('Button.save')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
