'use client';

import { useTranslations } from 'next-intl';
import { Box, Grid, Typography } from '@mui/material';
import { RHFSelect, RHFTextarea } from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';
import { healthStatuses } from '../../utils/constants';

type HealthStatusTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function HealthStatusTab({ isReadOnly, initData, isRtl }: HealthStatusTabProps) {
  const t = useTranslations('Pilgrims');

  return (
    <>
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
              {t('Label.general_health_status')}
            </Typography>
            <RHFSelect name="generalHealthStatus" disabled={isReadOnly}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {healthStatuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
          }}
        >
          {t('Label.other_details_section')}
        </Typography>
        <RHFTextarea
          name="healthDetails"
          placeholder={t('Label.health_status_placeholder_alt')}
          rows={4}
          InputProps={{ readOnly: isReadOnly }}
          sx={{
            '& .MuiInputBase-input.Mui-readOnly': {
              cursor: 'default',
              backgroundColor: isReadOnly ? 'action.disabledBackground' : 'background.paper',
            },
          }}
        />
      </Box>
    </>
  );
}

