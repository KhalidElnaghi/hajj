'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

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
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';
import { useLocales } from 'src/locales';

import FormProvider from 'src/components/hook-form/form-provider';
import {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFTextarea,
  RHFMultiSelect,
} from 'src/components/hook-form';

import { Controller } from 'react-hook-form';
import Iconify from 'src/components/iconify';
import { PageHeader } from 'src/components/custom-page-headding';

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

  const methods = useForm<PilgrimFormValues>({
    defaultValues,
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Form data:', data);
      // TODO: Implement API call
      router.push(paths.dashboard.pilgrims.list);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });

  const handleDropPhoto = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setValue('photo', newFile, { shouldValidate: true });
    }
  };

  const handleClearFields = () => {
    reset(defaultValues);
  };

  const cities = [
    { value: 'makkah', label: 'مكة المكرمة' },
    { value: 'madinah', label: 'المدينة المنورة' },
    { value: 'riyadh', label: 'الرياض' },
  ];

  const packages = [
    { value: 'package1', label: 'باقة 1' },
    { value: 'package2', label: 'باقة 2' },
  ];

  const genders = [
    { value: 'male', label: t('Label.male') },
    { value: 'female', label: t('Label.female') },
  ];

  const nationalities = [
    { value: 'saudi', label: 'السعودية' },
    { value: 'egypt', label: 'مصر' },
    { value: 'jordan', label: 'الأردن' },
  ];

  const permits = [
    { value: 'hajj', label: 'حج' },
    { value: 'umrah', label: 'عمرة' },
  ];

  const hijriDates = [
    { value: '1445-01-01', label: '1445/01/01' },
    { value: '1445-01-02', label: '1445/01/02' },
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

  const supervisorOptions = [
    { value: 'ahmed', label: 'Ahmed Ali' },
    { value: 'amal', label: 'Amal Ali' },
  ];

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
                        sx={{
                          fontWeight: 500,
                          mb: 1.5,
                          color: 'text.secondary',
                        }}
                      >
                        {t('Label.name_in_arabic')}
                      </Typography>
                      <RHFTextField name="nameAr" required placeholder="" />
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
                        {t('Label.name_in_english')}
                      </Typography>
                      <RHFTextField name="nameEn" required placeholder="" />
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
                        sx={{
                          fontWeight: 500,
                          mb: 1.5,
                          color: 'text.secondary',
                        }}
                      >
                        {t('Label.id_number')}
                      </Typography>
                      <RHFTextField name="idNumber" placeholder="" />
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
                        {t('Label.city')}
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

                  {/* Row 3: Package Name, Nationality, Gender - 3 fields */}
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
                        {t('Label.package_name')}
                      </Typography>
                      <RHFSelect name="packageName">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {packages.map((pkg) => (
                          <MenuItem key={pkg.value} value={pkg.value}>
                            {pkg.label}
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
                        {t('Label.nationality')}
                      </Typography>
                      <RHFSelect name="nationality">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {nationalities.map((nat) => (
                          <MenuItem key={nat.value} value={nat.value}>
                            {nat.label}
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
                        {t('Label.gender')}
                      </Typography>
                      <RHFSelect name="gender">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {genders.map((gender) => (
                          <MenuItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </MenuItem>
                        ))}
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

                  {/* Row 5: Date of Birth, Hijri Date of Birth, Age - 3 fields */}
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
                        {t('Label.gregorian_birth_date')}
                      </Typography>
                      <RHFDatePicker name="gregorianBirthDate" />
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
                        {t('Label.hijri_birth_date')}
                      </Typography>
                      <RHFSelect name="hijriBirthDate">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {hijriDates.map((date) => (
                          <MenuItem key={date.value} value={date.value}>
                            {date.label}
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
                        {t('Label.age')}
                      </Typography>
                      <RHFTextField name="age" type="number" placeholder="" />
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
                        {t('Label.mobile_number')}
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
                        sx={{
                          fontWeight: 500,
                          mb: 1.5,
                          color: 'text.secondary',
                        }}
                      >
                        {t('Label.add_photo')}
                      </Typography>
                      <Controller
                        name="photo"
                        control={methods.control}
                        render={({ field, fieldState: { error } }) => (
                          <Box
                            component="label"
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
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const newFile = Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                  });
                                  field.onChange(newFile);
                                  handleDropPhoto([newFile]);
                                }
                              }}
                            />
                            <Iconify
                              icon="solar:alt-arrow-down-linear"
                              width={20}
                              sx={{ color: 'grey.500', mr: 1 }}
                            />
                            <Box sx={{ flex: 1 }} />
                            <Iconify
                              icon="solar:gallery-add-bold"
                              width={24}
                              sx={{ color: 'grey.500' }}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Gathering Points Section */}
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
                        {t('Label.prominent')}
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
                                color: selected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                                bgcolor: selected ? theme.palette.primary.main : 'transparent',
                                borderColor: selected ? 'transparent' : theme.palette.grey[300],
                                '&:hover': {
                                  bgcolor: selected ? theme.palette.primary.dark : theme.palette.grey[100],
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
                {renderSectionHeader('solar:heart-pulse-outline', t('Label.health_status_data'))}
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
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ minWidth: 120, px: 3, borderWidth: 2 }}
                >
                  {t('Label.delete')}
                </Button>
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
                >
                  {t('Label.save')}
                </Button>
              </Stack>
            </Stack>
          </Card>
        </FormProvider>
      </Box>
    </Container>
  );
}
