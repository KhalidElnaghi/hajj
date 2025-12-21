import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import Chip from '@mui/material/Chip';
import { Popper } from '@mui/material';
import TextField from '@mui/material/TextField';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PopperProps } from '@mui/material/Popper';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import useCostomSearchParams from 'src/hooks/use-searchParams';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'country' | string;
  value?: any;
  rules?: { [key: string]: any };
  helperText?: React.ReactNode;
  onCustomChange?: (value: any) => void;
  searchQuery?: string;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  type,
  helperText,
  rules,
  value,
  placeholder,
  onCustomChange,
  searchQuery,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();
  const { setQuery } = useCostomSearchParams({ searchQuery });
  const { multiple } = other;

  const CustomPopper = styled((props: PopperProps) => <Popper {...props} />)(({ theme }) => ({
    '& .MuiAutocomplete-paper': {
      width: 'auto',
      minWidth: '300px',
      maxWidth: '400px',
    },
  }));
  return (
    <Controller
      name={name}
      defaultValue={value}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (type === 'country') {
          return (
            <Autocomplete
              PopperComponent={CustomPopper}
              sx={{
                popper: {
                  width: '500px',
                },
              }}
              {...field}
              id={`autocomplete-${name}`}
              autoHighlight={!multiple}
              disableCloseOnSelect={multiple}
              onChange={(event: any, newValue) => {
                const _key = event?.target?.value;
                setValue(name, _key, { shouldValidate: true });
              }}
              renderOption={(props, option) => {
                const country = getCountry(option as string);

                if (!country.label) {
                  return null;
                }

                return (
                  <li {...props} key={country.label} value={`${country?.phone}`}>
                    <Iconify
                      key={country.label}
                      icon={`circle-flags:${country.code?.toLowerCase()}`}
                      sx={{ mr: 1 }}
                    />
                    {country.label} ({country.code}) +{country.phone}
                  </li>
                );
              }}
              renderInput={(params) => {
                const country = getCountry(params.inputProps.value as string);

                const baseField = {
                  ...params,
                  label,
                  placeholder,
                  error: !!error,
                  helperText: error ? error?.message : helperText,
                  inputProps: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                };

                if (multiple) {
                  return <TextField {...baseField} />;
                }

                return (
                  <TextField
                    {...baseField}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            ...(!country.code && {
                              display: 'none',
                            }),
                          }}
                        >
                          <Iconify
                            icon={`circle-flags:${country.code?.toLowerCase()}`}
                            sx={{ mr: -0.5, ml: 0.5 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => {
                  const country = getCountry(option as string);

                  return (
                    <Chip
                      {...getTagProps({ index })}
                      key={country.label}
                      label={country.label}
                      icon={<Iconify icon={`circle-flags:${country.code?.toLowerCase()}`} />}
                      size="small"
                      variant="soft"
                    />
                  );
                })
              }
              {...other}
            />
          );
        }

        return (
          <Autocomplete
            {...field}
            id={`autocomplete-${name}`}
            onChange={(event, newValue: any) => {
              if (onCustomChange) onCustomChange(newValue);
              if (typeof newValue === 'object') {
                setValue(name, newValue?.id, { shouldValidate: true });
              } else {
                setValue(name, newValue, { shouldValidate: true });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                onChange={(event) => {
                  if (searchQuery) {
                    setQuery(event?.target?.value);
                  }
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function getCountry(inputValue: string) {
  const option = countries.filter((country) => country.label === inputValue)[0];

  return {
    ...option,
  };
}
