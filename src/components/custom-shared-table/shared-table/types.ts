import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

import { SxProps, Theme } from '@mui/material';

export enum cellAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export type headCellType = {
  id: string;
  align?: cellAlignment;
  label?: string;
  width?: number;
};
export type Action<T> = {
  label: string;
  icon?: string;
  sx?: SxStyle;
  onClick: (row: T) => void;
  hide?: (row: T) => Boolean;
};

export type TableBulkAction<T> = {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  onClick: (selectedIds: string[], selectedRows: T[]) => void;
};

export interface SharedTableProps<T extends { id: string | number }> {
  tableHead: headCellType[];
  data: T[];
  actions?: Action<T>[];
  disablePagination?: boolean;
  customRender?: Partial<Record<keyof T, (row: T) => ReactNode>>;
  count: number;
  headColor?: string;
  emptyIcon?: string;
  /** Whether to display the order/index (#) column. Defaults to true */
  order?: boolean;
  /** Enable row selection with checkboxes */
  enableSelection?: boolean;
  /** Pass a table instance to share selection/pagination state */
  table?: TableProps;
  /** Callback when a row is clicked */
  onRowClick?: (row: T) => void;
}
export interface SharedTableRowProps<T extends { id: string | number }> {
  row: T;
  actions?: Action<T>[];
  customRender?: Partial<Record<keyof T, (row: T) => ReactNode>>;
  headIds: (keyof T)[];
  // 1-based row index for the current page (used for the auto "No" column)
  index?: number;
  selectionEnabled?: boolean;
  selected?: boolean;
  onSelectRow?: (id: string) => void;
  onRowClick?: (row: T) => void;
}
export type SxStyle = SxProps<Theme>;

// ----------------------------------------------------------------------

export type TableProps = {
  dense: boolean;
  //
  selected: string[];
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (newRowsPerPage: number) => void;
  onChangeDense: (event: ChangeEvent<HTMLInputElement>) => void;
  //
  setDense: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string[]>>;
};
