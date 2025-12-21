'use client';

import { useRouter } from 'next/navigation';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useLocales } from 'src/locales';

import Iconify from '../iconify';

export function CustomPageHeadding({
  headding,
  subHeadding,
  backTo,
  action,
}: {
  headding: string;
  subHeadding?: string;
  backTo?: string;
  action?: React.ReactNode;
}) {
  const { currentLang } = useLocales();
  const dir = currentLang?.value === 'ar' ? 'rtl' : 'ltr';
  const router = useRouter();
  return (
    <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center">
        {backTo ? (
          <IconButton
           
            onClick={() => router.back()}
            sx={{
              width: '3rem',
              '& svg': {
                width: '100%',
                height: 'auto',
                rotate: `${dir === 'ltr' ? '-' : ''}90deg`,
                color: 'default.main',
              },
            }}
          >
            <Iconify icon="ei:arrow-up" />
          </IconButton>
        ) : null}
        <Stack direction="column" alignItems="center" spacing={3}>
          <Box>
            <Typography variant="h4">{headding}</Typography>
            <Typography>{subHeadding}</Typography>
          </Box>
        </Stack>
      </Stack>
      {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
    </Stack>
  );
}
