'use client';

import { useRouter } from 'next/navigation';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import { useLocales } from 'src/locales';

import Iconify from '../iconify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function PageHeader({
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
  const { isRTL } = useLocales();
  const router = useRouter();
  return (
    <Stack
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ p: 4 }}
    >
      <Stack direction="column" alignItems="flex-start">
        {backTo ? (
          <IconButton
            onClick={() => router.back()}
            sx={{
              width: '4rem',
              '& svg': {
                width: '100%',
                height: 'auto',
                rotate: `${isRTL ? '0deg' : '180deg'}`,
                color: 'default.main',
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : null}
        <Stack direction="column" alignItems="center" spacing={3}>
          <Box>
            <Typography sx={{ fontSize: '32px', fontWeight: 500 }}>{headding}</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{subHeadding}</Typography>
          </Box>
        </Stack>
      </Stack>
      {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
    </Stack>
  );
}
