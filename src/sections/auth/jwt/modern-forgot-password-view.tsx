'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { ForgetPassword } from 'src/actions/auth';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function ModernForgotPasswordView() {
  const settings = useSettingsContext();
  const t = useTranslations();
  const isRTL = settings.themeDirection === 'rtl';
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const mail = {
      email: data.email,
    };
    try {
      const res = await ForgetPassword(mail);
      if (res === 200) {
        // Store email in sessionStorage instead of query params
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('forgotPasswordEmail', mail.email);
        }
        enqueueSnackbar(t('Message.Success.otp_sent'), { variant: 'success' });
        router.push('/new-password');
      } else {
        enqueueSnackbar(typeof res === 'object' && 'error' in res ? res.error : 'Unknown error', {
          variant: 'error',
        });
      }
    } catch (erro) {
      enqueueSnackbar(`${erro}`, { variant: 'error' });
    }
  });

  const renderHead = (
    <Stack
      spacing={1}
      sx={{
        width: 1,
        textAlign: 'center',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Typography variant="h4">{t('Label.forgot_password')}</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t('Description.forgot_password')}
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{ width: 1 }}>
      <RHFTextField
        name="email"
        label={t('Label.email_address')}
        placeholder={t('Placeholder.email_example')}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        {t('Button.send_request')}
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="#2B6DDD"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignSelf: 'center',
          gap: 0.5,
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} color="#2B6DDD" />
        {t('Label.return_to_sign_in')}
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ width: 1, height: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {renderHead}

          {renderForm}
        </Box>

      </Box>
    </FormProvider>
  );
}
