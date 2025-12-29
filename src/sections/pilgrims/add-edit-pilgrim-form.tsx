'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
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

type PilgrimFormValues = {
  nameAr: string;
  nameEn: string;
  bookingNumber: string;
  idNumber: string;
  city: string;
  packageName: string;
  nationality: string;
  gender: string;
  arrivalDate: string;
  departureDate: string;
  permit: string;
  gregorianBirthDate: string;
  hijriBirthDate: string;
  age: number;
  mobileNumber: string;
  anotherMobileNumber: string;
  photo: File | string | null;
  gatheringPointType: string;
  gatheringPoint: string;
  prominent: string;
  accommodationArea: string;
  tentRoomNumber: string;
  campStatus: string;
  busNumber: string;
  seatNumber: string;
  generalHealthStatus: string;
  healthDetails: string;
  supervisors: string[];
  supervisorNotes: string;
};

export default function AddEditPilgrimForm() {
  const t = useTranslations();
  const router = useRouter();
  const { currentLang } = useLocales();
  const isRtl = currentLang?.value === 'ar';
  const { enqueueSnackbar } = useSnackbar();
  const createPilgrimMutation = useCreatePilgrim();
  const { data, isLoading: isLoadingInitData } = useFetchPilgrimInitData();
  const initData = data?.data;

  const defaultValues = useMemo<PilgrimFormValues>(
    () => ({
      nameAr: '',
      nameEn: '',
      bookingNumber: '',
      idNumber: '',
      city: '',
      packageName: '',
      nationality: '',
      gender: '',
      arrivalDate: '',
      departureDate: '',
      permit: '',
      gregorianBirthDate: '',
      hijriBirthDate: '',
      age: 0,
      mobileNumber: '',
      anotherMobileNumber: '',
      photo: null,
      gatheringPointType: '',
      gatheringPoint: '',
      prominent: '',
      tentRoomNumber: '',
      campStatus: '',
      busNumber: '',
      seatNumber: '',
      generalHealthStatus: '',
      healthDetails: '',
      accommodationArea: '',
      supervisors: [],
      supervisorNotes: '',
    }),
    []
  );

  const PilgrimSchema = Yup.object().shape({
    nameAr: Yup.string()
      .required(t('Pilgrims.Message.name_ar_required'))
      .min(2, t('Pilgrims.Message.name_min_length')),
    nameEn: Yup.string()
      .required(t('Pilgrims.Message.name_en_required'))
      .min(2, t('Pilgrims.Message.name_min_length')),
    idNumber: Yup.string()
      .required(t('Pilgrims.Message.id_number_required'))
      .length(10, t('Pilgrims.Message.id_number_length'))
      .matches(/^\d+$/, t('Pilgrims.Message.id_number_invalid'))
      .test('saudi-id-format', t('Pilgrims.Message.id_number_saudi_format'), (value) => {
        if (!value || value.length !== 10) return false;
        const firstDigit = value.charAt(0);
        return ['1', '2', '3', '4'].includes(firstDigit);
      }),
    nationality: Yup.string().required(t('Pilgrims.Message.nationality_required')),
    gender: Yup.string()
      .required(t('Pilgrims.Message.gender_required'))
      .oneOf(['0', '1'], t('Pilgrims.Message.gender_invalid')),
    gregorianBirthDate: Yup.string().required(t('Pilgrims.Message.birthdate_required')),
    hijriBirthDate: Yup.string().required(t('Pilgrims.Message.birthdate_hijri_required')),
    age: Yup.number()
      .required(t('Pilgrims.Message.age_required'))
      .min(0, t('Pilgrims.Message.age_invalid'))
      .max(150, t('Pilgrims.Message.age_max')),
    mobileNumber: Yup.string()
      .required(t('Pilgrims.Message.mobile_required'))
      .matches(/^[0-9+\-\s()]*$/, t('Pilgrims.Message.phone_invalid')),
    photo: Yup.mixed()
      .nullable()
      .test('fileType', t('Pilgrims.Message.photo_invalid_type'), (value) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        if (value instanceof File) {
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          return validTypes.includes(value.type);
        }
        if (typeof value === 'object' && 'preview' in value && value instanceof File) {
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          return validTypes.includes(value.type);
        }
        return false;
      })
      .test('fileSize', t('Pilgrims.Message.photo_size_limit'), (value) => {
        if (!value || typeof value === 'string') return true;
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        if (typeof value === 'object' && 'preview' in value && value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return false;
      }),
    packageName: Yup.string().required(t('Pilgrims.Message.package_required')),
    city: Yup.string().required(t('Pilgrims.Message.city_required')),

    bookingNumber: Yup.string().default(''),
    arrivalDate: Yup.string().default(''),
    departureDate: Yup.string().default(''),
    permit: Yup.string().default(''),
    anotherMobileNumber: Yup.string()
      .default('')
      .test('saudi-phone', t('Pilgrims.Message.phone_saudi_invalid'), (value) => {
        if (!value || value.trim() === '') return true;
        const cleaned = value.replace(/[\s\-+()]/g, '');
        const saudiPhoneRegex = /^(?:\+966|00966|966|0)?5[0-9]{8}$/;
        return saudiPhoneRegex.test(cleaned);
      }),
    gatheringPointType: Yup.string().default(''),
    gatheringPoint: Yup.string().default(''),
    prominent: Yup.string().default(''),
    accommodationArea: Yup.string().default(''),
    tentRoomNumber: Yup.string().default(''),
    campStatus: Yup.string().default(''),
    busNumber: Yup.string().default(''),
    seatNumber: Yup.string().default(''),
    generalHealthStatus: Yup.string().default(''),
    healthDetails: Yup.string().default(''),
    supervisors: Yup.array().of(Yup.string()).default([]),
    supervisorNotes: Yup.string().default(''),
  });

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
    watch,
  } = methods;
  console.log(watch());
  const onSubmit = handleSubmit(async (data) => {
    createPilgrimMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar(t('Pilgrims.Message.pilgrim_created_successfully'), {
          variant: 'success',
        });
        router.push(paths.dashboard.pilgrims.root);
      },
      onError: (error: any) => {
        console.error('Error submitting form:', error);
        enqueueSnackbar(
          error?.response?.data?.message ||
            error?.message ||
            t('Pilgrims.Message.error_creating_pilgrim'),
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
  console.log(initData?.cities);
  const permits = [
    { value: 'hajj', label: 'حج' },
    { value: 'umrah', label: 'عمرة' },
  ];

  const gatheringPointTypes = [
    { value: 'hotel', label: 'فندق' },
    { value: 'camp', label: 'مخيم' },
    { value: 'other', label: 'أخرى' },
  ];

  const gatheringPoints = [
    { value: 'point1', label: 'نقطة 1' },
    { value: 'point2', label: 'نقطة 2' },
    { value: 'point3', label: 'نقطة 3' },
  ];

  const accommodationAreas = [
    { value: 'mina', label: 'منى' },
    { value: 'arafat', label: 'عرفات' },
    { value: 'muzdalifah', label: 'مزدلفة' },
  ];

  const prominentOptions = [
    { value: 'yes', label: t('Label.yes') },
    { value: 'no', label: t('Label.no') },
  ];

  const campStatuses = [
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'pending', label: 'قيد الانتظار' },
  ];

  const healthStatuses = [
    { value: 'excellent', label: 'ممتاز' },
    { value: 'good', label: 'جيد' },
    { value: 'fair', label: 'متوسط' },
    { value: 'poor', label: 'ضعيف' },
  ];

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
          headding={t('Pilgrims.Label.add_new_pilgrim')}
          subHeadding={t('Pilgrims.Label.add_new_pilgrim_description')}
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
                {renderSectionHeader('solar:user-bold', t('Pilgrims.Label.personal_information'))}
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
                        {t('Pilgrims.Label.name_in_arabic')}
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
                      <RHFTextField name="nameAr"  placeholder="" />
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
                        {t('Pilgrims.Label.name_in_english')}
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
                      <RHFTextField name="nameEn"  placeholder="" />
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
                        {t('Pilgrims.Label.booking_number')}
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
                        {t('Pilgrims.Label.id_number')}
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
                      <RHFTextField name="idNumber"  placeholder="" />
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
                        {t('Pilgrims.Label.city')}
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
                      <RHFSelect name="city" >
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

                  {/* Row 3: Package Name, Nationality, Gender - 3 fields */}
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
                        {t('Pilgrims.Label.package_name')}
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
                      <RHFSelect name="packageName" >
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
                        {t('Pilgrims.Label.nationality')}
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
                      <RHFSelect name="nationality" >
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
                        {t('Pilgrims.Label.gender')}
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
                      <RHFSelect name="gender" >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {initData?.genders.map((gender) => {
                          const genderKey =
                            gender.value === 0
                              ? 'Pilgrims.Label.gender_female'
                              : gender.value === 1
                                ? 'Pilgrims.Label.gender_male'
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

                  {/* Row 4: Arrival Date, Departure Date, Permit - 3 fields */}
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
                        {t('Pilgrims.Label.arrival_date')}
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
                        {t('Pilgrims.Label.departure_date')}
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
                        {t('Pilgrims.Label.permit')}
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

                  {/* Row 5: Date of Birth, Hijri Date of Birth, Age - 3 fields */}
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
                        {t('Pilgrims.Label.gregorian_birth_date')}
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
                        {t('Pilgrims.Label.hijri_birth_date')}
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
                      <RHFHijriDatePicker name="hijriBirthDate"  placeholder="DD/MM/YYYY" />
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
                        {t('Pilgrims.Label.age')}
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
                      <RHFTextField name="age" type="number"  placeholder="" />
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
                        {t('Pilgrims.Label.mobile_number')}
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
                      <RHFTextField name="mobileNumber"  placeholder="" />
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
                        {t('Pilgrims.Label.another_mobile_number')}
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
                        {t('Pilgrims.Label.add_photo')}
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
                                      // Save the File object directly - don't use Object.assign
                                      // This ensures it remains a File object that can be sent to the backend
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
                                    t('Pilgrims.Label.select_image') ||
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
                                      // Clear the file input
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

              {/* Gathering Points Section */}
              <Box>
                {renderSectionHeader('solar:bus-outline', t('Pilgrims.Label.gathering_points'))}
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
                        {t('Pilgrims.Label.gathering_point_type')}
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
                        {t('Pilgrims.Label.gathering_point')}
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
                        {t('Pilgrims.Label.prominent')}
                      </Typography>
                      <RHFSelect name="prominent">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {prominentOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Accommodation Section */}
              <Box>
                {renderSectionHeader(
                  'solar:home-angle-outline',
                  t('Pilgrims.Label.accommodation_residence')
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
                        {t('Pilgrims.Label.tent_room_number')}
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
                        {t('Pilgrims.Label.camp_status')}
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
                {renderSectionHeader('solar:bus-outline', t('Pilgrims.Label.transportation_data'))}
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
                        {t('Pilgrims.Label.bus_number')}
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
                        {t('Pilgrims.Label.seat_number')}
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
                  t('Pilgrims.Label.health_status_data')
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
                        {t('Pilgrims.Label.general_health_status')}
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
                {renderSectionTitle(t('Pilgrims.Label.other_details_section'))}
                <RHFTextarea
                  name="healthDetails"
                  placeholder={t('Pilgrims.Label.health_status_placeholder_alt')}
                  rows={4}
                />
              </Box>

              <Divider />

              {/* Supervision Section */}
              <Box>
                {renderSectionHeader(
                  'solar:users-group-rounded-outline',
                  t('Pilgrims.Label.supervision_organization')
                )}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ width: '100%' }}>
                      <RHFMultiSelect
                        name="supervisors"
                        label={t('Pilgrims.Label.supervisors')}
                        options={supervisorOptions}
                        chip
                        placeholder={t('Pilgrims.Label.supervisors')}
                        sx={{ width: '100%' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Supervisor Notes Section */}
              <Box>
                {renderSectionTitle(t('Pilgrims.Label.supervisor_notes'))}
                <RHFTextarea
                  name="supervisorNotes"
                  placeholder={t('Pilgrims.Label.supervisor_notes_placeholder')}
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
                  {t('Pilgrims.Label.delete')}
                </Button> */}
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleClearFields}
                  sx={{ minWidth: 140, px: 3, borderWidth: 2 }}
                >
                  {t('Pilgrims.Label.clear_fields')}
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
                    ? t('Pilgrims.Label.saving')
                    : t('Pilgrims.Label.save')}
                </Button>
              </Stack>
            </Stack>
          </Card>
        </FormProvider>
      </Box>
    </Container>
  );
}
