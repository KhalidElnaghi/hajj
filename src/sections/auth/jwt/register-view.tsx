'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

import LanguagePopover from 'src/layouts/common/language-popover';

import RegisterByEmailView from './register-with-email';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const { isRTL } = useLocales();
  const t = useTranslations('Auth.Register');
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: isRTL ? 'row' : 'row-reverse',
        },
        position: 'relative',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: 'auto', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          p: { xs: 2, md: 4, lg: 10 },
        }}
      >
        <Box
          component="img"
          src="/assets/auth/main login.png"
          alt="Hajj Register"
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '800px',
            objectFit: 'contain',
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
          backgroundColor: 'background.default',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: 6,
            flexDirection: isRTL ? 'row' : 'row-reverse',
            px: { xs: 2, md: 4, lg: 10 },
            maxWidth: 800,
          }}
        >
          <LanguagePopover />

          <Image
            src="/assets/auth/logo.png"
            alt="Logo"
            width={100}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </Stack>

        <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2rem' },
              textAlign: isRTL ? 'end' : 'start',
            }}
          >
            {t('welcome')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              textAlign: isRTL ? 'end' : 'start',
            }}
          >
            {t('description')}
          </Typography>

          <RegisterByEmailView />
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 'auto',
            pt: 4,
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          {t('copyright')}
        </Typography>
      </Box>
    </Box>
  );
}
