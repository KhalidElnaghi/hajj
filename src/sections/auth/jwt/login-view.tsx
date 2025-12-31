'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Logo from 'src/components/logo';
import LanguagePopover from 'src/layouts/common/language-popover';

import LoginByEmailView from './login-with-email';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const { isRTL } = useLocales();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Left side - Image Card */}
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
          alt="Hajj Login"
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '800px',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Box>

      {/* Right side - Form Content */}
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
        {/* Header - Logo and Language */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
          <Logo disabledLink />
          <LanguagePopover />
        </Stack>

        {/* Login Form */}
        <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2rem' },
            }}
          >
            مرحبا بك
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            سجل دخولك إلى لوحة التحكم، لإدارة البيانات والعمليات بسلاسة وكفاءة من منصة واحدة موثوقة.
          </Typography>

          <LoginByEmailView />
        </Box>

        {/* Footer - Copyright */}
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
          All rights reserved © Quran
        </Typography>
      </Box>
    </Box>
  );
}
