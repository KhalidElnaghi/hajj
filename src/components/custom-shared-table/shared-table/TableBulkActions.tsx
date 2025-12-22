'use client';
import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import Iconify from 'src/components/iconify';

import { TableBulkAction } from './types';

type Props<T> = {
  label: string;
  selectedIds: Array<string | number>;
  selectedRows?: T[];
  actions: TableBulkAction<T>[];
  badgeColor?: string;
  iconSrc?: string;
  onAfterAction?: () => void;
  disableWhenEmpty?: boolean;
  buttonProps?: ButtonProps;
};

const DEFAULT_ICON = '/assets/images/pilgrims/bulk-actions.svg';

export default function TableBulkActions<T>({
  label,
  selectedIds,
  selectedRows = [],
  actions,
  badgeColor = '#17a2b8',
  iconSrc = DEFAULT_ICON,
  onAfterAction,
  disableWhenEmpty = true,
  buttonProps,
}: Props<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const selectedCount = selectedIds?.length || 0;
  const disableOpen = disableWhenEmpty ? selectedCount === 0 : false;

  const actionIds = useMemo(() => selectedIds.map((id) => String(id)), [selectedIds]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disableOpen || actions.length === 0) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleAction = (action: TableBulkAction<T>) => {
    if (action.disabled || (disableWhenEmpty && selectedCount === 0)) return;
    action.onClick(actionIds, selectedRows);
    onAfterAction?.();
    handleClose();
  };

  return (
    <>
      <Button
        {...buttonProps}
        variant={buttonProps?.variant ?? 'contained'}
        onClick={handleOpen}
        disabled={disableOpen || actions.length === 0 || buttonProps?.disabled}
        sx={{
          bgcolor: '#0b0b0b',
          color: '#fff',
          borderRadius: 1,
          height: 44,
          paddingInlineStart: 2,
          paddingInlineEnd: 5,
          minWidth: 200,
          position: 'relative',
          boxShadow: 'none',
          '&:hover': { bgcolor: '#1c1c1c', boxShadow: 'none' },
          ...buttonProps?.sx,
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            top: '50%',
            insetInlineEnd: 12,
            transform: 'translateY(-50%)',
            bgcolor: badgeColor,
            color: 'white',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {selectedCount}
        </Box>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ marginInlineEnd: 3 }}>
          {iconSrc.startsWith('/') ? (
            <Image src={iconSrc} alt="bulk actions" width={20} height={20} />
          ) : (
            <Iconify icon={iconSrc} width={20} height={20} />
          )}
          <Box component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
            {label}
          </Box>
        </Stack>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 0.5,
            borderRadius: 1,
            minWidth: 200,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        {actions.map((action) => {
          const disabled = action.disabled || (disableWhenEmpty && selectedCount === 0);
          const isCustomIcon = action.icon && (action.icon.startsWith('/') || action.icon.startsWith('http'));
          return (
            <MenuItem
              key={action.key}
              disabled={disabled}
              onClick={() => handleAction(action)}
              sx={{
                py: 0.75,
                px: 1.5,
                '&:hover': { bgcolor: 'action.hover' },
                opacity: disabled ? 0.6 : 1,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {action.icon ? (
                  isCustomIcon ? (
                    <Box
                      component="img"
                      src={action.icon}
                      alt={action.label}
                      sx={{ width: 16, height: 16 }}
                    />
                  ) : (
                    <Iconify icon={action.icon} width={16} height={16} sx={{ color: 'text.secondary' }} />
                  )
                ) : null}
                <Typography variant="body2" sx={{ fontSize: 13, color: 'text.primary' }}>
                  {action.label}
                </Typography>
              </Stack>
            </MenuItem>
          );
        })}
        {actions.length === 0 && (
          <MenuItem disabled sx={{ py: 1, px: 1.5 }}>
            <Typography variant="body2" sx={{ fontSize: 13, color: 'text.secondary' }}>
              {label}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

