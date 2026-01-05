'use client';

import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

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
      <CustomBreadcrumbs
        links={[
          {
            name: t('Label.breadcrumb_home'),
            href: paths.dashboard.root,
          },
          {
            name: t('title'),
            href: paths.dashboard.settings.root,
          },
          { name: title },
        ]}
      />

      <Stack spacing={1}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('placeholder.subtitle')}
        </Typography>
      </Stack>

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
