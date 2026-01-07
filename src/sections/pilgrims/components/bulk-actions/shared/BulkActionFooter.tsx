'use client';

import { Button, Stack, type ButtonProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import type { SxProps, Theme } from '@mui/system';

type Justify = 'flex-end' | 'space-between';

export interface ActionConfig {
  label: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  loading?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

interface BulkActionFooterProps {
  onCancel: () => void;
  cancelLabel?: string;
  cancelVariant?: ButtonProps['variant'];
  cancelColor?: ButtonProps['color'];
  cancelSx?: SxProps<Theme>;
  actions: ActionConfig[];
  justify?: Justify;
}

const baseButtonSx: SxProps<Theme> = { px: 3, borderRadius: 1 };
const combineSx = (...styles: Array<SxProps<Theme> | undefined>): SxProps<Theme> =>
  styles.filter(Boolean) as SxProps<Theme>;

export default function BulkActionFooter({
  onCancel,
  cancelLabel = 'Cancel',
  cancelVariant = 'outlined',
  cancelColor = 'inherit',
  cancelSx,
  actions,
  justify = 'flex-end',
}: BulkActionFooterProps) {
  return (
    <Stack direction="row" spacing={1.5} justifyContent={justify}>
      <Button
        variant={cancelVariant}
        color={cancelColor}
        onClick={onCancel}
        sx={combineSx(baseButtonSx, cancelSx)}
      >
        {cancelLabel}
      </Button>

      <Stack direction="row" spacing={1}>
        {actions.map((action) => {
          const actionKey = action.label;
          const commonProps = {
            variant: action.variant ?? 'contained',
            color: action.color ?? 'primary',
            onClick: action.onClick,
            disabled: action.disabled,
            sx: combineSx(baseButtonSx, action.sx),
          } as const;

          if (action.loading) {
            return (
              <LoadingButton key={actionKey} {...commonProps} loading>
                {action.label}
              </LoadingButton>
            );
          }

          return (
            <Button key={actionKey} {...commonProps}>
              {action.label}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}
