'use client';

import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PageHeader } from 'src/components/custom-page-headding';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type PlaceholderViewProps = {
  title: string;
  translationKey: string;
};

export default function SettingsPlaceholderView({ title, translationKey }: PlaceholderViewProps) {
  const t = useTranslations('Settings');

  return (
    <Stack spacing={4}>
      <PageHeader
        headding={title}
        subHeadding={t('placeholder.subtitle')}
        backTo={paths.dashboard.settings.root}
      />

      <Card sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {t('placeholder.comingSoon')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('placeholder.description')}
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
}
