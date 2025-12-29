'use client';

import { useTranslations } from 'next-intl';
import { Box, Grid, Typography } from '@mui/material';
import { RHFTextField } from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';

type TransportationTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function TransportationTab({ isReadOnly, initData, isRtl }: TransportationTabProps) {
  const t = useTranslations('Pilgrims');

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
            }}
          >
            {t('Label.bus_number')}
          </Typography>
          <RHFTextField
            name="busNumber"
            placeholder=""
            isReadOnly={isReadOnly}
            sx={{
              '& .MuiInputBase-input.Mui-readOnly': {
                cursor: 'default',
                // backgroundColor: isReadOnly ? 'action.disabledBackground' : 'background.paper',
              },
            }}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
            }}
          >
            {t('Label.seat_number')}
          </Typography>
          <RHFTextField
            name="seatNumber"
            placeholder=""
            isReadOnly={isReadOnly}
            sx={{
              '& .MuiInputBase-input.Mui-readOnly': {
                cursor: 'default',
                // backgroundColor: isReadOnly ? 'action.disabledBackground' : 'background.paper',
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
