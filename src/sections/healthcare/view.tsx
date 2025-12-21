'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { ComingSoonIllustration } from 'src/assets/illustrations';

export default function HealthcareView() {
  const t = useTranslations();

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t('Title.healthcare')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 6,
          }}
        >
          <ComingSoonIllustration sx={{ maxWidth: 480, width: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </Container>
  );
}

