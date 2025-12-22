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
  inactiveIconSrc?: string;
  onAfterAction?: () => void;
  disableWhenEmpty?: boolean;
  buttonProps?: ButtonProps;
};

const DEFAULT_ICON_ACTIVE = '/assets/images/pilgrims/bulk-actions.svg';
const DEFAULT_ICON_INACTIVE = '/assets/images/pilgrims/bulk-actions-dark.svg';

export default function TableBulkActions<T>({
  label,
  selectedIds,
  selectedRows = [],
  actions,
  badgeColor = '#dc3545',
  iconSrc = DEFAULT_ICON_ACTIVE,
  inactiveIconSrc = DEFAULT_ICON_INACTIVE,
  onAfterAction,
  disableWhenEmpty = true,
  buttonProps,
}: Props<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const selectedCount = selectedIds?.length || 0;
  const disableOpen = disableWhenEmpty ? selectedCount === 0 : false;
  const isDisabled = disableOpen || actions.length === 0 || buttonProps?.disabled;
  const isActive = selectedCount > 0 && !buttonProps?.disabled && actions.length > 0;
  const effectiveVariant = buttonProps?.variant ?? (isActive ? 'contained' : 'outlined');

  const actionIds = useMemo(() => selectedIds.map((id) => String(id)), [selectedIds]);
  const renderedIcon = isActive ? iconSrc : (inactiveIconSrc ?? iconSrc);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
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
        variant={effectiveVariant}
        onClick={handleOpen}
        disabled={isDisabled}
        sx={{
          bgcolor: isDisabled ? '#fff' : isActive ? '#0b0b0b' : '#fff',
          color: isDisabled ? '#333' : isActive ? '#fff' : '#333',
          borderRadius: 1,
          height: 44,
          paddingInlineStart: 2,
          paddingInlineEnd: 5,
          minWidth: 200,
          position: 'relative',
          boxShadow: 'none',
          border: isDisabled || !isActive ? '1px solid #dce5ef' : 'none',
          '&:hover': {
            bgcolor: isDisabled ? '#fff' : isActive ? '#1c1c1c' : '#fff',
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            bgcolor: '#fff !important',
            color: '#333 !important',
            border: '1px solid #dce5ef !important',
            opacity: 1,
          },
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
          {renderedIcon.startsWith('/') ? (
            <Image src={renderedIcon} alt="bulk actions" width={20} height={20} />
          ) : (
            <Iconify icon={renderedIcon} width={20} height={20} />
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
          const isCustomIcon =
            action.icon && (action.icon.startsWith('/') || action.icon.startsWith('http'));
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
                    <Iconify
                      icon={action.icon}
                      width={16}
                      height={16}
                      sx={{ color: 'text.secondary' }}
                    />
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
