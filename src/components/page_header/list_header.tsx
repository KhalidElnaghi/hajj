'use client';

import { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

type ListHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actionLabel?: string;
  actionIcon?: string;
  actionColor?: ButtonProps['color'];
  actionVariant?: ButtonProps['variant'];
  actionDisabled?: boolean;
  onAction?: () => void;
  actionsSlot?: ReactNode;
  children?: ReactNode;
};

export default function ListHeader({
  title,
  subtitle,
  actionLabel,
  actionIcon = 'solar:add-circle-bold',
  actionColor = 'primary',
  actionVariant = 'contained',
  actionDisabled,
  onAction,
  actionsSlot,
  children,
}: ListHeaderProps) {
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        gap={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="h3">{title}</Typography>
          {/* {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )} */}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          {actionsSlot}
          {actionLabel && (
            <Button
              variant={actionVariant}
              color={actionColor}
              disabled={actionDisabled}
              onClick={onAction}
              // startIcon={<Iconify icon={actionIcon} />}
            >
              {actionLabel}
            </Button>
          )}
        </Stack>
      </Stack>

      {children}
    </Stack>
  );
}
