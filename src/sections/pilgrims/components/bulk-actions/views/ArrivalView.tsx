'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { BulkActionViewProps } from '../shared/types';
import BulkActionFooter from '../shared/BulkActionFooter';
import BulkSectionHeader from '../shared/BulkSectionHeader';
import { useUpdateDepartureStatus } from '../../../../../services/mutations/pilgrims';

export default function ArrivalView({
  onBack,
  onClose,
  selectedCount,
  selectedPilgrims,
  onClearSelection,
}: BulkActionViewProps) {
  const t = useTranslations('Pilgrims');
  const [arrivalType, setArrivalType] = useState<'early' | 'late'>('early');

  const updateDepartureStatusMutation = useUpdateDepartureStatus({
    onSuccess: () => {
      enqueueSnackbar(t('Message.departure_status_updated_successfully'), { variant: 'success' });
      if (onClearSelection) {
        onClearSelection();
      }
      onClose();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.message || t('Message.error_updating_departure_status'), {
        variant: 'error',
      });
    },
  });

  const handleSave = () => {
    if (!selectedPilgrims || selectedPilgrims.length === 0) {
      enqueueSnackbar(t('Message.please_select_pilgrims'), { variant: 'warning' });
      return;
    }

    const pilgrimIds = selectedPilgrims.map((pilgrim) => pilgrim.id);
    const departureStatus = arrivalType !== 'early';

    updateDepartureStatusMutation.mutate({
      departure_status: departureStatus,
      pilgrim_ids: pilgrimIds,
    });
  };

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      <BulkSectionHeader
        title={t('Label.arrival_time')}
        description={t('Description.arrival_time_description')}
      />

      {/* Arrival Type Toggle */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          borderRadius: '50px',
          p: 0.5,
          gap: 1,
          maxWidth: 300,
        }}
      >
        <Button
          onClick={() => setArrivalType('early')}
          sx={{
            flex: 1,
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            bgcolor: arrivalType === 'early' ? '#0d6efd' : 'transparent',
            color: arrivalType === 'early' ? 'white' : '#5D6679',
            border: 'none',
            '&:hover': {
              bgcolor: arrivalType === 'early' ? '#0b5ed7' : 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
        >
          {t('Label.arrival_early')}
        </Button>
        <Button
          onClick={() => setArrivalType('late')}
          sx={{
            flex: 1,
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 500,
            bgcolor: arrivalType === 'late' ? '#0d6efd' : 'transparent',
            color: arrivalType === 'late' ? 'white' : '#5D6679',
            border: 'none',
            '&:hover': {
              bgcolor: arrivalType === 'late' ? '#0b5ed7' : 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
        >
          {t('Label.arrival_late')}
        </Button>
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
            disabled: updateDepartureStatusMutation.isPending,
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
