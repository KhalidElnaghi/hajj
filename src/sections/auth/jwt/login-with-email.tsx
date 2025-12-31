'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFCheckbox } from 'src/components/hook-form';

import { useLoginMutation } from 'src/services/mutations/auth/useLoginMutation';
import { loginSchema, LoginFormValues } from './login-schema';
import { getErrorMessage } from 'src/utils/axios';

// Temporary static company list - replace with API call when endpoint is available
const TEMP_COMPANIES = [
  { id: '1', name: 'شركة 1' },
  { id: '2', name: 'شركة 2' },
  { id: '3', name: 'شركة 3' },
];

// ----------------------------------------------------------------------

export default function LoginByEmailView() {
  const password = useBoolean();

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      company: '',
      rememberMe: false,
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const loginMutation = useLoginMutation({
    onSuccess: () => {
      // Redirect handled in mutation hook (full page reload for auth context re-init)
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        companyId: data.company,
        rememberMe: data.rememberMe,
      });
    } catch (error) {
      // Error handled in onError callback
    }
  });

  // Get general error message if no field errors
  const hasFieldErrors = !!(
    errors.email?.message ||
    errors.password?.message ||
    errors.company?.message
  );
  const generalError =
    loginMutation.error && !hasFieldErrors ? getErrorMessage(loginMutation.error) : null;

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {/* General Error Alert */}
        {generalError && (
          <Alert severity="error" sx={{ textAlign: 'right' }}>
            {generalError || 'تعذر تسجيل الدخول. تحقق من البيانات وحاول مرة أخرى.'}
          </Alert>
        )}

        {/* Email/Username Field */}
        <RHFTextField
          name="email"
          label="البريد الاكتروني أو اسم المستخدم"
          placeholder="Example@email.com"
          fullWidth
        />

        {/* Password Field */}
        <RHFTextField
          name="password"
          label="كلمة السر"
          placeholder="at least 8 characters"
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

        {/* Company Select Field */}
        <RHFSelect name="company" label="اختار شركتك" placeholder="Choose your company">
          <MenuItem value="" disabled>
            Choose your company
          </MenuItem>
          {TEMP_COMPANIES.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </RHFSelect>

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
            نسيت كلمة السر؟
          </Link>

          <RHFCheckbox
            name="rememberMe"
            label="تذكرني"
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
          disabled={loginMutation.isPending}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          تسجيل الدخول
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
