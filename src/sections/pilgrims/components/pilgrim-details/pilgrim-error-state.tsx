'use client';

import { Container, Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

// ----------------------------------------------------------------------

export default function PilgrimErrorState() {
  const t = useTranslations('Pilgrims');

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {t('Message.error_loading_pilgrim')}
        </Typography>
      </Box>
    </Container>
  );
}

