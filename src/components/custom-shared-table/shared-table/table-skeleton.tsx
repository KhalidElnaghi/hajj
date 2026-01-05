'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

import { headCellType } from './types';

// ----------------------------------------------------------------------

type TableSkeletonProps = {
  numberOfRows?: number;
  numberOfColumns?: number;
  tableHead?: headCellType[];
  enableSelection?: boolean;
  showOrder?: boolean;
  showActions?: boolean;
};

export default function TableSkeleton({
  numberOfRows = 10,
  numberOfColumns,
  tableHead,
  enableSelection = false,
  showOrder = true,
  showActions = false,
}: TableSkeletonProps) {
  // Determine number of columns
  let columnsCount = numberOfColumns;

  if (!columnsCount && tableHead) {
    columnsCount = tableHead.length;
  }

  if (!columnsCount) {
    columnsCount = 5; // Default fallback
  }

  // Add extra columns for selection, order, and actions
  if (enableSelection) columnsCount += 1;
  if (showOrder) columnsCount += 1;
  if (showActions) columnsCount += 1;

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 400,
          borderCollapse: 'separate',
          '& .MuiTableCell-root': {
            border: 'none',
            padding: '12px 16px',
          },
        }}
      >
        <TableHead>
          <TableRow>
            {/* Checkbox column */}
            {enableSelection && (
              <TableCell sx={{ width: 52 }}>
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
            )}
            {/* Order column */}
            {showOrder && (
              <TableCell sx={{ width: 40 }}>
                <Skeleton variant="text" width={20} />
              </TableCell>
            )}
            {/* Data columns */}
            {tableHead ? (
              tableHead.map((head) => (
                <TableCell key={head.id}>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
              ))
            ) : (
              Array.from({ length: numberOfColumns || 5 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
              ))
            )}
            {/* Actions column */}
            {showActions && (
              <TableCell sx={{ width: 60 }}>
                <Skeleton variant="text" width={40} />
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {/* Checkbox column */}
              {enableSelection && (
                <TableCell>
                  <Skeleton variant="rectangular" width={20} height={20} />
                </TableCell>
              )}
              {/* Order column */}
              {showOrder && (
                <TableCell>
                  <Skeleton variant="text" width={20} />
                </TableCell>
              )}
              {/* Data columns */}
              {tableHead ? (
                tableHead.map((head) => (
                  <TableCell key={head.id}>
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                ))
              ) : (
                Array.from({ length: numberOfColumns || 5 }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton variant="text" width="90%" />
                  </TableCell>
                ))
              )}
              {/* Actions column */}
              {showActions && (
                <TableCell>
                  <Skeleton variant="text" width={40} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

