'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Grid, Typography } from '@mui/material';
import { RHFMultiSelect, RHFTextarea } from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';

type SupervisionTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function SupervisionTab({ isReadOnly, initData, isRtl }: SupervisionTabProps) {
  const t = useTranslations('Pilgrims');

  const supervisorOptions = useMemo(() => {
    if (!initData?.employees) return [];
    return initData.employees.map((employee) => {
      const name = employee.name;
      const label = isRtl
        ? employee.name.ar || (typeof name === 'string' ? name : name?.ar || '')
        : employee.name.en || (typeof name === 'string' ? name : name?.en || '');

      return {
        value: String(employee.id),
        label,
      };
    });
  }, [initData?.employees, isRtl]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 3,
              }}
            >
              {t('Label.supervisors')}
            </Typography>
            <RHFMultiSelect
              name="supervisors"
              label={t('Label.supervisors')}
              options={supervisorOptions}
              chip
              placeholder={t('Label.supervisors')}
              disabled={isReadOnly}
              sx={{ width: '100%' }}
            />
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
          {t('Label.supervisor_notes')}
        </Typography>
        <RHFTextarea
          name="supervisorNotes"
          placeholder={t('Label.supervisor_notes_placeholder')}
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
