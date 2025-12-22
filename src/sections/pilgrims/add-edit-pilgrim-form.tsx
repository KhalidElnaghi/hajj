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
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

import FormProvider from 'src/components/hook-form/form-provider';
import { CustomPageHeadding } from 'src/components/custom-page-headding';
import {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFTextarea,
  RHFMultiSelect,
  RHFUpload,
} from 'src/components/hook-form';

import { Controller } from 'react-hook-form';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

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
  tentRoomNumber: string;
  campStatus: string;
  busNumber: string;
  seatNumber: string;
  generalHealthStatus: string;
  healthDetails: string;
  supervisors: string[];
  supervisorNotes: string;
};

// ----------------------------------------------------------------------

export default function AddEditPilgrimForm() {
  const t = useTranslations();
  const router = useRouter();
  const [locationTab, setLocationTab] = useState(0);

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
      supervisors: [],
      supervisorNotes: '',
    }),
    []
  );

  const methods = useForm<PilgrimFormValues>({
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
  } = methods;

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

  const photoValue = watch('photo');

  // Dummy data for dropdowns - replace with actual API calls
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

  const gatheringPoints = [
    { value: 'nawd', label: 'نود' },
    { value: 'naqd', label: 'نقد' },
    { value: 'alad', label: 'العد' },
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
        <CustomPageHeadding
          headding={t('Label.add_new_pilgrim')}
          subHeadding={t('Label.add_new_pilgrim_description')}
          backTo={paths.dashboard.pilgrims.list}
        />

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card sx={{ mt: 4, p: 4, borderRadius: 2, boxShadow: (theme) => theme.customShadows.card, width: '100%' }}>
            {/* Location Tabs */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant={locationTab === 0 ? 'contained' : 'outlined'}
                  onClick={() => setLocationTab(0)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(locationTab === 0 && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }),
                    ...(locationTab !== 0 && {
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      border: 'none',
                      '&:hover': {
                        bgcolor: 'grey.200',
                      },
                    }),
                  }}
                >
                  {t('Label.muzdalifah')}
                </Button>
                <Button
                  variant={locationTab === 1 ? 'contained' : 'outlined'}
                  onClick={() => setLocationTab(1)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(locationTab === 1 && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }),
                    ...(locationTab !== 1 && {
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      border: 'none',
                      '&:hover': {
                        bgcolor: 'grey.200',
                      },
                    }),
                  }}
                >
                  {t('Label.arafat')}
                </Button>
                <Button
                  variant={locationTab === 2 ? 'contained' : 'outlined'}
                  onClick={() => setLocationTab(2)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(locationTab === 2 && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }),
                    ...(locationTab !== 2 && {
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      border: 'none',
                      '&:hover': {
                        bgcolor: 'grey.200',
                      },
                    }),
                  }}
                >
                  {t('Label.mina')}
                </Button>
              </Stack>
            </Box>

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
                      <RHFTextField
                        name="nameAr"
                        required
                        placeholder=""
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
                        {t('Label.name_in_english')}
                      </Typography>
                      <RHFTextField
                        name="nameEn"
                        required
                        placeholder=""
                      />
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
                      <RHFTextField
                        name="bookingNumber"
                        placeholder=""
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
                        {t('Label.id_number')}
                      </Typography>
                      <RHFTextField
                        name="idNumber"
                        placeholder=""
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
                        {t('Label.city')}
                      </Typography>
                      <RHFSelect name="city">
                        <option value="" />
                        {cities.map((city) => (
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
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
                        <option value="" />
                        {packages.map((pkg) => (
                          <option key={pkg.value} value={pkg.value}>
                            {pkg.label}
                          </option>
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
                        <option value="" />
                        {nationalities.map((nat) => (
                          <option key={nat.value} value={nat.value}>
                            {nat.label}
                          </option>
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
                        <option value="" />
                        {genders.map((gender) => (
                          <option key={gender.value} value={gender.value}>
                            {gender.label}
                          </option>
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
                      <RHFDatePicker
                        name="arrivalDate"
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
                        {t('Label.departure_date')}
                      </Typography>
                      <RHFDatePicker
                        name="departureDate"
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
                        {t('Label.permit')}
                      </Typography>
                      <RHFSelect name="permit">
                        <option value="" />
                        {permits.map((permit) => (
                          <option key={permit.value} value={permit.value}>
                            {permit.label}
                          </option>
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
                      <RHFDatePicker
                        name="gregorianBirthDate"
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
                        {t('Label.hijri_birth_date')}
                      </Typography>
                      <RHFSelect name="hijriBirthDate">
                        <option value="" />
                        {hijriDates.map((date) => (
                          <option key={date.value} value={date.value}>
                            {date.label}
                          </option>
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
                      <RHFTextField
                        name="age"
                        type="number"
                        placeholder=""
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
                        {t('Label.mobile_number')}
                      </Typography>
                      <RHFTextField
                        name="mobileNumber"
                        placeholder=""
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
                <Controller
                  name="gatheringPoint"
                  control={methods.control}
                  render={({ field }) => (
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      {gatheringPoints.map((point) => (
                        <Chip
                          key={point.value}
                          label={point.label}
                          onClick={() => field.onChange(point.value)}
                          sx={{
                            px: 2,
                            py: 1.5,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            ...(field.value === point.value
                              ? {
                                  bgcolor: 'primary.main',
                                  color: 'primary.contrastText',
                                  '&:hover': {
                                    bgcolor: 'primary.dark',
                                  },
                                }
                              : {
                                  bgcolor: 'grey.100',
                                  color: 'text.primary',
                                  '&:hover': {
                                    bgcolor: 'grey.200',
                                  },
                                }),
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                />
              </Box>

              <Divider />

              {/* Accommodation Section */}
              <Box>
                {renderSectionHeader('solar:home-angle-outline', t('Label.accommodation_residence'))}
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
                      <RHFSelect name="campStatus">
                        <option value="" />
                        {campStatuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
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
                      <RHFTextField
                        name="busNumber"
                        placeholder=""
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
                      />
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
                        <option value="" />
                        {healthStatuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </RHFSelect>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Other Details Section */}
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
                {renderSectionHeader('solar:users-group-rounded-outline', t('Label.supervision_organization'))}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <RHFMultiSelect
                      name="supervisors"
                      label={t('Label.supervisors')}
                      options={supervisorOptions}
                      chip
                      placeholder={t('Label.supervisors')}
                    />
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
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 4, borderTop: 1, borderColor: 'divider' }}>
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
