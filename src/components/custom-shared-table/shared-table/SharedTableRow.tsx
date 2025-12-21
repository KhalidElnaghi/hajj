/* eslint-disable no-nested-ternary */
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Iconify from 'src/components/iconify';

import { SxStyle, SharedTableRowProps } from './types';

export default function SharedTableRow<T extends { id: string | number }>({
  row,
  actions,
  customRender,
  headIds,
  index = 0,
}: SharedTableRowProps<T>) {
  let rowStyle: SxStyle = {};

  if (Object.hasOwn(row, 'rowSx')) {
    rowStyle = (row as any).rowSx as SxStyle;
  }

  const formatIndex = (value: number) => `#${value.toString().padStart(2, '0')}`;

  return (
    <TableRow
      hover
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
      {headIds.map((x, cellIdx) => (
        <TableCell key={cellIdx} sx={{ whiteSpace: 'nowrap', color: 'info.dark' }}>
          {x === ('auto_index' as unknown as keyof T)
            ? formatIndex(index)
            : customRender && x in customRender
              ? customRender[x]!(row)
              : (row as any)[x]}
        </TableCell>
      ))}

      {!!actions?.length && (
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'center' }}>
            {actions
              ?.filter((action) => (action.hide ? !action.hide(row) : true))
              .map((action, idx) => {
                const iconPath = action?.icon || 'solar:pen-bold';
                const isCustomIcon = iconPath.startsWith('/') || iconPath.startsWith('http');
                const label = action.label || '';

                return (
                  <Tooltip key={idx} title={label} arrow placement="top">
                    <IconButton
                      onClick={() => action.onClick(row)}
                      size="small"
                      sx={{
                        width: 32,
                        height: 32,
                        color: 'text.secondary',
                        border: 'none',
                        bgcolor: 'transparent',
                        '&:hover': { bgcolor: 'action.hover' },
                        ...action.sx,
                      }}
                    >
                      {isCustomIcon ? (
                        <Box
                          component="img"
                          src={iconPath}
                          alt={label}
                          sx={{ width: 16, height: 16 }}
                        />
                      ) : (
                        <Iconify icon={iconPath} width={18} height={18} />
                      )}
                    </IconButton>
                  </Tooltip>
                );
              })}
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
}
