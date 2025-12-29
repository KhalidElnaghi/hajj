import { useState, useCallback, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';

import { TableProps } from './types';

import { useQueryString } from 'src/hooks/use-queryString';
// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
};

export default function useTable(props?: UseTableProps): ReturnType {
  const [dense, setDense] = useState(!!props?.defaultDense);
  const [selected, setSelected] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const querySignature = searchParams.toString();
  const { createQueryString } = useQueryString();

  const currentLimit = Number(searchParams.get('per_page')) || 10;

  const onChangeDense = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (newLimit: number) => {
      createQueryString([
        { name: 'per_page', value: String(newLimit) },
        { name: 'page', value: '1' },
      ]);
    },
    [createQueryString]
  );

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      createQueryString([{ name: 'page', value: String(newPage + 1) }]);
    },
    [createQueryString]
  );

  const onSelectRow = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    setSelected(checked ? newSelecteds : []);
  }, []);

  return {
    dense,
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setDense,
    setSelected,
  };
}
