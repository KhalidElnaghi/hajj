'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';

interface DialogHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function DialogHeader({
  title,
  description,
  onClose,
  onBack,
  showBackButton = false,
}: DialogHeaderProps) {
  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {showBackButton && onBack && (
            <IconButton
              onClick={onBack}
              sx={{
                color: 'text.primary',
                mr: 1,
                p: 0.5,
              }}
            >
              <Iconify icon="mdi:arrow-right" width={24} />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            {title}
          </Typography>
        </Stack>
        {description && (
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mt: 1, fontSize: 13, mr: showBackButton ? 5 : 0 }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <IconButton
        onClick={onClose}
        sx={{
          color: 'text.secondary',
          mt: -1,
          mr: -1,
          border: '1px solid #e5e7eb',
          p: 0.5,
          '&:hover': {
            bgcolor: '#f9fafb',
            borderColor: '#d1d5db',
          },
        }}
      >
        <Iconify icon="mdi:close" width={24} />
      </IconButton>
    </Stack>
  );
}

