'use client';

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function AccommodationView({
  onBack,
  onClose,
  selectedCount,
}: BulkActionViewProps) {
  const t = useTranslations();
  const [housingLocation, setHousingLocation] = useState('');

  const handleSave = () => {
    console.log('Saving accommodation:', housingLocation);
    onClose();
  };

  const handleDeleteTags = () => {
    setHousingLocation('');
  };

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      {/* Section Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Label.accommodation_needs_in_rituals')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Description.accommodation_description')}
        </Typography>
      </Box>

      {/* Housing Location Dropdown */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Label.housing_location_in_rituals')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={housingLocation}
            onChange={(e) => setHousingLocation(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': {
                py: 1.5,
              },
            }}
          >
            <MenuItem value="" disabled>
              <Typography variant="body2" color="text.secondary">
                {t('Placeholder.select_location')}
              </Typography>
            </MenuItem>
            <MenuItem value="mina">{t('Label.location_mina')}</MenuItem>
            <MenuItem value="arafat">{t('Label.location_arafat')}</MenuItem>
            <MenuItem value="muzdalifah">{t('Label.location_muzdalifah')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            color: '#dc3545',
            px: 3,
            '&:hover': {
              bgcolor: '#fff5f5',
            },
          }}
        >
          {t('Button.cancel')}
        </Button>
        <Button
          variant="outlined"
          onClick={handleDeleteTags}
          disabled={!housingLocation}
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
          {t('Button.delete_tags')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!housingLocation}
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

