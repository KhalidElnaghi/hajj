'use client';

import { Box, Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';

import { usePilgrimIds } from 'src/sections/pilgrims/hooks/usePilgrimIds';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import { useBulkAssignGatheringPoint } from 'src/services/mutations/pilgrims';

import { BulkActionViewProps } from '../shared/types';
import BulkActionFooter from '../shared/BulkActionFooter';
import BulkSectionHeader from '../shared/BulkSectionHeader';

export default function GatheringView({
  onBack,
  onClose,
  selectedPilgrims,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const locale = useLocale();
  const { enqueueSnackbar } = useSnackbar();

  const { data: initDataResponse, isLoading: isInitLoading } = useFetchPilgrimInitData();
  const bulkAssignGatheringPointMutation = useBulkAssignGatheringPoint();

  const [tripType, setTripType] = useState<'departure' | 'return'>('departure');
  const [gatheringPointId, setGatheringPointId] = useState<number | ''>('');
  const [destinationId, setDestinationId] = useState<number | ''>('');
  const [gatheringPointTimeId, setGatheringPointTimeId] = useState<number | ''>('');

  const pilgrimIds = usePilgrimIds(selectedPilgrims);

  const gatheringPointTypes = useMemo(() => {
    const allTypes = initDataResponse?.data?.gatheringPointTypes ?? [];
    // Filter by trip type: 1 = departure (ذهاب), 2 = return (عودة)
    return allTypes.filter((type: any) => {
      if (tripType === 'departure') {
        return type.id === 1;
      }
      return type.id === 2;
    });
  }, [initDataResponse, tripType]);

  const selectedType = useMemo(
    () => gatheringPointTypes[0], // Auto-select the first (and only) type based on trip type
    [gatheringPointTypes]
  );

  const gatheringPointTypeId = useMemo(
    () => (selectedType?.id as number) || (''),
    [selectedType]
  );

  const gatheringPoints = useMemo(
    () => selectedType?.gathering_points ?? [],
    [selectedType]
  );

  const selectedPoint = useMemo(
    () => gatheringPoints.find((point: any) => point.id === gatheringPointId),
    [gatheringPoints, gatheringPointId]
  );

  const destinations = useMemo(() => selectedPoint?.destinations ?? [], [selectedPoint]);

  const times = useMemo(() => selectedPoint?.times ?? [], [selectedPoint]);

  const getLocalizedName = (name: any) => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return locale === 'ar' ? name.ar || name.en || '' : name.en || name.ar || '';
  };

  const formatTime = (time: string, currentLocale: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = currentLocale === 'ar' ? (hour >= 12 ? 'م' : 'ص') : hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const handleSave = async () => {
    if (
      !gatheringPointId ||
      !destinationId ||
      !gatheringPointTimeId ||
      !pilgrimIds.length ||
      !gatheringPointTypeId
    )
      return;

    try {
      await bulkAssignGatheringPointMutation.mutateAsync({
        gathering_point_id: Number(gatheringPointId),
        gathering_point_type_id: Number(gatheringPointTypeId),
        pilgrim_ids: pilgrimIds,
        source: 'dashboard',
        destination_id: Number(destinationId),
        gathering_point_time_id: Number(gatheringPointTimeId),
      });

      enqueueSnackbar(t('Message.gathering_point_assigned_successfully'), {
        variant: 'success',
      });

      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('Message.error_assigning_gathering_point');

      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const isSaveDisabled =
    !gatheringPointId ||
    !destinationId ||
    !gatheringPointTimeId ||
    !pilgrimIds.length ||
    bulkAssignGatheringPointMutation.isPending;

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      <BulkSectionHeader
        title={t('Label.gathering_points')}
        description={t('Description.gathering_points_description')}
      />

      {/* Trip Type Toggle */}
      <Stack direction="row" spacing={2} justifyContent="start">
        <Button
          onClick={() => {
            setTripType('departure');
            setGatheringPointId('');
            setDestinationId('');
            setGatheringPointTimeId('');
          }}
          sx={{
            borderRadius: '50px',
            border: tripType === 'departure' ? '1px solid #0d6efd' : '1px solid #5D6679',
            px: 3,
            py: 1,
            minWidth: 100,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            bgcolor: tripType === 'departure' ? '#E8F1FD' : 'white',
            color: tripType === 'departure' ? '#0d6efd' : '#5D6679',
            '&:hover': {
              bgcolor: tripType === 'departure' ? '#E8F1FD' : '#f9fafb',
            },
          }}
        >
          {t('Label.trip_departure')}
        </Button>
        <Button
          onClick={() => {
            setTripType('return');
            setGatheringPointId('');
            setDestinationId('');
            setGatheringPointTimeId('');
          }}
          sx={{
            borderRadius: '50px',
            border: tripType === 'return' ? '1px solid #0d6efd' : '1px solid #5D6679',
            px: 3,
            py: 1,
            minWidth: 100,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            bgcolor: tripType === 'return' ? '#E8F1FD' : 'white',
            color: tripType === 'return' ? '#0d6efd' : '#5D6679',
            '&:hover': {
              bgcolor: tripType === 'return' ? '#E8F1FD' : '#f9fafb',
            },
          }}
        >
          {t('Label.trip_return')}
        </Button>
      </Stack>

      {/* Gathering Point */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Label.gathering_point')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={gatheringPointId}
            onChange={(e) => {
              setGatheringPointId(e.target.value as number);
              setDestinationId('');
              setGatheringPointTimeId('');
            }}
            displayEmpty
            disabled={isInitLoading}
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Placeholder.select_gathering_point')}
            </MenuItem>
            {gatheringPoints.map((point: any) => (
              <MenuItem key={point.id} value={point.id}>
                {getLocalizedName(point.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Destination */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Label.destination')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value as number)}
            displayEmpty
            disabled={!gatheringPointId || isInitLoading}
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Placeholder.select_destination')}
            </MenuItem>
            {destinations.map((dest: any) => (
              <MenuItem key={dest.id} value={dest.destination_id}>
                {getLocalizedName(dest.destination?.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Gathering Time */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Label.gathering_time')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={gatheringPointTimeId}
            onChange={(e) => setGatheringPointTimeId(e.target.value as number)}
            displayEmpty
            disabled={!gatheringPointId || isInitLoading}
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Placeholder.select_gathering_time')}
            </MenuItem>
            {times.map((time: any) => (
              <MenuItem key={time.id} value={time.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatTime(time.from, locale)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    -
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatTime(time.to, locale)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
            loading: bulkAssignGatheringPointMutation.isPending,
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
