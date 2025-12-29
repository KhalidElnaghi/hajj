'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Grid, MenuItem, Typography } from '@mui/material';
import {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFHijriDatePicker,
} from 'src/components/hook-form';
import { PilgrimInitDataResponse } from 'src/services/api/pilgrims';
import { permits } from '../../utils/constants';

type PersonalInfoTabProps = {
  isReadOnly: boolean;
  initData?: PilgrimInitDataResponse['data'];
  isRtl: boolean;
};

export default function PersonalInfoTab({ isReadOnly, initData, isRtl }: PersonalInfoTabProps) {
  const t = useTranslations('Pilgrims');

  const cities = useMemo(() => {
    if (!initData?.cities) return [];
    return initData.cities.map((city) => ({
      value: String(city?.city?.id || city?.id),
      label: isRtl
        ? city?.city?.name_ar || city?.name_ar || city?.city?.name || city?.name
        : city?.city?.name_en || city?.name_en || city?.city?.name || city?.name,
    }));
  }, [initData?.cities, isRtl]);

  const packages = useMemo(() => initData?.packages, [initData?.packages]);

  const nationalities = useMemo(() => {
    return initData?.countries;
  }, [initData?.countries]);

  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      {/* Row 1: Name Arabic & English */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.name_in_arabic')}
          </Typography>
          <RHFTextField
            name="nameAr"
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
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.name_in_english')}
          </Typography>
          <RHFTextField
            name="nameEn"
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

      {/* Row 2: Booking Number, ID Number, City */}
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
            {t('Label.booking_number')}
          </Typography>
          <RHFTextField
            name="bookingNumber"
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
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.id_number')}
          </Typography>
          <RHFTextField
            name="idNumber"
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
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.city')}
          </Typography>
          <RHFSelect name="city" isReadOnly={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.value} value={city.value}>
                {city.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>

      {/* Package, Nationality, Gender */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.package_name')}
          </Typography>
          <RHFSelect name="packageName" disabled={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {packages?.map((pkg) => (
              <MenuItem key={pkg?.id} value={String(pkg?.id)}>
                {isRtl ? pkg?.name_ar || pkg?.name : pkg?.name_en || pkg?.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.nationality')}
          </Typography>
          <RHFSelect name="nationality" isReadOnly={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {nationalities?.map((nat) => (
              <MenuItem key={nat?.country?.id} value={String(nat?.country?.id)}>
                {isRtl
                  ? nat?.country?.name_ar || nat?.country?.name
                  : nat?.country?.name_en || nat?.country?.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.gender')}
          </Typography>
          <RHFSelect name="gender" isReadOnly={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {initData?.genders.map((gender) => {
              const genderKey =
                gender.value === 0
                  ? 'Label.gender_female'
                  : gender.value === 1
                    ? 'Label.gender_male'
                    : null;

              return (
                <MenuItem key={gender.value} value={String(gender.value)}>
                  {genderKey ? t(genderKey) : gender.label || String(gender.value)}
                </MenuItem>
              );
            })}
          </RHFSelect>
        </Box>
      </Grid>

      {/* Dates */}
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
            {t('Label.arrival_date')}
          </Typography>
          <RHFDatePicker name="arrivalDate" isReadOnly={isReadOnly} />
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
            {t('Label.departure_date')}
          </Typography>
          <RHFDatePicker name="departureDate" isReadOnly={isReadOnly} />
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
            {t('Label.permit')}
          </Typography>
          <RHFSelect name="permit" isReadOnly={isReadOnly}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {permits.map((permit) => (
              <MenuItem key={permit.value} value={permit.value}>
                {permit.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>

      {/* Birth Dates and Age */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.gregorian_birth_date')}
          </Typography>
          <RHFDatePicker name="gregorianBirthDate" isReadOnly={isReadOnly} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.hijri_birth_date')}
          </Typography>
          <RHFHijriDatePicker
            name="hijriBirthDate"
            placeholder="DD/MM/YYYY"
            isReadOnly={isReadOnly}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.age')}
          </Typography>
          <RHFTextField
            name="age"
            type="number"
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

      {/* Mobile Numbers */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="body2"
            component="label"
            sx={{
              fontWeight: 500,
              mb: 1.5,
              color: 'text.secondary',
              display: 'block',
            }}
          >
            {t('Label.mobile_number')}
          </Typography>
          <RHFTextField
            name="mobileNumber"
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
            {t('Label.another_mobile_number')}
          </Typography>
          <RHFTextField
            name="anotherMobileNumber"
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
