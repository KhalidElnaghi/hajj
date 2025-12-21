'use client';

import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';

import useTable from './use-table';
import TableNoData from './table-no-data';
import { SharedTableProps, cellAlignment } from './types';
import SharedTableRow from './SharedTableRow';
import TableHeadCustom from './table-head-custom';
import CustomPagination from './custom-pagination';
// ----------------------------------------------------------------------
export default function SharedTable<T extends { id: string | number }>({
  data,
  actions,
  tableHead,
  disablePagination,
  customRender,
  count,
  headColor,
  emptyIcon,
}: SharedTableProps<T>) {
  const table = useTable();
  const searchParams = useSearchParams();
  const skipCountParam = searchParams.get('SkipCount');

  const limit = 10;
  const skipCount = Number(skipCountParam) || 0;
  const page = Math.max((Number(searchParams.get('page')) || 1) - 1, 0);

  const headLabel = [
    { id: 'auto_index', label: '#', width: 40 },
    ...tableHead,
    ...(actions?.length
      ? [{ id: 'rowsActions', label: '', align: cellAlignment.center, width: 140 }]
      : []),
  ];

  const bodyHeadIds = [
    'auto_index' as unknown as keyof T,
    ...(tableHead.map((x) => x.id).filter((x) => x !== '' && x !== 'rowsActions') as (keyof T)[]),
  ];

  return (
    <Box>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table
            size={table.dense ? 'small' : 'medium'}
            sx={{
              minWidth: 400,
              borderCollapse: 'separate',
              '& .MuiTableCell-root': {
                border: 'none',
                padding: '12px 16px',
              },
              '& .MuiTableHead-root .MuiTableCell-root': {
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.5px',
              },
              '& .MuiTableBody-root .MuiTableRow-root': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              '& .MuiTableBody-root .MuiTableCell-root': {
                color: 'text.primary',
                fontWeight: 500,
                fontSize: 13,
              },
              '& .MuiTableBody-root .MuiTableRow-root:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {/* Inject auto "No" column at the beginning */}
            <TableHeadCustom headLabel={headLabel} headColor={headColor} />

            <TableBody>
              {data?.length ? (
                data.map((row, rowIdx) => (
                  <SharedTableRow<T>
                    key={row.id}
                    row={row}
                    actions={actions}
                    customRender={customRender}
                    index={page * limit + rowIdx + 1}
                    headIds={bodyHeadIds}
                  />
                ))
              ) : (
                <TableNoData notFound colSpan={headLabel.length} iconUrl={emptyIcon} />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {!disablePagination && (data?.length ?? 0) > 0 && (
        <CustomPagination
          count={count}
          page={page}
          rowsPerPage={limit}
          onPageChange={table.onChangePage!}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      )}
    </Box>
  );
}
