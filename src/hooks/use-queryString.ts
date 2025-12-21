import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export type QueryStringUpdate = {
  name: string;
  value?: string | null;
};

type CreateQueryStringFn = {
  (name: string, value?: string, replace?: boolean): void;
  (update: QueryStringUpdate, replace?: boolean): void;
  (updates: QueryStringUpdate[], replace?: boolean): void;
};

const sanitizeValue = (value?: string | null) =>
  value !== undefined && value !== null && value !== '' ? value : undefined;

export function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback<CreateQueryStringFn>(
    (
      arg1: string | QueryStringUpdate | QueryStringUpdate[],
      arg2?: string | boolean,
      arg3?: boolean
    ) => {
      let updates: QueryStringUpdate[] = [];
      let replace = false;

      if (typeof arg1 === 'string') {
        const value = typeof arg2 === 'string' || typeof arg2 === 'undefined' ? arg2 : undefined;
        replace = typeof arg3 === 'boolean' ? arg3 : false;
        updates = [{ name: arg1, value }];
      } else {
        updates = Array.isArray(arg1) ? arg1 : [arg1];
        replace = typeof arg2 === 'boolean' ? arg2 : false;
      }

      const params = new URLSearchParams(searchParams.toString());

      updates.forEach(({ name, value }) => {
        if (!name) return;
        const normalizedValue = sanitizeValue(value);
        if (normalizedValue !== undefined) {
          params.set(name, normalizedValue);
        } else {
          params.delete(name);
        }
      });

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  const setQueryString = useCallback(
    (name: string, value: string, replace?: boolean) => {
      const params = new URLSearchParams();

      params.set(name, value);

      if (replace) {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [pathname, router]
  );

  return { createQueryString, setQueryString };
}
