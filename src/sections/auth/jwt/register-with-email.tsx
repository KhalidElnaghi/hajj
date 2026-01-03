'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslations } from 'next-intl';

import FormProvider, { RHFTextField, RHFPassword } from 'src/components/hook-form';

import { useRegisterMutation } from 'src/services/mutations/auth/useRegisterMutation';
import { createRegisterSchema, RegisterFormValues } from './register-schema';
import { getErrorMessage } from 'src/utils/axios';

export default function RegisterByEmailView() {
  const t = useTranslations('Auth.Register');

  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(createRegisterSchema((key: string) => t(key as any))) as any,
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      company_name: '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const registerMutation = useRegisterMutation({
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);

      if (error?.validationErrors && Array.isArray(error.validationErrors)) {
        error.validationErrors.forEach((validationError: any) => {
          const field = validationError.field || validationError.path;
          if (
            field &&
            (field === 'name' ||
              field === 'phone' ||
              field === 'email' ||
              field === 'password' ||
              field === 'password_confirmation' ||
              field === 'company_name')
          ) {
            setError(field as keyof RegisterFormValues, {
              type: 'manual',
              message: validationError.message || errorMessage,
            });
          }
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        company_name: data.company_name,
      });
    } catch (error) {
      // Error handled in onError callback
    }
  });

  const hasFieldErrors = !!(
    errors.name?.message ||
    errors.phone?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.password_confirmation?.message ||
    errors.company_name?.message
  );
  const generalError =
    registerMutation.error && !hasFieldErrors ? getErrorMessage(registerMutation.error) : null;

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {generalError && (
          <Alert severity="error" sx={{ textAlign: 'right' }}>
            {generalError || t('register_error')}
          </Alert>
        )}

        <RHFTextField name="name" label={t('name')} placeholder={t('name_placeholder')} fullWidth />

        <RHFTextField
          name="company_name"
          label={t('company_name')}
          placeholder={t('company_name_placeholder')}
          fullWidth
        />

        <RHFTextField
          name="phone"
          label={t('phone')}
          placeholder={t('phone_placeholder')}
          fullWidth
        />

        <RHFTextField
          name="email"
          label={t('email')}
          placeholder={t('email_placeholder')}
          fullWidth
        />

        <RHFPassword
          name="password"
          label={t('password')}
          placeholder={t('password_placeholder')}
        />

        <RHFPassword
          name="password_confirmation"
          label={t('password_confirmation')}
          placeholder={t('password_confirmation_placeholder')}
        />

        {/* Submit Button */}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={registerMutation.isPending}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {t('sign_up')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
