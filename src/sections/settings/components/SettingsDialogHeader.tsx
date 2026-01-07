'use client';

import { Stack, Typography, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';

type SettingsDialogHeaderProps = {
  title: string;
  onClose: () => void;
};

export default function SettingsDialogHeader({ title, onClose }: SettingsDialogHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
        {title}
      </Typography>

      <IconButton
        onClick={onClose}
        sx={{
          color: 'text.secondary',
          border: '1px solid #e5e7eb',
          p: 0.5,
          '&:hover': {
            bgcolor: '#f9fafb',
            borderColor: '#d1d5db',
          },
        }}
        aria-label="close"
      >
        <Iconify icon="mdi:close" width={20} height={20} />
      </IconButton>
    </Stack>
  );
}


