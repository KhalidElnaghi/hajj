'use client';

import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

import LoginBYEmailView from './login-with-email';
import { useTranslations } from 'next-intl';

export default function LoginView() {
  const settings = useSettingsContext();
  const t = useTranslations();

  const [currentTab, setCurrentTab] = useState('by_email');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


  const renderHead = (
    <Stack sx={{ mb: 3 }}>
      <Typography variant="h4" textTransform="capitalize" textAlign="center">
        {t('Title.sign_in')}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {renderHead}

        <LoginBYEmailView />
      </Box>
    </Box>
  );
}
