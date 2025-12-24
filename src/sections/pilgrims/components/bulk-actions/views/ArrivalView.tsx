'use client';

import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
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
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, textAlign: 'right' }}>
          {t('Label.arrival_time')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13, textAlign: 'right' }}>
          {t('Description.arrival_time_description')}
        </Typography>
      </Box>

      {/* Arrival Type Toggle */}
      <Box>
        <ToggleButtonGroup
          value={arrivalType}
          exclusive
          onChange={(e, value) => value && setArrivalType(value)}
          fullWidth
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 1,
              border: '1px solid #e5e7eb',
              py: 1.5,
              fontSize: 14,
              fontWeight: 500,
              '&.Mui-selected': {
                bgcolor: '#0d6efd',
                color: 'white',
                borderColor: '#0d6efd',
                '&:hover': {
                  bgcolor: '#0b5ed7',
                },
              },
            },
          }}
        >
          <ToggleButton value="early">{t('Label.arrival_early')}</ToggleButton>
          <ToggleButton value="late">{t('Label.arrival_late')}</ToggleButton>
        </ToggleButtonGroup>
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

