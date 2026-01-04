'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookie from 'js-cookie';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { Link } from 'src/i18n/routing';
import { paths } from 'src/routes/paths';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import FormProvider, { RHFTextField, RHFSelect, RHFPassword } from 'src/components/hook-form';

import { useLoginMutation } from 'src/services/mutations/auth/useLoginMutation';
import { useSelectCompanyMutation } from 'src/services/mutations/auth/useSelectCompanyMutation';
import { createLoginSchema, LoginFormValues } from './login-schema';
import { getErrorMessage } from 'src/utils/axios';
import { Company } from 'src/services/api/auth';

export default function LoginByEmailView() {
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
      }
    },
  });

  const selectCompanyMutation = useSelectCompanyMutation({
    onSuccess: () => {
      // Redirect handled in mutation hook
    },
    onError: (error: any) => {
      // Error will be displayed in the general error alert above the form
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        companyId: data.company || undefined,
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
        <RHFPassword
          name="password"
          label={t('password')}
          placeholder={t('password_placeholder')}
        />

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

        {/* Subscribe Now Section */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            textAlign: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            {t('no_account_question')}{' '}
            <MuiLink
              component={Link}
              href={paths.auth.jwt.register}
              sx={{
                color: 'primary.main',
                textDecoration: 'underline',
                fontWeight: 500,
              }}
            >
              {t('subscribe_now')}
            </MuiLink>
          </Typography>
        </Box>
      </Stack>
    </FormProvider>
  );
}
