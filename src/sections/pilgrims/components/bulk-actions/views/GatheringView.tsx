'use client';

import { Box, Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { BulkActionViewProps } from '../shared/types';

export default function GatheringView({ onBack, onClose, selectedCount, onClearSelection }: BulkActionViewProps) {
  const t = useTranslations();
  const [tripType, setTripType] = useState<'departure' | 'return'>('return');
  const [gatheringPoint, setGatheringPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [nationality, setNationality] = useState('');

  const handleSave = () => {
    console.log('Saving gathering:', { tripType, gatheringPoint, destination, nationality });
    if (onClearSelection) {
      onClearSelection();
    }
    onClose();
  };

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      {/* Section Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          {t('Pilgrims.Label.gathering_points')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: 13 }}>
          {t('Pilgrims.Description.gathering_points_description')}
        </Typography>
      </Box>

      {/* Trip Type Toggle */}
      <Stack direction="row" spacing={2} justifyContent="start">
        <Button
          onClick={() => setTripType('return')}
          sx={{
            borderRadius: '50px',
            border: tripType === 'return' ? '1px solid #0d6efd' : '1px solid #5D6679',
            px: 2,
            py: 1,
            minWidth: 80,
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
          {t('Pilgrims.Label.trip_return')}
        </Button>
        <Button
          onClick={() => setTripType('departure')}
          sx={{
            borderRadius: '50px',
            border: tripType === 'departure' ? '1px solid #0d6efd' : '1px solid #5D6679',
            px: 2,
            py: 1,
            minWidth: 80,
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
          {t('Pilgrims.Label.trip_departure')}
        </Button>
      </Stack>

      {/* Gathering Point */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Pilgrims.Label.gathering_point')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={gatheringPoint}
            onChange={(e) => setGatheringPoint(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Pilgrims.Placeholder.select_gathering_point')}
            </MenuItem>
            <MenuItem value="jeddah">{t('Pilgrims.Label.city_jeddah')}</MenuItem>
            <MenuItem value="riyadh">{t('Pilgrims.Label.city_riyadh')}</MenuItem>
            <MenuItem value="dammam">{t('Pilgrims.Label.city_dammam')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Destination */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Pilgrims.Label.destination')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Pilgrims.Placeholder.select_destination')}
            </MenuItem>
            <MenuItem value="makkah">{t('Pilgrims.Label.city_makkah')}</MenuItem>
            <MenuItem value="madinah">{t('Pilgrims.Label.city_madinah')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Nationality */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: 14 }}>
          {t('Pilgrims.Label.nationality')}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 1,
              bgcolor: '#fafafa',
              '& .MuiSelect-select': { py: 1.5 },
            }}
          >
            <MenuItem value="" disabled>
              {t('Pilgrims.Placeholder.select_nationality')}
            </MenuItem>
            <MenuItem value="saudi">{t('Pilgrims.Label.nationality_saudi')}</MenuItem>
            <MenuItem value="egypt">{t('Pilgrims.Label.nationality_egypt')}</MenuItem>
            <MenuItem value="pakistan">{t('Pilgrims.Label.nationality_pakistan')}</MenuItem>
            <MenuItem value="indonesia">{t('Pilgrims.Label.nationality_indonesia')}</MenuItem>
          </Select>
        </FormControl>
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
          {t('Pilgrims.Button.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!gatheringPoint || !destination || !nationality}
          sx={{
            borderRadius: 1,
            bgcolor: '#0d6efd',
            px: 3,
            '&:hover': {
              bgcolor: '#0b5ed7',
            },
          }}
        >
          {t('Pilgrims.Button.save')}
        </Button>
      </Stack>
    </Stack>
  );
}
