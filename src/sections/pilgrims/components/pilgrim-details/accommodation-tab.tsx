'use client';

import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Box, Chip, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';
import { accommodationAreas, campStatuses } from '../../utils/constants';

type AccommodationTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function AccommodationTab({ isReadOnly, initData, isRtl }: AccommodationTabProps) {
  const t = useTranslations('Pilgrims');
  const { control } = useFormContext();

  return (
    <>
      {/* Accommodation Area Chips */}
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent={isRtl ? 'flex-start' : 'flex-end'}
        sx={{ mb: 3 }}
      >
        <Controller
          name="accommodationArea"
          control={control}
          render={({ field }) => (
            <>
              {accommodationAreas.map((area) => {
                const selected = field.value === area.value;
                return (
                  <Chip
                    key={area.value}
                    label={area.label}
                    onClick={() => !isReadOnly && field.onChange(area.value)}
                    variant={selected ? 'filled' : 'outlined'}
                    disabled={isReadOnly}
                    sx={(theme) => ({
                      borderRadius: 999,
                      px: 2.5,
                      height: 32,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: selected
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.secondary,
                      bgcolor: selected ? theme.palette.primary.main : 'transparent',
                      borderColor: selected ? 'transparent' : theme.palette.grey[300],
                      '&:hover': {
                        bgcolor: isReadOnly
                          ? undefined
                          : selected
                            ? theme.palette.primary.dark
                            : theme.palette.grey[100],
                      },
                      cursor: isReadOnly ? 'default' : 'pointer',
                      opacity: isReadOnly && !selected ? 0.6 : 1,
                    })}
                  />
                );
              })}
            </>
          )}
        />
      </Stack>

      {/* Tent/Room Number and Camp Status */}
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
              {t('Label.tent_room_number')}
            </Typography>
            <RHFTextField
              name="tentRoomNumber"
              placeholder=""
              InputProps={{ readOnly: isReadOnly }}
              sx={{
                '& .MuiInputBase-input.Mui-readOnly': {
                  cursor: 'default',
                  backgroundColor: isReadOnly ? 'action.disabledBackground' : 'background.paper',
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
              {t('Label.camp_status')}
            </Typography>
            <RHFSelect name="campStatus" disabled={isReadOnly}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {campStatuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

