'use client';

import { useState } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Iconify from 'src/components/iconify';
import AccommodationCard, { HallData } from './components/accommodation-card';

// ----------------------------------------------------------------------

// Static data for halls
const staticHallsData: HallData[] = [
  {
    id: 'hall-1',
    name: 'صالة 1',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
  {
    id: 'hall-2',
    name: 'صالة 2',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
  {
    id: 'hall-3',
    name: 'صالة 3',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
  {
    id: 'hall-4',
    name: 'صالة 4',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
  {
    id: 'hall-5',
    name: 'صالة 5',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
  {
    id: 'hall-6',
    name: 'صالة 6',
    capacity: 30,
    reserved: 7,
    available: 14,
    occupancyPercentage: 70,
    beds: [
      { number: 8, status: 'full' },
      { number: 7, status: 'full' },
      { number: 6, status: 'same-reservation' },
      { number: 5, status: 'same-reservation' },
      { number: 4, status: 'same-reservation' },
      { number: 3, status: 'same-reservation' },
      { number: 2, status: 'full' },
      { number: 1, status: 'named', name: 'محمد' },
      { number: 16, status: 'full' },
      { number: 15, status: 'full' },
      { number: 14, status: 'break-between' },
      { number: 13, status: 'full' },
      { number: 12, status: 'empty' },
      { number: 11, status: 'empty' },
      { number: 10, status: 'break-reservation' },
      { number: 9, status: 'reserved' },
      { number: 24, status: 'full' },
      { number: 23, status: 'break-between' },
      { number: 22, status: 'full' },
      { number: 21, status: 'break-reservation' },
      { number: 20, status: 'reserved' },
      { number: 19, status: 'reserved' },
      { number: 18, status: 'reserved' },
      { number: 17, status: 'reserved' },
      { number: 30, status: 'named' },
      { number: 29, status: 'named' },
      { number: 28, status: 'named' },
      { number: 27, status: 'named' },
      { number: 26, status: 'named' },
      { number: 25, status: 'named' },
    ],
  },
];

// Legend items
const legendItems = [
  { label: 'السرير فارغ', color: '#2196F3', status: 'empty' as const },
  { label: 'السرير محمد', color: '#9E9E9E', status: 'named' as const },
  { label: 'السرير محجوز', color: '#F44336', status: 'reserved' as const },
  { label: 'السرير ممتلى', color: '#4CAF50', status: 'full' as const },
  { label: 'في نفس الحجز', color: '#FF9800', status: 'same-reservation' as const },
  { label: 'في نفس الزمرة', color: '#8BC34A', status: 'same-group' as const },
  { label: 'كسر بين السراير', color: '#03A9F4', status: 'break-between' as const },
  { label: 'كسر في الحجز', color: '#E91E63', status: 'break-reservation' as const },
];

export default function AccommodationView() {
  const [selectedMode, setSelectedMode] = useState<'manual' | 'automatic'>('manual');

  const handleHallDelete = (hallId: string) => {
    console.log('Delete hall:', hallId);
    // Handle delete logic
  };

  const handleHallAdd = (hallId: string) => {
    console.log('Add to hall:', hallId);
    // Handle add logic
  };

  const handleBedClick = (hallId: string, bedNumber: number) => {
    console.log('Bed clicked:', hallId, bedNumber);
    // Handle bed click logic
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={3} sx={{ py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Iconify icon="solar:menu-dots-bold" width={24} />
            </IconButton>
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" width={24} />
            </IconButton>
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Iconify icon="solar:refresh-bold" width={24} />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              مخيم السكينة
            </Typography>
            <Iconify icon="solar:alt-arrow-left-bold" width={24} sx={{ color: 'text.secondary' }} />
          </Stack>
        </Stack>

        {/* Mode Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant={selectedMode === 'manual' ? 'contained' : 'outlined'}
            onClick={() => setSelectedMode('manual')}
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              ...(selectedMode === 'manual' && {
                bgcolor: 'primary.dark',
                '&:hover': { bgcolor: 'primary.dark' },
              }),
            }}
          >
            التسكين اليدوي
          </Button>
          <Button
            variant={selectedMode === 'automatic' ? 'contained' : 'outlined'}
            onClick={() => setSelectedMode('automatic')}
            sx={{
              px: 3,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              ...(selectedMode === 'automatic' && {
                bgcolor: 'primary.dark',
                '&:hover': { bgcolor: 'primary.dark' },
              }),
            }}
          >
            التسكين التلقائي لغير المسكنين
          </Button>
        </Stack>

        {/* Legend */}
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1.5 }}>
          {legendItems.map((item) => (
            <Stack key={item.status} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: item.color,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Halls Grid */}
        <Grid container spacing={3}>
          {staticHallsData.map((hall) => (
            <Grid key={hall.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <AccommodationCard
                hall={hall}
                onDelete={handleHallDelete}
                onAdd={handleHallAdd}
                onBedClick={handleBedClick}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
