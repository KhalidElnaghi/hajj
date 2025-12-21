'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useTranslations } from 'next-intl';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function LoginBYEmailView() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('Message.Error.email_required'))
      .email(t('Message.Error.email_invalid')),
    password: Yup.string().required(t('Message.Error.password_required')),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Replace with real login call when backend is ready.
    /*
    const { login } = useAuthContext();
    await login(data.email, data.password);
    */
    const destination = returnTo || paths.dashboard.root;
    router.push(destination);
  });

  const renderForm = (
    <Stack spacing={2.5} sx={{ minWidth: '100%' }}>
      <RHFTextField name="email" label={t('Label.email')} />

      <RHFTextField
        name="password"
        label={t('Label.password')}
        // @ts-ignore
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

      <Link variant="body2" color="#2B6DDD" underline="always" href="/forgot-password">
        {t('Label.forgot_password')}
      </Link>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
      >
        {t('Button.sign_in')}
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderForm}
    </FormProvider>
  );
}
