'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookie from 'js-cookie';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFCheckbox } from 'src/components/hook-form';

import { useLoginMutation } from 'src/services/mutations/auth/useLoginMutation';
import { useSelectCompanyMutation } from 'src/services/mutations/auth/useSelectCompanyMutation';
import { createLoginSchema, LoginFormValues } from './login-schema';
import { getErrorMessage } from 'src/utils/axios';
import { Company } from 'src/services/api/auth';

export default function LoginByEmailView() {
  const password = useBoolean();
  const t = useTranslations('Auth.Login');
  const locale = useLocale();
  const [requiresCompanySelection, setRequiresCompanySelection] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(createLoginSchema((key: string) => t(key as any))) as any,
    defaultValues: {
      email: '',
      password: '',
      company: undefined,
      rememberMe: false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (requiresCompanySelection) {
      const companiesCookie = Cookie.get('companies');
      if (companiesCookie) {
        try {
          const parsedCompanies = JSON.parse(companiesCookie);
          setCompanies(parsedCompanies);
        } catch (error) {
          console.error('Error parsing companies from cookie:', error);
        }
      }
    }
  }, [requiresCompanySelection]);

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      if (data.data.requires_company_selection) {
        setRequiresCompanySelection(true);
        setCompanies(data.data.companies);
      }
    },
    onError: (error: any) => {
      // Handle field-level errors
      const errorMessage = getErrorMessage(error);

      // Try to extract field errors from API response
      if (error?.validationErrors && Array.isArray(error.validationErrors)) {
        error.validationErrors.forEach((validationError: any) => {
          const field = validationError.field || validationError.path;
          if (field && (field === 'email' || field === 'password' || field === 'company')) {
            setError(field as keyof LoginFormValues, {
              type: 'manual',
              message: validationError.message || errorMessage,
            });
          }
        });
      } else {
        // General error - show in UI (will be displayed above button)
        console.error('Login error:', error);
      }
    },
  });

  const selectCompanyMutation = useSelectCompanyMutation({
    onSuccess: () => {
      // Redirect handled in mutation hook
    },
    onError: (error: any) => {
      console.error('Select company error:', error);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        companyId: data.company || undefined,
        rememberMe: data.rememberMe,
      });
    } catch (error) {
      // Error handled in onError callback
    }
  });

  const handleSelectCompany = async () => {
    const companyValue = methods.watch('company');
    if (!companyValue) {
      methods.setError('company', {
        type: 'manual',
        message: t('company_required'),
      });
      return;
    }

    try {
      await selectCompanyMutation.mutateAsync(companyValue);
    } catch (error) {
      // Error handled in onError callback
    }
  };

  // Get general error message if no field errors
  const hasFieldErrors = !!(
    errors.email?.message ||
    errors.password?.message ||
    errors.company?.message
  );
  const generalError =
    (loginMutation.error || selectCompanyMutation.error) && !hasFieldErrors
      ? getErrorMessage(loginMutation.error || selectCompanyMutation.error)
      : null;

  // Company Selection View
  if (requiresCompanySelection) {
    return (
      <FormProvider methods={methods}>
        <Stack spacing={3}>
          {/* General Error Alert */}
          {generalError && (
            <Alert severity="error" sx={{ textAlign: 'right' }}>
              {generalError}
            </Alert>
          )}

          {/* Company Select Field */}
          <RHFSelect
            name="company"
            label={t('select_company')}
            placeholder={t('choose_company_placeholder')}
          >
            <MenuItem value="" disabled>
              {t('choose_company_placeholder')}
            </MenuItem>
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {locale === 'ar' ? company.name.ar : company.name.en}
              </MenuItem>
            ))}
          </RHFSelect>

          {/* Select Company Button */}
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSelectCompany}
            loading={selectCompanyMutation.isPending}
            disabled={selectCompanyMutation.isPending || !methods.watch('company')}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {t('select_company_button')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    );
  }

  // Login Form View
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {/* General Error Alert */}
        {generalError && (
          <Alert severity="error" sx={{ textAlign: 'right' }}>
            {generalError || t('login_error')}
          </Alert>
        )}

        {/* Email/Username Field */}
        <RHFTextField
          name="email"
          label={t('email_or_username')}
          placeholder={t('email_placeholder')}
          fullWidth
        />

        {/* Password Field */}
        <RHFTextField
          name="password"
          label={t('password')}
          placeholder={t('password_placeholder')}
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password Link and Remember Me */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ flexWrap: 'wrap' }}
        >
          <Link
            variant="body2"
            color="#2B6DDD"
            underline="always"
            href="/forgot-password"
            sx={{ fontSize: '0.875rem' }}
          >
            {t('forgot_password')}
          </Link>

          <RHFCheckbox
            name="rememberMe"
            label={t('remember_me')}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
              },
            }}
          />
        </Stack>

        {/* Submit Button */}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={loginMutation.isPending}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {t('sign_in')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
