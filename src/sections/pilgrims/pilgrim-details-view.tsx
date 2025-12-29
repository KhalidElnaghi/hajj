'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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
  Avatar,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';

import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import ConfirmDialog from 'src/components/custom-dialog/confirm-dialog';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { useFetchPilgrimDetails } from 'src/services/queries/pilgrims';
import { useUpdatePilgrim, useDeletePilgrim } from 'src/services/mutations/pilgrims';
import { useFetchPilgrimInitData } from 'src/services/queries/pilgrims';
import { pilgrimInitialValues, createPilgrimValidationSchema, tabs } from './utils';
import { PilgrimFormValues } from './utils/types';

// Tab components
import PersonalInfoTab from './components/pilgrim-details/personal-info-tab';
import GatheringPointsTab from './components/pilgrim-details/gathering-points-tab';
import AccommodationTab from './components/pilgrim-details/accommodation-tab';
import TransportationTab from './components/pilgrim-details/transportation-tab';
import HealthStatusTab from './components/pilgrim-details/health-status-tab';
import SupervisionTab from './components/pilgrim-details/supervision-tab';
import PilgrimErrorState from './components/pilgrim-details/pilgrim-error-state';
import PilgrimLoadingSkeleton from './components/pilgrim-details/pilgrim-loading-skeleton';

type PilgrimDetailsViewProps = {
  pilgrimId: string;
  isEditMode?: boolean;
};

type TabValue =
  | 'personal'
  | 'gathering'
  | 'accommodation'
  | 'transportation'
  | 'health'
  | 'supervision';

export default function PilgrimDetailsView({
  pilgrimId,
  isEditMode: initialEditMode,
}: PilgrimDetailsViewProps) {
  const t = useTranslations('Pilgrims');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isRTL } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  // Check if isEdit is in URL params
  const urlIsEdit = searchParams.get('isEdit') === 'true';
  const [isEditMode, setIsEditMode] = useState(initialEditMode || urlIsEdit);
  const [activeTab, setActiveTab] = useState<TabValue>('personal');

  // Fetch pilgrim details
  const {
    data: pilgrimResponse,
    isLoading: isLoadingPilgrim,
    isError: isErrorPilgrim,
  } = useFetchPilgrimDetails(pilgrimId, !!pilgrimId);

  const pilgrimData = pilgrimResponse?.data;

  const { data: initDataResponse } = useFetchPilgrimInitData();
  const initData = initDataResponse?.data;

  const updatePilgrimMutation = useUpdatePilgrim();

  const deletePilgrimMutation = useDeletePilgrim();

  const deleteDialog = useDisclosure();

  const PilgrimSchema = useMemo(() => createPilgrimValidationSchema(t), [t]);

  const defaultValues = useMemo<PilgrimFormValues>(() => pilgrimInitialValues, []);

  const methods = useForm<PilgrimFormValues>({
    resolver: yupResolver(PilgrimSchema) as any,
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = methods;

  const pilgrimName_ar = watch('nameAr');
  const pilgrimName_en = watch('nameEn');

  useEffect(() => {
    if (pilgrimData) {
      const data = pilgrimData;
      // Map API response to form values based on actual API response structure
      reset({
        nameAr: data.name?.ar || '',
        nameEn: data.name?.en || '',
        bookingNumber: data.reservation_no || '',
        idNumber: String(data.national_id || ''),
        city: String(data.city?.city_id || ''),
        packageName: String(data.package?.id || ''),
        nationality: String(data.nationality?.country?.id || ''),
        gender: String(data.gender !== undefined ? data.gender : ''),
        arrivalDate: data.booking_date || '',
        departureDate: '', // Not in API response
        permit: '', // Not in API response
        gregorianBirthDate: data.birthdate || '',
        hijriBirthDate: data.birthdate_hijri || '',
        age: data.age || 0,
        mobileNumber: String(data.mobile || ''),
        anotherMobileNumber: String(data.mobile2 || ''),
        photo: data.pilgrim_photo || null,
        gatheringPointType: '', // Not in API response
        gatheringPoint: '', // Not in API response
        prominent: '', // Not in API response (destination field)
        accommodationArea: '', // Not in API response
        tentRoomNumber: '', // Not in API response
        campStatus: '', // Not in API response
        busNumber: '', // Not in API response (but transport exists)
        seatNumber: '', // Not in API response
        generalHealthStatus: '', // Not in API response
        healthDetails: '', // Not in API response
        supervisors: Array.isArray(data.supervisors)
          ? data.supervisors.map((supervisor: any) => String(supervisor.id || supervisor))
          : [],
        supervisorNotes: data.notes || '',
      });
    }
  }, [pilgrimData, reset]);

  const handleEditClick = () => {
    setIsEditMode(true);
    const currentPath = pathname;
    router.push(`${currentPath}?isEdit=true`);
  };

  const onSubmit = handleSubmit(async (formData) => {
    const updateData: any = {
      ...formData,
      transport_id: pilgrimData?.transport?.id,
      status: pilgrimData?.status !== undefined ? pilgrimData.status : 1,
      source: pilgrimData?.source !== undefined ? pilgrimData.source : 1,
      whatsapp_active:
        pilgrimData?.whatsapp_active !== undefined ? (pilgrimData.whatsapp_active ? 1 : 0) : 0,
      departure_status:
        pilgrimData?.departure_status !== undefined ? pilgrimData.departure_status : 0,
      muhrim_status: pilgrimData?.muhrim_status !== undefined ? pilgrimData.muhrim_status : 0,
      pilgrim_type_id: pilgrimData?.pilgrim_type?.id || 2,
      reservation_id: pilgrimData?.reservation?.id || 1,
      pilgrim_style: pilgrimData?.pilgrim_style || '',
      booking_via: pilgrimData?.booking_via || '',
      booking_date: formData.arrivalDate || pilgrimData?.booking_date || '',
      payment_mechanism: pilgrimData?.payment_mechanism || '',
      payment_status: pilgrimData?.payment_status || '',
      tag_ids:
        Array.isArray(pilgrimData?.tags) && pilgrimData.tags.length > 0
          ? JSON.stringify(pilgrimData.tags.map((tag: any) => tag.id))
          : '',
    };

    updatePilgrimMutation.mutate(
      { id: pilgrimId, data: updateData },
      {
        onSuccess: () => {
          enqueueSnackbar(t('Message.pilgrim_updated_successfully'), {
            variant: 'success',
          });
          setIsEditMode(false);
          // Remove isEdit from URL
          router.push(pathname);
        },
        onError: (error: any) => {
          console.error('Error updating pilgrim:', error);
          enqueueSnackbar(
            error?.response?.data?.message || error?.message || t('Message.error_updating_pilgrim'),
            { variant: 'error' }
          );
        },
      }
    );
  });

  const handleDelete = () => {
    deleteDialog.onOpen();
  };

  const handleConfirmDelete = () => {
    deletePilgrimMutation.mutate(pilgrimId, {
      onSuccess: () => {
        enqueueSnackbar(t('Message.pilgrim_deleted_successfully'), {
          variant: 'success',
        });
        deleteDialog.onClose();
        router.push(paths.dashboard.pilgrims.root);
      },
      onError: (error: any) => {
        console.error('Error deleting pilgrim:', error);
        enqueueSnackbar(
          error?.response?.data?.message || error?.message || t('Message.error_deleting_pilgrim'),
          { variant: 'error' }
        );
      },
    });
  };

  if (isLoadingPilgrim) {
    return <PilgrimLoadingSkeleton />;
  }

  if (isErrorPilgrim || !pilgrimData) {
    return <PilgrimErrorState />;
  }

  const pilgrim = pilgrimData;
  const pilgrimName = isRTL
    ? pilgrim.name?.ar || pilgrim.name?.en || ''
    : pilgrim.name?.en || pilgrim.name?.ar || '';
  const bookingNumber = pilgrim.reservation_no || '';

  return (
    <Container maxWidth="xl" sx={{ width: '100%' }}>
      <Box sx={{ py: 4, width: '100%' }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card
            sx={{
              borderRadius: 1,
              boxShadow: (theme) => theme.customShadows.card,
              width: '100%',
              overflow: 'visible',
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Profile Info */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={pilgrim.pilgrim_photo || undefined}
                  alt={pilgrimName}
                  sx={{ width: 64, height: 64 }}
                >
                  {pilgrimName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('Label.name')}:{' '}
                    {isRTL && pilgrimName_ar
                      ? pilgrimName_ar
                      : !isRTL && pilgrimName_en
                        ? pilgrimName_en
                        : pilgrimName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {t('Label.booking_number')}: {bookingNumber}
                  </Typography>
                </Box>
              </Stack>

              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
              >
                {!isEditMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                    sx={{ minWidth: 120 }}
                  >
                    {t('Label.edit')}
                  </Button>
                )}
                {/* <IconButton
                  sx={{
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.light' },
                  }}
                >
                  <Iconify icon="solar:letter-bold" width={24} />
                </IconButton> */}
              </Stack>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 64,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  },
                  '& .MuiTabs-indicator': {
                    display: 'none',
                  },
                }}
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    label={t(tab.label)}
                    icon={<Iconify icon={tab.icon} width={24} />}
                    iconPosition="start"
                    sx={{
                      '&.Mui-selected': {
                        color: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ p: 4 }}>
              {activeTab === 'personal' && (
                <PersonalInfoTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
              {activeTab === 'gathering' && (
                <GatheringPointsTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
              {activeTab === 'accommodation' && (
                <AccommodationTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
              {activeTab === 'transportation' && (
                <TransportationTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
              {activeTab === 'health' && (
                <HealthStatusTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
              {activeTab === 'supervision' && (
                <SupervisionTab isReadOnly={!isEditMode} initData={initData} isRtl={isRTL} />
              )}
            </Box>

            {/* Bottom Action Buttons */}
            {isEditMode && (
              <>
                <Divider />
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    sx={{ minWidth: 120 }}
                  >
                    {t('Label.delete')}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={updatePilgrimMutation.isPending || !isDirty}
                    startIcon={
                      updatePilgrimMutation.isPending ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : null
                    }
                    sx={{ minWidth: 120, px: 3 }}
                  >
                    {updatePilgrimMutation.isPending ? t('Label.saving') : t('Label.save')}
                  </Button>
                </Box>
              </>
            )}
          </Card>
        </FormProvider>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialog.open}
          onClose={deleteDialog.onClose}
          title={t('Dialog.Delete')}
          content={t('Message.delete_pilgrim_confirmation')}
          buttonTitle={t('Dialog.Delete')}
          buttonColor="error"
          handleConfirmDelete={handleConfirmDelete}
        />
      </Box>
    </Container>
  );
}
