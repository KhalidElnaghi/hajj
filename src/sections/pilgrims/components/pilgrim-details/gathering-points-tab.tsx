'use client';

import { useTranslations } from 'next-intl';
import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';
import { gatheringPointTypes, gatheringPoints } from '../../utils/constants';

type GatheringPointsTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function GatheringPointsTab({ isReadOnly, initData, isRtl }: GatheringPointsTabProps) {
  const t = useTranslations('Pilgrims');

  // For destination, we'll use the same options as gathering points for now
  // You can adjust this based on your API response
  const destinations = gatheringPoints;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
            }}
          >
            {t('Label.gathering_point_type')}
          </Typography>
          <RHFSelect name="gatheringPointType" disabled={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {gatheringPointTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
            }}
          >
            {t('Label.gathering_point')}
          </Typography>
          <RHFSelect name="gatheringPoint" disabled={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {gatheringPoints.map((point) => (
              <MenuItem key={point.value} value={point.value}>
                {point.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
            }}
          >
            {t('Label.destination')}
          </Typography>
          <RHFSelect name="prominent" disabled={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {destinations.map((dest) => (
              <MenuItem key={dest.value} value={dest.value}>
                {dest.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>
    </Grid>
  );
}

