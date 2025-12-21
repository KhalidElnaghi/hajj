import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import { TableProps } from './types';

import { useQueryString } from 'src/hooks/use-queryString';
// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
  defaultDense?: boolean;
};

export default function useTable(props?: UseTableProps): Partial<ReturnType> {
  const [dense, setDense] = useState(!!props?.defaultDense);
  const searchParams = useSearchParams();
  const querySignature = searchParams.toString();
  const { createQueryString } = useQueryString();

  const currentLimit = Number(searchParams.get('MaxResultCount')) || 10;

  const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
      createQueryString([
        { name: 'SkipCount', value: String(newPage * limit) },
      ]);
    },
    [createQueryString, currentLimit, querySignature]
  );

  return {
    dense,
    //
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setDense,
  };
}
