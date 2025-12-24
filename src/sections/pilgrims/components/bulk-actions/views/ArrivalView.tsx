'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function ArrivalView({ onBack, onClose, selectedCount }: BulkActionViewProps) {
  const t = useTranslations();
  const [arrivalType, setArrivalType] = useState<'early' | 'late'>('early');

  const handleSave = () => {
    console.log('Saving arrival type:', arrivalType);
    onClose();
  };

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      {/* Section Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Label.arrival_time')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Description.arrival_time_description')}
        </Typography>
      </Box>

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

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            borderColor: '#e5e7eb',
            color: '#666',
            px: 3,
            '&:hover': {
              borderColor: '#d1d5db',
              bgcolor: '#fafafa',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
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
        </Button>
      </Stack>
    </Stack>
  );
}
