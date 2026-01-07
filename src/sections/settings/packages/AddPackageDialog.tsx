'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';

import SettingsDialogHeader from 'src/sections/settings/components/SettingsDialogHeader';
import RHFTextField from 'src/components/hook-form/rhf-text-field';
import FormProvider from 'src/components/hook-form/form-provider';
import { useCreatePackage, useUpdatePackage } from 'src/services/queries/packages';
import { CreatePackagePayload, UpdatePackagePayload, PackageItem } from 'src/services/api/packages';

type AddEditPackageFormValues = {
  nameAr: string;
  nameEn: string;
};

type AddEditDialogProps = {
  open: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  packageData?: PackageItem | null;
};

// ----------------------------------------------------------------------

const createPackageValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    nameAr: Yup.string()
      .required(t('Message.name_ar_required'))
      .min(2, t('Message.name_ar_min_length'))
      .trim(),
    nameEn: Yup.string()
      .required(t('Message.name_en_required'))
      .min(2, t('Message.name_en_min_length'))
      .trim(),
  });

export default function AddEditDialog({ open, onClose, isEditMode, packageData }: AddEditDialogProps) {
  const t = useTranslations('Settings');
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState<boolean>(false);

  const defaultValues: AddEditPackageFormValues = useMemo(
    () => ({
      nameAr: packageData?.name?.ar || '',
      nameEn: packageData?.name?.en || '',
    }),
    [packageData]
  );

  const validationSchema = useMemo(
    () => createPackageValidationSchema((key: string) => t(key as any)),
    [t]
  );

  const methods = useForm<AddEditPackageFormValues>({
    resolver: yupResolver(validationSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      if (isEditMode && packageData) {
        reset({
          nameAr: packageData.name?.ar || '',
          nameEn: packageData.name?.en || '',
        });
        setStatus(packageData.status);
      } else {
        reset({
          nameAr: '',
          nameEn: '',
        });
        setStatus(false);
      }
    }
  }, [open, isEditMode, packageData, reset]);

  const handleStatusChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: 'active' | 'inactive' | null
  ) => {
    if (!value) return;
    setStatus(value === 'active');
  };

  const createPackageMutation = useCreatePackage();
  const updatePackageMutation = useUpdatePackage();

  const isSubmitting = isEditMode ? updatePackageMutation.isPending : createPackageMutation.isPending;

  const handleFormSubmit = handleSubmit(async (data: AddEditPackageFormValues) => {
    const basePayload = {
      name: {
        ar: data.nameAr,
        en: data.nameEn,
      },
      status,
    };

    try {
      if (isEditMode && packageData) {
        const payload: UpdatePackagePayload = basePayload;
        await updatePackageMutation.mutateAsync({
          id: packageData.id,
          data: payload,
        });

        enqueueSnackbar(t('Message.update_success'), { variant: 'success' });
      } else {
        const payload: CreatePackagePayload = basePayload;
        await createPackageMutation.mutateAsync(payload);

        enqueueSnackbar(t('Message.create_success'), { variant: 'success' });
      }

      reset();
      onClose();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Create/Update package error:', error);

      const fallbackErrorMessage = isEditMode
        ? t('Message.update_error')
        : t('Message.create_error');

      const apiMessage =
        error?.response?.data?.message || error?.message || fallbackErrorMessage;

      enqueueSnackbar(apiMessage, { variant: 'error' });
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <SettingsDialogHeader
          title={isEditMode ? t('Button.edit_package') : t('Button.add_package')}
          onClose={handleClose}
        />
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {open && (
          <FormProvider methods={methods} onSubmit={handleFormSubmit}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <RHFTextField
                name="nameAr"
                label={t('Label.name_ar')}
                placeholder={t('Label.name_ar')}
              />

              <RHFTextField
                name="nameEn"
                label={t('Label.name_en')}
                placeholder={t('Label.name_en')}
              />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t('Label.status')}
                </Typography>

                <ToggleButtonGroup
                  exclusive
                  value={status ? 'active' : 'inactive'}
                  onChange={handleStatusChange}
                  sx={{
                    bgcolor: '#F8FAFC',
                    borderRadius: '59px',
                    p: 0.5,
                    display: 'inline-flex',
                    '& .MuiToggleButton-root': {
                      borderRadius: '59px !important',
                      border: 'none !important',
                      '&:first-of-type': {
                        borderRadius: '59px !important',
                      },
                      '&:last-of-type': {
                        borderRadius: '59px !important',
                      },
                    },
                  }}
                >
                  <ToggleButton
                    value="inactive"
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: '59px !important',
                      px: 3,
                      border: 'none !important',
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: 'primary.main !important',
                          color: '#fff !important',
                          opacity: 1,
                        },
                      },
                      '&:not(.Mui-selected)': {
                        bgcolor: 'transparent',
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'transparent !important',
                          color: 'text.primary !important',
                          opacity: 1,
                        },
                      },
                      '&.Mui-focusVisible': {
                        bgcolor: 'transparent !important',
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'transparent !important',
                      },
                    }}
                  >
                    {t('Label.inactive')}
                  </ToggleButton>

                  <ToggleButton
                    value="active"
                    disableRipple
                    disableFocusRipple
                    sx={{
                      borderRadius: '59px !important',
                      px: 3,
                      border: 'none !important',
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: 'primary.main !important',
                          color: '#fff !important',
                          opacity: 1,
                        },
                      },
                      '&:not(.Mui-selected)': {
                        bgcolor: 'transparent',
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'transparent !important',
                          color: 'text.primary !important',
                          opacity: 1,
                        },
                      },
                      '&.Mui-focusVisible': {
                        bgcolor: 'transparent !important',
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'transparent !important',
                      },
                    }}
                  >
                    {t('Label.active')}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  variant="text"
                  onClick={handleClose}
                  sx={{
                    borderRadius: 1,
                    color: '#6B7280',
                    px: 3,
                  }}
                >
                  {t('Dialog.Cancel')}
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    borderRadius: 1,
                    px: 4,
                    bgcolor: 'primary.main',
                  }}
                  disabled={!isDirty || isSubmitting}
                >
                  {isEditMode ? t('Button.edit') : t('Button.add_package')}
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
}
