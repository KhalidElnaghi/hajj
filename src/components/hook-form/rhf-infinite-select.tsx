'use client';

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type SyntheticEvent,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import Autocomplete, { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { InfiniteFetchParams, InfiniteFetchResult, InfiniteOption } from 'src/types/select';

const DEFAULT_LIMIT = 20;

type Fetcher<TMeta> = (params: InfiniteFetchParams) => Promise<InfiniteFetchResult<TMeta>>;

type RHFInfiniteSelectProps<TMeta> = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  queryKey: string;
  fetchOptions:
    | Fetcher<TMeta>
    | ((
        params: InfiniteFetchParams & Record<string, unknown>
      ) => Promise<InfiniteFetchResult<TMeta>>);
  limit?: number;
  disabled?: boolean;
  initialOption?: InfiniteOption<TMeta> | null;
  queryKeyDependencies?: unknown[];
  additionalParams?: Record<string, unknown>;
  renderOption?: (
    props: HTMLAttributes<HTMLLIElement>,
    option: InfiniteOption<TMeta>,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  getOptionLabel?: (option: InfiniteOption<TMeta>) => string;
  isOptionEqualToValue?: (option: InfiniteOption<TMeta>, value: InfiniteOption<TMeta>) => boolean;
};

export default function RHFInfiniteSelect<TMeta>({
  name,
  label,
  placeholder,
  helperText,
  queryKey,
  fetchOptions,
  limit = DEFAULT_LIMIT,
  disabled,
  initialOption,
  queryKeyDependencies,
  additionalParams,
  renderOption,
  getOptionLabel,
  isOptionEqualToValue,
}: RHFInfiniteSelectProps<TMeta>) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearch] = useDebounce(inputValue, 300);
  const [persistedOption, setPersistedOption] = useState<InfiniteOption<TMeta> | null>(
    initialOption ?? null
  );

  const queryKeyWithDeps = useMemo(
    () => [queryKey, debouncedSearch, ...(queryKeyDependencies || [])],
    [queryKey, debouncedSearch, queryKeyDependencies]
  );

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: queryKeyWithDeps,
      queryFn: ({ pageParam = 0 }) =>
        fetchOptions({
          search: debouncedSearch.trim(),
          cursor: pageParam,
          limit,
          ...(additionalParams || {}),
        } as InfiniteFetchParams & Record<string, unknown>),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: open,
    });

  useEffect(() => {
    if (initialOption) {
      setPersistedOption(initialOption);
    } else {
      setPersistedOption(null);
    }
  }, [initialOption?.value]);

  const options = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const mergedOptions = useMemo(() => {
    const map = new Map<InfiniteOption<TMeta>['value'], InfiniteOption<TMeta>>();

    options.forEach((option) => {
      map.set(option.value, option);
    });

    if (persistedOption) {
      map.set(persistedOption.value, persistedOption);
    }

    return Array.from(map.values());
  }, [options, persistedOption]);

  const handleListboxScroll = useCallback(
    (event: SyntheticEvent<HTMLUListElement>) => {
      if (!hasNextPage || isFetchingNextPage) {
        return;
      }

      const listboxNode = event.currentTarget;
      const reachedBottom =
        listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 24;

      if (reachedBottom) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const normalizedValue =
          field.value === '' || field.value === undefined ? null : (field.value ?? null);

        const selectedOption =
          normalizedValue === null
            ? null
            : (mergedOptions.find((option) => option.value === normalizedValue) ?? null);

        return (
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
              refetch();
            }}
            onClose={() => setOpen(false)}
            options={mergedOptions}
            loading={isFetching && !isFetchingNextPage}
            value={selectedOption}
            onChange={(_, newValue) => {
              setPersistedOption(newValue ?? null);
              field.onChange(newValue ? newValue.value : null);
            }}
            onBlur={field.onBlur}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            getOptionLabel={(option) =>
              getOptionLabel ? getOptionLabel(option) : (option.label ?? '')
            }
            isOptionEqualToValue={
              isOptionEqualToValue
                ? isOptionEqualToValue
                : (option, value) => option.value === value.value
            }
            disabled={disabled}
            ListboxProps={{
              onScroll: handleListboxScroll,
              style: { maxHeight: 260, overflow: 'auto' },
            }}
            renderOption={(props, option, state) => {
              if (renderOption) {
                return renderOption(props, option, state);
              }

              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={field.ref}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {(isFetching || isFetchingNextPage) && (
                        <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}
