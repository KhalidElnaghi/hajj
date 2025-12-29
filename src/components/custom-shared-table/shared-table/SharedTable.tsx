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
  order,
  enableSelection = false,
  table: tableProp,
  onRowClick,
}: SharedTableProps<T>) {
  const table = tableProp ?? useTable();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('per_page');

  const limit = Number(perPageParam) || 10;
  const page = Math.max((Number(pageParam) || 1) - 1, 0);

  const showOrder = order !== false;
  const selectedIds = table.selected ?? [];
  const rowCount = data?.length ?? 0;

  const headLabel = [
    ...(enableSelection
      ? [{ id: 'select', label: '', align: cellAlignment.center, width: 52 }]
      : []),
    ...(showOrder ? [{ id: 'auto_index', label: '#', width: 40 }] : []),
    ...tableHead,
    ...(actions?.length
      ? [{ id: 'rowsActions', label: '', align: cellAlignment.center, width: 60 }]
      : []),
  ];

  const bodyHeadIds = [
    ...(showOrder ? ['auto_index' as unknown as keyof T] : []),
    ...(tableHead.map((x) => x.id).filter((x) => x !== '' && x !== 'rowsActions') as (keyof T)[]),
  ];

  const handleSelectAllRows = (checked: boolean) => {
    if (!table.onSelectAllRows) return;
    const newSelecteds = data?.map((row) => String(row.id)) ?? [];
    table.onSelectAllRows(checked, newSelecteds);
  };

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
            <TableHeadCustom
              headLabel={headLabel}
              headColor={headColor}
              enableSelection={enableSelection}
              numSelected={selectedIds.length}
              rowCount={rowCount}
              onSelectAllRows={handleSelectAllRows}
            />

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
                    selectionEnabled={enableSelection}
                    selected={selectedIds.includes(String(row.id))}
                    onSelectRow={table.onSelectRow}
                    onRowClick={onRowClick}
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
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      )}
    </Box>
  );
}
