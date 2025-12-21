'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { ComingSoonIllustration } from 'src/assets/illustrations';

export default function MainPage() {
  const t = useTranslations();
  return (
    <Container maxWidth="xl">
      <Stack gap={3}>
        <Typography variant="h4"> {t('Title.main_page')}</Typography>

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
      </Stack>
    </Container>
  );
}
