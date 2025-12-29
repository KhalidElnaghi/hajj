'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Divider,
  Chip,
  Grid,
  MenuItem,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';
import { useLocales } from 'src/locales';

import FormProvider from 'src/components/hook-form/form-provider';
import {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFHijriDatePicker,
  RHFTextarea,
  RHFMultiSelect,
} from 'src/components/hook-form';

import { Controller } from 'react-hook-form';
import Iconify from 'src/components/iconify';
import { PageHeader } from 'src/components/custom-page-headding';
import { useCreatePilgrim } from 'src/services/mutations/pilgrims';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import {
  accommodationAreas,
  campStatuses,
  gatheringPoints,
  gatheringPointTypes,
  healthStatuses,
  permits,
  pilgrimInitialValues,
  // prominentOptions,
} from './utils/constants';
import { createPilgrimValidationSchema } from './utils/validation';
import { PilgrimFormValues } from './utils/types';

export default function AddEditPilgrimForm() {
  const t = useTranslations('Pilgrims');
  const router = useRouter();
  const { currentLang } = useLocales();
  const isRtl = currentLang?.value === 'ar';
  const { enqueueSnackbar } = useSnackbar();
  const createPilgrimMutation = useCreatePilgrim();
  const { data } = useFetchPilgrimInitData();
  const initData = data?.data;

  const defaultValues = useMemo<PilgrimFormValues>(() => pilgrimInitialValues, []);

  const PilgrimSchema = useMemo(() => createPilgrimValidationSchema(t), [t]);

  const methods = useForm<PilgrimFormValues>({
    resolver: yupResolver(PilgrimSchema) as any,
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    createPilgrimMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar(t('Message.pilgrim_created_successfully'), {
          variant: 'success',
        });
        router.push(paths.dashboard.pilgrims.root);
      },
      onError: (error: any) => {
        console.error('Error submitting form:', error);
        enqueueSnackbar(
          error?.response?.data?.message ||
            error?.message ||
            t('Message.error_creating_pilgrim'),
          { variant: 'error' }
        );
      },
    });
  });

  const handleClearFields = () => {
    reset(defaultValues);
  };

  const cities = useMemo(() => {
    if (!initData?.cities) return [];
    return initData.cities.map((city) => ({
      value: String(city?.city?.id),
      label: isRtl
        ? city?.city?.name_ar || city?.city?.name
        : city?.city?.name_en || city?.city?.name,
    }));
  }, [initData?.cities, isRtl]);

  const packages = useMemo(() => initData?.packages, [initData?.packages]);

  const nationalities = useMemo(() => {
    return initData?.countries;
  }, [initData?.countries]);

  const supervisorOptions = useMemo(() => {
    if (!initData?.employees) return [];
    return initData.employees.map((employee) => ({
      value: String(employee.id),
      label: isRtl ? employee.name_ar || employee.name : employee.name_en || employee.name,
    }));
  }, [initData?.employees, isRtl]);

  const renderSectionHeader = (icon: string, title: string) => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={28} height={28} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Stack>
  );

  const renderSectionTitle = (title: string) => (
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
      {title}
    </Typography>
  );

  return (
    <Container maxWidth="xl" sx={{ width: '100%' }}>
      <Box sx={{ py: 4, width: '100%' }}>
        <PageHeader
          headding={t('Label.add_new_pilgrim')}
          subHeadding={t('Label.add_new_pilgrim_description')}
          backTo={'/pilgrims'}
        />

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card
            sx={{
              mt: 4,
              p: 4,
              borderRadius: 1,
              boxShadow: (theme) => theme.customShadows.card,
              width: '100%',
            }}
          >
            <Stack spacing={6}>
              {/* Personal Information Section */}
              <Box>
                {renderSectionHeader('solar:user-bold', t('Label.personal_information'))}
                <Grid container spacing={3} sx={{ width: '100%' }}>
                  {/* Row 1: Name Arabic & English - 2 fields */}
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFTextField name="nameAr" placeholder="" />
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFTextField name="nameEn" placeholder="" />
                    </Box>
                  </Grid>

                  {/* Row 2: Booking Number, ID Number, City - 3 fields */}
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
                      <RHFTextField name="bookingNumber" placeholder="" />
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFTextField name="idNumber" placeholder="" />
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFSelect name="city">
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFSelect name="packageName">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {packages?.map((pkg) => (
                          <MenuItem key={pkg?.id} value={pkg?.id}>
                            {isRtl ? pkg?.name_ar || pkg?.name : pkg?.name_en || pkg?.package?.name}
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFSelect name="nationality">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {nationalities?.map((nat) => (
                          <MenuItem key={nat?.country?.id} value={nat?.country?.id}>
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFSelect name="gender">
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
                      <RHFDatePicker name="arrivalDate" />
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
                      <RHFDatePicker name="departureDate" />
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
                      <RHFSelect name="permit">
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFDatePicker name="gregorianBirthDate" />
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFHijriDatePicker name="hijriBirthDate" placeholder="DD/MM/YYYY" />
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
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFTextField name="age" type="number" placeholder="" />
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
                        {t('Label.mobile_number')}
                        <Box
                          component="span"
                          sx={{
                            color: 'error.main',
                            ml: 0.5,
                          }}
                        >
                          *
                        </Box>
                      </Typography>
                      <RHFTextField name="mobileNumber" placeholder="" />
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
                      <RHFTextField name="anotherMobileNumber" placeholder="" />
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
                        {t('Label.add_photo')}
                      </Typography>
                      <Controller
                        name="photo"
                        control={methods.control}
                        render={({ field, fieldState: { error } }) => {
                          const file = field.value instanceof File ? field.value : null;
                          const fileName = file ? file.name : '';
                          const fileInputId = 'photo-input';

                          return (
                            <Box>
                              <Box
                                component="label"
                                htmlFor={fileInputId}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',
                                  height: 56,
                                  px: 2,
                                  borderRadius: 1.5,
                                  border: '1px solid',
                                  borderColor: error ? 'error.main' : 'grey.300',
                                  bgcolor: 'background.paper',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    borderColor: error ? 'error.main' : 'grey.400',
                                  },
                                  '&:focus-within': {
                                    borderColor: error ? 'error.main' : 'primary.main',
                                    borderWidth: 2,
                                  },
                                }}
                              >
                                <input
                                  id={fileInputId}
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    const selectedFile = e.currentTarget.files?.[0];
                                    if (selectedFile) {
                                      field.onChange(selectedFile);
                                      console.log('File selected:', {
                                        name: selectedFile.name,
                                        type: selectedFile.type,
                                        size: selectedFile.size,
                                        isFile: selectedFile instanceof File,
                                      });
                                    }
                                  }}
                                />
                                <Iconify
                                  icon="solar:gallery-add-bold"
                                  width={24}
                                  sx={{ color: 'grey.500', mr: 1.5 }}
                                />
                                <Box
                                  sx={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: fileName ? 'text.primary' : 'text.secondary',
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  {fileName ||
                                    t('Label.select_image') ||
                                    'Select an image'}
                                </Box>
                                {file && (
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      field.onChange(null);
                                      setValue('photo', null, { shouldValidate: true });
                                      const input = document.getElementById(
                                        fileInputId
                                      ) as HTMLInputElement;
                                      if (input) {
                                        input.value = '';
                                      }
                                    }}
                                    sx={{
                                      ml: 1,
                                      color: 'error.main',
                                      '&:hover': {
                                        bgcolor: 'error.lighter',
                                      },
                                    }}
                                  >
                                    <Iconify icon="solar:close-circle-bold" width={20} />
                                  </IconButton>
                                )}
                                {!file && (
                                  <Iconify
                                    icon="solar:alt-arrow-down-linear"
                                    width={20}
                                    sx={{ color: 'grey.500', ml: 1 }}
                                  />
                                )}
                              </Box>
                              {error && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: 'error.main',
                                    mt: 0.5,
                                    ml: 1.5,
                                    display: 'block',
                                  }}
                                >
                                  {error.message}
                                </Typography>
                              )}
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box>
                {renderSectionHeader('solar:bus-outline', t('Label.gathering_points'))}
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
                      <RHFSelect name="gatheringPointType">
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
                      <RHFSelect name="gatheringPoint">
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

                  {/* <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          mb: 1.5,
                          color: 'text.secondary',
                        }}
                      >
                        {t('Label.prominent')}
                      </Typography>
                      <RHFSelect name="prominent">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {prominentOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {t(`Label.${option.label}`)}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Box>
                  </Grid> */}
                </Grid>
              </Box>

              <Divider />

              <Box>
                {renderSectionHeader(
                  'solar:home-angle-outline',
                  t('Label.accommodation_residence')
                )}
                <Stack
                  direction="row"
                  spacing={1.5}
                  justifyContent={isRtl ? 'flex-start' : 'flex-end'}
                  sx={{ mb: 3 }}
                >
                  <Controller
                    name="accommodationArea"
                    control={methods.control}
                    render={({ field }) => (
                      <>
                        {accommodationAreas.map((area) => {
                          const selected = field.value === area.value;
                          return (
                            <Chip
                              key={area.value}
                              label={area.label}
                              onClick={() => field.onChange(area.value)}
                              variant={selected ? 'filled' : 'outlined'}
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
                                  bgcolor: selected
                                    ? theme.palette.primary.dark
                                    : theme.palette.grey[100],
                                },
                              })}
                            />
                          );
                        })}
                      </>
                    )}
                  />
                </Stack>
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
                      <RHFTextField name="tentRoomNumber" placeholder="" />
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
                      <RHFSelect name="campStatus">
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
              </Box>

              <Divider />

              {/* Transportation Section */}
              <Box>
                {renderSectionHeader('solar:bus-outline', t('Label.transportation_data'))}
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
                      <RHFTextField name="busNumber" placeholder="" />
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
                      <RHFTextField name="seatNumber" placeholder="" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Health Status Section */}
              <Box>
                {renderSectionHeader(
                  'solar:heart-pulse-outline',
                  t('Label.health_status_data')
                )}
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
                      <RHFSelect name="generalHealthStatus">
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
              </Box>

              <Divider />

              <Box>
                {renderSectionTitle(t('Label.other_details_section'))}
                <RHFTextarea
                  name="healthDetails"
                  placeholder={t('Label.health_status_placeholder_alt')}
                  rows={4}
                />
              </Box>

              <Divider />

              {/* Supervision Section */}
              <Box>
                {renderSectionHeader(
                  'solar:users-group-rounded-outline',
                  t('Label.supervision_organization')
                )}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ width: '100%' }}>
                      <RHFMultiSelect
                        name="supervisors"
                        label={t('Label.supervisors')}
                        options={supervisorOptions}
                        chip
                        placeholder={t('Label.supervisors')}
                        sx={{ width: '100%' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Supervisor Notes Section */}
              <Box>
                {renderSectionTitle(t('Label.supervisor_notes'))}
                <RHFTextarea
                  name="supervisorNotes"
                  placeholder={t('Label.supervisor_notes_placeholder')}
                  rows={4}
                />
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 4 }}>
                {/* <Button
                  variant="outlined"
                  color="error"
                  sx={{ minWidth: 120, px: 3, borderWidth: 2 }}
                >
                  {t('Label.delete')}
                </Button> */}
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleClearFields}
                  sx={{ minWidth: 140, px: 3, borderWidth: 2 }}
                >
                  {t('Label.clear_fields')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 120, px: 3 }}
                  disabled={createPilgrimMutation.isPending || !isDirty}
                  startIcon={
                    createPilgrimMutation.isPending ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : null
                  }
                >
                  {createPilgrimMutation.isPending
                    ? t('Label.saving')
                    : t('Label.save')}
                </Button>
              </Stack>
            </Stack>
          </Card>
        </FormProvider>
      </Box>
    </Container>
  );
}
