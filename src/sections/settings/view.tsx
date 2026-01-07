'use client';

import { useTranslations } from 'next-intl';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Link } from 'src/i18n/routing';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { settingsTiles } from './config';

// ----------------------------------------------------------------------

export default function SettingsView() {
  const t = useTranslations('Settings');

  return (
    <Stack spacing={4}>
      <CustomBreadcrumbs
        links={[
          {
            name: t('Label.breadcrumb_home'),
            href: paths.dashboard.root,
          },
          { name: t('title') },
        ]}
      />

      <Stack spacing={1}>
        <Typography variant="h3">{t('title')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('subtitle')}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {settingsTiles.map((tile) => (
          <Grid key={tile.key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              component={Link}
              href={tile.path}
              sx={{
                p: 3,
                minWidth: 280,
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.z8,
                  transform: 'translateY(-2px)',
                },
                '&:focus-visible': {
                  outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" component="div">
                    {t(`tiles.${tile.key}.title`)}
                  </Typography>
                  <Iconify
                    icon="eva:arrow-forward-fill"
                    sx={{ width: 20, height: 20, color: 'text.secondary' }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {t(`tiles.${tile.key}.description`)}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

