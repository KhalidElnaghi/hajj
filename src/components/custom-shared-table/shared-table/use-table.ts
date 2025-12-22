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

  const currentLimit = Number(searchParams.get('MaxResultCount')) || 10;

  const onChangeDense = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (newLimit: number) => {
      createQueryString([
        { name: 'MaxResultCount', value: String(newLimit) },
        { name: 'SkipCount', value: '0' },
      ]);
    },
    [createQueryString]
  );

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      const params = new URLSearchParams(querySignature);
      const limit = Number(params.get('MaxResultCount')) || currentLimit;
      createQueryString([{ name: 'SkipCount', value: String(newPage * limit) }]);
    },
    [createQueryString, currentLimit, querySignature]
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
