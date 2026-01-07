'use client';

import { Box, Card, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export type BedStatus = 'empty' | 'full' | 'reserved' | 'same-reservation' | 'same-group' | 'break-between' | 'break-reservation' | 'named';

export interface Bed {
  number: number;
  status: BedStatus;
  name?: string;
}

export interface HallData {
  id: string;
  name: string;
  capacity: number;
  reserved: number;
  available: number;
  occupancyPercentage: number;
  beds: Bed[];
}

interface AccommodationCardProps {
  hall: HallData;
  onDelete?: (hallId: string) => void;
  onAdd?: (hallId: string) => void;
  onBedClick?: (hallId: string, bedNumber: number) => void;
}

const getBedColor = (status: BedStatus): string => {
  switch (status) {
    case 'empty':
      return '#2196F3'; // Blue
    case 'full':
      return '#4CAF50'; // Green
    case 'reserved':
      return '#F44336'; // Red
    case 'same-reservation':
      return '#FF9800'; // Orange
    case 'same-group':
      return '#8BC34A'; // Light Green
    case 'break-between':
      return '#03A9F4'; // Light Blue
    case 'break-reservation':
      return '#E91E63'; // Light Red/Pink
    case 'named':
      return '#9E9E9E'; // Grey
    default:
      return '#E0E0E0'; // Default grey
  }
};

export default function AccommodationCard({ hall, onDelete, onAdd, onBedClick }: AccommodationCardProps) {
  const handleBedClick = (bedNumber: number) => {
    if (onBedClick) {
      onBedClick(hall.id, bedNumber);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: (theme) => theme.customShadows.z8,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            onClick={() => onDelete?.(hall.id)}
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" width={20} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onAdd?.(hall.id)}
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Iconify icon="solar:add-circle-bold" width={20} />
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {hall.occupancyPercentage}%
          </Typography>
          <Iconify icon="solar:alt-arrow-up-bold" width={16} sx={{ color: 'primary.main' }} />
        </Stack>
      </Stack>

      {/* Capacity Stats and Hall Name */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1.5}>
          <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 3,
              bgcolor: 'grey.100',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            المحجوز ({hall.reserved})
          </Box>
          <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 3,
              bgcolor: 'grey.100',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            المتاح ({hall.available})
          </Box>
          <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 3,
              bgcolor: 'grey.100',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            السعة ({hall.capacity})
          </Box>
        </Stack>

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {hall.name}
        </Typography>
      </Stack>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="البحث بالإسم، الجوال، رقم الحجز، رقم الهوية..."
        size="small"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="solar:magnifer-bold" width={20} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Bed Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 1,
          flex: 1,
        }}
      >
        {hall.beds.map((bed) => (
          <Box
            key={bed.number}
            onClick={() => handleBedClick(bed.number)}
            sx={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1.5,
              bgcolor: getBedColor(bed.status),
              color: bed.status === 'empty' || bed.status === 'break-between' ? 'white' : 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: (theme) => theme.customShadows.z12,
              },
            }}
          >
            {bed.number}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

