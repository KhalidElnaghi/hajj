'use client';

import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
  type AutocompleteProps,
} from '@mui/material';
import type { ReactNode } from 'react';

type OptionKey = string | number;

export interface FilterAutocompleteProps<T> {
  label: string;
  value: T | null;
  onChange: AutocompleteProps<T, false, false, false>['onChange'];
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => OptionKey;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  highlighted?: boolean;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => ReactNode;
}

export default function FilterAutocomplete<T>({
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  getOptionKey,
  isOptionEqualToValue,
  placeholder = 'اختر',
  disabled = false,
  fullWidth = true,
  highlighted = false,
  renderOption,
}: FilterAutocompleteProps<T>) {
  return (
    <FormControl fullWidth={fullWidth}>
      <Typography
        sx={{
          mb: 1,
          color: highlighted ? 'primary.main' : '#64748B',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '22px',
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Typography>

      <Autocomplete
        value={value}
        onChange={onChange}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />
        )}
        renderOption={(props, option) =>
          renderOption ? (
            renderOption(props, option)
          ) : (
            <li {...props} key={getOptionKey(option)}>
              {getOptionLabel(option)}
            </li>
          )
        }
      />
    </FormControl>
  );
}
