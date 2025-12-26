/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import Iconify from 'src/components/iconify';

import { SxStyle, SharedTableRowProps } from './types';

export default function SharedTableRow<T extends { id: string | number }>({
  row,
  actions,
  customRender,
  headIds,
  index = 0,
  selectionEnabled,
  selected,
  onSelectRow,
}: SharedTableRowProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let rowStyle: SxStyle = {};

  if (Object.hasOwn(row, 'rowSx')) {
    rowStyle = (row as any).rowSx as SxStyle;
  }

  const formatIndex = (value: number) => `#${value.toString().padStart(2, '0')}`;

  const visibleActions = actions?.filter((action) => (action.hide ? !action.hide(row) : true));

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        ...rowStyle,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:not(:last-of-type) .MuiTableCell-root': {
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {selectionEnabled && (
        <TableCell align="center" padding="checkbox" sx={{ width: 52 }}>
          <Checkbox
            color="primary"
            checked={!!selected}
            onChange={() => onSelectRow?.(String(row.id))}
            inputProps={{ 'aria-label': 'select row' }}
          />
        </TableCell>
      )}

      {headIds.map((x, cellIdx) => (
        <TableCell key={cellIdx} sx={{ whiteSpace: 'nowrap', color: 'info.dark' }}>
          {x === ('auto_index' as unknown as keyof T)
            ? formatIndex(index)
            : customRender && x in customRender
              ? customRender[x]!(row)
              : (row as any)[x]}
        </TableCell>
      ))}

      {!!visibleActions?.length && (
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton
            onClick={handleMenuClick}
            size="small"
            sx={{
              width: 32,
              height: 32,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box
              component="img"
              src="/assets/icons/table/action.svg"
              alt="actions"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
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
                minWidth: 130,
                boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
                py: 0.5,
              },
            }}
          >
            {visibleActions.map((action, idx) => {
              const iconPath = action?.icon || 'solar:pen-bold';
              const isCustomIcon = iconPath.startsWith('/') || iconPath.startsWith('http');
              const label = action.label || '';

              return (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    action.onClick(row);
                    handleMenuClose();
                  }}
                  sx={{
                    py: 0.75,
                    px: 1.5,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {isCustomIcon ? (
                      <Box
                        component="img"
                        src={iconPath}
                        alt={label}
                        sx={{ width: 16, height: 16 }}
                      />
                    ) : (
                      <Iconify
                        icon={iconPath}
                        width={16}
                        height={16}
                        sx={{ color: 'text.secondary' }}
                      />
                    )}
                    <Typography variant="body2" sx={{ fontSize: 13, color: 'text.primary' }}>
                      {label}
                    </Typography>
                  </Stack>
                </MenuItem>
              );
            })}
          </Menu>
        </TableCell>
      )}
    </TableRow>
  );
}
